import React, { useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function logout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.getItem('token') ?
        axios.post('http://localhost:9000/api/logout',{}, {headers: {authorization: localStorage.getItem('token')}}).then(res => {
        localStorage.removeItem('token')
        navigate('/')})
        .catch(err => console.log(err))
        : navigate('/')
    }, [])

    return(
    <div></div>
    )
}
export default logout