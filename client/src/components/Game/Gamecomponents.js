import React, {Component} from "react"
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import Auth from '../../utils/auth'
const GameContainer = (props) => {
    const userId = Auth.getUser().data._id
    console.log(props)
    let userArray = props.users;
    let ballArray = props.balls;
    let gametype = props.gametype;
    console.log(userArray);
    console.log(ballArray);
    let userBallArray = [];
    
    if (userArray !== undefined) {
        // if (gametype == 'cutthroat') {}
    for (let i = 0; i < ballArray.length; i++) {
        console.log(ballArray[i].assigneduser)
        if (ballArray[i].assigneduser == userId) {
        userBallArray.push(ballArray[i])
        }
    }
    }
    console.log(userBallArray)
        return (
            <>
            <div className="flex-row justify-center">
        
                    {props.balls === undefined ? (
                    // {userData !== undefined && userData.data !== undefined && userData.data.multipleUsers !== undefined ? (
                        <div>Loading...</div>
        
                    ) : (
        
                <div>
                    <h1>Ball Array</h1>
                    <div className="row" style={{maxWidth: '50%'}}>
                <div className="row">
                {userBallArray.map((ball) => (

                    
                    
                    <div className="card ball stripe" key={ball.number} style={{backgroundColor: ball.color} }>
                        <div className="ballNumber">
                            <div className={`${ball.type}`}>
                                {`${ball.number}`}
                                
                            </div>
                            </div>
                    </div>
                ))}
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