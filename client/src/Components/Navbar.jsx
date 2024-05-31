import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logout from './Logout';

import axios from "axios";

const Navbar = ({ setOpenModalReg, setOpenModalLog, setSort, userNav }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [search, setSearch] = useState(null)


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid" id='nav'>
                    <Link onClick={() => { setSort(false); setSearch('') }} className="nav-link active ms-5" to={'/'}> <img className='logo' src="/logo/logo.png" alt="logoPic" /></Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-5">
                            <h1 className="nav-link" onClick={() => { navigate("/"); setSort({ category: "Female", search: false }); setSearch('') }} style={{ textDecoration: 'none', cursor: 'pointer' }} to="#" onMouseOver={(e) => {
                                e.target.style.textDecoration = 'underline'
                                e.target.style.fontWeight = 'bold';
                            }} onMouseOut={(e) => {
                                e.target.style.textDecoration = 'none'
                                e.target.style.fontWeight = 'normal';
                            }}>Female</h1>
                            <h1 className="nav-link" onClick={() => { navigate("/"); setSort({ category: "Male", search: false }); setSearch('') }} style={{ textDecoration: 'none', cursor: 'pointer' }} to="#" onMouseOver={(e) => {
                                e.target.style.textDecoration = 'underline'
                                e.target.style.fontWeight = 'bold';
                            }} onMouseOut={(e) => {
                                e.target.style.textDecoration = 'none'
                                e.target.style.fontWeight = 'normal';
                            }}>Male</h1>
                            <h1 className="nav-link" onClick={() => { navigate("/"); setSort({ category: "Kids", search: false }); setSearch('') }} style={{ textDecoration: 'none', cursor: 'pointer' }} to="#" onMouseOver={(e) => {
                                e.target.style.textDecoration = 'underline'
                                e.target.style.fontWeight = 'bold';
                            }} onMouseOut={(e) => {
                                e.target.style.textDecoration = 'none'
                                e.target.style.fontWeight = 'normal';
                            }}>Kids</h1>
                        </div>
                    </div>
                    <div className="search">
                        <form role="search " onSubmit={(e) => { e.preventDefault(); navigate("/"); setSort({ category: false, search: search }) }}>
                            <div className="input-group">
                                <input type="search" placeholder="Search your product" className="form-control" onChange={(e) => { navigate("/"); setSearch(e.target.value) }} value={search} />
                                <button className="btn bg-white border" type="submit" >
                                    <i className="bi bi-search"></i>
                                </button>

                            </div>
                        </form>
                    </div>
                    {
                        token ? <>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className='d-flex gap-5  align-items-center'>
                                    <div className='d-flex align-items-center gap-2 mt-2'>
                                        <i class="bi bi-plus-circle-fill"></i>
                                        <Link className='nav-link ' to={'/items/new'} style={{ textDecoration: 'none' }} onMouseOver={(e) => {
                                            e.target.style.textDecoration = 'underline'
                                            e.target.style.fontWeight = 'bold';
                                        }} onMouseOut={(e) => {
                                            e.target.style.textDecoration = 'none'
                                            e.target.style.fontWeight = 'normal';
                                        }}>Sell Article</Link>
                                    </div>
                                    <Link className='nav-link ' to={userNav && '/user/'+userNav._id} style={{ textDecoration: 'none' }} onMouseOver={(e) => {
                                        e.target.style.textDecoration = 'underline'
                                        e.target.style.fontWeight = 'bold';
                                    }} onMouseOut={(e) => {
                                        e.target.style.textDecoration = 'none'
                                        e.target.style.fontWeight = 'normal';
                                    }}>
                                        <div className="d-flex mt-4 gap-1 ">
                                        <i class="bi bi-person-circle"></i>
                                        <p className=''>{userNav && userNav.fName}</p>
                                        </div>
                                    </Link>
                                    <Logout />
                                </div>

                            </div>


                        </> :
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className='d-flex gap-4 ms-5 mt-2'>
                                    <div className='d-flex align-items-center gap-2 '>
                                        <i className="bi bi-box-arrow-in-right"></i>
                                        <Link onClick={(e) => { setOpenModalReg(true); setOpenModalLog(false) }}>Sign In</Link>
                                    </div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <i className="bi bi-person-fill"></i>
                                        <Link onClick={(e) => { setOpenModalLog(true); setOpenModalReg(false) }}>Log In</Link>
                                    </div>

                                </div>
                            </div>


                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar