const express = require('express')
const fs = require('fs')
const proc = require('child_process')
const app = express()

const users = fs.readFileSync('list_users.csv', 'utf8')

const array = users.split(/\r?\n|\r|\n/g).filter((p) => p.trim());;
array.shift();

var url = 'http://localhost:3000/';
var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
proc.exec(start + ' ' + url);

app.get('/', function (req, res) {
  res.sendFile('./index.html', {
    root: __dirname
  })
});


app.get('/check', function (req, res) {
  const name = req.query['userName'];
  let answer = null;
  if (array.includes(name)) {
    answer = `Пользователь ${name} есть`;
  } else {
    answer = `Пользователя ${name} нет`;
  }

  res.render('result.hbs', {
    answer: answer
  })
})
app.listen(3000, function () {
  console.log('Server started...')
  console.log('To stop the server and exit, press: Ctrl + C')
})
