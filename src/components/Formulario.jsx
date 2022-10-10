import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc} from 'firebase/firestore';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [lista, setLista] = useState([])


    useEffect(() => {

        const obtenerDatos = async () => {    
          try {
            await onSnapshot(collection(db, "form"), (querySnapshot) => {    
              setLista(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
          } catch (error) {
            console.log(error);
          }
        };
        obtenerDatos();
      }, []);


    const eliminar = async id => {
        console.log(id)
        try{
            await deleteDoc(doc(db,'form',id))
        }catch(error){
            console.log(error)
        }
    }
    const guardarclientes = async (e) =>{
        e.preventDefault()
        
        try{

            const data = await addDoc(collection(db,'form'),{
                
                nombrenombre: nombre,
                nombreapellidos: apellidos,
                nombreedad:edad,
                nombretelefono:telefono,
                nombreemail:email
            })

            setLista([
                ...lista,
                {nombrenombre:nombre, nombreapellidos:apellidos, nombreedad:edad, nombretelefono:telefono, nombreemail:email, id:data.id}
            ])

            setNombre('')
            setApellidos('')
            setEdad('')
            setTelefono('')
            setEmail('')
            e.target.reset()
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>FORMULARIO</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado de nuevos Clientes</h4>
                <ul className="list-group">
                    {
                        lista.map(item =>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombrenombre}  {item.nombreapellidos}  {item.nombreedad}    {item.nombretelefono}  {item.nombreemail}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=>eliminar(item.id)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        
            <div className='col-4'>
            <h4 className="text-center">
                Formulario Cliente Nuevo
            </h4>
            <form onSubmit={guardarclientes}>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese Nombres'
                onChange={(e)=>setNombre(e.target.value)}
                value = {nombre}></input>
                
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese Apellidos'
                onChange={(e) => setApellidos(e.target.value)}
                value = {apellidos}></input>
                
                <input 
                className='form-control mb-2'
                type="number" 
                placeholder='Ingrese Edad (Años)'
                onChange={(e) => setEdad(e.target.value)}
                value = {edad}></input>
                
                <input 
                className='form-control mb-2'
                type="tel" 
                placeholder='Ingrese Telefono'
                onChange={(e) => setTelefono(e.target.value)}
                value = {telefono}></input>
                
                <input 
                className='form-control mb-2'
                type="email" 
                placeholder='Ingrese direccion Email'
                onChange={(e) => setEmail(e.target.value)}
                value = {email}></input>
                
                <button 
                className='btn btn-primary btn-block'
                type='submit'
                >Agregar</button>
            </form>
            </div>
        </div>   
    </div>
  )
}

export default Formulario