import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from 'axios'
// import Logout from "../Components/Logout"
// import ItemCard from "../Components/ItemCard"
// import ModalLog from "../Components/LogModal/ModalLog"
// import ModalReg from "../Components/RegModal/ModalReg"
// import Navbar from "../Components/Navbar"
// // import NoteListItem from "../components/NoteListItem"


const ShowUser = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const [user, SetUser] = useState({
        email: '',
        fName: '',
        lName: '',
        adress: '',
        phone:'',
        profilePic: {},
        itemHistory: []

    })
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (token) {


            axios.get('http://localhost:8000/api/user', { withCredentials: true })
                .then((res) => {
                    console.log("res ===>", res.data);
                    SetUser(res.data)
                })
                .then(res => axios.get("http://localhost:8000/api/users/" + id)
                    .then(res => { setProfile(res.data); console.log("profile ===>", res); }))
                .catch(err => console.log(err))
        }


    }, [token])
    return (
        profile ?

            <div className="container d-flex flex-column gap-5 p-5">
                <div className='d-flex gap-3'>
                    <img className='' style={{ width: '250px', borderRadius: '100%' }} src={profile && profile.profilePic && profile.profilePic.url} alt="profilePic" />
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex " >
                            <h1>{profile.fName} {profile.lName}</h1>
                            <Link to={"/edituser"}>
                            <i class="bi bi-gear"></i>
                            </Link>

                        </div>
                        <p>{profile.email}</p>
                        <p><i class="bi bi-geo-alt-fill"></i>{profile.adress}</p>
                        <p><i class="bi bi-telephone"></i>{profile.phone}</p>
                    </div>
                </div>

                <h1 className='text-center'>Dressing de {profile.fName}</h1>
                <div className='border p-5 d-flex gap-2' >
                    {profile.itemsHistory && profile.itemsHistory.map(
                        item =>

                            <div key={"key"} className="card border" style={{ width: '20rem' }} >
                                              
                                         <img src={item.itemPics[0] && item.itemPics[0].url} className="card-img-top" alt="itemPic" style={{ width: '100%', height: '25rem' }}  />

                                <div className="card-body">

                                    <p className="card-text">Title : <strong>{item.title} </strong></p>
                                    <h5 className="card-title">{item.price}</h5>
                                    <p className="card-text">Category : <strong>{item.category}</strong></p>
                                    <p className="card-text">Size : <strong>{item.size}</strong></p>
                                    <p className="card-text">Brand : <strong>{item.brand}</strong></p>
                                    <div className="btn" onClick={()=>navigate("/items/"+item._id)} style={{ backgroundColor: '#5C2D9A', color: 'white' }}>Show Product</div>
                                </div>
                            </div >
                    )

                    }

                    {/* )
                        
                        } */}

                </div>
            </div>
            : " "
    )
}

export default ShowUser