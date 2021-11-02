import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) =>{
        const res = await axios.get('api/notes', {
            headers:{Authorization: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await axios.delete(`api/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <div className="note-wrapper">
            {
                notes.map(note =>(
                    <div className="card" key={note._id}>
                        <h2 title={note.title}>{note.title}</h2>
                        <div className="text-wrapper">
                            <p>{note.content}</p>
                            <img src="https://source.unsplash.com/user/erondu/1600x900"></img>
                        </div>
                        <h4> Posted By:{note.name}</h4>
                        <div className="card-footer">
                           <p className="date">{format(note.date)}</p>
                            <Link to={`edit/${note._id}`} >Edit</Link>
                        </div>
                        <button className="close" 
                        onClick={() => deleteNote(note._id)} >Delete</button>
                    </div>
                ))
            }
            
        </div>
    )
}
