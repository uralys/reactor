# Skeleton

Start from this boilerplate to create a react web app.

## Setup

Clone skeleton master branch locally:

```sh
> git clone https://github.com/chrisdugne/skeleton-react
```

Rename:

```sh
> mv skeleton-react your-new-repo
> cd your-new-repo
```

Reset the git history and start yours:

```sh
> rm -rf .git
> git init
> git add .
> git commit -m "Initial commit from skeleton-react"
```

Change the remote to yours:

```sh
> git remote add origin https://github.com/your-new-repo
> git push origin master
```

## Move to your new App

- Rename in `package.json`

```json
  "name": "@your/app",
  "description": "YOUR DESC",
```

- Rename `YourApp` in `public/index.html`

## Tips

### frontend

- add [`reactrouter`](https://reactrouter.com/web/guides/quick-start)
- add [`axios`](https://github.com/axios/axios) for http requests
- use this [`auth0 guide`](https://auth0.com/blog/complete-guide-to-react-user-authentication/) for the authentication
- use [`hookstores`](https://auth0.com/blog/complete-guide-to-react-user-authentication/) for Flux state management
- add animations with [`react-spring`](https://github.com/pmndrs/react-spring)

### backend

- use `AWS API gateway` for your REST API
- use [`netlify`](https://app.netlify.com/) to deploy

## dev

```sh
> npm install
> npm run start:dev
```

## production

Build command:

```sh
> npm run build
```

Publish directory:

```sh
dist/public
```
