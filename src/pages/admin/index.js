import React,{useState,useEffect} from 'react';
import {auth,database} from '../../config/firebaseConnection'
import { signOut } from 'firebase/auth';
import { addDoc,collection,onSnapshot,query,orderBy,where,doc,deleteDoc,updateDoc } from 'firebase/firestore';
import './estilos.css'

export default function Admin() {
  const [tarefaInput,setTarefaInput] = useState('')
  const [user,setUser] = useState({})
  const [tarefas,setTarefas] = useState([])
  const [editar,setEditar] = useState({})

useEffect(() => {
 async function loadingTarefas(){
  const userDetail = localStorage.getItem('@detalhesUsuario')
  setUser(JSON.parse(userDetail))

  if(userDetail){
    const data = JSON.parse(userDetail)

    const tarefasRef = collection(database,"tarefas")
    const q = query(tarefasRef, orderBy("created","desc"), where("userUid","==",data?.uid))
    const unSub = onSnapshot(q, (snapshot) => {
        let lista = []

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefas,
            userUid: doc.data().userUid
          })
        })
        console.log(lista)
        setTarefas(lista)
    })

  }


 }

 loadingTarefas()
},[])

 async function registrar(e){
   e.preventDefault()

   if(tarefaInput === '' ){
    alert('digite sua tarefa')
    return;
   } 
  
   if(editar?.id){
    atualizar()
    return;

   } 
   await addDoc(collection(database,'tarefas'), {
    tarefas: tarefaInput,
    created: new Date(),
    userUid: user?.uid
   }).then(() => {
    setTarefaInput('')
   })
   .catch((error) => {
        alert('erro no registro')
   })
   
 
}

  async function sair(){
      await signOut(auth)

  }

  async function deleteTarefas(id){
     await deleteDoc(doc(database,"tarefas",id))
  }
  async function editarTarefa(item){
    setTarefaInput(item.tarefa)
    setEditar(item)
  }
  async function atualizar(){
      await updateDoc(doc(database,"tarefas",editar?.id),{
        tarefas: tarefaInput

      }).then(() => {
        setTarefaInput('')
        setEditar({})
      })      

  }


  return (
   <div className='admin__conteiner'>
    <h1>Minhas Tarefas</h1>

    <form onSubmit={registrar} className="formulario" >
      <textarea 
      placeholder="Digite sua Tarefa"
      value={tarefaInput}
      onChange={(text) => setTarefaInput(text.target.value)}
      />
      {Object.keys(editar).length > 0 ? (  <button className='btn__register' style={{backgroundColor: '#6add39'}} type='submit'>Atualizar Tarefa</button>) : (
             <button className='btn__register' type='submit'>Registrar Tarefa</button>     
      )}
    
    </form>
    
{tarefas.map((item) =>  (
    <article className='list' key={item.id}>
      <p>{item.tarefa}</p>
      <div>
        <button onClick={() => {editarTarefa(item)}}>editar</button>
        <button onClick={() => {deleteTarefas(item.id)}}className='btn__excluir'>Concluir</button>
      </div>
     
    </article>

))}

    <button className='btn__logout' onClick={() => {sair()}}>Sair</button>
   </div>
  );
}