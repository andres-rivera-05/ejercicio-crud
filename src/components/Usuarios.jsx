import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Usuarios = () => {
    const url = 'https://api.escuelajs.co/api/v1/users'
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [titleModal, setTitleModal] = useState('')
    const [id,setId] = useState('')
    const [nombre, setNombre]= useState('')
    const [contrasena, setContrasena]= useState('')
    const [correo,setCorreo] = useState('')
    const [avatar, setAvatar] = useState('')
    const [rol, setRol] = useState('')
    const [contador, setContador] = useState(0)

    const getUsuarios = async () => {
        try {
            const response = await axios.get(url)
            setUsuarios(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsuarios();
    }, [contador])

    const openModal = (operacion, id, name, password, email, role, avatar) =>{
        setId('')
        setCorreo('')
        setAvatar('')
        setContrasena('')
        setNombre('')
        setRol('')

        if(operacion === 1){
            setTitleModal("Registrar Usuarios")
        }else if(operacion === 2){
            setTitleModal("Editar Usuario")
            setId(id)
            setNombre(name)
            setContrasena(password)
            setCorreo(email)
            setRol(role)
            setAvatar(avatar)
        }
    } 

    const enviarSolicitud = async (url, metodo, parametros) => {
        let obj = {
            method : metodo,
            url : url,
            data : parametros,
            headers : {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        }

        await axios(obj).then(()=> {
            let mensaje;

            if(metodo === 'POST'){
                mensaje = "Se guardo el usuario";
            }else if(metodo === 'PUT'){
                mensaje = "se edito el usuario";
            }else if(metodo === 'DELETE'){
                mensaje = "Se elimino el usuario"
            }
            document.getElementById('btnCerrarModal').click();
            setContador(contador + 1)
        }).catch((error) =>{
            console.error(error)
        })
    }

    const validar = () => {
        if(nombre.length === 0 || correo.length === 0 || contrasena.length === 0 
           || rol.length === 0 || avatar.length === 0){
            alert("Completa los campos")
            return
        }

    }

    return (
        <>
            <div className="container mt-5">
                <div className="d-grid gap-2 col-5 mx-auto">
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalUsuario"
                    onClick={()=>openModal(1)}>
                        <i className='fa-solid fa-circle-plus'></i> Anadir
                    </button>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        {
                            loading ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className='table-responsive mx-auto'>
                                    <table className="table table-dark table-bordered">
                                        <thead>
                                            <tr className='table-active'>
                                                <th scope="col">ID</th>
                                                <th scope="col">Avatar</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Gmail</th>
                                                <th scope="col">Contrseña</th>
                                                <th scope="col">Rol</th>
                                                <th scope="col">Accion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usuarios.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td><img src={item.avatar} alt="avatar" /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.password}</td>
                                                        <td>{item.role}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-center" data-bs-toggle="modal" data-bs-target="#modalUsuario">
                                                                <button className='btn btn-warning me-2' onClick={()=>openModal(2,item.id,item.name,item.password,item.email,item.role, item.avatar)}>
                                                                    <i className='fa-solid fa-edit'></i>
                                                                </button>
                                                                <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#modalUsuario">
                                                                    <i className='fa-solid fa-trash'></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalUsuario"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{titleModal}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id' />
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                                <input className='form-control' placeholder='Nombre Usuario' type="text" name="usuario" id="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-envelope'></i></span>
                                <input className='form-control' placeholder='Correo Electronico' type="text" name="correo" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-lock'></i></span>
                                <input className='form-control' placeholder='Contrasena' type="text" name="contrasena" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gear'></i></span>
                                <input className='form-control' placeholder='Rol' type="text" name="rol" id="rol" value={rol} onChange={(e) => setRol(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-image'></i></span>
                                <input className='form-control' placeholder='Avatar' type="text" name="avatar" id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='btnCerrarModal' className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" onClick={validar} className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
