---
authors: ["kokkos-team"]
title: "kokkos-fft: FFT interface for Kokkos eco-system"
date: 2025-03-19
tags: ["blog"]
thumbnail: img/blog/2025/kokkos-fft/kokkos-fft.png
---

# Introduction

The fast Fourier transform (FFT) is a family of fundamental algorithms that is widely used in scientific computing and other areas [1]. [kokkos-fft](https://github.com/kokkos/kokkos-fft) is designed to help [Kokkos](https://github.com/kokkos/kokkos) users who are:

* using Kokkos to port a legacy application which relies on FFT libraries. E.g., fluid simulation codes with periodic boundaries, plasma turbulence, etc.

* wishing to integrate in-situ signal and image processing with FFTs. E.g., spectral analyses, low pass filtering, etc.

* willing to use de facto standard FFT libraries just like [`numpy.fft`](https://numpy.org/doc/stable/reference/routines.fft.html).

kokkos-fft can benefit such users through the following features:

* A simple interface like [`numpy.fft`](https://numpy.org/doc/stable/reference/routines.fft.html) with in-place and out-of-place transforms:  
Only accepts [Kokkos Views](https://kokkos.org/kokkos-core-wiki/API/core/view/view.html) to make APIs simple and safe.

* 1D, 2D, 3D standard and real FFT functions (similar to [`numpy.fft`](https://numpy.org/doc/stable/reference/routines.fft.html)) over 1D to 8D Kokkos Views:  
Batched plans are automatically used if View dimension is larger than FFT dimension.

* A reusable [FFT plan](https://kokkosfft.readthedocs.io/en/latest/api/plan/plan.html) which wraps the vendor libraries for each Kokkos backend:  
[fftw](http://www.fftw.org), [cufft](https://developer.nvidia.com/cufft), [hipfft](https://github.com/ROCm/hipFFT) ([rocfft](https://github.com/ROCm/rocFFT)), and [oneMKL](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl.html) are automatically enabled based on the enabled Kokkos backend.

* Support for multiple CPU and GPU backends:  
FFT libraries for the enabled Kokkos backend are executed on the stream/queue used in that Execution space.

* Compile time and/or runtime errors for invalid usage (e.g. `View` extents mismatch).

# How it Works

For those who are familiar with [`numpy.fft`](https://numpy.org/doc/stable/reference/routines.fft.html), you may use kokkos-fft quite easily. In fact, all of the numpy.fft functions (`numpy.fft.<function_name>`) have an analogous counterpart in kokkos-fft (`KokkosFFT::<function_name>`), which can run on the Kokkos device. In addition, kokkos-fft supports [in-place transform](https://kokkosfft.readthedocs.io/en/latest/intro/using.html#inplace-transform) and [plan reuse](https://kokkosfft.readthedocs.io/en/latest/intro/using.html#reuse-fft-plan) capabilities.

Let's start with a simple example. The following C++ listing shows the 1D real to complex transform using `rfft` in kokkos-fft. 

```C++
#include <Kokkos_Core.hpp>
#include <Kokkos_Complex.hpp>
#include <Kokkos_Random.hpp>
#include <KokkosFFT.hpp>
using ExecutionSpace = Kokkos::DefaultExecutionSpace;
template <typename T> using View1D = Kokkos::View<T*, ExecutionSpace>;

int main(int argc, char* argv[]) {
  Kokkos::ScopeGuard guard(argc, argv);
  const int n = 4;
  View1D<double> x("x", n);
  View1D<Kokkos::complex<double> > x_hat("x_hat", n/2+1);
  Kokkos::Random_XorShift64_Pool<> random_pool(12345);
  Kokkos::fill_random(x, random_pool, 1);
  KokkosFFT::rfft(ExecutionSpace(), x, x_hat);
  Kokkos::fence();
}
```

This is equivalent to the following python code.

```python
import numpy as np
x = np.random.rand(4)
x_hat = np.fft.rfft(x)
```

There are two additional arguments in the Kokkos version:

* An instance of the [`ExecutionSpace`](https://kokkos.org/kokkos-core-wiki/API/core/execution_spaces.html)
* The output View (`x_hat`).

Also, kokkos-fft only accepts [Kokkos Views](https://kokkos.org/kokkos-core-wiki/API/core/view/view.html) as input data. The accessibility of a View from `ExecutionSpace` is statically checked and will result in a compilation error if not accessible. See [documentations](https://kokkosfft.readthedocs.io/en/latest/intro/quick_start.html) for basic usage.

# Solving 2D Hasegawa-Wakatani turbulence with the Fourier spectral method

For turbulence simulations, we sometimes consider periodic boundaries by assuming that a system is homogeneous and isotropic. Under periodic boundary conditions, we can solve the system of equations using the Fourier spectral method. Here, we consider a typical 2D plasma turbulence model, called the Hasegawa-Wakatani equation [3] (see the thumbnail for the vorticity structure). Using Kokkos and kokkos-fft, we can easily implement the code, just like Python, while getting a significant acceleration. As described in the [documentation](https://github.com/kokkos/kokkos-fft/tree/main/examples/10_HasegawaWakatani/README.md), the core computational kernel of the code is the nonlinear term. In Python, it is implemented as follows,

```python
def _poissonBracket(self, f, g):
  ikx_f = 1j * self.grid.kx  * f
  iky_f = 1j * self.grid.kyh * f
  ikx_g = 1j * self.grid.kx  * g
  iky_g = 1j * self.grid.kyh * g

  # Inverse FFT complex [ny, nx/2+1] => real [ny, nx]
  dfdx = self._backwardFFT(ikx_f)
  dfdy = self._backwardFFT(iky_f)
  dgdx = self._backwardFFT(ikx_g)
  dgdy = self._backwardFFT(iky_g)

  # Convolution in real space
  conv = dfdx * dgdy - dfdy * dgdx

  # Forward FFT real [ny, nx] => [ny, nx/2+1]
  poisson_bracket = self._forwardFFT(conv)

  # Reality condition
  poisson_bracket = realityCondition(poisson_bracket)
  return poisson_bracket
```

We make 4 backward FFTs on `ikx_f`, `iky_f`, `ikx_g` and `iky_g`. Then, we perform the convolution in real space followed by a forward FFT on the result to compute the Poisson bracket. The equivalent Kokkos code is as follows,

```C++
template <typename FViewType, typename GViewType, typename PViewType>
void poissonBracket(const FViewType& fk, const GViewType& gk, PViewType& pk) {
  derivative(fk, gk, m_ik_fg_all);
  backwardFFT(m_ik_fg_all, m_dfgdx_all);

  // Convolution in real space
  convolution(m_dfgdx_all, m_conv);

  // Forward FFT
  forwardFFT(m_conv, pk);

  // ky == 0 component
  auto sub_pk = Kokkos::subview(pk, Kokkos::ALL, 0, Kokkos::ALL);
  realityCondition(sub_pk, m_mask);
}
```

The functions `derivative` and `convolution` are parallelized with [`Kokkos::parallel_for`](https://kokkos.org/kokkos-core-wiki/API/core/parallel-dispatch/parallel_for.html) using a [`MDRangePolicy`](https://kokkos.org/kokkos-core-wiki/API/core/policies/MDRangePolicy.html). For example, `derivative` is computed in the following manner. It should be noted that we store the derivatives `ikx_f`, `iky_f`, `ikx_g` and `iky_g` as [`subviews`](https://kokkos.org/kokkos-core-wiki/API/core/view/subview.html) of a single view `ik_fg_all`. This way, we only need to perform one batched backward FFT over derivatives rather than calling FFTs multiple times for all derivatives.

```C++
template <typename FViewType, typename GViewType, typename FGViewType>
void derivative(const FViewType& fk, const GViewType& gk,
                FGViewType& ik_fg_all) {
  auto ikx_f =
      Kokkos::subview(ik_fg_all, pair_type(0, 2), Kokkos::ALL, Kokkos::ALL);
  auto iky_f =
      Kokkos::subview(ik_fg_all, pair_type(2, 4), Kokkos::ALL, Kokkos::ALL);

  auto ikx_g = Kokkos::subview(ik_fg_all, 4, Kokkos::ALL, Kokkos::ALL);
  auto iky_g = Kokkos::subview(ik_fg_all, 5, Kokkos::ALL, Kokkos::ALL);
  auto kx    = m_grid->m_kx;
  auto kyh   = m_grid->m_kyh;

  const Kokkos::complex<double> I(0.0, 1.0);
  constexpr int nb_vars = 2;

  range2D_type range(point2D_type{{0, 0}}, point2D_type{{m_nkyh, m_nkx2}},
                    tile2D_type{{TILE0, TILE1}});

  Kokkos::parallel_for(
      range, KOKKOS_LAMBDA(int iky, int ikx) {
        const auto tmp_ikx = I * kx(ikx);
        const auto tmp_iky = I * kyh(iky);
        for (int in = 0; in < nb_vars; in++) {
          const auto tmp_fk   = fk(in, iky, ikx);
          ikx_f(in, iky, ikx) = tmp_ikx * tmp_fk;
          iky_f(in, iky, ikx) = tmp_iky * tmp_fk;
        }
        const auto tmp_gk = gk(iky, ikx);
        ikx_g(iky, ikx)   = tmp_ikx * tmp_gk;
        iky_g(iky, ikx)   = tmp_iky * tmp_gk;
      });
}
```

For forward and backward FFTs, we create plans during initialization which are reused by the [`KokkosFFT::execute`](https://kokkosfft.readthedocs.io/en/latest/intro/using.html#reuse-fft-plan) function. The following function implements the forward FFT followed by unpacking.

```C++
template <typename InViewType, typename OutViewType>
  void forwardFFT(const InViewType& f, OutViewType& fk) {
    KokkosFFT::execute(*m_forward_plan, f, m_forward_buffer);

    auto forward_buffer    = m_forward_buffer;
    auto norm_coef         = m_norm_coef;
    int nkx2 = m_nkx2, nkx = (m_nkx2 - 1) / 2, ny = m_ny, nv = 2;

    range3D_type range(point3D_type{{0, 0, 0}},
                       point3D_type{{nv, m_nkyh, nkx + 1}},
                       tile3D_type{{2, TILE0, TILE1}});

    Kokkos::parallel_for(
        "FFT_unpack", range, KOKKOS_LAMBDA(int iv, int iky, int ikx) {
          fk(iv, iky, ikx) = forward_buffer(iv, iky, ikx) * norm_coef;

          int ikx_neg = nkx2 - ikx;
          int iky_neg = (ny - iky), iky_nonzero = iky;
          if (ikx == 0) ikx_neg = 0;
          if (iky == 0) {
            iky_neg     = ny - 1;
            iky_nonzero = 1;
          }
          fk(iv, iky_nonzero, ikx_neg) =
              Kokkos::conj(forward_buffer(iv, iky_neg, ikx)) * norm_coef;
        });
  }
```

The implementation together with detailed description can be found in the [examples](https://github.com/kokkos/kokkos-fft/tree/main/examples/10_HasegawaWakatani) directory.

# Benchmark

We have performed a benchmark of this application over multiple backends. We performed a simulation for 100 steps with a resolution of `1024 x 1024` while I/Os are disabled. The following table shows the achieved performance.

| Device | Icelake (python) | Icelake (36 cores) | A100 | H100 | MI250X (1 GCD) | PVC |
| --- | --- | --- | --- | --- | --- | --- |
| LOC | 568 | 738 | 738 | 738 | 738 | 738 |
| Compiler/version | Python 3.12.3 | IntelLLVM 2023.0.0 | nvcc 12.2 | nvcc 12.3 | rocm 5.7 | IntelLLVM 2024.0.2 |
| GB/s (Theoretical peak) | 205 | 205 | 1555 | 3350 | 1600 | 3276.8 |
| Elapsed time [s] | 463 | 9.28 | 0.25 | 0.14 | 0.41 | 0.30 |
| Speed up | x 1 | x 49.9 | x 1852 | x 3307 | x 1129 | x 1562 |

As expected, the Python version is the simplest in terms of lines of code (LOC), which is definitively a good aspect of Python. With Kokkos and kokkos-fft, the same logic can be implemented without significantly increasing the source code size (roughly 1.5 times longer). However, the performance gain is enormous, allowing a speedup as high as 3000 times on the H100 GPU.

# Future developments

We are planning to add the following functionalities. Contributions to the project are highly welcomed (see [developer guide](https://kokkosfft.readthedocs.io/en/latest/developer_guide.html)).

* Multi-GPU support with MPI

* Device callable batched capability of FFTs like [`kokkos-kernels`](https://github.com/kokkos/kokkos-kernels)

* Supporting callbacks if backend library supports that

# References

[1] Daniel N Rockmore; The FFT: an algorithm the whole family can use. Computing in Science & Engineering Jan/Feb 2000; 2 (1): 60-64. https://doi.org/10.1109/5992.814659  
[2] Kokkos fft library: [https://github.com/kokkos/kokkos-fft](https://github.com/kokkos/kokkos-fft)  
[3] Masahiro Wakatani, Akira Hasegawa; A collisional drift wave description of plasma edge turbulence. Phys. Fluids 1 March 1984; 27 (3): 611–618. https://doi.org/10.1063/1.864660
