import React, {Component, useState, useEffect} from "react";

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import { CHANGE_BALL_STATUS, BALL_TYPE_SELECTION } from "../../utils/mutations";
import Auth from '../../utils/auth'
import { Link, useParams } from 'react-router-dom';

const GameContainer = (props) => {
 
    const gameId = useParams();
    const userId = Auth.getUser().data._id
    let userArray = props.users;
    let ballArray = props.balls;
    let gametype = props.gametype;
    let userBallArray = [];
    const [changeStatus] = useMutation(CHANGE_BALL_STATUS);
    const [updateBallStyleSelection] = useMutation(BALL_TYPE_SELECTION); // requires gameId, userId, ball number array
    let gameBallArray = [];

    const [showUserBalls, setShowUserBalls] = useState(false)
    const [selectUserBallArray, setSelectUserBallArray] = useState([])
    
    useEffect(() => {
        setShowUserBalls(() => {
            if (gametype === 'standard') {
                setShowUserBalls(false)
            } else {
                setShowUserBalls(true)
            }
        });
        // setSelectUserBallArray((selectUserBallArray) => [selectUserBallArray, userBallArray])
    }, [props])
    
    if (userArray !== undefined) {
        if (gametype == 'standard') {
            for (let i = 0; i< ballArray.length; i++) {
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

    const handleClick = async (e) => {
        e.preventDefault();
        e.persist()
        let currTarget = e.currentTarget;
        let checkOpacity 
        let number = currTarget.innerText
        checkOpacity = currTarget.style.opacity
        let selectedBall = userBallArray.find((currentValue) => {
            return currentValue.number == number
        });
        let newGameId = gameId.gameId // See if this can be set to a global variable without breaking everything.
        // Removing __typename from the ball object. The mutation response will error out if it is not removed.
        let newSelectedBall = {status: !selectedBall.status, number: selectedBall.number, color: selectedBall.color, assigneduser: selectedBall.assigneduser, type: selectedBall.type}
        try {
            const mutationResponse = await changeStatus({
                variables: { gameId: newGameId, ball: newSelectedBall }
            })
            console.log(mutationResponse)
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
            console.log(stripes)
            for (let i = 0; i < stripes.length; i++) {
                userBallArray.push(stripes[i]);
               }        
        }
        console.log(userBallArray)
        let newUserBallArray = [];
        userBallArray.forEach((userBallArray) => {
            let newBallObject = {status: userBallArray.status, number: userBallArray.number, color: userBallArray.color, assigneduser: userBallArray.assigneduser, type: userBallArray.type}
            newUserBallArray.push(newBallObject)
        })
        console.log(newUserBallArray)

        try {
            console.log(newGameId, userId, newUserBallArray)
            const mutationResponse = await updateBallStyleSelection({
                variables: { gameId: newGameId, users: userId, ball: newUserBallArray } 
            })
            console.log(mutationResponse)
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
                        
                        {(!showUserBalls && selectUserBallArray.length === 0) ? <>
                        <button className="card ball solid" id="solid-select" style={{backgroundColor: 'black'}} onClick={selectUserArray}>Solid</button> 
                        <button className="card ball stripe" id="stripe-select" style={{backgroundColor: 'yellow'}} onClick={selectUserArray}><div style={{backgroundColor: 'white'}}>Stripe</div></button> 
                        </>
                        : (
                        <>
                        {userBallArray.map((ball) => (         
                            <button className={`card ball`} key={ball.number} style={{backgroundColor: ball.color, opacity: ball.status ? 0.5 : 1 }}  onClick={handleClick}> 
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
                    )}
                        </div> 
                        {/* </div> */}
                    </div>
                </div>
                )}
        
            </div>
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

// class GameSidebar extends Component {
//     constructor(props) {
//         super(props);

       

//         this._login = () => {
//             console.log("TODO: Put login here")
//         }

//         this._createGame = () => {
//             console.log("TODO: Put createGame here")
//         }
//     }

//     render() {
//         const canLogin = true;
//         const canCreateGame = true;
//         const createGameInProgress = false;

//         return (
//             <section className="c-lobby-sidebar">
//                 <div className="m-sidebar-actions">
//                     {!canLogin ? null :
//                     <button className="m-button primary" onClick={this._login}>Login</button>}

//                     {!canCreateGame ? null :
//                         <button
//                         onClick={this._createGame}
//                         disabled={createGameInProgress}
//                         className="m-button good">
//                             Create Game
//                         </button> 
//                         }
//                 </div>
//             </section>
//         )
//     }
// }
export { GameContainer, GameSidebar }