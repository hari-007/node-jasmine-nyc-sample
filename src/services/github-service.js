import requestPromise from 'request-promise-native';

export default class GithubService {
    
    constructor(org = 'hari-007', repo = 'node-jasmine-nyc-sample') {
        this.gitUrl = `https://api.github.com/repos/${org}/${repo}`;
    }

    /**
     * Fetches Github API request required options 
     */
    getRequestOptions() {
        return {
            url: this.gitUrl,
            headers: {
                'User-Agent': 'request'
            },
            time: true,
            resolveWithFullResponse: true
        }
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