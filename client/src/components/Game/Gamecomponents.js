import React, { useState, useEffect} from "react";
import { Modal, Tab, Button } from "react-bootstrap"
import { useMutation } from '@apollo/client';
import { CHANGE_BALL_STATUS, BALL_TYPE_SELECTION, CLOSE_GAME } from "../../utils/mutations";
import Auth from '../../utils/auth'
import { useParams } from 'react-router-dom';


const GameContainer = (props) => {
    const gameId = useParams();
    const userId = Auth.getUser().data._id
    let userArray = props?.users;

    let ballArray = props?.balls;
    let gametype = props?.gametype;
    const eightBall = props?.balls ? props.balls[7] : {}
 
    const gameStatus = props?.status;
    let gameBallArray = [];
    let userBallArray = [];
    let targetBallArray = [];
    let otherUsersPocketed = 0;
    let otherUsersOnTable = 0;
    const [changeStatus] = useMutation(CHANGE_BALL_STATUS);
    const [closeGame] = useMutation(CLOSE_GAME);
    const [updateBallStyleSelection] = useMutation(BALL_TYPE_SELECTION); 
    const [showUserBalls, setShowUserBalls] = useState(false);
    const [showEndButton, setShowEndButton] = useState(false);
    const [selectUserBallArray, setSelectUserBallArray] = useState([]);
    const [showEightBall, setShowEightBall] = useState(false)
    const [showEndModal, setShowEndModal] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [cutthroatEnd, setCutthroatEnd] = useState(false);
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

                setCutthroatEnd(() => {
                    if (otherUsersOnTable === 0 && otherUsersPocketed === 10) {
                        setCutthroatEnd(true);
                    } else {
                        setCutthroatEnd(false);
                    }
                    if (gametype === "cutthroat" && gameStatus == "closed") {
                        setCutthroatEnd(false);
                    }
                });
                setShowEightBall();
                
            });
        }, [props, showEightBall, showEndButton, endGame, cutthroatEnd]);
        if (userArray !== undefined) {
            if (gametype === 'standard') {
                for (let i = 0; i< ballArray.length; i++) {
                    if (ballArray[i].assigneduser === userId) {
                        userBallArray.push(ballArray[i])
                    }
                    gameBallArray.push(ballArray[i]) 
                }
            }
            if (gametype === 'nineball') {
                for (let i = 0; i < ballArray.length; i++) {
                    userBallArray.push(ballArray[i])
                }
            }
            if (gametype === 'cutthroat') {

                for (let i = 0; i < ballArray.length; i++) {
                    if (ballArray[i].assigneduser === userId) {   
                    userBallArray.push(ballArray[i])
                    } else {
                    targetBallArray.push(ballArray[i])
                    }
                }
                
            }
        }
        let checkStatusFalseLength = userBallArray.filter(e => e.status === false).length;
        let newShowEightBall;
        const handleClick = async (e) => {
            e.persist()
            let currTarget = e.currentTarget;
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
                } else if (checkOpacity == 1 || checkOpacity === "") {
                    return currTarget.style.opacity = 0.5
                }
        }

        const selectUserArray = async (event) => {
            event.preventDefault()
            let ballStyle = event.target.innerText.toLowerCase();
            let solids = ballArray.filter(ball => ball.type === "solid");
            let stripes = ballArray.filter(ball => ball.type === "stripe");
            let otherUserBallArray = []
            let newGameId = gameId.gameId 
            if (ballStyle === 'solid') {
            for (let i = 0; i < solids.length; i++) {
                userBallArray.push(solids[i]);
            }
            for (let i = 0; i < stripes.length; i++) {
                otherUserBallArray.push(stripes[i])
            }
            } else {
                for (let i = 0; i < stripes.length; i++) {
                    userBallArray.push(stripes[i]);
                }
                for (let i = 0; i < solids.length; i++) {
                    otherUserBallArray.push(solids[i])
                }    
            }
            let newUserBallArray = [];
            let newOtherUserBallArray = [];
            userBallArray.forEach((userBallArray) => {
                let newBallObject = {status: userBallArray.status, number: userBallArray.number, color: userBallArray.color, assigneduser: userBallArray.assigneduser, type: userBallArray.type}
                newUserBallArray.push(newBallObject)
            })
            let otherUserId;
            try {
                const mutationResponse = await updateBallStyleSelection({
                    variables: { gameId: newGameId, users: userId, ball: newUserBallArray } 
                })
                otherUserId = mutationResponse?.data?.selectBallStyle?.users[0] == userId ? mutationResponse?.data?.selectBallStyle?.users[1] : mutationResponse?.data?.selectBallStyle?.users[0]
            } catch (e) {
                console.log(e)
                return {
                    code: e.extensions.response.status,
                    success: false,
                    message: e.extensions.response.body,
                    track: null
                };
            }
            otherUserBallArray.forEach((ball) => {
                let newBall = {status: ball.status, number: ball.number, color: ball.color, assigneduser: ball.assigneduser, type: ball.type}
                newOtherUserBallArray.push(newBall)
            })
            try {
                const mutationResponse1 = await updateBallStyleSelection({
                    variables: { gameId: newGameId, users: otherUserId, ball: newOtherUserBallArray } 
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
            setSelectUserBallArray(userBallArray)
        }

        if (selectUserBallArray.length !== 0 && gametype === 'standard') {
            userBallArray = selectUserBallArray
        }

        let hideEightBall =  userBallArray.find(ball => ball.number == 8) == undefined

        if (checkStatusFalseLength === 0 && gametype === 'standard') {
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
                    let newBallObject = {status: !selectedBall.status, number: selectedBall.number, color: selectedBall.color, assigneduser: selectedBall.assigneduser, type: selectedBall.type}
                    let newUserBallArray = [];
                    newUserBallArray.push(newBallObject)
                        try {
                            const mutationResponse = await changeStatus({
                                variables: { gameId: gameId.gameId, users: userId, ball: newBallObject } 
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
            try {
                const mutationResponse = await closeGame({
                    variables: { gameId: gameId.gameId, status: newStatus } 
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
            setShowEndModal(false)
        }
        if (gametype === "cutthroat" && ballArray !== undefined) {
                ballArray.find((element) => {
                let elemassigneduser = element.assigneduser
                let elemstatus = element.status
                let userCheck = elemassigneduser != userId ? false : true;
                if (!userCheck) {
                if (elemstatus) {
                    otherUsersPocketed++;
                } else {
                    otherUsersOnTable++;
                }
            }
            })
        }

        const startEndGameProcess = () => {
            setShowEndModal(true);
        }

        const handleEightBallClick = async () => {
            let newEightBallObject = {status: !eightBall.status, number: eightBall.number, color: eightBall.color, assigneduser: userId, type: eightBall.type};
            let eightArray = [];
            eightArray.push(newEightBallObject)
            setShowEndModal(true)

        }
            return (
                <>
                <div className="flex-row">
                    <div className="row">
                        
                        {gametype === "cutthroat" ? <>
                        <h1 className="arrayHeader">Target Balls</h1>
                        <div className="ballArray">
                             {targetBallArray.map((targets) => (         
                                <button className={`card ball`} key={targets.number} disabled={true} style={{backgroundColor: targets.type === 'solid' || targets.type === 'special' ? targets.color : '#ffffff', opacity: targets.status ? 0.5 : 1 }}  onClick={handleClick}> 
                                    <div className={`${targets.type}`} style={{backgroundColor: targets.color}}> 
                                        
                                        <div className="ballNumber" >
                                            {`${targets.number}`} 
                                            </div>
                                        </div>
                                    
                                </button>
                                    )
                                )
                            } </div> </>
                            : (<></>)}
                    </div>
                        {props.balls === undefined ? (
                            <div>Loading...</div>
                        ) : (
                        <div className="gameContainer">
                        <h1 className="arrayHeader">Your Ball Array</h1>
                        <div className="row">
                            {(!showUserBalls && selectUserBallArray.length === 0 && userBallArray.length === 0) ? <>
                            <button className="card ball solid" id="solid-select" style={{backgroundColor: 'black'}} onClick={selectUserArray}>Solid</button> 
                            <button className="card ball stripe" id="stripe-select" style={{backgroundColor: 'yellow'}} onClick={selectUserArray}><div style={{backgroundColor: 'white'}}>Stripe</div></button> 
                            </>
                            : (
                            <>
                            <div>{(gametype === 'standard') ? <>
                            <button className={'card ball'}  key={eightBall.number} style={{backgroundColor: eightBall.color,  opacity: eightBall.status ? 0.5 : 1, display: hideEightBall ? "flex" : "none" }}  onClick={handleEightBallClick}> 
                            <div className="ballNumber">
                            <div className={`${eightBall.type}`}> 
                             {`${eightBall.number}`}
                                        </div>
                                        
                                    </div>
                        </button></> : (
                        <div></div>)}
                        </div>
                            <div className="ballArray">
                            {userBallArray.map((ball) => (         
                                <button className={`card ball`} key={ball.number} disabled={endGame} style={{backgroundColor: ball.type === 'solid' || ball.type === 'special' ? ball.color : "#ffffff", opacity: ball.status ? 0.5 : 1 }}  onClick={handleClick}> 
                                    <div className={`${ball.type}`} style={{backgroundColor: ball.color}}>
                                        <div className="ballNumber">
                                            {`${ball.number}`} 
                                            </div>
                                    </div>
                                </button>
                                    )
                                )
                            }
                            </div>
                            </>
                    
                        )
                        }
                            <Button style={{width: "50%", alignItems: "center", justifyContent: "center", textAlign: "center", display: "flex"}} display="flex" hidden={!cutthroatEnd} onClick={startEndGameProcess}>End Game</Button>
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
                        



export { GameContainer }