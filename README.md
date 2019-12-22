# node-jasmine-nyc-sample
* ES6+ Node.js sample repository build with babel, jasmine and nyc (istanbuljs) to fetch github repository information by communicating with github developer api.
* It has only one route to fetch repo information from github developer api
    * **/fetch-repo-info**   -- here default org and repo points to this repository
    * **/fetch-repo-info?org={your_favourite_org}&repo={your_favourite_repo}**
* Pleae provide environment variable 'GIT_PERSONAL_ACCESS_TOEKEN' or 'your_own_github_personal_token' at src/services/github-service.js:#L26 for extended rate of requests (default UnAuthenticated are 60/h).

#### Steps to run and test this app locally

> * Clone the repository
> * Run **npm i**
> * Run **npm test**
> * Run **npm start**
> * Run: **npm run debug-start** (For nodemon file debug)

##### And here is nyc configuration:
```JSON
{
    "require": [
        "@babel/register",
        "source-map-support/register"
    ],
    "all": true,
    "cache": false,
    "check-coverage": true,
    "extension": [
        ".js", "jsx"
    ],
    "exclude": [
        "src/spec/**",
        "node_modules/**",
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
        "branches": [52,  95],
        "functions": [50, 95],
        "lines": [50, 95]
    },
    "statements": 50,
    "branches": 42,
    "functions": 50,
    "lines": 50
}

````