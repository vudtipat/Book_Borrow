const express = require('express')
const mysql = require('mysql')
const db = mysql.createConnection({  
  host     : 'localhost', 
  user     : 'root',
  password : '12345678',
  database : 'book'
})
db.connect() 
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

'use strict';

app.post('/login', (req, res) => {
  let sql = 'SELECT * FROM account Where username = "'+ req.body.user+'"'
  db.query(sql,(err,results) => { 
    if(err) throw err 
    if(results.length > 0)
    {
      if(req.body.user == results[0].UserName && req.body.pass == results[0].Password)
      {
        res.json({ status: 'Pass' });
      }
      else{
        res.json({ status: 'Fail' });
      } 
    }
    else
    {
      res.json({ status: 'Fail' });
    }
  })
  
})

app.post('/register',(req, res) => {
  var sql = "INSERT INTO account VALUES ('"+req.body.user+"','"+req.body.pass+"','"+req.body.email+"','"+req.body.id+"','"+req.body.birthday+"')";
  let sql1 = 'SELECT * FROM account Where username = "'+ req.body.user+'"'
  db.query(sql1,(err,results) => { 
    if(err) throw err 
    if(results.length == 0)
    {
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json({ status: 'Pass' });
      });
    }
    else
    {
      res.json({ status: 'Fail' });
    }
  })
})

app.post('/forgetpass', (req, res) => {
  let sql = 'SELECT * FROM account Where username = "'+ req.body.user+'"'
  db.query(sql,(err,results) => { 
    if(err) throw err 
    if(results.length == 1)
    {
      if(req.body.user == results[0].UserName && req.body.email == results[0].Email)
      {
        let sql1 = 'UPDATE account SET Password = "'+ req.body.pass+'" where username = "'+req.body.user+'"'
        db.query(sql1,(err,results) => { 
          if(err) throw err 
        })
        res.json({ status: 'Pass' });
      }
      else{
        res.json({ status: 'Fail' });
      } 
    }
    else
    {
      res.json({ status: 'Fail' });
    }
  })
})

app.post('/changepass', (req, res) => {
  let sql = 'SELECT * FROM account Where username = "'+ req.body.user+'"'
  db.query(sql,(err,results) => { 
    if(err) throw err 
    if(req.body.pass == results[0].Password)
    {
      let sql1 = 'UPDATE account SET Password = "'+ req.body.newpass+'" where username = "'+req.body.user+'"'
      db.query(sql1,(err,results) => { 
        if(err) throw err 
      })
      res.json({ status: 'Pass' });
    }
    else{
      res.json({ status: 'Fail' });
    } 
  })
})

app.get('/allbook', (req, res) => {
  let sql = 'SELECT * FROM Book'
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json(results);
  })
})

app.get('/Search', (req, res) => {
  let sql = 'SELECT * FROM book Where Name like "%'+ req.query.search+'%" or Author like "%'+req.query.search+'%" or Year like "%'+req.query.search+'"';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json(results);
  })
})

app.get('/getBookmard', (req, res) => {
  let sql = 'SELECT * FROM bookmark as b,book as bo Where b.bookid = bo.bookid and b.username="'+req.query.user+'"';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json(results);
  })
})

app.get('/getList', (req, res) => {
  let sql = 'SELECT * FROM List as b,book as bo Where b.bookid = bo.bookid and b.username="'+req.query.user+'"';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json(results);
  })
})

app.get('/getAllList', (req, res) => {
  let sql = 'SELECT * FROM Borrow as b,book as bo Where b.bookid = bo.bookid ';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json(results);
  })
})

app.get('/History', (req, res) => {
  let sql = 'SELECT * FROM Borrow as b,book as bo Where b.bookid = bo.bookid and b.username="'+req.query.user+'"';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json(results);
  })
})

app.delete('/removeBookmark', (req, res) => {
  let sql = 'DELETE FROM bookmark Where bookid="'+req.query.id+'" and username="'+req.query.user+'"';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json({ status: 'Pass' });
  })
})

