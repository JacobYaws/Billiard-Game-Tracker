import React, { useState } from 'react';
import BallList from '../components/BallList/BallList';
// import BallArray from '../utils/ballArray'
import { Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_GAME } from '../utils/mutations';

const CutThroat = () => {
  const [showModal, setShowModal] = useState(false);
  const [createGame, { error, data }] = useMutation(CREATE_GAME);
    
    

return(
    <>
    <Container>
        <Button onClick={() => setShowModal(true)}>Start your game</Button>
        <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='ball-select-modal'>
            <Modal.Header closeButton>
                <Modal.Title id='ball-select'>
                  <Button onClick={createGame}>Start Game</Button>
                </Modal.Title>
            </Modal.Header>
            {/* <BallList

            >

            </BallList> */}
            <div className='mb2' id="select-ball">
            </div>
        </Modal>
        </Container></>
)}

export default CutThroat