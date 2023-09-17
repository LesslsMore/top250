const request = require('request');
const fs = require('fs');

const url = 'https://www.imdb.com/chart/top';

request(url, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    fs.writeFile('imdb-top250.html', html, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
});