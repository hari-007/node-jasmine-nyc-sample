import http from 'http';
import url from 'url';
import GithubService  from './services/github-service';


let requestListener = (req, res) => {
  
  var parsedRequestUrl = url.parse(req.url, true);
  if (parsedRequestUrl.pathname ==='/fetch-repo-info') {
    const queryParamArgs = parsedRequestUrl.query || {};

    let githubServiceObj = new GithubService(queryParamArgs.org, queryParamArgs.repo);

    githubServiceObj.fetchRepoInfo((error, response) => {
      res.writeHead(200, {'Content-Type': 'application/json'}); // write header for response

      if (!!error) {
        res.write(error); // write success response
      } else {
        res.write(response); // write error
      }
      
      res.end(); //end the response
   });
 } else {
    res.writeHead(200, {'Content-Type': 'application/html'}); // write header for response
    res.write(JSON.stringify({'message': 'Hello world'})); // write response
    res.end(); //end the response
 }
}

let server = http.createServer(requestListener);
const SERVER_PORT = process.env.PORT || 3000
server.listen(SERVER_PORT, () => { 
  console.log("App Started and listening on port %d", SERVER_PORT);
});
