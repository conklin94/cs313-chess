const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

function selectGame (game_code, callback) {
  pool.query('SELECT game_id, game_code, board, captured_by_white, captured_by_black, count FROM game WHERE game_code = $1',
              [game_code], (err, result) => {
    if (err) {
      callback(err, null);
    }
    else {
      const game_params = result.rows[0];
      callback(null, game_params);
    }
  });
}

function insertGame (game_code, board, callback) {
  pool.query('INSERT INTO game (game_code, board, count) VALUES ($1, $2, 1)',
              [game_code, board], (err, result) => {
     if (err) {
       callback(err);
     }
     else {
       callback(null);
     }
  });
}

function updateGame (game_code, board, captured_by_white, captured_by_black, callback) {
  pool.query('UPDATE game SET board = $1, captured_by_white = $2, captured_by_black = $3, count = count + 1 WHERE game_code = $4',
             [board, captured_by_white, captured_by_black, game_code], (err, result) => {
      if (err) {
        callback(err);
      }
      else {
        callback(null);
      }
  });
}

function selectCount (game_code, callback) {
  pool.query('SELECT count FROM game WHERE game_code = $1',
              [game_code], (err, result) => {
    if (err) {
      callback(err, null);
    }
    else {
      const game_params = result.rows[0];
      callback(null, game_params);
    }
  });
}

module.exports = {
  selectGame: selectGame,
  insertGame: insertGame,
  updateGame: updateGame,
  selectCount: selectCount
};
