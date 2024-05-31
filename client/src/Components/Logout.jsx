import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link} from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const logout =  () => {

      // async () =>{
        //     try {
          //         await axios.post('http://localhost:8000/api/logout',{}, {withCredentials:true})
          //         localStorage.removeItem('token')
          //         navigate('/')
          //     } catch (error) {
            //         console.log('Error', error)
            //     }
            // }
            axios.post('http://localhost:8000/api/logout',{}, {withCredentials:true})
            .then(res => {
              localStorage.removeItem('token')
              navigate('/')
            })
            .catch(err => console.log("error : ",err))
          }
  return (
    // <button className='btn btn-danger' onClick={logout}>Logout</button>
    <Link className='nav-link text-danger mt-1' onClick={logout}><i class="bi bi-box-arrow-left"></i> Logout</Link>

  )
}

export default Logout