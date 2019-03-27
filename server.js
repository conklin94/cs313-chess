require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const gameController = require("./controllers/gameController.js")
const commentController = require("./controllers/commentController.js")

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

app.get('/game', gameController.getGame);
app.post('/game', gameController.createGame);
app.get('/board', gameController.getBoard);
app.post('/board', gameController.updateBoard);
app.post('/comment', commentController.addComment);
app.get('/comment', commentController.getComments);
