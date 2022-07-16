// this class allows me to hold all my referee functions here rather than having them all clustered in the Chessboard component

export default class Referee {

   tileIsOccupied = () => {
     //add parameters later
    console.log("checking if tile is occupied...");
   }

   isValidMove = (px, py, x, y, type, team, boardState) => {
    console.log("referee");
    console.log(`previous loc: ${px} ${py}`);
    console.log(`new loc: ${x} ${y}`);
    console.log(`type: ${type}`);
    console.log(`team: ${team}`);

    if(type === "PAWN") {
      if(team === "WHITE") {
        if(py === 1) {
          if(px === x && (y - py ===1 || y - py === 2)){
            if(this.tileIsOccupied()) {

            }
            return true;
          }
        } else {
          if(px === x && (y - py === 1)) {
            return true;
          }
        }
      } else {
        if(py === 6) {
          if(px === x && (py - y === 1 || py - y === 2)) {
            return true;
          }
        } else {
          if(px === x && (py - y === 1)) {
            return true;
          }
        }
      }

    }

    return false;

  }
}