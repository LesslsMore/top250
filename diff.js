const fs = require('fs');
const csv = require('csv-parser');
const request = require('request');

const results = [];
let imdb_id_set = new Set()

const data = fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\json\\imdb-top250.json', 'utf8');
const obj = JSON.parse(data);
let imdb = []
let imdb_map = new Map()
obj.forEach(item => {
    // imdb_id = item.id
    // let item_k = {}
    // item_k[imdb_id] = item
    // imdb.push(item_k)
    imdb_map.set(item.id, item)
    imdb_id_set.add(item.id)
})
// console.log(imdb);

// const data_douban = fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\douban2imdb.json', 'utf8');
// const douban = JSON.parse(data_douban);
// douban.forEach(item => {
//     // console.log(item.id);
//     if (imdb_id_set.has(item.id)){
//         // console.log(imdb_map.get(item.id))
//         item.imdb = imdb_map.get(item.id).num
//         console.log(item);
//     }
// })

const data_douban = fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\json\\douban-top250.json', 'utf8');
const douban = JSON.parse(data_douban);
douban.forEach(item => {
    // console.log(item.id);
    if (imdb_id_set.has(item.id)){
        // console.log(imdb_map.get(item.id))
        item.imdb = imdb_map.get(item.id).num
        console.log(item);
    }
})

fs.writeFile('./douban-top250.json', JSON.stringify(douban), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });


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

// fs.writeFile('douban2imdb.json', JSON.stringify(results_douban), (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });