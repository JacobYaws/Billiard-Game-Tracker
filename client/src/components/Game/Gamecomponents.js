import React, { useState, useEffect} from "react";
import { Modal, Tab } from "react-bootstrap"
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import { CHANGE_BALL_STATUS, BALL_TYPE_SELECTION, CLOSE_GAME } from "../../utils/mutations";
import Auth from '../../utils/auth'
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../NavBar/NavBar';

const GameContainer = (props) => {
    const gameId = useParams();
    console.log(props)
    const userId = Auth.getUser().data._id
    let userArray = props.users;
    // let ballArray = props?.balls;
    let ballArray = props.balls;
    let gametype = props.gametype;
    const eightBall = props.balls ? props.balls[7] : {}
    const nineBall = props.balls ? props.balls[8] : {}
    const gameStatus = props.status;
    let gameBallArray = [];
    let userBallArray = [];
    const [changeStatus] = useMutation(CHANGE_BALL_STATUS);
    const [closeGame] = useMutation(CLOSE_GAME);
    const [updateBallStyleSelection] = useMutation(BALL_TYPE_SELECTION); // requires gameId, userId, ball number array
    const [showUserBalls, setShowUserBalls] = useState(false);
    const [showEndButton, setShowEndButton] = useState(false);
    const [selectUserBallArray, setSelectUserBallArray] = useState([]);
    const [showEightBall, setShowEightBall] = useState(false)
    const [showEndModal, setShowEndModal] = useState(false);
    const [endGame, setEndGame] = useState(false)
    let showStatusCheckArr = [];
        useEffect(() => {
            setShowUserBalls(() => {
                if (gametype === 'standard') {
                    setShowUserBalls(false)
                } else {
                    setShowUserBalls(true)
                }
                setEndGame(() => {
                    if (gameStatus === 'inProgress') {
                        setEndGame(false)
                    } else {
                        setEndGame(true)
                    }
                })
                setShowEightBall()
                setShowEndButton()
            });
        }, [props, showEightBall, showEndButton, endGame]);
        console.log(endGame)
        if (userArray !== undefined) {
            if (gametype === 'standard') {
                for (let i = 0; i< ballArray.length; i++) {
                    if (ballArray[i].assigneduser === userId) {
                        userBallArray.push(ballArray[i])
                    }
                    gameBallArray.push(ballArray[i]) 
                }
            }
            if (gametype == 'nineball') {
                for (let i = 0; i < ballArray.length; i++) {
                    userBallArray.push(ballArray[i])
                }
            }
            if (gametype === 'cutthroat') {
                for (let i = 0; i < ballArray.length; i++) {
                    if (ballArray[i].assigneduser == userId) {   
                    userBallArray.push(ballArray[i])
                    }
                }
            }
        }
        
        // let eightBallCheck = userBallArray.find(elem => elem.number == 8)


        // if (gametype === 'standard' && eightBallCheck.assigneduser !== 0) {
        //     setShowEndButton(true)
        // }


        // console.log(eightBallCheck)


        // console.log(userBallArray.filter(e => e.status === false).length)
        let checkStatusFalseLength = userBallArray.filter(e => e.status === false).length;
        let newShowEightBall;


        const handleClick = async (e) => {
            e.preventDefault();
            e.persist()
            let currTarget = e.currentTarget;
            console.log(currTarget);
            let checkOpacity;
            let number = currTarget.innerText;
            checkOpacity = currTarget.style.opacity;
            let selectedBall;
                if (number == 8 && gametype === 'standard') {
                    selectedBall = ballArray.find((currentValue) => {
                        return currentValue.number == number
                    })
                } else {
                selectedBall = userBallArray.find((currentValue) => {
                    return currentValue.number == number
                })};
            console.log(selectedBall)
            let selectAssigneduser = selectedBall.assigneduser;
            let newBallObject = {status: selectedBall.status, number: selectedBall.number, color: selectedBall.color, assigneduser: selectedBall.assigneduser, type: selectedBall.type}
            let newUserBallArray = [];
            newUserBallArray.push(newBallObject)
            if (gametype === 'cutthroat' && checkStatusFalseLength === 1) {
                setShowEndModal(true);
            }
            if (selectAssigneduser == 0) {
                console.log(newUserBallArray)
                console.log(newBallObject)
                try {
               
                    const mutationResponse = await updateBallStyleSelection({
                        variables: { gameId: gameId.gameId, users: userId, ball: newUserBallArray } 
                    })
                  
                } catch (e) {
                    console.log(e)
                    return {
                        code: e.extensions.response.status,
                        success: false,
                        message: e.extensions.response.body,
                        track: null
                    };
                }
            }
            
           
            let newGameId = gameId.gameId // See if this can be set to a global variable without breaking everything.
            // Removing __typename from the ball object. The mutation response will error out if it is not removed.
            let newSelectedBall = {status: !selectedBall.status, number: selectedBall.number, color: selectedBall.color, assigneduser: selectedBall.assigneduser, type: selectedBall.type}
            try {
                const mutationResponse = await changeStatus({
                    variables: { gameId: newGameId, ball: newSelectedBall }
                })
               
            } catch (error) {
                console.error(error)
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    track: null
            }
        }
            if (checkOpacity == 0.5) {
                return currTarget.style.opacity = 1   
            } else if (checkOpacity == 1 || checkOpacity == "") {
                return currTarget.style.opacity = 0.5
            }
        }

        const selectUserArray = async (event) => {
            event.preventDefault()
            let ballStyle = event.target.innerText.toLowerCase();
            let solids = ballArray.filter(ball => ball.type === "solid");
            let stripes = ballArray.filter(ball => ball.type === "stripe");
            let newGameId = gameId.gameId // See if this can be set to a global variable without breaking everything.
            if (ballStyle === 'solid') {
            for (let i = 0; i < solids.length; i++) {
                userBallArray.push(solids[i]);
            }
            } else {
                
                for (let i = 0; i < stripes.length; i++) {
                    userBallArray.push(stripes[i]);
                }        
            }
        
            let newUserBallArray = [];
            userBallArray.forEach((userBallArray) => {
                let newBallObject = {status: userBallArray.status, number: userBallArray.number, color: userBallArray.color, assigneduser: userBallArray.assigneduser, type: userBallArray.type}
                newUserBallArray.push(newBallObject)
            })
            
            try {
                const mutationResponse = await updateBallStyleSelection({
                    variables: { gameId: newGameId, users: userId, ball: newUserBallArray } 
                })
                // console.log(mutationResponse)
            } catch (e) {
                console.log(e)
                return {
                    code: e.extensions.response.status,
                    success: false,
                    message: e.extensions.response.body,
                    track: null
                };
            }

            setSelectUserBallArray(userBallArray)
        }
        if (selectUserBallArray.length !== 0 && gametype === 'standard') {
            userBallArray = selectUserBallArray
        }
      
        // console.log(userBallArray.filter(e => e.status === false).length)
        // let checkStatusFalseLength = userBallArray.filter(e => e.status === false).length;
        let hideEightBall =  userBallArray.find(ball => ball.number == 8) == undefined
        // let newShowEightBall 
        if (checkStatusFalseLength === 0 && gametype === 'standard') {
            // console.log("success")
            newShowEightBall = true
        } else {
            newShowEightBall = false
        }

        const handleEndGame = async (ev) => {
            let newStatus = "closed";
            if (gametype === 'standard') {
            ev.preventDefault();
            let currTarget = ev.currentTarget;
            let selectedBall;
            selectedBall = ballArray.find((currentValue) => {
                return currentValue.number == 8
            })
            let selectAssigneduser = selectedBall.assigneduser;
            let newBallObject = {status: selectedBall.status, number: selectedBall.number, color: selectedBall.color, assigneduser: selectedBall.assigneduser, type: selectedBall.type}
            let newUserBallArray = [];
            newUserBallArray.push(newBallObject)
            if (selectAssigneduser == 0) {
                try {
                    const mutationResponse = await updateBallStyleSelection({
                        variables: { gameId: gameId.gameId, users: userId, ball: newUserBallArray } 
                    })
                  
                } catch (e) {
                    console.log(e)
                    return {
                        code: e.extensions.response.status,
                        success: false,
                        message: e.extensions.response.body,
                        track: null
                    };
                }}
            }

            try {
                const mutationResponse = await closeGame({
                    variables: { gameId: gameId.gameId, status: newStatus } 
                })
                // console.log(mutationResponse)
            } catch (e) {
                console.log(e)
                return {
                    code: e.extensions.response.status,
                    success: false,
                    message: e.extensions.response.body,
                    track: null
                };
            }
            setShowEndModal(false)
        }
        const handleEightBallClick = () => {
            console.log('click')
            setShowEndModal(true)
        }

            return (
                <>
                <div className="flex-row justify-center">
            
                        {props.balls === undefined ? (
                            <div>Loading...</div>
                        ) : (
                        <div>
                        <h1>Ball Array</h1>
                        <div className="row" style={{maxWidth: '50%'}}>
                        {/* <div> */}
                            <div className="row"> 
                            
                            {(!showUserBalls && selectUserBallArray.length === 0 && userBallArray.length === 0) ? <>

                            {/* {(!showUserBalls && selectUserBallArray.length === 0) ? <> */}
                            <button className="card ball solid" id="solid-select" style={{backgroundColor: 'black'}} onClick={selectUserArray}>Solid</button> 
                            <button className="card ball stripe" id="stripe-select" style={{backgroundColor: 'yellow'}} onClick={selectUserArray}><div style={{backgroundColor: 'white'}}>Stripe</div></button> 
                            </>
                            : (
                            <>
                            <div>{(gametype === 'standard') ? <>
                            <button className={'card ball eight-ball-standard'}  disabled={!newShowEightBall} key={eightBall.number} style={{backgroundColor: eightBall.color,  opacity: eightBall.status ? 0.5 : 1, display: hideEightBall ? "flex" : "none" }}  onClick={handleEightBallClick}> 
                            <div className={`${eightBall.type}`}> 
                                        <div className="ballNumber" style={{backgroundColor: eightBall.color}}> 
                                            {`${eightBall.number}`} 
                                        </div>
                                        
                                    </div>
                        {/* <div>
                            Success
                        </div> */}
                        </button></> : (
                        <div></div>)}</div>
                            {userBallArray.map((ball) => (         
                                <button className={`card ball`} key={ball.number} disabled={endGame} style={{backgroundColor: ball.color, opacity: ball.status ? 0.5 : 1 }}  onClick={handleClick}> 
                                    <div className={`${ball.type}`}> 
                                        <div className="ballNumber" style={{backgroundColor: ball.color}}> 
                                            {`${ball.number}`} 
                                        </div>
                                        
                                    </div>
                                </button>
                                    )
                                )
                            }
                            </>
                    
                        )
                        }
                            </div> 
                            <button hidden={!showEndButton}>EndGame</button>
                            {/* </div> */}
                        </div>
                    </div>
                    )}
                </div>
                <Modal
                size='md'
                show={showEndModal}
                onHide={() => setShowEndModal(false)}
                aria-labelledby='endModal'>
                    <Tab.Container>
                    <Modal.Header closeButton>
                        <Modal.Title className="endModalTitle">
                           
                            End Game
                        </Modal.Title>

                        </Modal.Header>
                            
                            <Modal.Body>
                                <Tab.Content>
                                    <div className="endModalBody">
                        
                        Are you sure you want to end the game? Doing so will close the game and prevent any more changes from being made. 
                        Have the other players confirm their changes are accurate before continuing.
                        </div>
                        <div>
                       
                        <button className="endGameButton" onClick={handleEndGame}>Confirm</button>
                        </div>
                        </Tab.Content>
                        </Modal.Body>
                        </Tab.Container>
                </Modal>
                </>
                )
}      
                        

const GameSidebar = (props) => {
//     let gametype = props.gametype
//     console.log(props)
// return (<>
// {gametype === 'standard' ? (
//     <div>Standard ball set</div>
// ) : <div>Failed to load the game ball set</div>}
// <div>Hello</div>
// </>)
}
// class GameContainer extends Component {
//     constructor(props) {
//         super(props);

//         this._joinGame = (game) => {
//             console.log(`TODO: Join game ${game.gametype}`)
//         }
//     }
//     render() {
//         // const games = [];

//         return (
//             <div className="c-game">
//                 <p>Game</p>
//                 {/* <GameList games={games} joinGame={this._joinGame} /> */}
//             </div>
//     )
// }
// }


export { GameContainer, GameSidebar }