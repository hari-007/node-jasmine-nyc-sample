# node-jasmine-nyc-sample
ES6+ Node.js sample repository with babel, jasmine and nyc (istanbuljs) setup

#### Steps to run and test this app locally

<<<<<<< HEAD
> * Clone the repository
> * Run **npm i**
> * Run **npm test**
> * Run **npm start**
> * Run: **npm run debug-start** (For nodemon file debug)

##### And here is nyc configuration:
=======
 > * Clone the repository
 > * Run **npm i**
 > * Run **npm test**
 > * Run **npm start**
 > * Run: **npm run debug-start** (For nodemon file debug)

##### nyc configuration:
>>>>>>> 38487e8efb2743c751a9be4f4354f2e243704bc1
```JSON
{
    "extends": "istanbuljs/nyc-config-babel",
    "require": [
        "@babel/register"
    ],
    "all": true,
    "cache": false,
    "check-coverage": true,
    "extension": [
        ".js", "jsx"
    ],
    "exclude": [
        "spec/**",
        "node_modules/**",
        "dist/**",
        "coverage/**"
    ],
    "reporter": [
        "text",
        "text-summary",
        "lcov"
    ],
    "temp-dir": "./coverage/.nyc_output",
    "watermarks": {
        "statements": [50, 95],
        "branches": [50,  95],
        "functions": [50, 95],
        "lines": [50, 95]
    },
    "statements": 50,
    "branches": 50,
    "functions": 50,
    "lines": 50
}

````