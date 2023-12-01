// import React, {Component} from "react"
// import { useQuery } from '@apollo/client';
// import { QUERY_SINGLE_LOBBY } from "../../utils/queries";


// class LobbyContainer extends Component {
// //     constructor(props) {
// //         super(props);

// //         this._joinGame = (game) => {
// //             console.log(`TODO: Join game ${game.gametype}`)
// //         }
// //     }

// //     render() {
// //         // if (loading) return 'Loading...';
// //         // if (error) return `Error ${error.message}`;
// //         // const games = [];
// //     //    console.log(data)


// //         return (
// //             <div className="c-lobby">
// //                 <p>Lobby homepage</p>
// //                 {/* <GameList games={games} joinGame={this._joinGame} /> */}
// //             </div>
// //     )
// // }
// }

// class LobbySidebar extends Component {
//     // constructor(props) {
//     //     super(props);

//     //     this._login = () => {
//     //         console.log("TODO: Put login here")
//     //     }

//     //     this._createGame = () => {
//     //         console.log("TODO: Put createGame here")
//     //     }
//     // }

//     // render() {
//     //     const canCreateGame = true;
//     //     const createGameInProgress = false;

//     //     return (
//     //         <section className="c-lobby-sidebar">
//     //             <div className="m-sidebar-actions">
                    
//     //                 {!canCreateGame ? null :
//     //                     <button
//     //                     onClick={this._createGame}
//     //                     disabled={createGameInProgress}
//     //                     className="m-button good">
//     //                         Create Game Button
//     //                     </button> 
//     //                     }
//     //             </div>
//     //         </section>
//     //     )
//     // }
// }
// export { LobbyContainer, LobbySidebar }


import React from 'react'

function JoinedUsers(props) {
    return (
        <ul className="list-group">
        {props.users.map((users) => (
            <li className="list-group-item" key={users.id}>

            </li>
            
        ))}
        </ul>
    )
}

export default JoinedUsers