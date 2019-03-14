require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.listen(port, function() {
    console.log("Listening on port number " + port);
});

app.get('/', (req, res) => res.render('pages/index'));

app.get('/game', getGame);
app.post('/game', createGame);

function getGame (req, res) {
  var game_code = req.query.game_code;
  console.log("game_code: " + req.query.game_code);
  const id = req.query.id;
  pool.query('SELECT game_id, game_code, board, captured_by_white, captured_by_black FROM game WHERE game_code = $1',
             [game_code], (err, result) => {
      if (err) {
        res.status(500).json({success: false, data: error});
      }
      else {
        const game_params = result.rows[0];
        if (typeof game_params !== 'undefined') {
          console.log(game_params);
          res.status(200).json(game_params);
        }
        else {
          console.log("twas undefined");
          res.render("pages/index");
        }
      }
  });
}

function createGame (req, res) {
  console.log("game_code: " + req.body.game_code);
}
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
