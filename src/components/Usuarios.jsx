import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Usuarios = () => {
    const url = 'https://api.escuelajs.co/api/v1/users'
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)

    const getUsuarios = async () => {
        try {
            const response = await axios.get(url)
            setUsuarios(response.data)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsuarios();
    }, [])

    return (
        <>
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
                                <table className="table table-dark">
                                    <thead>
                                        <tr className='table-active'>
                                            <th scope="col">ID</th>
                                            <th scope="col">Avatar</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Gmail</th>
                                            <th scope="col">Contrseña</th>
                                            <th scope="col">Rol</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usuarios.map((item) => (
                                                <tr key={item.id}>
                                                    <th scope="row">{item.id}</th>
                                                    <td><img src={item.avatar} alt="avatar" /></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.password}</td>
                                                    <td>{item.role}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
