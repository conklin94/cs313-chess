var captured_by_black = "";
var captured_by_white = "";

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
  if (ev.target.hasChildNodes()) {
    var captured = ev.target.childNodes[0];
    ev.target.innerHTML = "";
  }
  if (ev.target.tagName == "IMG") {
    var parentNode = ev.target.parentNode;
    var captured = ev.target;
    parentNode.innerHTML = "";
    parentNode.appendChild(document.getElementById(data));
  }
  else {
    ev.target.appendChild(document.getElementById(data));
  }
  handleCaptured(captured);
}

function handleCaptured(captured) {
  captured_by_black = document.getElementById('captured_by_black');
  captured_by_white = document.getElementById('captured_by_white');
  if (captured === null) {
    return;
  }
  console.log(captured);
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
