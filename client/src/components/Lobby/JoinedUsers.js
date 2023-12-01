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


import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MULTIPLE_USERS, QUERY_SINGLE_USER, QUERY_USERS } from '../../utils/queries';


function JoinedUsers(props) {
    console.log("props: ")
    console.log(props)    
    const userData = useQuery(
            props.users?.length > 1 ? QUERY_MULTIPLE_USERS : QUERY_SINGLE_USER,
            {
                variables: {userId: props.users},
                
                // fetchPolicy: 'network-only'
            }
            ); 

            // if (loading) return "Loading..."
            // if (error) return `Error  ${error.message}`
            let users = []
            if (userData !== undefined && userData.data !== undefined) {
                console.log(userData)
                users = userData.data.multipleUsers
            }
            // console.log(userData.data)
    
    console.log(userData)
    console.log(users)
    console.log("props: " + props)
    console.log(props)
    console.log("JoinedUsersComponent")
    // let userArray = userData.data.multipleUsers
    return (
        <>
        <div className="flex-row justify-center">
            {users.length === 0 ? (
            // {userData !== undefined && userData.data !== undefined && userData.data.multipleUsers !== undefined ? (
                <div>Loading... L</div>
            ) : (
        <div>
            <h1>gjjkldsa;jgs</h1>
        <ul className="list-group">
        {users.map((user) => (
            <li className="list-group-item" key={user.username}>
                {`${user.username}`}
            </li>
            
        ))}
        
        </ul>
        
        </div>
        )}
        </div>
        </>
    )
}

export default JoinedUsers