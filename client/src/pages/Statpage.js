import React from 'react';
import { useQuery } from  '@apollo/client';
import StatComponent from '../components/StatComponent/StatComponent'
import { QUERY_SINGLE_GAME, QUERY_MULTIPLE_GAMES } from '../utils/queries';
import Auth from '../utils/auth'

const StatPage = () => {
    const userId = Auth.getUser().data._id
    console.log(userId)
    const {loading, data, error} = useQuery(
        userId ? QUERY_MULTIPLE_GAMES : QUERY_SINGLE_GAME,
        { variables: {userId: userId} }
    ) 
        
        console.log(data?.multipleGames)
        let gamedata = data?.multipleGames;
        console.log(loading)
        
    return(
        <>
        <div>
        {loading ? (
            <div>Loading</div>
        ) : ( 
        
        <div>
            <StatComponent gamedata={gamedata}>Div</StatComponent>
            </div>
        // <div>
        //     Hello World
        // </div>


)}
        </div>
        </>
        
        
    )
}

export default StatPage