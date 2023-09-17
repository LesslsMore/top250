const fs = require('fs');
const csv = require('csv-parser');
const request = require('request');

const results = [];

fs.createReadStream('D:\\T\\Documents\\VSCode\\js\\media\\top250\\douban-top250.csv')
  .pipe(csv())
  .on('data', (data) => {
    results.push(data);
    // console.log(data.url)
  })
  .on('end', () => {
    // console.log(results);
    results.forEach(el => {
      
      if (el.num == 16){
        console.log(el);
        request(el.url, (error, response, html) => {
          if (!error && response.statusCode === 200) {
            console.log(el.num)
            fs.writeFile(`douban-${el.num}.html`, html, (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
            });
          }
        })
      }
    })

  });

// console.log(results)

// fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\imdb-top250.csv')
//   .toString()
//   .split('\n')
//   .forEach((line) => {
//     if (line) {
//         // num,title,id,year,time,limit,img,rate,vote
//       results.push({
//         'num': line.split(',')[0],
//         'title': line.split(',')[1],
//         'id': line.split(',')[2],
//         'year': line.split(',')[3],
//         'time': line.split(',')[4],
//         'limit': line.split(',')[5],
//         'img': line.split(',')[6],
//         'rate': line.split(',')[7],
//         'vote': line.split(',')[8],
//       });
//       imdb.add(line.split(',')[2])
//     }
//   });
// console.log(imdb);

// const results_douban = [];
// fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\douban2imdb.csv')
//   .toString()
//   .split('\n')
//   .forEach((line) => {
//     if (line) {
//         // id,file,url
//         results_douban.push({
//         'id': line.split(',')[0],
//         'file': line.split(',')[1],
//         'url': line.split(',')[2],
//       });
//     }
//   });
// console.log(results_douban);