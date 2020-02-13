import React, { useState, useEffect } from 'react';
import '../Register/auth.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Welcome from '../../Layout/Welcome/Welcome'
import { loginUserRequest } from '../../../redux/auth/actions'

export const Login = (props) => {
    const auth = useSelector(state=> state.auth)
    const dispatch = useDispatch()

    const { isAuth, errors } = auth
    const { history } = props

    const [loginForm, setloginForm] = useState({
        username: '',
        password: ''
    })

    const {username, password} = loginForm

    useEffect(()=>{
        if(isAuth) history.push('/')
    }, [isAuth, history])

    const handleChange = (e) =>{
        const {name, value} = e.target
        setloginForm({
            ...loginForm,
            [name]: value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const dataLogin  = {
            username,
            password
        }
        dispatch(loginUserRequest(dataLogin))
    }

    return ( 
        <Welcome>
            <div className="auth-container">
                <form onSubmit={handleSubmit} >
                    <legend>Login</legend>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={username}
                        style={{border: errors && errors.user ? '1px solid red': undefined}}
                    ></input>
                    {errors && errors.user && <span className="show-error">{errors.user}</span>}
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                        style={{border: errors && errors.password ? '1px solid red': undefined}}
                    ></input>
                    {errors && errors.password && <span className="show-error">{errors.password}</span>}
                    <button 
                        className="submit-auth" 
                        type="submit"
                        disabled={!username || !password ? true : false}
                    >Login</button>
                </form>
                <div className="question-form">
                    <p>Dont you have an account? <Link to='/register' className="blue-link">Register</Link></p>
                </div>
            </div>
        </Welcome>
    )
}