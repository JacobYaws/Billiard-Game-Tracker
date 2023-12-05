// import { LobbyContainer, LobbySidebar } from '../components/Lobby/JoinedUsers';
import JoinedUsers from '../components/Lobby/JoinedUsers';
import GameSelect from '../components/Lobby/GameSelect';
import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
// import { Navbar, Nav, Tab, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_LOBBY, QUERY_SINGLE_USER, QUERY_USERS } from '../utils/queries';
import { CREATE_GAME, LEAVE_LOBBY } from '../utils/mutations';
// import 'bootstrap/dist/css/bootstrap.min.css'




const Lobby = () => {
const { lobbyId } = useParams();
const [createGame] = useMutation(CREATE_GAME);
const [leaveLobby] = useMutation(LEAVE_LOBBY);
const { loading, error, data } = useQuery(
    lobbyId ? QUERY_SINGLE_LOBBY : QUERY_SINGLE_USER,
    {
        variables: {lobbyId: lobbyId},
        pollInterval: 500,
    }
    );
const [users, setUsers] = useState(data?.lobby.users);

    useEffect(() => {
        if (data) {
            setUsers(data.lobby.users)
        }
    // }, [])
    }, [loading, data])

    if (loading) return "Loading.........................."
    if (error) return `Error  ${error.message}`

    

 
console.log("users: " + users)
    const lobbyUserData = data.lobby.users
    console.log(data)
    console.log("lobbyUserData: " + lobbyUserData)
    console.log(typeof lobbyUserData)

             
// let test = ["655d2f157fd43b865afd0e6c", "655d7a617fd43b865afd0ea2"]


    // const listUsers = () => {
    //     // console.log("testestsestestest")
    //     // console.log("test: " + data.lobby.users)
    //     // // setUsers(test)
    //     // console.log("Users: " + users)
    //     // console.log(users)
        
    //     setUsers(data.lobby.users)

    // //    setUsers(lobbyUserData)
    // }

    const leaveLobbySubmit = async (event) => {
        const userId = Auth.getUser().data._id;
        console.log(userId);
        try {
            const mutationResponse = await leaveLobby({
                variables: { users: userId, lobbyId: lobbyId}
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

  
    const createGameSubmit = async (event) => {
            const userId = Auth.getUser().data._id;
            const gametype = 'cutthroat'
            const users = [userId];
            try {
                const mutationResponse = await createGame({
                    variables: { users: users, gametype: gametype}
                })
                
                let newGame = mutationResponse.data;
                let newGameId = newGame.createGame._id;
                // console.log(mutationResponse);
                // console.log(newGameId)
                window.location.href = (window.location.origin + "/game/" + newGameId)
                
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


return (
  
    <div className="flex-row justify-center">
        {loading ? (
            <div>Loading.....................</div>
        ) : (   
        <div class="container px-4 text-center">
        
            <GameSelect />
            {/* </GameSelect> */}
        
            
            <div class="col-md-3 p-3">
                    <JoinedUsers users={users} />
            </div>
            
            <div class="row gx-5">
                <div class="col-md-3 p-3">
                    <Button as={Link} to="/" onClick={leaveLobbySubmit} className="leave-button">Leave lobby</Button> 
                </div>

                <div class = "col-md-3 p-3">
                    <Button onClick={createGameSubmit} className="start-button">Start game</Button>
                </div>
            </div> 
        </div>
      
    )}
    </div>
   
)
}

export default Lobby