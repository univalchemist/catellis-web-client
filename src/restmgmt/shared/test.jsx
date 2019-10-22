import React, { useState, useEffect, Fragment } from 'react';

export const HooksTest = (props) => {
    const [text, setText] = useState('CLICK TO TEST REACT HOOKS');
    const [color, setColor] = useState('red');
    const [clicked, setClicked] = useState(false);

    const changeColor = () => {
        setClicked(!clicked);

        if (!clicked) {
            setColor('blue');
            setText('REACT HOOKS TEST WORKS')
        } else {
            setText('CLICK TO TEST REACT HOOKS');
            setColor('red');
        }
    }

    return <h2 onClick={changeColor} style={{color: color, cursor: 'pointer', userSelect: 'none'}}>{text}</h2>
}