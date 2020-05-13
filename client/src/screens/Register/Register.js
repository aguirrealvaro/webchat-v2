import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { registerUserRequest, clearErrors } from '../../redux/auth/actions'
import { Spinner, Welcome } from '../../components'
import "./auth.scss";

export const Register = props => {
  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  const { isAuth, errors, loading } = auth
  const { history } = props

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    password2: ""
  });

  const { username, password, password2 } = registerForm;

  useEffect(() => {
    if (isAuth) history.push("/");
  }, [isAuth, history]);

  useEffect(()=>{
    return ()=> dispatch(clearErrors())
}, [])

  const handleChange = e => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const dataRegister = {
      username,
      password,
      password2
    };
    dispatch(registerUserRequest(dataRegister));
  };

  return (
    <Welcome>
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <legend>Register</legend>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
            style={{
              border: errors && errors.user ? "1px solid red" : undefined
            }}
          ></input>
          {errors && errors.user && (
            <span className="show-error">{errors.user}</span>
          )}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            style={{
              border: errors && errors.password ? "1px solid red" : undefined
            }}
          ></input>
          {errors && errors.password && (
            <span className="show-error">{errors.password}</span>
          )}
          <label htmlFor="password2">Confirmation password:</label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={password2}
            onChange={handleChange}
            style={{
              border: errors && errors.password2 ? "1px solid red" : undefined
            }}
          ></input>
          {errors && errors.password2 && (
            <span className="show-error">{errors.password2}</span>
          )}
          <button
            className="submit-auth"
            type="submit"
            disabled={!username || !password || !password2 ? true : false}
          >
            {loading ? <Spinner/> : 'Register'}
          </button>
        </form>
        <div className="question-form">
          <p>
            Alredy have an account?{" "}
            <Link to="/login" className="blue-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Welcome>
  );
};
