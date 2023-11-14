import React from 'react';
import { Container, Modal, Button } from 'react-bootstrap'
import ballArray from '../../utils/ballArray';

const BallList = () => {

    const ballArray = () => {
        const balls = [{}]
        let index = 1
    for (let i = 1; i < 16; i++)
            if (index % 2 === 0) {
                balls.push({ number: index, type: "solid"});
                index++
            } else {
                balls.push({ number: index, type: "stripe"})
                index++
            }
        
        return balls
    }
    return ballArray()
    
}
export default BallList;