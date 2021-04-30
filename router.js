const express = require('express');
const sqlite3 = require('sqlite3').verbose();

let dbConnection = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

dbConnection.serialize(function() {
    dbConnection.run("CREATE TABLE groceries (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, item VARCHAR(255), quantity INTEGER, category VARCHAR(255))");
});

const router = express.Router()

router.get('/api/groceries', (req, res) => {
    dbConnection.all('SELECT * FROM groceries', (err, rows) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log(rows);
        res.send(rows); // send back an array of the rows
      }
    })
  });

// POST request that inserts a new grocery item into the database
router.post('/api/groceries', (req, res) => {
    const {item, quantity, category} = req.body; // create new veriables to store the req.body properties
    const query = `INSERT INTO groceries (item, quantity, category) VALUES(?, ?, ?)`; // using '?' auto-escapes the variables
    dbConnection.run(query, [item, quantity, category], (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('Results from database:', results);
        res.sendStatus(201);
      }
    });
  });

// POST request that search grocery item by category
router.post('/api/groceries/search', (req, res) => {
  const { category } = req.body; 
  const query = `SELECT * FROM groceries WHERE category=?`; 
  dbConnection.all(query, [category], (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('Search Results from database:', rows);
      res.send(rows);
    }
  });
});
  
// DELETE request that removes a given grocery item from the database
router.delete('/api/groceries', (req, res) => {
const {id, item} = req.body;
const query = `DELETE FROM groceries WHERE id=?`;
dbConnection.run(query, [id], (err, result) => {
    if (err) {
    console.log(`Error attempting to delete ${item} (id: ${id}) from the database.`);
    res.sendStatus(500);
    } else {
    console.log(`Successfully deleted ${item} (id: ${id}) from the database.`);
    res.sendStatus(200);
    }
})
});


// PUT request that updates a given grocery item in the database
router.put('/api/groceries', (req, res) => {
const {id, item, quantity, category} = req.body;
const query = `UPDATE groceries SET item=?, quantity=?, category=? WHERE id=?`;
dbConnection.run(query, [item, quantity, category, id], (err, result) => {
    if(err) {
    console.log(`Error attempting to update ${item} (id: ${id}) from the database.`);
    } else {
    console.log(`Successfully updated ${item} (id: ${id}) in the database.`);
    res.sendStatus(201);
    }
})
});

  
module.exports = router