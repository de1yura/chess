import React from 'react';
import { useState } from 'react';
import styles from './Styles/Tile.module.scss';

const Tile = (props) => {

    //const [tile, setTile] = useState(<div>{props.number}</div>);
    
    if(props.number % 2 === 0){
        return <div className={styles.blackTile}></div>;
    } else {
        return <div className={styles.whiteTile}></div>;
    }
}


export default Tile