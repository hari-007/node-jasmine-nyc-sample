import http from 'http';
import assert from 'assert';
import server from '../app';

describe('Node server test suit', () => {
  it('should return success status of 200', done => {
    http.get('http://127.0.0.1:3000', res => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it('should return github response for requested repository information', done => {
    http.get('http://127.0.0.1:3000/fetch-repo-info?org=istanbuljs&repo=nyc', res => {
      expect(res.statusCode).toEqual(200);
      
      let responseBodyContent = '';
      
      res.setEncoding('utf8');
      res.on('data', (chunk) => responseBodyContent += chunk);
      res.on('end', () => {
        let data = {};

        try { data = JSON.parse(responseBodyContent); } catch(err) { }
        expect(data).not.toBeNull();
        expect(data.name).toEqual('nyc');
        expect(data.full_name).toEqual('istanbuljs/nyc');
        done();
      });
    }).on('error', function(err) {
      done.fail(err)
    });
  });
  
  it('should return github response of default repository information', done => {
    http.get('http://127.0.0.1:3000/fetch-repo-info', res => {
      
      expect(res.statusCode).toEqual(200);
      
      let responseBodyContent = '';
      
      res.setEncoding('utf8');
      res.on('data', (chunk) => responseBodyContent += chunk);
      res.on('end', () => {
        let data = {};

        try { data = JSON.parse(responseBodyContent); } catch(err) { }
        expect(data).not.toBeNull();
        expect(data.name).toEqual('node-jasmine-nyc-sample');
        expect(data.full_name).toEqual('hari-007/node-jasmine-nyc-sample');
        done();
      });
    }).on('error', function(err) {
      done.fail(err)
    });
  });
});