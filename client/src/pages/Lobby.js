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
import { CREATE_GAME, LEAVE_LOBBY, REMOVE_LOBBY_USERS, UPDATE_LOBBY_GAMETYPE } from '../utils/mutations';
// import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
// import 'bootstrap/dist/css/bootstrap.min.css'

const Lobby = () => {
let gametype = "";
const { lobbyId } = useParams();
const [show, setShow] = useState(false);
const [createGame] = useMutation(CREATE_GAME);
const [leaveLobby] = useMutation(LEAVE_LOBBY);
const [removeUsers] = useMutation(REMOVE_LOBBY_USERS);
const [updateGametype] = useMutation(UPDATE_LOBBY_GAMETYPE);
const { loading, error, data } = useQuery(
    lobbyId ? QUERY_SINGLE_LOBBY : QUERY_SINGLE_USER,
    {
        variables: {lobbyId: lobbyId},
        pollInterval: 500,
    }
    );

const [lobbySize, setLobbySize] = useState(data?.lobby?.users?.length);
const [lobbyGametype, setGametype] = useState("")
const [disableButton, setDisableButton] = useState(true);
const [users, setUsers] = useState(data?.lobby?.users);
console.log(lobbySize)
    useEffect(() => {
        if (data) {
            console.log(data)
            setLobbySize(data?.lobby?.users?.length);
            setUsers(data?.lobby?.users);
            console.log("lobbySize: " + lobbySize);
            console.log("users.length" + data?.lobby?.users?.length);
            setGametype(data?.lobby?.gametype);
            // setDisableButton(() => {
            //     console.log(!checkGameReadyStatus())
            //     return !checkGameReadyStatus();
            // })
            setDisableButton(!checkGameReadyStatus(data?.lobby?.users?.length));
            console.log("disablebutton: " + disableButton);
        }
        
        // setLobbySize(lobbySize)
    // }, [])
    }, [loading, data, disableButton])
    if (loading) return "Loading.........................."
    if (error) return `Error  ${error.message}`
    console.log(data)
    // console.log(typeof lobbySize)

    // let startButton = document.getElementsByClassName("start-button");
    // const getGametype = (event) => {
    //     event.preventDefault();
    //     let text = (event.target.id)
    //     gametype = text.toString();
    //     console.log(gametype)
    //     return gametype = gametype
    // }
    console.log(users)
    console.log(disableButton)
    console.log(lobbySize)
    
    const getGametype = async (event) => {
        event.persist();
        console.log("click");
        console.log(users.length);
        console.log(lobbySize);
        console.log(lobbyGametype);
        let text = (event.target.id);
        gametype = text.toString();
        // setLobbySize(users.length);
        // setUsers(users)
        setGametype(gametype);
        console.log(lobbySize);
        console.log(gametype);
        
        console.log(lobbyId)
        // checkGameReadyStatus();

        try {
            const mutationResponse = await updateGametype({
                variables: { lobbyId: lobbyId, gametype: gametype}
            })
            
            
            console.log(mutationResponse);
            
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
    //     if (lobbySize !== "") {
    //         console.log(gametype)
    //     if (gametype == "cutthroat") {
    //         console.log(lobbySize)
    //         console.log("working")
    //         if (lobbySize == 3 || lobbySize == 5) {
    //             setDisableButton(false);
    //         } else {
    //             setDisableButton(true)
    //         }

    // } else if (gametype !== "cutthroat" && lobbySize === 2) {
    //     setDisableButton(false) 
    // } else {
    //     setDisableButton(true)
    // }
}

const checkGameReadyStatus = (lobbySize2) => {
if (lobbySize2 !== "") {
    console.log(lobbyGametype)
    console.log(lobbySize2)
if (lobbyGametype == "cutthroat") {
    console.log(lobbySize2)
    console.log("working")
    if (lobbySize2 == 3 || lobbySize2 == 5) {
        return false;
    } else {
        return true;

    }

} else if ((lobbyGametype === "nineball" || lobbyGametype === "standard")  && lobbySize2 == 2) {
    return false;
} else {
    return true;
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
  
    <div className="flex-row justify-center lobbyContainer">
        {loading ? (
            <div>Loading.....................</div>
        ) : (   
        <div className="col px-4 text-center gameSelect">
        {/* <div>{`${lobbyGametype}`}</div> */}
            {/* <GameSelect /> */}
            {/* </GameSelect> */}
            <div className="row">
        <div className="col gameSelectButton">
            <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#cutthroat-select" aria-expanded="false" aria-controls="collapseExample">
                    Cutthroat
                </button>
                <div className="collapse" id="cutthroat-select">
                    <div className="card card-body">
                        A 3 player game where each user will get a group of balls (5 per player). 
                        Pocket your opponents balls before yours are pocketed. 

                <Button onClick={(event) => getGametype(event)} id="cutthroat">Select</Button>
                    </div>
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
                <Button onClick={(event) => getGametype(event)} id="standard">Select</Button>
                    </div>
                    {/* <Button onClick={getGametype} id="standard">Select</Button> */}
                
                </div>
            </div>
        </div>
        <div className="col">
        <div className="card" style={{maxWidth: '20rem', minWidth: '5rem', marginTop: '1rem'}}>
            <button className="btn btn-secondary" disabled="true" type="button" data-bs-toggle="collapse" data-bs-target="#nineball-select" aria-expanded="false" aria-controls="collapseExample">
                Nine-Ball 
            </button>
            <h6 style={{fontSize: "10px"}}>In Progress</h6>
            <div className="collapse" id="nineball-select">
                <div className="card card-body">
                    A two-player game where the objective is to pocket each ball in numerical order. 
                <Button onClick={(event) => getGametype(event)} id="nineball">Select</Button>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div className="col-md-12 p-3 joinedUsers">
    <JoinedUsers users={users} />
    </div> 
    <div className="lobbyButtonGroup">
        
        <div className="lobby-invite">
            <OverlayTrigger trigger="click" placement="top" overlay={copied} rootClose>
            <Button onClick={inviteCode}>
                Copy Lobby Invite Code
            </Button>
            </OverlayTrigger>
        </div>
        <div >
            <Button onClick={createGameSubmit} className="start-button" disabled={!disableButton}>Start game
            <div>
             <strong>{`${gametypeUpper}`}</strong>
            </div></Button>
        </div>
        {/* <div > */}
            <Button as={Link} to="/" onClick={leaveLobbySubmit} className="leave-button">Leave Lobby</Button> 
        {/* </div> */}
       
    </div>
</div>

    )}
    </div>
   
)
}

export default Lobby
