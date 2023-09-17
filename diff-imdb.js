const fs = require('fs');

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

    item.url = 'https://www.imdb.com/title/' + item.id
})
// console.log(imdb);

const data_douban = fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\json\\douban-top250.json', 'utf8');
const douban = JSON.parse(data_douban);
douban.forEach(item => {
    
    // console.log(item.id);
    if (imdb_id_set.has(item.id)){
        imdb_map.get(item.id).douban = item.num
        
        // // console.log(imdb_map.get(item.id))
        // item.imdb = imdb_map.get(item.id).num
        let idx = imdb_map.get(item.id).num
        obj[parseInt(idx) - 1] = imdb_map.get(item.id)
        // console.log(imdb_map.get(item.id));
    }

    
})



fs.writeFile('./imdb-top250.json', JSON.stringify(obj), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });




// fs.writeFile('douban2imdb.json', JSON.stringify(results_douban), (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });