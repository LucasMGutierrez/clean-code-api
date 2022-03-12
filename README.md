# Init project

```console
yarn init -y
```

# Install TS packages

```console
yarn add typescript ts-node-dev eslint -D
```

# Init TS config

```console
yarn tsc --init
```

# Add this at tsconfig.json

```json
"outDir": "./dist",
"rootDir": "./src",
```

# Add this at package.json

```json
"scripts": {
  "build": "tsc",
  "dev": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"
},
```

# Add src/ folder at root

```console
mkdir src
```

# Install other dependencies

```console
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prettier prettier -D
```

# Init ESlint

```console
yarn eslint --init
```

# Update .eslintrc.json using config given at the reference given at the end of the file

# Add eslintignore

```console
touch .eslintignore
```

# Then, add

```
/*.js’
node_modules
dist
```

# Add prettier.config.js
```console
touch prettier.config.js
```

# Then, add

```js
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
};
```
