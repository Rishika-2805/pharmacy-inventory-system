import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import API from "../api/axios";


function Register() {

    const navigate =
    useNavigate();


    const [formData, setFormData] =
    useState({

        name: "",

        email: "",

        password: "",

        role: "user"
    });


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value
        });
    };


    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            await API.post(

                "/auth/register",

                formData
            );

            alert(
                "Registration Successful"
            );

            navigate("/");

        } catch(error){

            alert(

                error?.response?.data?.message ||

                "Something went wrong"
            );
        }
    };


    return (

        <div className="h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">

                    Register

                </h1>


                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={handleChange}
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={handleChange}
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={handleChange}
                />


                {/* ROLE SELECT */}

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                >

                    <option value="user">

                        User

                    </option>


                    <option value="admin">

                        Admin

                    </option>


                    <option value="store_manager">

                        Store Manager

                    </option>


                    <option value="warehouse_manager">

                        Warehouse Manager

                    </option>

                </select>


                <button
                    className="w-full bg-green-600 text-white p-3 rounded"
                >

                    Register

                </button>

            </form>

        </div>
    );
}

export default Register;