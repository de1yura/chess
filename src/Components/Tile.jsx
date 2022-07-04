import React from 'react';
import styles from './Styles/Tile.module.scss';

const Tile = (props) => {
    
    if(props.number % 2 === 0){
        return <div className={styles.blackTile}><img src={props.image}/></div>;
    } else {
        return <div className={styles.whiteTile}><img src={props.image}/></div>;
    }
}


export default Tile