import { resolvePlugin } from '@babel/core'
import React, { useEffect, useState, useLocation } from 'react'
import { useHistory } from 'react-router'
import { Button, Container } from 'reactstrap'
import { subscribe, verifySub } from '../../api'
import failed from './../../images/fail.png'
import decode from 'jwt-decode'
import { useDispatch } from "react-redux";

function loadScript(src)  {
    return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
        resolve(true)
    }
    script.onerror = () => {
        resolve(false)
    }
})
    
}



const __DEV__ = document.domain === 'localhost'

const Failed = () => {


    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push("/auth")
      }

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    // const location = useLocation()

    const [userData,setUserData] = useState({
        amount: 0,
        currency: "",
        id: ""
    })

    useEffect(()=> {
        const token = user?.token
        if(token){
          const decodedToken = decode(token);
    
          if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }else{
          history.push("/auth")
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')))
      },[])
    

    const history = useHistory()

   

    

    return(
        

        <div>
            <nav className="subscription-nav">

            </nav>
            <section className="subs-hero">
        
                <img src={failed}/>
                <h1>Something went wrong</h1>
                
                <p>click here to <a>try again</a></p>
            </section>

        </div>
    )
}


export default Failed