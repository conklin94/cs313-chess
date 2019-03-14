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
    return image;
  }
  var newHTML = "<img class='piece' src='" + image + "' alt='" + piece + "'>";
  return newHTML;
}
