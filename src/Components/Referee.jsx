// this class allows me to hold all my referee functions here rather than having them all clustered in the Chessboard component

export default class Referee {

   tileIsOccupied = (x, y, boardState) => {
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

    if(type === "PAWN"){
     const pawnRow = (team === "WHITE") ? 1: 6;
     const pawnDirection = (team === "WHITE") ? 1: -1;

     if(py === pawnRow && y - py === 2*pawnDirection){
      if(!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - pawnDirection, boardState)) {
        return true;
      }
     } else if(px === x && y - py === pawnDirection){
      if(!this.tileIsOccupied(x, y, boardState)){
        return true;
      }
     }
    }
    return false;
  }
}
