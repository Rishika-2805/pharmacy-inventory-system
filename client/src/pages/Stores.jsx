import { useEffect, useState }
from "react";

import API from "../api/axios";

import MainLayout
from "../layouts/MainLayout";


function Stores() {

    const [stores, setStores] =
    useState([]);


    const [formData, setFormData] =
    useState({

        name: "",

        location: "",

        managerName: "",

        managerEmail: "",

        phone: "",

        type: "store"
    });


    // FETCH STORES
    const fetchStores =
    async () => {

        try {

            const res =
            await API.get("/stores");

            setStores(res.data);

        } catch(error){

            console.log(error);
        }
    };


    useEffect(() => {

        fetchStores();

    }, []);


    // HANDLE INPUT
    const handleChange =
    (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value
        });
    };


    // ADD STORE
    const addStore =
    async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/stores",
                formData
            );

            alert(
                "Store Added"
            );

            fetchStores();

        } catch(error){

            console.log(error);
        }
    };


    return (

        <MainLayout>

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Store Management

                </h1>


                {/* FORM */}

                <form
                    onSubmit={addStore}
                    className="bg-white p-6 rounded-xl shadow-md mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Store Name"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />


                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />


                    <input
                        type="text"
                        name="managerName"
                        placeholder="Manager Name"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />


                    <input
                        type="email"
                        name="managerEmail"
                        placeholder="Manager Email"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />


                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />


                    {/* STORE TYPE */}

                    <select
                        name="type"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    >

                        <option value="store">

                            Store

                        </option>


                        <option value="warehouse">

                            Warehouse

                        </option>

                    </select>


                    <button
                        className="bg-blue-600 text-white p-3 rounded md:col-span-2"
                    >

                        Add Store

                    </button>

                </form>


                {/* STORE LIST */}

                <div className="bg-white p-6 rounded-xl shadow-md">

                    <h2 className="text-2xl font-bold mb-6">

                        All Stores

                    </h2>


                    <div className="space-y-4">

                        {
                            stores.map(
                                (store) => (

                                    <div
                                        key={store._id}
                                        className="border p-4 rounded-lg"
                                    >

                                        <h3 className="text-xl font-bold">

                                            {store.name}

                                        </h3>


                                        <p>

                                            Type:
                                            {" "}
                                            {store.type}

                                        </p>


                                        <p>

                                            Location:
                                            {" "}
                                            {store.location}

                                        </p>


                                        <p>

                                            Manager:
                                            {" "}
                                            {store.managerName}

                                        </p>


                                        <p>

                                            Email:
                                            {" "}
                                            {store.managerEmail}

                                        </p>


                                        <p>

                                            Phone:
                                            {" "}
                                            {store.phone}

                                        </p>

                                    </div>
                                )
                            )
                        }

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default Stores;