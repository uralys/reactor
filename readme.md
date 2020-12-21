# Skeleton

Start from this boilerplate to create a react web app.

## Move to your new App

- rename in `package.json`

```json
  "name": "@your/app",
  "description": "YOUR DESC",
```

- rename `YourApp` in `public/index.html`

## Tips

- add [`reactrouter`](https://reactrouter.com/web/guides/quick-start)
- add [`axios`](https://github.com/axios/axios) for http requests
- use `auth0` for the authentication (<https://auth0.com/blog/complete-guide-to-react-user-authentication/>)
- use `hookstores` for the Flux state management (example <https://github.com/chrisdugne/testing-stores> )

#### backend

- use `AWS API gateway` for your REST API
- use [`netlify`](https://app.netlify.com/) to deploy

## dev

```sh
> npm install
> npm run start:dev
```

## deploy

```sh
> npm build
```
