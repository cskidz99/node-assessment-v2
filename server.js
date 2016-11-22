var express = require('express');
var bodyParser = require('body-parser');
var accounts = require('./accounts.json');
var _ = require('lodash');

var app = express();
app.use(bodyParser.json());

app.get('/api/accounts', function(req,res,next){
  // console.log(req.query.cardtype);
  if (req.query.cardtype){
    var result = accounts.filter(
      function (value){
        return (value.card_type === req.query.cardtype);
      }
    )
    res.status(200).json(result);
  } else if (req.query.firstname){
    var result = accounts.filter(
      function (value){
        return (value.first_name === req.query.firstname);
      }
    )
    res.status(200).json(result);
  } else if (req.query.lastname){
    var result = accounts.filter(
      function (value){
        return (value.last_name === req.query.lastname);
      }
    )
    res.status(200).json(result);
  } else if (req.query.balance){
    var result = accounts.filter(
      function (value){
        return (value.balance === req.query.balance);
      }
    )
    res.status(200).json(result);
  } else {
    res.status(200).json(accounts);
  }
});

app.get('/api/accounts/:accountId', function(req,res,next){
  var result = accounts.find(
    function (value){
      return (value.id == req.params.accountId)
    }
  );
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send('account could not be found');
  }
});

app.post('/api/accounts', function(req,res,next){
  req.body.id = accounts.length+1;
  req.body.approved_states = [req.body.add];
  accounts.push(req.body);
  res.status(200).json(req.body);
  // console.log(req.body);
});

app.post('/api/accounts/cardtype/:accountId', function(req,res,next){
  var result = accounts.find(
    function (value){
      return (value.id == req.params.accountId)
    }
  );
  if (result) {
    result.card_type = req.body.card_type;
    res.status(200).json(result);
  } else {
    res.status(404).json('account could not be found');
  }
});

app.post('/api/accounts/approvedstates/:accountId', function(req,res,next){
  var result = accounts.find(
    function (value){
      return (value.id == req.params.accountId)
    }
  );
  if (result) {
    result.approved_states.push(req.body.add);
    res.status(200).json(result);
  } else {
    res.status(404).json('account could not be found');
  }
});

app.delete('/api/accounts/approvedstates/:accountId', function(req,res,next){
  var id = +req.params.accountId;
  var deleteState = req.query.state;
  accounts.map(function(e, i) {
       if (e.id === id) {
           e.approved_states.splice(e.approved_states.indexOf(deleteState), 1);
           res.status(200).json(e.approved_states);
       }
   });
});

app.delete('/api/accounts/:accountId', function(req,res,next){
  var result = accounts.find(
    function (value){
      return (value.id == req.params.accountId)
    }
  );
  if (result) {
    // console.log(result.id);
    accounts.splice((parseInt(result.id) - 1),1);
    res.sendStatus(200);
    // next();
  } else {
    res.status(404).json('account could not be found');
  }
});

app.put('/api/accounts/:accountId', function(req,res,next){
  var id = Number(req.params.accountId);
  accounts.map(function(e,i){
    if(e.id === id){
      for(var key in req.body){
        e[key] = req.body[key];
      }
      res.status(200).json(e);
    }
  });
});




app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
});

module.exports = app;
