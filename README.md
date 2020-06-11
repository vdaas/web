# Vald WebSite

Vald WebSite repository based on HUGO.

## Document Tree

- Vald WebSite is based on [HUGO](https://gohugo.io/), which is one of the popular site generator.<br>
  If you don't know about HUGO, please read the official document at first.

```
.
├ archetypes                 // content front matter deffinition
├ config                     // config file for each environment
| ├ _default/config.toml
| ├ staging/config.toml 
| └ production/config.toml 
├ content
| └ docs                     // public document content
├ preview                    // buil pages for staging (submodule of vdaas/web/gh-pages)
├ public                     // buil pages for production (submodule of vdaas/vald/gh-pages)
├ static                     // static files (img, css, js) for content
| ├ images
└ themes                     // hugo themes
```

## How to develop

- When you'd like to update config, design, template, etc, we recommend to develop using `make run` command which you can check on your browser https://localhost:1313

## How to get the latest contents

- You can get the latest contents of Vald by below

  ```bash
  $ sh init.sh
  ```

  The details of progress `init.sh`:
  1. check latest version
  1. get the latest Vald package from [vdaas/vald](https://github.com/vdaas/vald) and unpackaging
  1. make sure directory for create contents and static files
  1. create contents at content root dir (/content/docs) and latest version dir (/content/docs/{version})
  1. create contents at content root dir (/content/docs) and latest version dir (/content/docs/{version})
  1. create static files at static root dir (/static/{type}) and latest version dir (/static/{type}/{version})
  1. correct internal content link and static files' path in each content files (markdown files).


## Deploy to staging environment

**NOTE**:

Before deploy to a staging environment, please check that there are some contents files and static files.


- When you'd like to create the Pull Request or check update, we recommend you deploy to a staging environment.

  ```bash
  $ make deploy/staging
  ```

  We can check at [Vald Netlify](https://vald.netlify.app)

## Deploy to production environment

**NOTE**:

Before publishing to official WebSite, YOU MUST CHECK the `Draft` value of each content file.<br>
The content whose draft value is `false` WILL NOT BE PUBLISHED.


- When you'd like to publish the latest Vald WebSite, you can apply by below command.

  ```bash
  $ make deploy/production
  ```

  We can check at [Vald Official WebSite](https://vald.vdaas.org)
