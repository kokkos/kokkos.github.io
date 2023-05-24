# New Kokkos.org

## Requirements

- [Install Hugo](https://gohugo.io/installation/) version v0.111.3
- Need to be connected to internet to load [Hinode theme](https://github.com/gethinode/hinode) dependencies and modules
- Clone [this repository](https://github.com/NexGenAnalytics/kokkos-org-new-v2)

<br />

## How to run locally

1. Install all requirements
2. Change directory: `<your-path-to-the-repository>`
3. Install dependencies
```
npm install
```
4. Start development server
```bash
npm run start
# or
hugo server -D
```
5. Open Chrome, web server is available at `http://localhost:<assigned-port-depends>`
    - example: `http://localhost:1313`

<br />

## How to add a blog post
- Create a new .md file in the /content/blog/ folder
- There are 2 parts to display an article:
    - an information / header part and
    - a body part of the article
- Here is an example of a header for a new blog article:
```
1 ---
2 author: <author-name>
3 title: <title-of-my-blog-post>
4 date: YYYY-MM-DD
5 tags: ["exemple1", "tag2", "anotherOne"]
6 thumbnail: img/<name-of-your-picture>.jpg
7 ---
```
- From line 8 you can write all the text you want respecting the markdown rules of the [goldmark parser](https://github.com/yuin/goldmark).
    - In `config.toml` line 173 `unsafe = true`: it allows you to put links in the body text of a blog post
- In addition, there are tags specific to the chosen theme. More information in the [docs](https://gethinode.com/docs/0.9/getting-started/introduction/)

<br />

## How to add a new page
1. Create a new file or folder in the `content/` folder
2. The name given will be the identifier in `config.toml` code
3. This .md file must have a correct header (see part **How to add a blog post**)
4. The content is then free following the markdown goldmark rules
5. The file / page is accessible via its url defined in the `config.toml` file
    - If you want to add it to the top menubar, read the next part

<br />

## How to add a item in the top menu bar
1. Go to `config.toml`
2. Add +1 to weight line 6 and 7:
```toml
[languages.en]
weight = <new-weight>
```
3. Add an item under the tag below:
```toml
[[languages.en.menu.main]]
```
4. It is necessary to specify 3 points: name, url and weight (location of the item in the top bar)
- Here is an example:
    - ```toml
        [[languages.en.menu.main]]
        name = "Name which is displayed"
        url = "/<path-to-folder>/<where-your-new-content-folder-is>/"
        weight = <number>
      ```
    - This tab will be before the items that have a weight lower than `<number>` and after the items that have a weight higher than `<number>`
5. If you have no content at the `url`, you get an error. To solve it you have to create a page or a folder with the same name as your `url` (for more information see next section)
6. If you want to add a drop down menu, you just have then to specify sub-menus with `parent` and `weight`
- Here is an example:
    - ```toml
        [[languages.en.menu.main]]
        identifier = "Unique name for this"
        name = "Name which is displayed child"
        url = "/<path-to-folder>/<where-your-new-content-folder-is>/<sub-file>/"
        parent = "Name which is displayed"
        weight = <number>
      ```

<br />

## How to build static HTML files 

- Go to the root directory: `cd <your-path-to-the-repository>`
- Use the command line to build
```bash
npm run build
```
- This command **generates the html code**, css, and more, to be able to deploy your website
- And puts it in an automatically created folder called **public/**

<br />

## Check the build 
You can check that the build is working well by running the build code with a small local python server. You must have python3 installed. This is not explained in this document.
- Change directory: `<your-path-to-the-repository>/public/`
- Execute the command: `python3 -m http.server`
- Web server is available at `http://localhost:8000` for example

<br />