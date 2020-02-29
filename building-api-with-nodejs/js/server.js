const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/signup', function(req, res) {  

  var options = {
    'method': 'POST',
    'url': 'http://localhost:3001/users',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{
      "user":[{
        "id":"null",
        "username":req.body.j_username,
        "password":req.body.j_password,
        "passwordmd5":"null",
        "ud_tb":0,
        "idea":0,
        "secretquestions":"секретный вопрос",
        "answer":"ответ",
        "enabled":0
      }]},{
        "userInfo":[{
          "id":"null",
          "username":req.body.j_username,
          "name":req.body.nameUser,
          "surname":req.body.surName,
          "patronymic":req.body.patronymic,
          "birthday":req.body.birthday,
          "address":"null",
          "branch":0,
          "department":0,
          "nti":0,
          "line":0,
          "region":0,
          "danger":0,
          "phone":req.body.phone,
          "email":req.body.email,
          "education":"null"
        }]}])
  };
  request(options, function (error, response) { 
    // if (error) throw new Error(error);
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    console.log(response.body);
  });

  res.send(req.body);
})

app.use(express.static(__dirname + "/js/signup.html"));
app.use("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.listen(3000, function() {
    console.log("Свервер запущен. Порт: 3000");
})

