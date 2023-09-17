var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://www.imdb.com/chart/top/?ref_=nv_mv_250',
  'headers': {
    'Cookie': 'session-id=141-2717540-1650861; session-id-time=2082787201l'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
