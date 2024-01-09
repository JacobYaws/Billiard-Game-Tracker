// import { LobbyContainer, LobbySidebar } from '../components/Lobby/JoinedUsers';
import JoinedUsers from '../components/Lobby/JoinedUsers';
// import GameSelect from '../components/Lobby/GameSelect';
import React, { useState, useEffect, useRef } from 'react';
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Container, Modal, Button, Row, Col, Overlay, OverlayTrigger, Popover } from 'react-bootstrap';
// import { Navbar, Nav, Tab, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_LOBBY, QUERY_SINGLE_USER, QUERY_USERS } from '../utils/queries';
import { CREATE_GAME, LEAVE_LOBBY, REMOVE_LOBBY_USERS } from '../utils/mutations';
// import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
// import 'bootstrap/dist/css/bootstrap.min.css'

const Lobby = () => {
let gametype = "";
const { lobbyId } = useParams();
const [show, setShow] = useState(false);
const [createGame] = useMutation(CREATE_GAME);
const [leaveLobby] = useMutation(LEAVE_LOBBY);
const [removeUsers] = useMutation(REMOVE_LOBBY_USERS)
const { loading, error, data } = useQuery(
    lobbyId ? QUERY_SINGLE_LOBBY : QUERY_SINGLE_USER,
    {
        variables: {lobbyId: lobbyId},
        pollInterval: 500,
    }
    );

const [lobbySize, setLobbySize] = useState(data?.lobby.users);
const [lobbyGametype, setGametype] = useState("cutthroat")
const [disableButton, setDisableButton] = useState(true);
const [users, setUsers] = useState(data?.lobby.users);
    useEffect(() => {
        if (data) {
            setUsers(data.lobby.users)
            setLobbySize(data.lobby.users.length)
        }
        // setLobbySize(lobbySize)
    // }, [])
    }, [loading, data])
    if (loading) return "Loading.........................."
    if (error) return `Error  ${error.message}`
    // console.log(typeof lobbySize)

    // let startButton = document.getElementsByClassName("start-button");
    // const getGametype = (event) => {
    //     event.preventDefault();
    //     let text = (event.target.id)
    //     gametype = text.toString();
    //     console.log(gametype)
    //     return gametype = gametype
    // }

    function check() {
        console.log('check')
    }
    const getGametype = (event) => {
        event.persist();
        console.log("click");
        console.log(users.length);
        console.log(lobbySize);
        console.log(lobbyGametype);
        let text = (event.target.id);
        gametype = text.toString();
        setLobbySize(users.length);
        setGametype(gametype);
        console.log(lobbySize);
        console.log(gametype);
        

        if (lobbySize !== "") {
            console.log("lobbysize empty")
        if (gametype == "cutthroat") {
            console.log(lobbySize)
            console.log("working")
            if (lobbySize == 3 || lobbySize == 5) {
                setDisableButton(false);
            } else {
                setDisableButton(true)
            }

        
    } else if (gametype !== "cutthroat" && lobbySize === 2) {
        setDisableButton(false) 
    } else {
        setDisableButton(true)
    }
}
   


        
    }
    
    let gametypeUpper = (lobbyGametype.slice(0, 1).toUpperCase() + lobbyGametype.slice(1));

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
    // console.log(gametype)
        const userId = Auth.getUser().data._id;
        // const gametype = getGameType
        console.log(gametype)
        const userIds = users;
        try {
            const mutationResponse = await createGame({
                variables: { users: userIds, gametype: lobbyGametype}
            })
            
            let newGame = mutationResponse.data;
            let newGameId = newGame.createGame._id;
            // console.log(mutationResponse);
            // console.log(newGameId)
            window.location.href = (window.location.origin + "/game/" + newGameId)
            
        } catch (e) {
            console.log(gametype)
            console.error(e)
            return {
                code: e.extensions.response.status,
                success: false,
                message: e.extensions.response.body,
                track: null
            };
        }
        try {
            const mutationResponse = await removeUsers({
                variables: { users: userIds, lobbyId: lobbyId}
            })

            console.log(mutationResponse)
        } catch (e) {
            console.log(gametype)
            console.error(e)
            return {
                code: e.extensions.response.status,
                success: false,
                message: e.extensions.response.body,
                track: null
            };
    };
    
}
const inviteCode = () => {
        navigator.clipboard.writeText(lobbyId);
        setShow(!show)
        return 
}

const copied = (
    <Popover id="popover-basic">
        <Popover.Body>Copied</Popover.Body>
    </Popover>
)
return (
  
    <div className="flex-row justify-center">
        {loading ? (
            <div>Loading.....................</div>
        ) : (   
        <div className="container px-4 text-center">
        {/* <div>{`${lobbyGametype}`}</div> */}
            {/* <GameSelect /> */}
            {/* </GameSelect> */}
            <div className="row">
        <div className="col">
            <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#cutthroat-select" aria-expanded="false" aria-controls="collapseExample">
                    Cutthroat
                </button>
                <div className="collapse" id="cutthroat-select">
                    <div className="card card-body">
                        A 3 or 5 player game where each user will get a group of balls (5 for 3 players, 3 for 5 players). 
                        Pocket your opponents balls before yours are pocketed. 
                    </div>
                <Button onClick={(event) => getGametype(event)} id="cutthroat">Select</Button>
                    {/* <Button onClick={getGametype} id="cutthroat">Select</Button> */}
                </div>
            </div>
        </div>
        <div className="col">

            <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#standard-select" aria-expanded="false" aria-controls="collapseExample">
                    Standard
                </button>

                <div className="collapse" id="standard-select">
                    <div className="card card-body">
                        A two-player game where each player has to pocket their set of balls (solid or striped). 
                        The game ends once a player pockets their set of balls and then the 8 ball.
                    </div>
                    {/* <Button onClick={getGametype} id="standard">Select</Button> */}
                <Button onClick={(event) => getGametype(event)} id="standard">Select</Button>
                
                </div>
            </div>
        </div>
        <div className="col">
        <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#nineball-select" aria-expanded="false" aria-controls="collapseExample">
                Nine-Ball
            </button>
            <div className="collapse" id="nineball-select">
                <div className="card card-body">
                    A two-player game where the objective is to pocket each ball in numerical order. 
                </div>
                <Button onClick={(event) => getGametype(event)} id="nineball">Select</Button>
            </div>
        </div>
        </div>
    </div>
    <div className="col-md-3 p-3">
    <JoinedUsers users={users} />
    </div> 
    <div className="row gx-5">
        <div className="col-md-3 p-3">
            <Button as={Link} to="/" onClick={leaveLobbySubmit} className="leave-button">Leave lobby</Button> 
        </div>
        <div className = "col-md-3 p-3">
            <Button onClick={createGameSubmit} className="start-button" disabled={disableButton}>Start game
            <div>
             <strong>{`${gametypeUpper}`}</strong>
            </div></Button>
        </div>
        <div className = "col-md-3 p-3">
            <OverlayTrigger trigger="click" placement="top" overlay={copied} rootClose>
            <Button onClick={inviteCode}>
                Copy Lobby Invite Code
            </Button>
            </OverlayTrigger>
        </div>
    </div>
</div>

    )}
    </div>
   
)
}

export default Lobby
