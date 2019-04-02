const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

function selectComments (game_id, callback) {
  pool.query('SELECT comment_id, game_id, comments, time FROM comments WHERE game_id = $1 ORDER BY time DESC',
              [game_id], (err, result) => {
    if (err) {
      callback(err, null);
    }
    else {
      const game_params = result.rows;
      callback(null, game_params);
    }
  });
}

function insertComment (game_id, comments, time, callback) {
  pool.query('INSERT INTO comments (game_id, comments, time) VALUES ($1, $2, TO_TIMESTAMP($3))',
              [game_id, comments, time], (err, result) => {
     if (err) {
       callback(err);
     }
     else {
       callback(null);
     }
  });
}

function selectMostRecentComment (game_id, callback) {
  pool.query('SELECT time FROM comments WHERE game_id = $1 ORDER BY time DESC LIMIT 1',
              [game_id], (err, result) => {
    if (err) {
      callback(err, null);
    }
    else {
      const game_params = result.rows[0];
      callback(null, game_params);
    }
  });
}

function deleteFromComments(comment_id, callback) {
  pool.query('DELETE FROM comments WHERE comment_id = $1',
              [comment_id], (err, result) => {
    if (err) {
      callback(err);
    }
    else {
      callback(null);
    }
  });
}

module.exports = {
  insertComment: insertComment,
  selectComments: selectComments,
  selectMostRecentComment: selectMostRecentComment,
  deleteFromComments: deleteFromComments
};
