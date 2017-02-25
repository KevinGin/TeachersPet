const Test = require('./../../../db/test/testController.js');
const AnswerKey = require('./../../../db/key/keyController.js');
const Classes = require('./../../../db/classes/classController.js');
const Scanner = require('./pythontonode.js').Scanner;
// const test = require('./test.js').test;
  
const getTeacherData = function(req, res) {
  var data = {};
  AnswerKey.getAllAnswerKeys(function(err, fetchedKeys) {
  	if(err) {
  	  res.status(500);
  	  res.end();
  	} else {
  	  data['keys'] = fetchedKeys;
  	  Test.getAllStudentAnswers(function(err, fetchedTests) {
  	  	if(err) {
  	  	  res.status(500);
  	  	  res.end();
  	  	} else {
  	  	  data['studenttests'] = fetchedTests;
  	  	  res.status(200).send(data);
  	  	  res.end();
  	  	}
  	  });
  	}
  });
  res.status(200).send(data);
};

const addAnswerKey = function(req, res) {
  let keyUpload = req.body;
  Scanner(keyUpload, 'key', function(err, answerKey) {
  	if(err) {
      console.log('ERROR');
  		res.status(500);
  		res.end();
  	} else {
  		res.status(200).send(answerKey);
  		res.end();
  	}
  });

  // test(keyUpload, 'key', function(err, answerKey) {
  //  if(err) {
  //    res.status(500);
  //    res.end();
  //  } else {
  //    res.status(200).send(answerKey);
  //    res.end();
  //  }
  // });
};

const addClass = function(req, res) {
  let classInfo = req.body;
  console.log(classInfo);
  Classes.addClass(classInfo, function(err, newClass) {
    if (err) {
      res.status(500).send(err);
      res.end();
    } else {
      res.status(200).send(newClass);
      res.end();
    }
  })
};

module.exports = {
  'getTeacherData': getTeacherData,
  'addAnswerKey': addAnswerKey,
  'addClass': addClass
}