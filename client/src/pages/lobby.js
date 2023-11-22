import { LobbyContainer, LobbySidebar } from '../components/Lobby/Lobbycomponents';
import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Container, Modal, Button } from 'react-bootstrap';
// import { Navbar, Nav, Tab, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_LOBBY, QUERY_SINGLE_USER } from '../utils/queries';


const Lobby = () => {
const { lobbyId } = useParams();
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