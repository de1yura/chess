import React, { useRef } from 'react';
import styles from './Styles/Chessboard.module.scss';
import { useState } from 'react';
import Tile from './Tile';

const Chessboard = () => {

    const boardRef = useRef(null);
    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const starting = [];
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);


    for(let i = 0; i < 8; i++){
        starting.push({image:"/Assets/Pieces/pawn_b.png", x:i, y:6});
    }
    for(let i = 0; i < 8; i++){
        if(i<=4){
            starting.push({image:`/Assets/Pieces/${i}.png`, x:i, y:7});
        } else {
            starting.push({image:`/Assets/Pieces/${-i+7}.png`, x:i, y:7});
        }
    }

    for(let i = 0; i < 8; i++){
        starting.push({image:"/Assets/Pieces/pawn_w.png", x:i, y:1});
    }
    for(let i = 0; i < 8; i++){
        if(i<=4){
            starting.push({image:`/Assets/Pieces/${i}w.png`, x:i, y:0});
        } else {
            starting.push({image:`/Assets/Pieces/${-i+7}w.png`, x:i, y:0});
        }
    }

    const [pieces, setPieces] = useState(starting);
    
    

//Placing the Pieces on the board
    let Board = [];
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
    let numbers = yAxis.map((y,j)=> <div key={j }>{y}</div>)

    const [active, setActive] = useState(false);

    const grabPiece = (e) => {
        const element = e.target;
        if(element.className.includes("piece")){
            setGridX(Math.floor((e.clientX - boardRef.current.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - boardRef.current.offsetTop - 800) / 100)));

            const x = e.clientX - 0.5*(element.clientHeight);
            const y = e.clientY - 0.5*(element.clientHeight);

            element.style.position='absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActive(true);
        }
    }

    const movePiece = (e) => {
        const element = e.target;
        if(element.className.includes("piece") && active && boardRef.current){
            const minX = boardRef.current.offsetLeft - 25;
            const maxX = boardRef.current.offsetLeft + boardRef.current.clientWidth - 75;
            const minY = boardRef.current.offsetTop ;
            const maxY = boardRef.current.offsetTop + boardRef.current.clientHeight - 75;
            const x = e.clientX - 0.5*(element.clientHeight);
            const y = e.clientY - 0.5*(element.clientHeight);
            element.style.position='absolute';

            //restricting pieces within the board horizontally
            if(x<minX){
                element.style.left = `${minX}px`;
            } else if (x>maxX){
                element.style.left = `${maxX}px`
            } else {
                element.style.left = `${x}px`
            }

            //restricting pieces within the board vertically
            if(y<minY){
                element.style.top = `${minY}px`;
            } else if (y>maxY){
                element.style.top = `${maxY}px`
            } else {
                element.style.top = `${y}px`
            }
        }
    }

    const dropPiece = (e) => {
        if(active){
            const x = Math.floor((e.clientX - boardRef.current.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - boardRef.current.offsetTop - 800) / 100));

            setPieces((value)=> {
                const new_pieces = value.map((piece)=> { 
                    if(piece.x === gridX && piece.y === gridY){
                        piece.x = x;
                        piece.y = y;
                    }
                    return piece;
                });
                return new_pieces;
            });
            setActive(false);
        }
    }
    //look into why i need returns here!!!!!!!!

  return (
    <div className = {styles.fullboard}>
        <button onClick = {(e) => {console.log(boardRef.current)}}>click</button>
        {/* <div className={styles.numbers}>
            {numbers}
        </div> */}

        <div 
        onMouseMove={e=> movePiece(e)} 
        onMouseDown={e => grabPiece(e)} 
        onMouseUp={e => dropPiece(e)}
        className={styles.chessboard}
        ref={boardRef}
        >
            {Board}
        </div>

        <div className={styles.letters}>
            {letters}
        </div>
    </div>
  )
}

export default Chessboard