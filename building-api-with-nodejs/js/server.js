const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var signup = [
  {
    id: 1,
    name: 'aaa'
  }, {
    id: 2,
    name: 'bbb'
  }
];

app.post('/signup', function(req, res) {
  console.log(req.body);
  res.send("post data");
})

app.use(express.static(__dirname + "/js/signup.html"));
app.use("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.listen(3000, function() {
    console.log("API app started. listen port 3000...");
})
var options = {
  'method': 'POST',
  'url': 'http://localhost:9000/user/register',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"user":{"id":null,"username":"petya","password":"123","passwordmd5":null,"ud_tb":0,"idea":0,"secretquestions":"зачем усы сбрил, дурик?","answer":"у кого?","enabled":1},"userInfo":{"id":null,"username":"petya","name":"Петя","surname":"Пятачков","patronymic":"Мразь","birthday":"1990-01-01","address":"улица пушкина дом колотушкина","branch":1,"department":1,"nti":1,"line":1,"region":1,"danger":1,"phone":"88005553535","email":"programmistov@net","education":"ученный 3 класса образования"}})

};
