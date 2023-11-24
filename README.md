# Chanh Ly xenia-assessment

This is a mini project to interview for Xenia
First time using Vue 3, so I'm not sure if I'm using them correctly.

## Docker setup (check with localhost:3000)

``` bash
docker build . -t xenia-assessment
docker run -p 3000:3000 xenia-assessment
```

## Project setup

### server

``` bash
npm install
npm run start
```

### web

``` bash
npm install
npm run dev
```

### Run tests (both web and server)

``` bash
npm run test
```

### Production build for web (automatically copied to server/public)

``` bash
npm run build
```
