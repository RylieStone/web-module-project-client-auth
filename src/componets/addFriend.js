import React, { useEffect } from "react";
import { useReducer } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const initialValues = {
    name: '',
    email: ''
}
const NAME = 'name'
const EMAIL = 'email'
const RESET = 'reset'
const reducer = (state, action) => {
    switch(action.type) {
        case NAME: return {...state, name: action.payload}
        case EMAIL: return {...state, email: action.payload}
        case RESET: return initialValues
        default: return state
    }
}
function addFriend() {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialValues)

    useEffect(() => {
        localStorage.getItem('token') ? navigate('/addFriend') : navigate('/')
    }, [])
    
    const onChange = (e) => {
        const {value, name} = e.target
        if (name == NAME) {
            dispatch({type: NAME, payload: value})
        } else {
            dispatch({type: EMAIL, payload: value})
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:9000/api/friends', state, {headers: {authorization: localStorage.getItem('token')}}).then(res => {
            dispatch({type: RESET})
            navigate('/friendList')
        }).catch(err => console.log(err))
    }
    return(
        <div>
            <h1>Add Friend</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input placeholder="Type a name" name="name" id="name" onChange={onChange} value={state.name}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input placeholder="Type a email" name="email" id="email" onChange={onChange} value={state.email}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default addFriend