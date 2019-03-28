const gameModel = require("../models/gameModel.js")

function getGame (req, res) {
  var game_code = req.query.game_code;
  console.log("game_code: " + req.query.game_code);
  gameModel.selectGame(game_code, function (err, data) {
    if (err) {
      const params = {msg: "Error: unable to join game"};
      res.render("pages/index", params);
    }
    else {
      if (typeof data !== 'undefined') {
        res.render("pages/game", data);
        console.log(data);
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
  gameModel.insertGame(game_code, board, function (err) {
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
  console.log("New board: " + board);
  gameModel.updateGame(game_code, board, captured_by_white, captured_by_black, function (err) {
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
  gameModel.selectGame(game_code, function (err, data) {
      if (err) {
        res.send("Unable to get board");
      }
      else {
        res.send(data);
      }
  });
}

function getCount (req, res) {
  var game_code = req.query.game_code;
  gameModel.selectCount(game_code, function (err, data) {
      if (err) {
        res.send({err: err});
      }
      else {
        res.send(data);
      }
  });
}

module.exports = {
  getGame: getGame,
  createGame: createGame,
  updateBoard: updateBoard,
  getBoard: getBoard,
  getCount: getCount
};
