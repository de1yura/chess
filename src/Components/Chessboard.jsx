import React from 'react';
import styles from './Styles/Chessboard.module.scss';
import Tile from './Tile';

const Chessboard = () => {

    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

    let Board = [];
    // yAxis.map((y) => {xAxis.map((x)=> Board.push(<div className={styles.tile}>{x}{y} </div>))});

    for(let i = yAxis.length -1; i>=0; i--){
        for(let j= 0; j< xAxis.length; j++){
            const number = i + j;

            Board.push(<Tile number={number}/>)
        }
    }
    
    let letters = xAxis.map((x)=> <div>{x}</div>)
    let numbers = yAxis.map((y)=> <div>{y}</div>)
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