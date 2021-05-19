
<h1 align="center">
<br>
preparatorul
</h1>

<p align="center">cook your project</p>

<hr />
<br />


## 📚 Project Definition

NodeJS cli tool to populate project with most used files(eg: Docker configuration)


## 🛠️ Features

Technologies used:

- ⚛️ **NodeJS**
- 🌐 **Inquirere** — Library to create CLI tools
- 🌐 **Docker** - Containerization sistem


## 🚀 Instalation

```sh
npm install -g preparatorul
```
OR 
```sh
npx preparatorul
```


## 🔋 Commands

Go to your project and
```sh
preparatorul
```

## 💻 Development

run 
```sh
node src/index.js
```
```sh
npm run lint
```

## 💻 NPM publish
- increment "version": in package.json
- push to master branch
- npm-publish.yml will do the work


## 🌐 Docker development setup

- run docker-compose up -d inside root


## 🔌 Custom configuration
The package can be configured according to the needs of each one.


For this you must add the desired template in the installation location of the package.

eg:

- ### Windows
```
    $USERPROFILE\AppData\Roaming\npm\node_modules\preparatorul\src\templates\
```

- ### Linux
```
    /usr/local/lib/node_modules/preparatorul/src/templates
```


