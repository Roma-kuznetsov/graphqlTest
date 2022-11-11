import React from "react";
import { useState } from "react";
import style from "./AuthPage.module.css";

const AuthPage = (props) => {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = event => {
        event.preventDefault();

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        let requestBody = {
            query: `
                query{
                    login(email:"${email}",password:"${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };
        
        if (!isLogin) {
            requestBody = {
                query: `
                    mutation{
                        createUser(userInput:{email: "${email}", password: "${password}"}) {
                            _id
                            email
                        }
                    }
                `
            }
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error("Failed!")
                }
                return res.json()
            })
            .then(resData => {
                console.log(resData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <form className={style.auth_form} onSubmit={submitHandler}>
            <div className={style.form_control}>
                <label htmlFor="email"><b>Email adress</b></label>
                <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.currentTarget.value) }} />
            </div>
            <div className={style.form_control}>
                <label htmlFor="password"><b>Password</b></label>
                <input type="password" id="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }} />
            </div>
            <div className={style.form_actions}>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => { setIsLogin(!isLogin) }}>Switch to {isLogin ? 'Signup' : 'Login'}</button>
            </div>
        </form>
    );
};

export default AuthPage;