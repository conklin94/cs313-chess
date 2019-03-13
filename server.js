require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.listen(port, function() {
    console.log("Listening on port number " + port);
});

app.get('/', (req, res) => res.render('pages/index'));

/*app.get("/getPerson", function (req, res){
    const id = req.query.id;
    pool.query('SELECT * FROM person WHERE person_id = $1', [id], (err, result) => {
        if (err) {
          res.status(500).json({success: false, data: error});
        }
        else {
          const person = result.rows[0];
          console.log(person);
			    res.status(200).json(person);
        }
    });
});*/
