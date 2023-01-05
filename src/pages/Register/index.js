import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../config/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './estilos.css'


export default function Register() {
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const navigate = useNavigate()

      async function Cadastrar(e){
        e.preventDefault();

        if(email !== '' && senha !== ''){
           await createUserWithEmailAndPassword(auth,email,senha)
           .then(() => {
              navigate('/admin',{replace:true})
           })
           .catch(() => {
             alert('error ao criar conta')
           })
        }else{
          alert("Preencha os campos de texto")
        }

      }


  return (
   <div className='conteiner__home'>
    <h1>Cadastre-se</h1>
    <span>Vamos criar sua conta!</span>
   
    <form className='formulario' onSubmit={Cadastrar}>
      
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

       <button type='submit'>Cadastrar</button> 
    </form>
    
    <Link className="Botao__Link" to='/'>já possui uma conta ? faça o login</Link>
   </div>
  );
}