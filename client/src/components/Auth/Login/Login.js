import React, { useState, useEffect } from 'react';
import '../auth.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Welcome } from '../../Layout/Welcome'
import { loginUserRequest, clearErrors } from '../../../redux/auth/actions'
import { Spinner } from '../../Spinner'

export const Login = (props) => {
    const auth = useSelector(state=> state.auth)
    const dispatch = useDispatch()

    const { isAuth, errors, loading } = auth
    const { history } = props

    const [loginForm, setloginForm] = useState({
        username: '',
        password: ''
    })

    const {username, password} = loginForm

    useEffect(()=>{
        if(isAuth) history.push('/')
    }, [isAuth, history])

    useEffect(()=>{
        return ()=> dispatch(clearErrors())
    }, [])

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
                    >
                        {loading ? <Spinner/> : 'Login'}
                    </button>
                </form>
                <div className="question-form">
                    <p>Dont you have an account? <Link to='/register' className="blue-link">Register</Link></p>
                </div>
            </div>
        </Welcome>
    )
}