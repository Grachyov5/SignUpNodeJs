const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/.."));
app.set("view engine", "hbs");

app.post('/changePassword', function (req, res) {
  // if (String(req.body.j_password) !== String(req.body.confirm_password)) {
  //   return res.send("<div style='display: flex;flex-direction: column;color: rgba(0,0,0,.7);'><h1 style='text-align: center;padding-top: 200px;margin-bottom: -20px;'>"+
  //   "Пароли не совпадают!</h1></br><a style='text-align: center;text-decoration: none;outline: none;color: rgba(0,0,0,.7);' "+
  //   " href='/forgot'><h2>Пробовать снова</h2></a></div>");
  // }
  var options = {
    'method': 'POST',
    'url': encodeURI('http://localhost:9000/user/resetpass?username=' + req.body.j_username + '&answer=' + req.body.answer + '&newpass=' + req.body.j_password),
    'headers': {
      'Content-Type': 'application/json'
    }
  }; 
  request(options, function (error, response) { 
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    } else {
      console.log(response.body);   
      if (String(response.headers['content-type']) === 'application/json;charset=UTF-8') {
        res.send("<div style='display: flex;flex-direction: column;color: rgba(0,0,0,.7);'><h1 style='text-align: center;padding-top: 200px;margin-bottom: -20px;'>"+
                "Ошибка сброса пароля!</h1></br><a style='text-align: center;text-decoration: none;outline: none;color: rgba(0,0,0,.7);' "+
                " href='/forgot'><h2>Пробовать снова</h2></a></div>");
      } else {
        res.send("<div style='display: flex;flex-direction: column;color: rgba(0,0,0,.7);'><h1 style='text-align: center;padding-top: 200px;margin-bottom: -20px;'>"+
                "Пароль успешно сброшен!</h1></br><a style='text-align: center;text-decoration: none;outline: none;color: rgba(0,0,0,.7);' "+
                " href='http://10.64.2.197:53270/ecplibjsf/'><h2>Перейти в ИС - ЭЦБ</h2></a></div>");
      }                  
    }    
  });
})

app.use('/checkUser', function (req, res) {
  res.sendFile(__dirname + "/checkUser.html");
})

app.post('/forgot', function (req, res) {
  var options = {
    'method': 'POST',
    'url': 'http://localhost:9000/user/secretquestion?username=' + req.body.j_username,
    'headers': {
      'Content-Type': 'application/json'
    }
  };

  request(options, function (error, response) { 
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    } else {
      // console.log(response.headers['content-type']); 
      if (String(response.headers['content-type']) === 'application/json;charset=UTF-8') {
        res.send("<div style='display: flex;flex-direction: column;color: rgba(0,0,0,.7);'><h1 style='text-align: center;padding-top: 200px;margin-bottom: -20px;'>"+
                "Пользователь не найден!</h1></br><a style='text-align: center;text-decoration: none;outline: none;color: rgba(0,0,0,.7);' "+
                " href='/checkUser'><h2>Пробовать снова</h2></a></div>");
      } else {
        res.render(__dirname + "/forgot.hbs", {
          username: req.body.j_username,
          secretQuestion : response.body
        });
      }                  
    }    
  });
})

app.post('/signup', function(req, res) { 
  // if (String(req.body.j_password) !== String(req.body.confirm_password)) {
  //   return res.send("<div style='display: flex;flex-direction: column;color: rgba(0,0,0,.7);'><h1 style='text-align: center;padding-top: 200px;margin-bottom: -20px;'>"+
  //   "Пароли не совпадают!</h1></br><a style='text-align: center;text-decoration: none;outline: none;color: rgba(0,0,0,.7);' "+
  //   " href='/signup'><h2>Пробовать снова</h2></a></div>");
  // }
  var options = {
    'method': 'POST',
    'url': 'http://localhost:9000/user/register',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "user":{
        "id":null,
        "username":req.body.j_username,
        "password":req.body.j_password,
        "passwordmd5":null,
        "ud_tb":0,
        "idea":0,
        "secretquestions":req.body.secretQuestion,
        "answer":req.body.answer,
        "enabled":0
      },
      "userInfo":{
        "id":null,
        "username":req.body.j_username,
        "name":req.body.nameUser,
        "surname":req.body.surName,
        "patronymic":req.body.patronymic,
        "birthday":req.body.birthday,
        "address":null,
        "branch":0,
        "department":0,
        "nti":0,
        "line":0,
        "region":0,
        "danger":0,
        "phone":req.body.phone,
        "email":req.body.email,
        "education":null
      }
    })
  };
  
  request(options, function (error, response) { 
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    } else {
      res.send("<div style='display: flex;flex-direction: column;color: rgba(0,0,0,.7);'><h1 style='text-align: center;padding-top: 200px;margin-bottom: -20px;'>"+
        "Успешная регистрация!</h1></br><a style='text-align: center;text-decoration: none;outline: none;color: rgba(0,0,0,.7);' "+
        " href='http://10.64.2.197:53270/ecplibjsf/'><h2>Перейти на сайт ИС - ЭЦБ</h2></a></div>");
    }   
  });    
})

app.use('/', function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.listen(3000, function() {
    console.log("Свервер запущен. Порт: 3000");
})

