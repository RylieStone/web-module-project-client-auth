import React from "react";
import { useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const initialValues = {
    username: '',
    password: ''
}
const USERNAME = 'username'
const PASSWORD = 'password'
const RESET = 'reset'
const reducer = (state, action) => {
    switch(action.type) {
        case USERNAME: return {...state, username: action.payload}
        case PASSWORD: return {...state, password: action.payload}
        case RESET: return initialValues
        default: return state
    }
}
function login() {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialValues)
    const onChange = (e) => {
        const {value, name} = e.target
        if (name == USERNAME) {
            dispatch({type: USERNAME, payload: value})
        } else {
            dispatch({type: PASSWORD, payload: value})
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:9000/api/login', state).then(res => {
            dispatch({type: RESET})
            localStorage.setItem('token', res.data.token)
            navigate('/friendList')
        }).catch(err => console.log(err))
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input placeholder="Type Username" name="username" id="username" onChange={onChange} value={state.username}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input placeholder="Type Password" name="password" id="password"  type='password' onChange={onChange} value={state.password}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default login