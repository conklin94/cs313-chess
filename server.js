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
app.get('/board', getBoard);
app.post('/board', updateBoard);

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
          res.render("pages/game", game_params);
          console.log(game_params);
        }
        else {
          console.log("Undefined game code");
          const params = {msg: "Error: the game code you entered does not exist"};
          res.render("pages/index", params);
        }
      }
  });
}

function createGame (req, res) {
  console.log("game_code: " + req.body.game_code);
  var game_code = req.body.game_code;
  var board = "rnbqkbnr/pppppppp/00000000/00000000/00000000/00000000/PPPPPPPP/"
            + "RNBQKBNR";
  pool.query('INSERT INTO game (game_code, board) VALUES ($1, $2)',
             [game_code, board], (err, result) => {
      if (err) {
        console.log("This id already exists");
        const params = {msg: "Error: game code already exists"};
        res.render("pages/index", params);
      }
      else {
        res.writeHead(302, { 'Location': `/game?game_code=${game_code}`});
        res.end();
      }
  });
}

function updateBoard (req, res) {
  var game_code = req.body.game_code;
  var board = req.body.board;
  var captured_by_white = req.body.captured_by_white;
  var captured_by_black = req.body.captured_by_black;
  console.log("New board: " + req.body.board);
  pool.query('UPDATE game SET board = $1, captured_by_white = $2, captured_by_black = $3 WHERE game_code = $4',
             [board, captured_by_white, captured_by_black, game_code], (err, result) => {
      if (err) {
        res.send("Unable to update board");
      }
      else {
        res.send("Success");
      }
  });
}

function getBoard (req, res) {
  var game_code = req.query.game_code;
  console.log("game_code: " + req.query.game_code);
  const id = req.query.id;
  pool.query('SELECT game_id, game_code, board, captured_by_white, captured_by_black FROM game WHERE game_code = $1',
             [game_code], (err, result) => {
      if (err) {
        res.send("Unable to get board");
      }
      else {
        const game_params = result.rows[0];
          res.send(game_params);
      }
  });

}
