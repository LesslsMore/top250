const fs = require('fs');
const cheerio = require('cheerio');

let top250 = []

for (let top = 25; top <=250; top += 25) {
    let file = `D:\\T\\Documents\\VSCode\\js\\media\\top250\\html\\douban-top${top}.html`
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    const movieList = $("#content > div > div.article > ol")
    const itemlist = $(movieList[0]).find('.item')
    for (let el of itemlist) {
        let num = $(el).find('em')[0].children[0].data
        let url = $(el).find('a')[0].attribs.href
        let title = $(el).find('.hd').find('.title')[0].children[0].data
        let year = $(el).find('.info p')[0].children[2].data.split('/')[0].trim()
        let rate = $(el).find('.rating_num')[0].children[0].data
        let vote = $(el).find('.star span:nth-child(4)').text()
        let img = $(el).find('img')[0].attribs.src
        
        console.log(el)
    
        var item = {
            num,
            title,
            year,
            img,
            rate,
            vote,
            url
        }
        top250.push(item)
    }
}

const csvWriter = require('csv-write-stream');

const writer = csvWriter({ headers: [
    'num',
    'title',
    'year',
    'img',
    'rate',
    'vote',
    'url'
] });

// writer.pipe(fs.createWriteStream('douban-top250.csv'));

// console.log(top250)

// top250.forEach((row) => {
//     console.log(row)
//     writer.write(row);
//   });
// writer.end();

fs.writeFile('douban-top250.json', JSON.stringify(top250), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });