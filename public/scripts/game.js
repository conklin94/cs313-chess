function getImage(piece) {
  alert("stuff may have happened");
  var image = "";
  switch(piece) {
  case 'r':
    image = "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png";
    break;
  case 'n':
    image = "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png";
    break;
  case 'b':
    image = "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png";
    break;
  case 'k':
    image = "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png";
    break;
  case 'q':
    image = "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png";
    break;
  case 'p':
    image = "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png";
    break;
  case 'R':
    image = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png";
    break;
  case 'N':
    image = "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png";
    break;
  case 'B':
    image = "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png";
    break;
  case 'K':
    image = "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png";
    break;
  case 'Q':
    image = "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
    break;
  case 'P':
    image = "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png";
    break;
  default:
    return image;
  }
  var newHTML = "<img class='piece' scr='" + image + "' alt=''>";
  return newHTML;
}
