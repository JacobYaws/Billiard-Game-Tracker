import React from 'react';
import Auth from '../../utils/auth';

const StatComponent = (props) => {
    const userId = Auth.getUser().data._id
    console.log(props?.gamedata)
    let gamedata = props?.gamedata;
    console.log(gamedata);
    let gameIdArray = [];
    let gametypeArray = [];
    let gameballArray = [];
    let totalPocketedCount = 0;
    let totalOnTableCount = 0;
    let totalBallCount = 0;
    let totalBallPercent = 0;
    console.log(totalBallPercent)


    const cleanData = () => {
        gamedata.forEach((value) => {
            gameIdArray.push(value._id);
            gametypeArray.push(value.gametype);
            value.balls.forEach((ball) => {
                
                if (ball.assigneduser === userId) {
                    totalBallCount++
                    if (ball.status) {
                        totalPocketedCount++;
                    } else {
                        totalOnTableCount++;
                    }
                    

                }
                

            })
        });
        console.log(totalPocketedCount);
                    console.log(totalOnTableCount);
                    console.log(totalBallCount);
        totalBallPercent = Math.floor((totalPocketedCount / totalBallCount) * 100)
        console.log(totalBallPercent)
        // console.log(gameballArray);
        gameballArray.forEach((ball) => {
            

        })
        
    };
   

    cleanData();
    return(
        <>
    <div>
        Total Pocketed Count: {totalPocketedCount}
    </div>
    <div>
        Total Left on Table Count: {totalOnTableCount}
    </div>
    <div>
        Total Percent: {totalBallPercent}
    </div>
    <div>
 
    </div>
    </>
)}

export default StatComponent