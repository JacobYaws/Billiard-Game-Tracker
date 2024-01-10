import React from 'react';
import Auth from '../../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/StatComponent.css'


const StatComponent = (props) => {
    console.log(props)
    const userId = Auth.getUser().data._id
    let gamedata = props?.gamedata;
    let gameIdArray = [];
    let gametypeArray = [];
    // let gameballArray = [];
    // let cleanDataArray = [];
    let totalPocketedCount = 0;
    let totalOnTableCount = 0;
    let totalBallCount = 0;
    let totalBallPercent = 0;
    let userBallStatsGame = [];
    let singleGameData = []; 
    let gameChamp = false;

    const cleanGameData = () => {
        gamedata.forEach((value) => {
            console.log(value)
            let gametype = value.gametype;
            let gameId = value._id;
            gameIdArray.push(value._id);
            let gametypeStart = gametype.charAt(0);
            let gametypeEnd = gametype.slice(1);
            let gametypeUpper = gametypeStart.toUpperCase();
            let newGametype;
            let inPocket = 0;
            let onTable = 0;
            let percent;

            if (gametype === "cutthroat") {
                console.log("cutthroat")
            }

            if (gametype === "nineball") {
                let nineballStart = gametype.slice(1, 4);
                let nineballEnd = gametype.slice(5, 8);
                let nineBallEndFirst = gametype.charAt(4);
                let nineBallEndUpper = nineBallEndFirst.toUpperCase();
                newGametype = gametypeUpper + nineballStart + "-" + nineBallEndUpper + nineballEnd;
            } else {
                newGametype = gametypeUpper + gametypeEnd;
            }


            gametypeArray.push(newGametype);
            
            value.balls.forEach((ball) => {
                if (ball.assigneduser === userId) {
                    userBallStatsGame.push(ball);
                    totalBallCount++;
                    if (ball.status) {
                        totalPocketedCount++;
                        inPocket++;
                    } else {
                        totalOnTableCount++;
                        onTable++;
                    }
                }
            })
            
            if (onTable === 0) {
                gameChamp = true;
            }
            
            percent = (inPocket / (inPocket + onTable) * 100)
            if (gametype === "standard") {
                percent = (inPocket / 8 ) * 100
            }
            let singleGameObject = {gametype: newGametype, gameId: gameId, inPocket: inPocket, onTable: onTable, percent: percent, gameChamp: gameChamp }
            inPocket = 0;
            onTable = 0;
            percent = 0;
            singleGameData.push(singleGameObject)
            
           
        });
        
        totalBallPercent = Math.floor((totalPocketedCount / totalBallCount) * 100)
    };
   

    cleanGameData();
    return(
        <>
        <div className="total-stats card">
    <div>
        Total Pocketed Count: {totalPocketedCount}
    </div>
    <div>
        Total Left on Table Count: {totalOnTableCount}
    </div>
    <div>
        Total Percent: {totalBallPercent}
    </div>
    </div>
    <div className="flex-container">
    {singleGameData.map((game) => (
        
    <div className="card" key={game.gameId}>
        <div className="card-body">
            <h5 className="card-title">{game.gametype}</h5>
            <p className="card-text">{game.gameId}</p>
            <p className="card-text">Pocketed balls: {game.inPocket}</p>
            <p className="card-text">Balls left on the table: {game.onTable}</p>
            <p className="card-text">Pocketed performance: {game.percent}%</p>
            {game.gameChamp ? ( <><div>Winner</div></> ) : ( <></> )}
            <p className="card-text">{game.gameChamp}</p>
            {/* <a href="#" class="btn btn-primary">{game.balls.number}</a> */}
        </div>
    </div>
    
    ))}
    </div>
    </>
)}

export default StatComponent