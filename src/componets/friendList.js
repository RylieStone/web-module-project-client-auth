import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function friendList() {
    const navigate = useNavigate()
    const [friends, setFriends] = useState([])
    useEffect(() => {
        localStorage.getItem('token') ?
        axios.get('http://localhost:9000/api/friends', {headers: {authorization: localStorage.getItem('token')}}).then(res => setFriends(res.data))
        .catch(err => console.log(err)) : navigate('/')
    }, [])
    return(
        <div>
            <h1>friends List</h1>
            <ul>
            {friends ? friends.map(friend => {
                console.log(friend)
                return <li key={friend.id}>{friend.name} - {friend.email}</li>
            }) : 'please wait while friends load'}
            </ul>
        </div>
    )
}
export default friendList