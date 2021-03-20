# 🦴 Skeleton React App

Start from this boilerplate to create a react web app.

note the default deps:

- react
- styled-components

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

- Rename `createYourApp` and `title` in `public/index.html`
- Rename `createYourApp` start your own in `src/index.js`

## Tips and suggestions

### frontend

- use [`La Taverne`](https://github.com/uralys/taverne) for your state management
- add [`reactrouter`](https://reactrouter.com/web/guides/quick-start)
- add [`axios`](https://github.com/axios/axios) for http requests
- use this [`auth0 guide`](https://auth0.com/blog/complete-guide-to-react-user-authentication/) for the authentication
- add animations with [`react-spring`](https://github.com/pmndrs/react-spring)

### backend

- use [serverless](https://www.serverless.com/)!
- use [`netlify`](https://app.netlify.com/) to deploy. (Note: set `NODE_VERSION` in environnment vars)

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
public
```
