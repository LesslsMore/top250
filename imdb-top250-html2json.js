const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('D:\\T\\Documents\\VSCode\\js\\media\\top250\\imdb-top250.html', 'utf8');
const $ = cheerio.load(html);
const movieList = $("#__next > main > div > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul")

$(movieList[0].children[0]).find('.ipc-title__text').text()
$(movieList[0].children[0]).find('.cli-title-metadata-item')
$(movieList[0].children[0]).find('.cli-title-metadata-item')[0].children[0].data
$(movieList[0].children[0]).find('.cli-title-metadata-item')[1].children[0].data

$(movieList[0].children[0]).find('.ipc-title-link-wrapper')[0].attribs.href.split('/')[2]


$(movieList[0].children[0]).find('.ipc-image')[0].attribs.src

const csvWriter = require('csv-write-stream');

const writer = csvWriter({ headers: [
    'num',
    'title',
    'id',
    'year',
    'time',
    'limit',
    'img',
    'rate',
    'vote'
] });

// writer.pipe(fs.createWriteStream('imdb-top250.csv'));
let top250 = []
movieList[0].children.forEach(element => {
    var img = $(element).find('.ipc-image')[0].attribs.src
    var num = $(element).find('.ipc-title__text').text().split('.')[0]
    var title = $(element).find('.ipc-title__text').text().split('.')[1].trim()
    var id = $(element).find('.ipc-title-link-wrapper')[0].attribs.href.split('/')[2]
    var meta = $(element).find('.cli-title-metadata-item')
    var rate = $(element).find('.ipc-rating-star--base')[0].children[1].data
    var vote = $(element).find('.ipc-rating-star--voteCount')[0].children[2].data
    
    var year = meta[0].children[0].data
    var time = meta[1].children[0].data
    var limit = ''
    if (meta.length === 3){
        limit = meta[2].children[0].data
    }
    var item = {
        num,
        title,
        id,
        year,
        time,
        limit,
        img,
        rate,
        vote
    }
    top250.push(item)
})
// console.log(top250)

// top250.forEach((row) => {
//     console.log(row)
//     writer.write(row);
//   });
// writer.end();

fs.writeFile('imdb-top250.json', JSON.stringify(top250), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
