# 爬取 imdb、douban top 250 数据
```
https://www.imdb.com/chart/top/
https://movie.douban.com/top250
```
css 选择器 

用浏览器审视自动复制路径

调试控制台

首先保存 html 文件到本地方便调试

用 json 保存数据，方便读取

二次转化为 csv

const cheerio = require('cheerio');
### todo
用数据库联合查询 mongodb