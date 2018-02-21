# Serverless Chrome Puppeteer

Run puppeteer with Serverless on AWS Lambda.

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To create a new Serverless project.

``` bash
$ sls install --url https://github.com/michalsn/sls-chrome-puppeteer --name my-project
```

Enter the new directory

``` bash
$ cd my-project
```

Install the Node.js packages

``` bash
$ npm install --save-dev
```

### Usage

Deploy your project

``` bash
$ PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 sls deploy
```

or run examples locally

``` bash
$ sls invoke local -f version
```

``` bash
$ sls invoke local -f dom --data '{"url":"https://google.com/"}'
```

### Thanks

- [@browserless/aws-lambda-chrome](https://github.com/Kikobeats/aws-lambda-chrome)
- [Serverless Webpack](https://github.com/serverless-heaven/serverless-webpack)
- [Copy Webpack Plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
