const fs = require('fs');
const cheerio = require('cheerio');

let top250 = []

for (let i = 1; i <=250; i += 1) {
    let file = `D:\\T\\Documents\\VSCode\\js\\media\\top250\\douban\\douban-${i}.html`
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    const info = $("#info")
    // 'https://movie.douban.com/subject/1292052/photos?type=R'
    const url = $(".nbgnbg")[0].attribs.href.split('/p')[0]
    let id = ''
    try{
        let idx = info[0].children.length
        id = info[0].children[idx - 3].data.trim()
        if (!id.startsWith('tt')){
            id = ''
        }
        if (id === ''){
            id = info[0].children[idx - 7].data.trim()
            if (!id.startsWith('tt')){
                id = ''
            }
        }
    }catch(e) {
        console.log(e)
    }

    console.log(i)
    console.log(id)
    
    var item = {
        id,
        file,
        url,
    }
    top250.push(item)
}

// fs.writeFile('douban2imdb.json', JSON.stringify(top250), (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });

const csvWriter = require('csv-write-stream');

const writer = csvWriter({ headers: [
    'id',
    'file',
    'url',
] });

writer.pipe(fs.createWriteStream('douban2imdb.csv'));

// console.log(top250)

top250.forEach((row) => {
    // console.log(row)
    writer.write(row);
  });
writer.end();