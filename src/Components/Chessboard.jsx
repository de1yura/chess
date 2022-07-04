import React from 'react';
import styles from './Styles/Chessboard.module.scss';
import Tile from './Tile';

const Chessboard = () => {

    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

    const pieces = [];

    for(let i = 0; i < 8; i++){
        pieces.push({image:"/Assets/Pieces/pawn_b.png", x:i, y:6});
    }
    for(let i = 0; i < 8; i++){
        if(i<=4){
            pieces.push({image:`/Assets/Pieces/${i}.png`, x:i, y:7});
        } else {
            pieces.push({image:`/Assets/Pieces/${-i+7}.png`, x:i, y:7});
        }
    }

    for(let i = 0; i < 8; i++){
        pieces.push({image:"/Assets/Pieces/pawn_w.png", x:i, y:1});
    }
    for(let i = 0; i < 8; i++){
        if(i<=4){
            pieces.push({image:`/Assets/Pieces/${i}w.png`, x:i, y:0});
        } else {
            pieces.push({image:`/Assets/Pieces/${-i+7}w.png`, x:i, y:0});
        }
    }
    


    let Board = [];
    // yAxis.map((y) => {xAxis.map((x)=> Board.push(<div className={styles.tile}>{x}{y} </div>))});

    for(let i = yAxis.length -1; i>=0; i--){
        for(let j= 0; j< xAxis.length; j++){
            const number = i + j;
            let image = undefined;

            pieces.forEach((p)=> {
                if(p.x === j && p.y === i){
                    image = p.image
                }
            })

            Board.push(<Tile key={`${j},${i}`} image={image} number={number}/>)
        }
    }
    
    let letters = xAxis.map((x,i)=> <div key={i}>{x}</div>)
    let numbers = yAxis.map((y,j)=> <div key={j}>{y}</div>)
  return (
    <div className = {styles.fullboard}>
        <div className={styles.numbers}>
            {numbers}
        </div>

        <div className={styles.chessboard}>
            {Board}
        </div>

        <div className={styles.letters}>
            {letters}
        </div>
    </div>
  )
}

export default Chessboard