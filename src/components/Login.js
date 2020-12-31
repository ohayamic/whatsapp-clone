import { Button } from '@material-ui/core'
import {googleAuth, auth} from '../firebase'
import React from 'react'
import {actionType} from '../Reducer'
import "./Login.css"
import { useStateValue } from '../StateProvider'

const Login = () => {
// using the StateProvider
    const [dispatch] = useStateValue()
    const signIn = () => {
        auth.signInWithPopup(googleAuth)
            .then((result) => {
                console.log(result)
                // dispatch interracts with the Stateprovider
                // here gets user information from googleAuth
                dispatch({
                    type: actionType.SET_USER,
                    user: result.user
                })
            })
            .catch(error => alert(error))
        console.log('Signed in')
    }
    return (
        <section className="login"> 
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapp" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </section>
    )
}

export default Login
