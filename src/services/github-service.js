import requestPromise from 'request-promise-native';

export default class GithubService {
    
    constructor(org = 'hari-007', repo = 'node-jasmine-nyc-sample') {
        this.gitUrl = `https://api.github.com/repos/${org}/${repo}`;
    }

    /**
     * Fetches Github API request required options 
     */
    getRequestOptions() {

        let githubApiRequestOptions = {
            url: this.gitUrl,
            headers: {
                'User-Agent': 'request'
            },
            time: true,
            resolveWithFullResponse: true
        }

        // provide your github personal access token incase of limit reached by api hits from same machine
        // UnAuthenticated = 60 per hour and Authenticated = 5000 per hour
        // For more info, please visit: https://developer.github.com/v3/#rate-limiting
        const PERSONAL_GIT_ACCESS_TOKEN = process.env.GIT_PERSONAL_ACCESS_TOEKEN || '';
        if (!!PERSONAL_GIT_ACCESS_TOKEN) {
            githubApiRequestOptions.headers['Authorization'] = `token ${PERSONAL_GIT_ACCESS_TOKEN}`;
        }

        return githubApiRequestOptions;
    }

    /**
     * Calls Github and returns response
     */
    fetchRepoInfo(callback) {
        let options = this.getRequestOptions();

        requestPromise(options).then(response => {
            callback(null, response.body);
        }).catch(err => {
            let error = {};
            try { error = JSON.parse(err.error); error['statusCode']= err.statusCode; } 
            catch { error = { message: 'Something went wrong', statusCode: err.statusCode || 400}}
            callback(JSON.stringify({error}), null);
        }); 
    }
}