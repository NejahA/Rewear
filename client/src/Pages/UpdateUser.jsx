
import axios from "axios";
import React, { useState, useEffect } from "react";
// import Logout from "../Components/Logout";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const [user, setUser] = useState({
        email: '',
        fName: '',
        lName: '',
        adress: '',
        profilePic: {},
        itemHistory: [],
        phone:''

    })
    
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [errors, setErrors] = useState(null)

    // const nav = useNavigate(); 
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const { id } = useParams()
    // console.log("this is id : ",id);

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            
                axios.get('http://localhost:8000/api/user', { withCredentials: true })
                    .then((res) => {
                        console.log("res ===>", res.data);
                        setUser(res.data)
                    })

                .catch(err => console.log(err))
            console.log();
            // }
        }
    }, [])
    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
        console.log("FILE =====> :", selectedFiles);
    };
    const handleRemoveImage = () => {
        
        setSelectedFiles(null);
    };
    const handleUpload = (e) => {
        // const formData = new FormData();
        // formData.append("file", selectedFiles);
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("fName", user.fName);
        formData.append("lName", user.lName);
        formData.append("adress", user.adress);
        formData.append("phone", user.phone);
        // formData.append("user", user.user  )
        
        // for (let i = 0; i < selectedFiles.length; i++) {
            // newarr.push(selectedFiles[i]);
            if(selectedFiles){

                for (let i = 0; i < selectedFiles.length; i++) {
                    // newarr.push(selectedFiles[i]);
                    formData.append("files", selectedFiles[i]);
                }
            }
           
                else if (user.profilePic) {
                    for (let i = 0; i < user.profilePic.length; i++) {
              
                      formData.append("profilePic",user.profilePic[i])
                      // formData.append("itemPics", item.itemPics);
                    }
                    }
       

        axios
            .put("http://localhost:8000/api/users/" + user._id, formData)
            .then((res) => {
                console.log(res);
                console.log(JSON.stringify(formData));
                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })

    };
    return (
        <div>
            <form onSubmit={(e) => { handleUpload(e) }}>

                <div className="container d-flex flex-column gap-5 p-5">
                    <div className="card p-3 d-flex flex-column gap-3">
                        <div className=" p-3 d-flex gap-5 imageCompo align-items-center" >
                            <div className="file-btn upload col-2" >
                                <input className="inputPic " type="file"  required={false} onChange={(e)=>{setSelectedFiles(e.target.files);console.log("FILE =====> :", selectedFiles)}} />
                                <span className="material-symbols-rounded"><i class="bi bi-cloud-plus"></i></span> Choisir une Photo
                            </div>
                            <div className="d-flex flex-row flex-wrap gap-2">
                                {selectedFiles ? Array.from(selectedFiles).map((file, idx) => (
                                    <div key={idx} className="imgsel">
                                        <img src={URL.createObjectURL(file)} className=" " style={{borderRadius:'100%',width:'190px'}} alt={`preview-${idx}`} />
                                        <button className="x rounded-circle " type="button" onClick={(e) => {setSelectedFiles(null);console.log("FILE =====> :", selectedFiles)}}><i class="bi bi-trash-fill"></i></button>
                                    </div>
                                )) : user.profilePic &&  user.profilePic.url ?
                                        <div className="imgsel">
                                            <img src={user.profilePic.url} className="selectedImg " />
                                            <button className="x rounded-circle " type="button" onClick={(e) => {setSelectedFiles(null);console.log("FILE =====> :", selectedFiles)}}><i class="bi bi-trash-fill"></i></button>
                                        </div>
                                    
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card p-3">
                        <div className="d-flex justify-content-between">
                            <label htmlFor="fName">First Name</label>
                            <input className="form-control w-25" type="text" placeholder="Joe" value={user.size} onChange={(e) => setUser({ ...user, fName: e.target.value })} value={user.fName}  />
                        </div>
                    </div>
                    <div className="card p-3">
                        <div className="d-flex justify-content-between">
                            <label htmlFor="lName">Last Name</label>
                            <input className="form-control w-25" type="text" placeholder="Doe" value={user.brand} onChange={(e) => setUser({ ...user, lName: e.target.value })}  value={user.lName} />
                        </div>
                    </div>
                    <div className="card p-3">
                        <div className="d-flex justify-content-between">
                            <label htmlFor="price">Adresse Mail</label>
                            <input className="form-control w-25" type="text" placeholder="Joe@gmail.com" value={user.price} onChange={(e) => setUser({ ...user, email: e.target.value })}  value={user.email} />
                        </div>
                    </div>
                    <div className="card p-3">
                        <div className="d-flex justify-content-between">
                            <label htmlFor="price">Phone Number</label>
                            <input className="form-control w-25" type="number" placeholder="12 345 678" value={user.price} onChange={(e) => setUser({ ...user, phone: e.target.value })} value={user.phone}  />
                        </div>
                    </div>
                    <div className="card p-3">
                        <div className="d-flex justify-content-between">
                            <label htmlFor="price">Adress</label>
                            <input className="form-control w-25" type="text" placeholder="12 345 678" value={user.price} onChange={(e) => setUser({ ...user, adress: e.target.value })}  value={user.adress} />
                        </div>
                    </div>
                    <button className="btn-submit w-25 rounded p-2 text-light">Edit Profile</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser