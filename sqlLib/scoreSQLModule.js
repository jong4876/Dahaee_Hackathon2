var deasync = require('deasync');
var errorHandlingModule = require('../errorHandlingModule.js');

module.exports.getInfo = function(conn, contestID) {
  var sql = 'select * from score order by StudentID';
  var results = new Object();
  conn.query(sql, function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.get100Info = function(conn, ContestID, ProblemNum) { //  ContestID, ProblemNum 백점인 사람 수
  var sql = 'select * from student where ID in (select StudentID from score where ContestID = ? and ProblemNum = ? and Score = 100)';
  var results = new Object();
  conn.query(sql, [ContestID, ProblemNum], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(100);
  }
  return results;
}


module.exports.getNot100Info = function(conn, ContestID, ProblemNum) { //  ContestID, ProblemNum 백점이 아닌 사람 수
  var sql = 'select * from student where ID in (select StudentID from score where ContestID = ? and ProblemNum = ? and Score != 100)';
  var results = new Object();
  conn.query(sql, [ContestID, ProblemNum], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(100);
  }
  return results;
}

module.exports.get100Count = function(conn, ContestID, ProblemNum) { //  ContestID, ProblemNum 백점인 사람 수
  var sql = 'select ProblemNum, count(*) as count from score group by ProblemNum';
  var results = new Object();
  conn.query(sql, function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.getNot100Count = function(conn) { //  ContestID, ProblemNum 백점인 사람 수
  var sql = 'select ProblemNum, count(*) as count from score where Score = 100 group by ProblemNum';
  var results = new Object();
  conn.query(sql, function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}
