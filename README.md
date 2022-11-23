# React Native Demo App for `@livelike/enagagement-api`

### This App is bootstrapped using [expo](https://docs.expo.dev/get-started/create-a-new-app/)

### Setup:

##### 1. Install dependencies:

```sh
npm install
```

##### 2. Configure Android or IOS dev environment

- [Android development environment](https://reactnative.dev/docs/environment-setup#installing-dependencies)
- [IOS development environment](https://reactnative.dev/docs/environment-setup#installing-dependencies)

##### 3. Install [nvm](https://github.com/nvm-sh/nvm#about)

Nvm is needed to locally link @livelike/javascript and install its dependencies.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

Add below lines in your .bashrc or .zshrc file

```sh

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Check nvm available in CLI and install node `v18.12.1`

```sh
nvm install v18.12.1
```

##### 4. Clone websdk repo branch with engagement-api changes and link engagement-api

Inside cloned repo with proper checked out branch

```sh
cd release/javascript
```

This globally links @livelike/javascript package

```sh
npm link
```

##### 5. Add @livelike/javascript dependencies in package.json

```json
dependencies: {
    "@livelike/javascript": "0.0.0",
}
```

##### 6. Locally link @livelike/javascript

```sh
npm run link-api
```
