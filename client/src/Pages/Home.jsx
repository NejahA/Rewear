import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from 'axios'
import Logout from "../Components/Logout"
import ItemCard from "../Components/ItemCard"
import ModalLog from "../Components/LogModal/ModalLog"
import ModalReg from "../Components/RegModal/ModalReg"
import Navbar from "../Components/Navbar"
// import NoteListItem from "../components/NoteListItem"
const Home = ({setOpenModalLog,setOpenModalReg,sort,setUserNav}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([])
  const token = localStorage.getItem('token')
  const [userId, SetUserId] = useState(null)
  //   CORRECT DELETE
  // const deleteNote = (noteId) => {
  //   axios.delete('http://localhost:8000/api/items/' + noteId)
  //     .then(response => {
  //       console.log(response.data)
  //       const filtereditems = items.filter(note => note._id != noteId);
  //       setItems(filtereditems)
  //     })
  //     .catch(error => console.log(error))
  // }
  useEffect(() => {
    // if (!token) {
    //   navigate('/')
    // } else {
      console.log();
      axios.get('http://localhost:8000/api/items')
        .then(response => {
          setItems(response.data);
          console.log("items ==> " ,items);
        })
        .catch(error => console.log(error))
    // }
  }, [token])
  useEffect( () => {
    if (token){

      axios.get('http://localhost:8000/api/user',{withCredentials:true})
      .then((res)=> {
        console.log("res ===>",res.data);
        SetUserId(res.data)
        setUserNav(res.data)

      })
    }
    // try {
    //   const response =  axios.get('http://localhost:8000/api/user',{withCredentials:true})
    //   const {loggedUser} = response.data
    //   console.log("logged user ====> ",loggedUser);
    // } catch (error) {
    //   console.log(error)
    // }
  },[token])
  return (
    <>
    <div className='container'>
      {/* <h1>Welcome {userId._id}</h1> */}
      <div className="row">

<div className="col-1"></div>
<div className="d-flex flex-wrap gap-3 p-5 col-10">
  {items.filter(item=>{ if (!sort){return item} else if (sort && sort.category) {return item.category===sort.category} else if (sort && sort.search) {  if (item.title.includes(sort.search) ){ return item.title.includes(sort.search) }else if (item.brand.includes(sort.search) ){ return item.brand.includes(sort.search) } }})
    .map(item => 
      item.status==="validated" ?
     <ItemCard item={item} setOpenModalLog={setOpenModalLog} setOpenModalReg={setOpenModalReg}    key={item.id} />
     : ""
     )}
  
</div>
<div className="col-1"></div>
</div>
    </div>
    </>

  )
}

export default Home