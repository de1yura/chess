import React from 'react';
import styles from './Styles/Tile.module.scss';
const Tile = (props) => {
    
    if(props.number % 2 === 0){
        return (
            <div className={styles.blackTile}>
                {props.image && <div style={{backgroundImage: `url(${props.image})`}} className={styles.piece}></div>}
            </div>);
    } else {
        return (
            <div className={styles.whiteTile}>
                {props.image && <div style={{backgroundImage: `url(${props.image})`}} className={styles.piece}></div>}
            </div>);
    }
}


export default Tile