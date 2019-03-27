function getImage(piece) {
  var image = "";
  switch(piece) {
  case 'r':
    image = "images/black_rook.png";
    break;
  case 'n':
    image = "images/black_knight.png";
    break;
  case 'b':
    image = "images/black_bishop.png";
    break;
  case 'k':
    image = "images/black_king.png";
    break;
  case 'q':
    image = "images/black_queen.png";
    break;
  case 'p':
    image = "images/black_pawn.png";
    break;
  case 'R':
    image = "images/white_rook.png";
    break;
  case 'N':
    image = "images/white_knight.png";
    break;
  case 'B':
    image = "images/white_bishop.png";
    break;
  case 'K':
    image = "images/white_king.png";
    break;
  case 'Q':
    image = "images/white_queen.png";
    break;
  case 'P':
    image = "images/white_pawn.png";
    break;
  default:
    break;
  }
  return image;
}

function makeBoard(board, captured_by_white, captured_by_black) {
  if (board.length < 71) {
    console.log("The stored chess board is invalid");
    return;
  }
  var chess_board = document.getElementById('chess_board');
  var is_white = true;
  var cell = 0;
  var row = 0;
  var piece = 0;
  var white_jail = document.getElementById('captured_by_white');
  var black_jail = document.getElementById('captured_by_black');
  white_jail.innerHTML = "";
  black_jail.innerHTML = "";
  for (var i = 0; i < captured_by_white.length; i++) {
    var letter = captured_by_white.charAt(i);
    var image = getImage(letter);
    var imageHTML = `<img id="piece${piece}" src='${image}' `
                  + `alt='${letter}' ondragstart="drag(event)"`
                  + ` draggable="true">`;
    white_jail.innerHTML += `<td class="captured" ondrop="drop(event)"`
                         + ` ondragover="allowDrop(event)">`
                         + `${imageHTML}</td>`;
    piece += 1;

  }
  for (var i = 0; i < captured_by_black.length; i++) {
    var letter = captured_by_black.charAt(i);
    var image = getImage(letter);
    var imageHTML = `<img id="piece${piece}" src='${image}' `
                  + `alt='${letter}' ondragstart="drag(event)"`
                  + ` draggable="true">`;
    black_jail.innerHTML += `<td class="captured" ondrop="drop(event)"`
                         + ` ondragover="allowDrop(event)">`
                         + `${imageHTML}</td>`;
    piece += 1;
  }

  chess_board.innerHTML = "";
  board_string = `<tr id="row${row}">`;
  row += 1;
  for (var i = 0; i < 71; i++) {
    if (board.charAt(i) == '/') {
      board_string += `</tr><tr id="row${row}">`;
      row += 1;
    }
    else {
      var image = getImage(board.charAt(i));
      var imageHTML = "";
      if (image.length > 0) {
        imageHTML = `<img id="piece${piece}" src='${image}' `
                  + `alt='${board.charAt(i)}' ondragstart="drag(event)"`
                  + ` draggable="true">`;
        piece += 1;
      }
      board_string += `<td id="cell${cell}" class='`
                   + ((is_white) ? 'white' : 'black')
                   + `' ondrop="drop(event)" ondragover="allowDrop(event)">`
                   + imageHTML + "</td>";
      cell += 1;
    }
    is_white = ((is_white) ? false : true);
  }
  board_string += "</tr>";
  chess_board.innerHTML = board_string;
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var captured = null;
  var image = document.getElementById(data);
  if (image.parentNode == ev.target || image == ev.target) {
    return;
  }
  // Delete the td tag if the piece is brought back onto the board
  if (image.parentNode.parentNode.id == "captured_by_black"
      || image.parentNode.parentNode.id == "captured_by_white") {
    image.parentNode.parentNode.removeChild(image.parentNode);
  }
  console.log();
  if (ev.target.hasChildNodes()) {
    var captured = ev.target.childNodes[0];
    ev.target.innerHTML = "";
  }
  if (ev.target.tagName == "IMG") {
    var parentNode = ev.target.parentNode;
    var captured = ev.target;
    parentNode.innerHTML = "";
    parentNode.appendChild(image);
  }
  else {
    ev.target.appendChild(image);
  }
  handleCaptured(captured);
}

