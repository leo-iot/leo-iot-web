<p align="center">
    <img src=".github/README_FILES/logo.png">
    <br/>
    <b>IoT - Smartschool</b>
    <br/>
    <br/>
    <br/>
</p>

# IoT - Webclient

## Getting started

### Development

#### Prerequesites

- Node.js
- npm
- Angular CLI

First of all make a quick check on your node and angular versions.
Running `ng --version` should return:

```
Angular CLI: [at least 7.0]
Node: [at least 8]
```

Update or install missing versions.

#### Clone the repository

```
git clone https://gitlab.htl-leonding.ac.at/iot/web.git
```

#### Install dependencies

Navigate to the project directory and run `npm install`

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build and `--aot` for ahead of time compilation.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). The test are configured to run on TravisCI therefore a HeadlessChrome Browser is used as default browser. You can add browsers in the karma config file.

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
E2e tests are defined in /e2e there are only the default files generated by `ng new`.



### CI/CD

```shell script
docker build --compress -t registry.gitlab.com/sdanninger/iot/web:#verision# .
docker push registry.gitlab.com/sdanninger/iot/web:#version#
```
version could be: 1.0.0


### Production

#### Prerequesites

- docker
- chrome

#### Pull and run the docker container

```
docker login registry.gitlab.com
docker run registry.gitlab.com/sdanninger/iot/web
```

By running `docker run sdanninger/iot/web` you will either start the local image or pull it from 
https://registry.gitlab.com/sdanninger/iot/web

This image will start nginx that serves the app on `localhost:80`


## Team

Danninger Simon

Noisternig Luis

Pfleger Christoph


## License

MIT


## Project record

The initial commit of this repository is a reworked version of the initial IoT-Client project. 
After several change requests we decided to open a new repository and clean up, delete and rewrite the code from the initial project.

> If you want/need access to the initial repository send me an email
