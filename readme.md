# Reactor

A simple "createReactApp" using esbuild instead of webpack.

```sh
> npx reactor create
```

to bootstrap your `React app` and `npm scripts`.

## create

First prepare your new project with a startup package.json:

```sh
> mkdir yourApp
> cd yourApp
> npm init
```

(more info on [npmjs doc](https://docs.npmjs.com/cli/v6/commands/npm-init))

Now you can install `Reactor`:

```sh
> npm i --save-deps @uralys/reactor
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

Optionally:

- `npm run toc` to generate TOC from you markdowns if you use `Reactor` to generate a documentation website. I'll document this later.

## dev

### publish

```sh
> npm version patch
> ggpush --tags
> npm run release
```
