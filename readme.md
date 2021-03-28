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

## dev

### publish

```sh
> npm version patch
> ggpush --tags
> npm run release
```