app.delete('/removeList', (req, res) => {
  let sql = 'DELETE FROM List Where bookid="'+req.query.id+'" and username="'+req.query.user+'"';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json({ status: 'Pass' });
  })
})

app.delete('/Delete', (req, res) => {
  let sql = 'DELETE FROM Book Where bookid="'+req.query.id+'"';
  db.query(sql,(err,results) => { 
    if(err) throw err 
    res.json({ status: 'Pass' });
  })
})

app.post('/Addbookmark',(req, res) => {
  var sql = "INSERT INTO Bookmark VALUES ('"+req.body.user+"','"+req.body.id+"')";
  let sql1 = 'SELECT * FROM Bookmark Where BookID = "'+ req.body.id+'" and username = "'+req.body.user+'"';
  db.query(sql1,(err,results) => { 
    if(err) throw err 
    if(results.length == 0)
    {
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json({ status: 'Pass' });
      });
    }
    else
    {
      res.json({ status: 'Fail' });
    }
  })
})

app.post('/updateone',(req, res) => {
  var sql = "update borrow set status = 1 where BookID = "+req.body.ID+" and username = '"+req.body.user+"'";
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
})

app.post('/updatetwo',(req, res) => {
  var sql = "update borrow set status = 2 where BookID = "+req.body.ID+" and username = '"+req.body.user+"'";
  db.query(sql, function (err, result) {
    if (err) throw err;
    sql = "update book set stock = "+(req.body.stock + 1)+" where BookID = "+req.body.ID;
    db.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
})

app.post('/AddList',(req, res) => {
  var sql = "INSERT INTO List VALUES ('"+req.body.user+"','"+req.body.id+"')";
  var sql1 = 'SELECT * FROM List Where BookID = "'+ req.body.id+'" and username = "'+req.body.user+'"';
  var sql2 = 'SELECT * FROM List Where username = "'+req.body.user+'"';
  db.query(sql1,(err,results) => { 
    if(err) throw err 
    if(results.length == 0)
    {
      db.query(sql2, function (err, result) {
        if (err) throw err;
        if(result.length <5)
        {
          db.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ status: 'Pass' });
          });
        }
        else
        {
          res.json({ status: 'Full' });
        }
      }); 
    }
    else
    {
      res.json({ status: 'Fail' });
    }
  })
})

app.post('/Addbook',(req, res) => {
  var sql = "INSERT INTO Book(Name,Author,Year,Url,Stock) VALUES ('"+req.body.name+"','"+req.body.author+"','"+req.body.year+"','"+req.body.url+"',"+req.body.stock+")";
  let sql1 = 'SELECT * FROM book Where Name = "'+ req.body.name+'"'
  db.query(sql1,(err,results) => { 
    if(err) throw err 
    if(results.length == 0)
    {
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json({ status: 'Pass' });
      });
    }
    else
    {
      res.json({ status: 'Fail' });
    }
  })
})

app.post('/Borrow',(req, res) => {
  var data = req.body.data;
  var user = req.query.user;
  var start = req.body.start;
  var end = req.body.end;
  var stock;
  var sql;
  data.forEach( element => {
    sql = "SELECT stock from book where BookID = '"+element.BookID+"'";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if(result[0].stock > 0)
      {
        stock = result[0].stock;
        sql = sql = "SELECT * from borrow where BookID = '"+element.BookID+"' and username = '"+user+"' and status < 2";
        db.query(sql, function (err, result) {
          if (err) throw err;
          if(result.length == 0)
          {
            sql = "update book set stock = "+parseInt(stock-1)+" where BookID = "+element.BookID;
            db.query(sql, function (err, result) {
              if (err) throw err;
              sql = "INSERT INTO borrow VALUES ('"+user+"','"+element.BookID+"','"+start+"','"+end+"',0)";
              db.query(sql, function (err, result) {
                if (err) throw err;
                sql = sql = 'DELETE FROM List Where bookid="'+element.BookID+'" and username="'+user+'"';
                db.query(sql, function (err, result) {
                  if (err) throw err;
                });
              });
            });
          }
          else
          {
            
          }
        });
      }
    });
  }
  );
})

app.listen(9000, () => {
  console.log('Start server at port 9000.')
})