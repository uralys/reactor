# Reactor

[![Build Status](https://travis-ci.com/uralys/reactor.svg?branch=master)](https://travis-ci.com/uralys/reactor)
[![License](https://img.shields.io/badge/License-MIT-green.svg?colorB=3cc712)](./license)
[![version](https://img.shields.io/github/package-json/v/uralys/reactor)](https://github.com/uralys/reactor/tags)

🪄 A simple "CreateReactApp-like", using **esbuild**, to bootstrap your `React app` and `npm scripts`.

## create

First prepare your new project with a startup package.json:

```sh
> mkdir yourApp; cd yourApp
> npm i --save-dev @uralys/reactor
```

Let's create your boot files:

```sh
> npx reactor create

☢️ reactor updated you files successfully.
✅ you can now start your App
> npm run start:dev
```

You can now version and push your project to your repository

```sh
> git init
> git add .
> git commit -m "Initial commit from @uralys/reactor"
> git remote add origin https://github.com/your-new-repo
> git push origin master
```

## commands

Once your app is created, you can use:

- `npm run start:dev` to run a local server with `esbuild` and `live-server`
- `npm run build` to build you `/public` distribution with `esbuild`

### TOC (Optional)

- `npm run toc` to generate TOC from you markdowns if you use `Reactor` to generate a documentation website. I'll document this later.

### indexation (Optional)

- add a sitemap config to generate your `sitemap.xml`
- for Google configure your indexation on <https://search.google.com/search-console>
- for DuckDuckGo configure your indexation on Bing (import from google search-console) <https://www.bing.com/webmasters>

## Config

```js
{
  esbuild: {
    ...esbuildOptions
  },
  documentation: {
    source: './path/to/docs',
    dist: './path/to/tocs'
  },
  start: {
    hosts: ["platform.localhost"]
  },
  sitemap: {
    publicPath = './public',
    links = [],
    hostname: 'https://your.domain',
    outputName = 'sitemap.xml'
  }
}
```

## Tips and suggestions

### monitoring

- analyse perfs with <https://pagespeed.web.dev/>

### frontend

- use [`La Taverne`](https://github.com/uralys/taverne) for your state management
- add [`reactrouter`](https://reactrouter.com/web/guides/quick-start)
- add [`axios`](https://github.com/axios/axios) for http requests
- use this [`auth0 guide`](https://auth0.com/blog/complete-guide-to-react-user-authentication/) for the authentication
- add animations with [`react-spring`](https://github.com/pmndrs/react-spring)

### backend

- use [serverless](https://www.serverless.com/)!
- use [`netlify`](https://app.netlify.com/) to deploy. (Note: set `NODE_VERSION` in environnment vars)

## dev:publish Reactor

```sh
> npm version patch
> ggpush --tags
> npm run release
```
