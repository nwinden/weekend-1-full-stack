var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function(req, res) {

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM employees ORDER BY id ASC',
      function(err, result) {
        done();

        if (err) {
          res.sendStatus(500);
        }

        res.send(result.rows);

      }
    );
  });
});

router.post('/', function(req, res) {

  var employee = req.body;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query( 'INSERT INTO employees (first_name, last_name, id_number, job_title, salary, active_status)' +
                  'values($1, $2, $3, $4, $5, $6)', [employee.first_name, employee.last_name, employee.id_number, employee.job_title, employee.salary, employee.active_status],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.sendStatus(201);
                  });
  });
});

router.put('/', function(req, res) {

  var employee = req.body;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query( 'UPDATE employees SET active_status = $1 WHERE employees.id = $2',
                  [employee.active_status, employee.id],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                    }

                    res.sendStatus(201);
                  });
  });
});




module.exports = router;
