import React, { useRef } from 'react';
import styles from './Styles/Chessboard.module.scss';
import { useState } from 'react';
import Tile from './Tile';
import Referee from './Referee';

const Chessboard = () => {

    const boardRef = useRef(null);
    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const starting = [];
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState(starting);
    const [active, setActive] = useState(false);
    const referee = new Referee;

    //Setting up Pieces
    for(let i = 0; i < 8; i++){
        starting.push({image:"/Assets/Pieces/pawn_b.png", x:i, y:6, type: "PAWN", team:"BLACK"});
    }

    for(let i = 0; i < 8; i++){
        starting.push({image:"/Assets/Pieces/pawn_w.png", x:i, y:1, type: "PAWN", team: "WHITE"});
    }

    for(let i = 0; i < 2; i++){
        const t = i === 0 ? "w" : "b";
        const y = i === 0 ? 0 : 7;
        const team = i === 0 ? "WHITE" : "BLACK";
        starting.push({image:`/Assets/Pieces/rook_${t}.png`, x:0, y:y, type:"ROOK", team: team});
        starting.push({image:`/Assets/Pieces/rook_${t}.png`, x:7, y:y, type:"ROOK", team: team});

        starting.push({image:`/Assets/Pieces/knight_${t}.png`, x:1, y:y, type:"KNIGHT", team: team});
        starting.push({image:`/Assets/Pieces/knight_${t}.png`, x:6, y:y, type:"KNIGHT", team: team});
        
        starting.push({image:`/Assets/Pieces/bishop_${t}.png`, x:2, y:y, type:"BISHOP", team: team});
        starting.push({image:`/Assets/Pieces/bishop_${t}.png`, x:5, y:y, type:"BISHOP", team: team});

        starting.push({image:`/Assets/Pieces/queen_${t}.png`, x:3, y:y, type:"QUEEN", team: team});
        starting.push({image:`/Assets/Pieces/king_${t}.png`, x:4, y:y, type:"KING", team: team});
    }
    




    
    

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

            //UPDATE THE PIECE LOCATION
            setPieces((current)=> {
                const new_pieces = current.map((piece)=> { 

                    if(piece.x === gridX && piece.y === gridY){
                        const validMove = referee.isValidMove(gridX, gridY, x, y, piece.type, piece.team, current);
                        
                        if (validMove){
                            piece.x = x;
                            piece.y = y;
                        } else {
                            e.target.style.position = 'relative';
                            e.target.style.removeProperty("top");
                            e.target.style.removeProperty("left");
                        }
                        
                    }
                    return piece;
                });
                return new_pieces;
            });
            setActive(false);
        }
    }




  return (
    <div className = {styles.fullboard}>
        {/* <button onClick = {(e) => {console.log(boardRef.current)}}>click</button> */}
        <div className={styles.numbers}>
            {numbers}
        </div>

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