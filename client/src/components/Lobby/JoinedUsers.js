import React from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_MULTIPLE_USERS, QUERY_SINGLE_USER } from '../../utils/queries';
import '../styles/JoinedUsers.css'


function JoinedUsers(props) {
    const userData = useQuery(
            props.users?.length > 0 ? QUERY_MULTIPLE_USERS : QUERY_SINGLE_USER,
            {
                variables: {userId: props.users},
                
                // fetchPolicy: 'network-only'
            }
            ); 

            // if (loading) return "Loading..."
            // if (error) return `Error  ${error.message}`
            let users = []
            if (userData !== undefined && userData.data !== undefined) {
                // console.log(userData)
                users = userData.data.multipleUsers
            }
            // console.log(userData.data)
    
    // console.log(userData)
    // console.log(users)
    // console.log("props: " + props)
    // console.log(props)
    // console.log("JoinedUsersComponent")
    // let userArray = userData.data.multipleUsers
    return (
        <>
    <div className="flex-row justify-center">

            {users.length === 0 ? (
            // {userData !== undefined && userData.data !== undefined && userData.data.multipleUsers !== undefined ? (
                <div>Loading...</div>

            ) : (

        <div>
            <h2>Joined Users</h2>
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