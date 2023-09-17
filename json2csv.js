const fs = require('fs');
const csvWriter = require('csv-write-stream');

file = 'douban-top250'

function json2csv(file) {
  csv_path = `D:\\T\\Documents\\VSCode\\js\\media\\top250\\${file}.csv`
  json_path = `D:\\T\\Documents\\VSCode\\js\\media\\top250\\${file}.json`

  const writer = csvWriter();
  writer.pipe(fs.createWriteStream(csv_path));
  const data_douban = fs.readFileSync(json_path, 'utf8');
  const douban = JSON.parse(data_douban);
  douban.forEach(item => {
    writer.write(item);
  })

  writer.end();
}

json2csv('imdb-top250')