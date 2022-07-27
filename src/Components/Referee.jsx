// this class allows me to hold all my referee functions here rather than having them all clustered in the Chessboard component

export default class Referee {

   tileIsOccupied = (x, y, boardState) => {
    console.log("checking if tile is occupied...");
    console.log(boardState.find((p)=> p.x === x && p.y === y));
    const piece = boardState.find((p)=> p.x === x && p.y === y);

    if(piece){
      return true;
    } else {
      return false;
    };

    
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
          if(px === x && y - py ===1){
            if(!this.tileIsOccupied(x, y, boardState)) {
              return true;
             }
            } else if (px === x && y - py === 2) {
              if(!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y-1, boardState)) {
                return true;
              }
            }
        } else {
          if(px === x && (y - py === 1)) {
            if(!this.tileIsOccupied(x, y, boardState)) {
              return true;
            } else{
              return false;
            }
            
          }
        }
      } else {
        if(py === 6) {
          if(px === x && py - y === 1 ) {
            if(!this.tileIsOccupied(x, y, boardState)) {
              return true;
            }
          } else if (px === x && py - y === 2){
            if(!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y+1, boardState)) {
              return true;
            }
          }
        } else {
          if(px === x && (py - y === 1)) {
            if(!this.tileIsOccupied(x, y, boardState)) {
              return true;
            }
          }
        }
      }

    }

    return false;

  }
}
