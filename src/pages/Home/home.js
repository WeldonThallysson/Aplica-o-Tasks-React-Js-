import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../config/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import './estilos.css'
export default function Home() {
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const navigate = useNavigate()


     async function Logar(e){
        e.preventDefault();
       

        if(email !== '' && senha !== ''){
         await signInWithEmailAndPassword(auth,email,senha)
         .then(() => {
           navigate('/admin',{replace: true})
         })
         .catch(() => {
            alert('error ao n')
         })
        }else{
          alert("Preencha os campos de texto")
        }

      }






  return (
   <div className='conteiner__home'>
    <h1>Lista de Tarefas</h1>
    <span>Gerencie sua lista de tarefas rápido e facil</span>
   
    <form className='formulario' onSubmit={Logar}>
      
      <input
        type={'text'}
        placeholder="Digite seu Email"
        value={email}
        onChange={(text) => setEmail(text.target.value)}
      />
      <input
        type={'password'}
        placeholder="Digite sua Senha"
        value={senha}
        onChange={(text) => setSenha(text.target.value)}
        />

       <button type='submit'>Acessar</button> 
    </form>
    
    <Link className="Botao__Link"to='/register'>Não possui uma conta ? Cadastre-se</Link>
   </div>
  );
}