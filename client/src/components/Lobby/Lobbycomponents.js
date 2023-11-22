import React, {Component} from "react"
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_LOBBY } from "../../utils/queries";


class LobbyContainer extends Component {
    constructor(props) {
        super(props);

        this._joinGame = (game) => {
            console.log(`TODO: Join game ${game.gametype}`)
        }
    }

    render() {
        // if (loading) return 'Loading...';
        // if (error) return `Error ${error.message}`;
        // const games = [];
    //    console.log(data)


        return (
            <div className="c-lobby">
                <p>Lobby homepage</p>
                {/* <GameList games={games} joinGame={this._joinGame} /> */}
            </div>
    )
}
}

class LobbySidebar extends Component {
    constructor(props) {
        super(props);

        this._login = () => {
            console.log("TODO: Put login here")
        }

        this._createGame = () => {
            console.log("TODO: Put createGame here")
        }
    }

    render() {
        const canCreateGame = true;
        const createGameInProgress = false;

        return (
            <section className="c-lobby-sidebar">
                <div className="m-sidebar-actions">
                    
                    {!canCreateGame ? null :
                        <button
                        onClick={this._createGame}
                        disabled={createGameInProgress}
                        className="m-button good">
                            Create Game Button
                        </button> 
                        }
                </div>
            </section>
        )
    }
}
export { LobbyContainer, LobbySidebar }

// export default {
//     main: LobbyContainer,
//     sidebar: LobbySidebar
// }





// import React, { useState, Component } from 'react';
// // import { useParams } from "react-router-dom"
// import BallList from '../components/BallList/BallList';
// // import BallArray from '../utils/ballArray'
// import { Container, Button, Modal } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useMutation, useQuery } from '@apollo/client';
// import { CREATE_GAME } from '../utils/mutations';
// import  Auth  from '../utils/auth'

// const Lobby = () => {
//     const gametype = 'cutthroat'
//   const [showModal, setShowModal] = useState(false);
//     // Potentially set as imported data instead of done in the page?
//     const userId = Auth.getUser().data._id;
//     const [createGame, { error }] = useMutation(CREATE_GAME);
// //   console.log(Auth.getUser())

//      const startGameSubmit = async (event) => {
//     //    try {
//     //     await console.log(userData)
//     //     } catch (e) {
//     //         console.log(error)
//     //     }
//         // event.preventDefault();
//         const users = [userId]
        
//         console.log(userId)
//         try {
//             const  mutationResponse  = await createGame({
//                 variables: { users: users, gametype: gametype }
//             })
//             console.log(mutationResponse)
//         } catch (e) {
//             console.error(e)
//             return {
//                 code: e.extensions.response.status,
//                 success: false,
//                 message: e.extensions.response.body,
//                 track: null
//                 };
//         }
//      }

// return(
//     <>
//     <Container>
//         <Button onClick={() => setShowModal(true)}>Start a new game</Button>
//         <Modal
//         size='lg'
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         aria-labelledby='ball-select-modal'>
//             <Modal.Header closeButton>
//                 <Modal.Title id='ball-select'>
//                 <Link to="/games/:gameid">
//                   <Button onClick={startGameSubmit}>Start Game</Button>
//                   </Link>
//                 </Modal.Title>
//             </Modal.Header>
//             {/* <BallList

//             >

//             </BallList> */}
//             <div className='mb2' id="select-ball">
//             </div>
//         </Modal>
//         </Container>
//         {error && (
//             <div className="col-12 my-3 bg-danger text-white p-3">
//             Something went wrong...
//           </div>
//         )}
//         </>
// )}

// export default Lobby