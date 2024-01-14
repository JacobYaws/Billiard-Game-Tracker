import React from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_MULTIPLE_USERS } from '../../utils/queries';
import '../styles/JoinedUsers.css'


function JoinedUsers(props) {
    const userData = useQuery(

            QUERY_MULTIPLE_USERS,
            {
                variables: {userId: props.users},
                enabled: props.users?.length > 0,

            }
            ); 

            let users = []
            
            if (userData !== undefined && userData.data !== undefined) {
                users = userData.data.multipleUsers
            }
 
    return (
        <>
    <div className="flex-row">

            {users.length === 0 ? (
                <div>Loading...</div>
            ) : (
        <div>
            <h2>Joined Users</h2>
        <ul className="list-group " id="joined-users">
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