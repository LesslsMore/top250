const fs = require('fs');



const data_douban = fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\json\\douban-top250.json', 'utf8');
const douban = JSON.parse(data_douban);
// douban.forEach(item => {
//     console.log(item.num);
// })
let douban_json = []
const douban2imdb = fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\json\\douban2imdb.json', 'utf8');
const douban2imdb_json = JSON.parse(douban2imdb);
douban2imdb_json.forEach(item => {
    let num = item.file.split('-')[1].split('.')[0]
    if (num == douban[num - 1].num){
        douban[num - 1].id = item.id
        douban[num - 1].file = item.file
        douban_json.push(douban[num - 1])
    }
    console.log();
})

fs.writeFile('./json/douban-top250.json', JSON.stringify(douban_json), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });