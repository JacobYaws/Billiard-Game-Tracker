import React, { useState } from 'react';
import BallList from '../components/BallList/BallList';
// import BallArray from '../utils/ballArray'
import { Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CutThroat = () => {
  const [showModal, setShowModal] = useState(false);

  const selectBall = () => {
    
  }
    
    

return(
    <>
    <Container>
        <Button onClick={() => setShowModal(true)}>Select your balls</Button>
        <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='ball-select-modal'>
            <Modal.Header closeButton>
                <Modal.Title id='ball-select'>
                    Select which balls are yours
                </Modal.Title>
            </Modal.Header>
            {/* <BallList

            >

            </BallList> */}
            <div className='mb2' id="select-ball">
                swfrt
            </div>
        </Modal>
        </Container></>
)}

export default CutThroat