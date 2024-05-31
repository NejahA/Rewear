import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ModalReg.css";
const ModalReg = ({ open, setOpenModalLog, setOpenModalReg }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPW: "",
    });
    const [errors, setErrors] = useState({
        fName: "",
        lName: "",    
        email: "",
        password: "",
        confirmPW: "",
    });
    if (!open) return null;
    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/register",
                user,
                { withCredentials: true }
            );
            console.log("SERVER RESPONSE:", response.data);
            localStorage.setItem("token", response.data.token);
            setOpenModalReg(false)

            navigate("/");
        } catch (error) {
            console.log("Error:", error.response.data);
            let tempErrors = {};
            for (let key of Object.keys(error.response.data)) {
                console.log(key, "------", error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message;
            }
            setErrors({ ...tempErrors });
        }
    };
    console.log("hi from reg");
    return (
        <div className="overlay">
            <div className="modalContainer p-1">
                <form onSubmit={register}>
                    <div className="d-flex flex-column gap-3 p-5 align-items-center">
                        <div className="">
                            <input
                                className="form-control"
                                placeholder="First Name"
                                type="text"
                                onChange={e => setUser({ ...user, fName: e.target.value })}
                            value={user.fName}
                            />
                            <span className="text-danger">{errors.fName}</span>

                        </div>
                        <div className="">
                            <input
                                className="form-control"
                                placeholder="Last Name"
                                type="text"
                                onChange={e => setUser({ ...user, lName: e.target.value })}
                            value={user.lName}
                            />
                            <span className="text-danger">{errors.lName}</span>
                        
                        </div>


                        <div className="">
                            <input
                                className="form-control"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email}
                            />
                            <span className="text-danger">{errors.email}</span>
                        </div>
                        <div className="">
                            <input
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password}
                            />
                            <span className="text-danger">{errors.password}</span>
                        </div>
                        <div className="">
                            <input
                                className="form-control"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={(e) =>
                                    setUser({ ...user, confirmPW: e.target.value })
                                }
                                value={user.confirmPW}
                            />
                            <span className="text-danger">{errors.confirmPW}</span>
                        </div>
                        <button
                            className="btn text-light w-50 mt-3"
                            style={{ backgroundColor: "#5C2D9A" }}
                        >
                            Sign Up
                        </button>
                        <p
                            className="btn border"
                            onClick={(e) => {
                                setOpenModalReg(false);
                                setOpenModalLog(true);
                            }}
                        >
                            Login
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalReg;
