const commentModel = require("../models/commentModel.js")

function addComment (req, res) {
  var game_id = req.body.game_id;
  var comments = req.body.comments;
  var time = Date.now();
  console.log("game_id: " + game_id);
  console.log("comments: " + comments);
  console.log("date: " + time);
  commentModel.insertComment(game_id, comments, time, function (err) {
    if (err) {
      const params = {success: false, err: err};
      console.log(params);
      res.send(params);
    }
    else {
      const params = {success: true};
      console.log(params);
      res.send(params);
    }
  });
}

function getComments (req, res) {
  var game_id = req.query.game_id;
  console.log("game_id: " + game_id);
  commentModel.selectComments(game_id, function (err, data) {
    if (err) {
      const params = {success: false, err: err};
      console.log(params);
      res.send(params);
    }
    else {
      console.log(data);
      res.send(data);
    }
  });
}

function getMostRecentComment (req, res) {
  var game_id = req.query.game_id;
  commentModel.selectMostRecentComment(game_id, function (err, data) {
    if (err) {
      const params = {success: false, err: err};
      res.send(params);
    }
    else {
      res.send(data);
    }
  });
}

function deleteComment (req, res) {
  var comment_id = req.body.comment_id;
  commentModel.deleteFromComments(comment_id, function (err) {
    if (err) {
      const params = {success: false, err: err};
      res.send(params);
    }
    else {
      const params = {success: true};
      res.send(params);
    }
  });
}

module.exports = {
  getComments: getComments,
  addComment: addComment,
  getMostRecentComment: getMostRecentComment,
  deleteComment: deleteComment
};
