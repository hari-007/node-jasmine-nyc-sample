import GithubService from '../../services/github-service';

describe('Github-service suit', () => {
    let mockOrgAndRepoInfo = {};
    let sampleGithubServiceObj;

    beforeAll(() => {
        mockOrgAndRepoInfo.org = 'istanbuljs';
        mockOrgAndRepoInfo.repo = 'nyc';

        sampleGithubServiceObj = new GithubService(mockOrgAndRepoInfo.org, mockOrgAndRepoInfo.repo);
    });

    it('Should generate github url with class instance', () => {
        let mockOrg = mockOrgAndRepoInfo.org, mockRepo = mockOrgAndRepoInfo.repo;

        expect(sampleGithubServiceObj.gitUrl).toEqual(`https://api.github.com/repos/${mockOrg}/${mockRepo}`);

        let defaultOrg = 'hari-007', defaultRepo = 'node-jasmine-nyc-sample'; 
        let githubServiceObj2 = new GithubService();
        expect(githubServiceObj2.gitUrl).toEqual(`https://api.github.com/repos/${defaultOrg}/${defaultRepo}`);
    })

    it('Should provide github service obj with fetch method to call github', () => {
        expect(GithubService).toBeDefined;
        expect(typeof GithubService).toEqual('function');

        expect(sampleGithubServiceObj).not.toBeNull();
        expect(sampleGithubServiceObj.fetchRepoInfo).not.toBeNull();
        expect(typeof sampleGithubServiceObj.fetchRepoInfo).toEqual('function');
    });

    it('Should get generated github api url contained request option ', (done) => {

        spyOn(sampleGithubServiceObj, 'getRequestOptions').and.callThrough();
        spyOn(sampleGithubServiceObj, 'fetchRepoInfo').and.callThrough();
        
        sampleGithubServiceObj.fetchRepoInfo((err, response) => {
            if (err) {
                console.log('Something went wrong. Github returned error: ');
                done.fail(err);
            } else {
                expect(sampleGithubServiceObj.getRequestOptions).toHaveBeenCalled();
                done();
            }
        });
    });
})