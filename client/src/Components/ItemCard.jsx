import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ItemCard = ({ item,setOpenModalLog ,setOpenModalReg}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    return (

        // <div className="card  shadow-lg rounded " >
        //     <img className="card-img-top mt-3 rounded" src={item.itemPics[0]} style={{width:'20%',height:'30%'}} alt="Card image cap" />
        //     <div className="card-body d-flex flex-column gap-2">
        //         <div className=''>
        //             <h5 className="card-title "><strong>{item.price}</strong></h5>
        //             <h6 className="card-title ">{item.size}</h6>
        //             <h6 className="card-title ">{item.brand}</h6>
        //         </div>
        //     </div>
        //     <button className='btn btn-danger'style={{width:'3%',height:'30%'}}>delete</button>
        // </div>
        <>
            {
            // item.status==="validated" &&
             <div className="card " style={{width: '20rem'}}>
                <img  src={item && item.itemPics[0] && item.itemPics[0].url ? item.itemPics[0].url: item.itemPics[0]} className="card-img-top" alt="itemPic" style={{width:'20rem',height:'25rem'}}/>
                    <div className="card-body">
                        <p className="card-text">Title : <strong>{item.title}</strong></p>
                        <h5 className="card-title">{item.price} DT</h5>
                        <p className="card-text">Category : <strong>{item.category}</strong></p>
                        <p className="card-text">Size : <strong>{item.size}</strong></p>
                        <p className="card-text">Brand : <strong>{item.brand}</strong></p>
                        <div onClick={(e)=> { if (!token) {setOpenModalReg(false);setOpenModalLog(true)}else {navigate(`/items/${item._id}`)}}} className="btn" style={{backgroundColor:'#5C2D9A',color:'white'}}>Show Product</div>
                    </div>
            </div>}
        </>
    )
}

export default ItemCard