import React, { useState } from 'react';
// import { useParams } from "react-router-dom"
import BallList from '../components/BallList/BallList';
// import BallArray from '../utils/ballArray'
import { Container, Button, Modal } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_GAME } from '../utils/mutations';
import  Auth  from '../utils/auth'

const CutThroat = () => {
    const gametype = 'cutthroat'
  const [showModal, setShowModal] = useState(false);

    // Potentially set as imported data instead of done in the page?
    const userId = Auth.getUser().data._id;
    const [createGame, { error }] = useMutation(CREATE_GAME);
//   console.log(Auth.getUser())

     const startGameSubmit = async (event) => {
    //    try {
    //     await console.log(userData)
    //     } catch (e) {
    //         console.log(error)
    //     }
        event.preventDefault();
        const users = [userId]
        
        
        try {
            const  mutationResponse  = await createGame({
                variables: { users: users, gametype: gametype }
            })
            console.log(mutationResponse)
        } catch (e) {
            console.error(e)
            return {
                            code: e.extensions.response.status,
                            success: false,
                            message: e.extensions.response.body,
                            track: null
                          };
        }
     }


//   const startGameSubmit = async (event) => {
//     event.preventDefault();
//     // const users = "ObjectId('" + userId + "')";
//     const users = userId
//     // console.log(users)
//     // event.preventDefault();
//     console.log(createGame())
//     try {
//         const { data } = await createGame({
//             users: users,
//             gametype: gametype
//         })
//         .then(console.log("hello"))
//         // const { data } = await createGame({
//         //    variables: { users, gametype }
//         // });

//         console.log("Hello")
//     } catch (e) {
//         // console.error(e);
//         return {
//             code: e.extensions.response.status,
//             success: false,
//             message: e.extensions.response.body,
//             track: null
        //   };
    // }
//    
//   }
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
                  <Button onClick={startGameSubmit}>Start Game</Button>
                </Modal.Title>
            </Modal.Header>
            {/* <BallList

            >

            </BallList> */}
            <div className='mb2' id="select-ball">
            </div>
        </Modal>
        </Container>
        {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
        </>
)}

export default CutThroat