import { LobbyContainer, LobbySidebar } from '../components/Lobby/Lobbycomponents';
import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Container, Modal, Button } from 'react-bootstrap';
// import { Navbar, Nav, Tab, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_LOBBY, QUERY_SINGLE_USER } from '../utils/queries';
import { CREATE_GAME } from '../utils/mutations';


const Lobby = () => {

const { lobbyId } = useParams();
const [createGame] = useMutation(CREATE_GAME);
const { loading, error, data } = useQuery(
    lobbyId ? QUERY_SINGLE_LOBBY : QUERY_SINGLE_USER,
    {
        variables: {lobbyId: lobbyId},
    }
    );
    if (loading) return "Loading..."
    if (error) return `Error  ${error.message}`
        const lobbyUserData = data.lobby.users
        console.log("data: " + { data })
        console.log(data)
        console.log("lobbyUserData: " + lobbyUserData)
        console.log(lobbyUserData.length)


    const createGameSubmit = async (event) => {
            const userId = Auth.getUser().data._id;
            const gametype = 'cutthroat'
            const users = [userId];
            console.log(users);
            try {
                const mutationResponse = await createGame({
                    variables: { users: users, gametype: gametype}
                })
                
                let newGame = mutationResponse.data;
                let newGameId = newGame.createGame._id;
                console.log(mutationResponse);
                console.log(newGameId)
                window.location.href = "game/" + newGameId
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
// const userList = lobbyUserData.map((users) =>
// <li>{users}</li>
// );


return (
    <>
    <div className="flex-row justify-center">
        {loading ? (
            <div>Loading...</div>
        ) : (
            <div>
            <LobbyContainer>
                <Button onClick={createGameSubmit}>gkldj;safj</Button>
                {/* <ul>{userList}</ul> */}
                </LobbyContainer>
            <LobbySidebar />
            </div>
    )}
    </div>
    </>
)
}

export default Lobby