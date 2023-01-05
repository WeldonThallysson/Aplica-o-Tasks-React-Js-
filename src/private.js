
import React,{useState,useEffect} from 'react'
import {auth} from './config/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

export default function Private({children}) {

    const [loading,setLoading] = useState(true)
    const [logado,setLogado] = useState(false)

    
    useEffect(() => {
         async function checkLogin(){
            const update = onAuthStateChanged(auth,(user) => {
                    if(user){
                       const userData = {
                        uid: user.uid,
                        email: user.email
                       }    
                       
                    localStorage.setItem('@detalhesUsuario', JSON.stringify(userData)) 

                    setLoading(false)
                    setLogado(true)
                    }
                    
                    else{
                        setLoading(false)
                        setLogado(false)
                    }
            })
         } 
         checkLogin()  

    },[])

    if(loading){
        return(
            <div>
                 <h1>carregando...</h1>   
            </div>
        )
    }

    if(!logado){
       return <Navigate to="/"/>    
    }

  return children;
}