function handleCaptured(captured) {
  captured_by_black = document.getElementById('captured_by_black');
  captured_by_white = document.getElementById('captured_by_white');
  if (captured === null) {
    return "";
  }
  if (captured.alt == captured.alt.toUpperCase()) {
    captured_by_black.innerHTML += `<td class="captured" ondrop="drop(event)"`
                                + ` ondragover="allowDrop(event)">`
                                + `${captured.outerHTML}</td>`;
  }
  else {
    captured_by_white.innerHTML += `<td class="captured" ondrop="drop(event)"`
                                + ` ondragover="allowDrop(event)">`
                                + `${captured.outerHTML}</td>`;
  }
}

function submitBoard(game_code) {
  var captured_by_white = getCapturedByWhite();
  var captured_by_black = getCapturedByBlack();
  var board = getBoardEncoding();
  postAjax('/board', `game_code=${game_code}&board=${board}&captured_by_black=`
                      + `${captured_by_black}&captured_by_white=`
                      + `${captured_by_white}`,
           function(data){ console.log(data); });
}

function resetBoard(game_code) {
  var captured_by_white = '';
  var captured_by_black = '';
  var board = 'rnbqkbnr/pppppppp/00000000/00000000/00000000/00000000/PPPPPPPP/'
            + 'RNBQKBNR';
  postAjax('/board', `game_code=${game_code}&board=${board}&captured_by_black=`
                      + `${captured_by_black}&captured_by_white=`
                      + `${captured_by_white}`,
           function(data){ console.log(data);
             getCurrentBoard(game_code);
           });

}

function getCurrentBoard(game_code) {
  getAjax(`/board?game_code=${game_code}`, function(data){
    var json = JSON.parse(data);
    var board = json['board'];
    var captured_by_white = json['captured_by_white'];
    var captured_by_black = json['captured_by_black'];
    makeBoard(board, captured_by_white, captured_by_black);
  });
}

function getBoardEncoding() {
  var board = "";
  for (var i = 0; i < 64; i++) {
    var currentID = `cell${i}`;
    var currentCell = document.getElementById(currentID);
    if (currentCell.hasChildNodes()) {
      board += currentCell.firstChild.alt;
    }
    else {
      board += "0"
    }
    if (i % 8 == 7 && i != 63) {
      board += "/"
    }
  }
  return board;
}

function getCapturedByBlack() {
  var captured = "";
  var element = document.getElementById('captured_by_black');
  if (element.hasChildNodes()) {
    var children = element.childElementCount;
    for (var i = 0; i < children; i++) {
      var currentCell = element.childNodes[i];
      if (currentCell.hasChildNodes()) {
        captured += currentCell.firstChild.alt;
      }
    }
  }
  return captured;
}

function getCapturedByWhite() {
  var captured = "";
  var element = document.getElementById('captured_by_white');
  if (element.hasChildNodes()) {
    var children = element.childElementCount;
    for (var i = 0; i < children; i++) {
      var currentCell = element.childNodes[i];
      if (currentCell.hasChildNodes()) {
        captured += currentCell.firstChild.alt;
      }
    }
  }
  return captured;
}

function postComment(game_id) {
  var comments = document.getElementById('comment').value;
  postAjax('/comment', `game_id=${game_id}&comments=${comments}`,
            function(data){ console.log(data); });
}

function getComments(game_id) {
  getAjax(`/comment?game_id=${game_id}`, function(data){
    var json = JSON.parse(data);
    comments = document.getElementById('comments');
    comments.innerHTML = "";
    json.forEach(function(element) {
      comments.innerHTML += `<li>${element['comments']}</li>`;
    });
  });
}

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}
