import React, {Component} from "react"
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from "../../utils/queries";

const GameContainer = (props) => {
    console.log(props)
    console.log(props.length)
        return (
            <>
            <div className="flex-row justify-center">
        
                    {props.balls == undefined ? (
                    // {userData !== undefined && userData.data !== undefined && userData.data.multipleUsers !== undefined ? (
                        <div>Loading...</div>
        
                    ) : (
        
                <div>
                    <h2>Ball Array</h2>
                    <div className="row">
                <div className="row">
                {props.balls.map((ball) => (
                    
                    <div className="card ball" key={ball.number}>
                        {`${ball.number}`}
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