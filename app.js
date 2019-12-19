import http from 'http';
import url from 'url';
import request from 'request-promise-native';

let performRequestTimeAnalysis = (requestUrlQueryParams, mainCallback) => {

  const ORG = requestUrlQueryParams.org || 'hari-007';
  const REPO = requestUrlQueryParams.repo || 'node-jasmine-nyc-sample';
  const URL = `https://api.github.com/repos/${ORG}/${REPO}`;

  let options = {
    url: URL,
    headers: {
      'User-Agent': 'request'
    },
    time: true,
    resolveWithFullResponse: true
  };

  request(options).then(response => {
    mainCallback(null, response.body);
  }).catch(err => {
      let error = {};
      try { error = JSON.parse(err.error); error['statusCode']= err.statusCode; } 
      catch { error = { message: 'Something went wrong', statusCode: err.statusCode || 400}}
      mainCallback(JSON.stringify({error}), null);
  }); 
}

let requestListener = (req, res) => {
  
  var parsedRequestUrl = url.parse(req.url, true);
  if (parsedRequestUrl.pathname ==='/fetch-repo-info') {
    performRequestTimeAnalysis(parsedRequestUrl.query, (error, response) => {
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
