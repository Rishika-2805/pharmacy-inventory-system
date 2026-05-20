import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";


function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/login",
                formData
            );


            // Store token
            localStorage.setItem(
                "token",
                res.data.token
            );


            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );


            alert("Login Successful");


            // Redirect to dashboard
            navigate("/dashboard");

        } catch(error){

            alert(
                error.response?.data?.message ||
                "Login Failed"
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

                    Login

                </h1>


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={handleChange}
                    required
                />


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                >

                    Login

                </button>


                <p className="mt-4 text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-1"
                    >

                        Register

                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;