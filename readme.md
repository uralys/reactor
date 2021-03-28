# Reactor

## create

First prepare your new project with you package.json
(more info on [npmjs doc](https://docs.npmjs.com/cli/v6/commands/npm-init))

```sh
> mkdir yourApp
> cd yourApp
> npm init
```

Now you can install `Reactor`:

```sh
> npm i --save-deps @uralys/reactor
```

Let's create your boot files:

```sh
> npx reactor create

☢️  reactor updated you files successfully.
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

## dev

### publish

```sh
> npm version patch
> ggpush --tags
> npm run release
```
