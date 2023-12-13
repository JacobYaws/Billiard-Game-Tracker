import React, {Component, useState, useEffect} from "react";

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import { CHANGE_BALL_STATUS } from "../../utils/mutations";
import Auth from '../../utils/auth'
import { Link, useParams } from 'react-router-dom';


const GameContainer = (props) => {
    // class App extends React.Component {
    //     render() {
    //         return <h1>App {this.props.data}</h1>
    //     }
    // }
    // class BallArray extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         console.log(props.balls)
    //         // this.state = props.balls.status
            
    //         }
    //         render() {
    //             return (
    //                 // <div>Hello {this.state}</div>
    //                 <div className="row">
    //                     {userBallArray.map((ball) => (                   
    //                         <button className={`card ball`} key={ball.number} style={{backgroundColor: ball.color, opacity: 1}}  onClick={handleClick}>
    //                         <div className={`${ball.type}`}> {/* Solid or stripe element */}
    //                             <div className="ballNumber" style={{backgroundColor: ball.color}}>
    //                                 {`${ball.number}`}
    //                             </div>
    //                         </div>
    //                         </button>
    //                     ))}
    //                     </div>
    //             )
    //         }
    //     }

    
    const gameId = useParams();
    const userId = Auth.getUser().data._id
    // const [showGameBalls, setGameBallShow] = useState(false)
    // useEffect(() => {
    //     setGameBallShow((showGameBalls) => !showGameBalls)
    // })
    let userArray = props.users;
    let ballArray = props.balls;
    let gametype = props.gametype;
    let userBallArray = [];
    const [changeStatus] = useMutation(CHANGE_BALL_STATUS);
    let gameBallArray = [];
    if (userArray !== undefined) {
        if (gametype == 'standard') {
            // setGameBallShow(showGameBalls);
            // userBallArray.push(ballArray)
            for (let i = 0; i< ballArray.length; i++) {
                gameBallArray.push(ballArray[i]) 
            }
        // if ()
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
    
    // let toggleOpacity = !isToggled ? 1 : 0.5;
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

        let newGameId = gameId.gameId
        
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
    

        return (
            <>
            <div className="flex-row justify-center">
        
                    {props.balls === undefined ? (
                    // {userData !== undefined && userData.data !== undefined && userData.data.multipleUsers !== undefined ? (
                        <div>Loading...</div>
        
                    ) : (
        
                <div>
                    {/* <App /> */}
                    <h1>Ball Array</h1>
                    <div className="row" style={{maxWidth: '50%'}}>
                    {/* <BallArray /> */}
                    <div>
                        {/* {showGameBalls ? <div>Hello</div> : <div></div>} */}
                      <div className="row"> 
                        {userBallArray.map((ball) => (         
                          <button className={`card ball`} key={ball.number} style={{backgroundColor: ball.color, opacity: ball.status ? 0.5 : 1 }}  onClick={handleClick}> 
                           <div className={`${ball.type}`}> 
                              <div className="ballNumber" style={{backgroundColor: ball.color}}> 
                                        {`${ball.number}`} 
                                    </div> 
                                    </div>
                             </button> 
                        ))}
                        
                        </div> 
                        </div>
                    </div>
                </div>
                )}
        
            </div>
            </>
            )
    
    
                        }      
                        

const GameSidebar = () => {

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