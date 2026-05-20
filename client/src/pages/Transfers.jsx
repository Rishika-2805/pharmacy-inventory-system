import { useEffect, useState } from "react";

import API from "../api/axios";

import MainLayout from "../layouts/MainLayout";

import socket from "../socket/socket";


function Transfers() {

    const [medicines, setMedicines] =
        useState([]);

    const [stores, setStores] =
        useState([]);


    const [formData, setFormData] =
        useState({

            medicineId: "",

            sourceStore: "",

            destinationStore: "",

            quantity: ""
        });


    // FETCH MEDICINES
    const fetchMedicines = async () => {

        try {

            const res =
                await API.get(
                    "/medicines"
                );

            setMedicines(res.data);

        } catch(error){

            console.log(error);
        }
    };


    // FETCH STORES
    const fetchStores = async () => {

        try {

            const res =
                await API.get(
                    "/stores"
                );

            setStores(res.data);

        } catch(error){

            console.log(error);
        }
    };


    useEffect(() => {

        fetchMedicines();

        fetchStores();


        // REAL-TIME UPDATE
        socket.on(
            "inventoryUpdated",
            () => {

                fetchMedicines();
            }
        );


        return () => {

            socket.off(
                "inventoryUpdated"
            );
        };

    }, []);


    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };


    // TRANSFER MEDICINE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res =
                await API.post(
                    "/transfers",
                    formData
                );


            alert(
                "2PC Transfer Successful"
            );

            console.log(res.data);

        } catch(error){

            alert(
                error.response?.data?.message
            );
        }
    };


    return (

        <MainLayout>

            <div className="min-h-screen bg-gray-100 p-8">

                <h1 className="text-4xl font-bold mb-10">

                    Medicine Transfer System

                </h1>


                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    {/* MEDICINE */}

                    <select
                        name="medicineId"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    >

                        <option>

                            Select Medicine

                        </option>

                        {
                            medicines.map(
                                (medicine) => (

                                    <option
                                        key={medicine._id}
                                        value={medicine._id}
                                    >

                                        {medicine.name}

                                    </option>
                                )
                            )
                        }

                    </select>


                    {/* SOURCE STORE */}

                    <select
                        name="sourceStore"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    >

                        <option>

                            Source Store

                        </option>

                        {
                            stores.map(
                                (store) => (

                                    <option
                                        key={store._id}
                                        value={store._id}
                                    >

                                        {store.name}

                                    </option>
                                )
                            )
                        }

                    </select>


                    {/* DESTINATION STORE */}

                    <select
                        name="destinationStore"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    >

                        <option>

                            Destination Store

                        </option>

                        {
                            stores.map(
                                (store) => (

                                    <option
                                        key={store._id}
                                        value={store._id}
                                    >

                                        {store.name}

                                    </option>
                                )
                            )
                        }

                    </select>


                    {/* QUANTITY */}

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />


                    {/* BUTTON */}

                    <button
                        className="bg-blue-600 text-white p-3 rounded md:col-span-2"
                    >

                        Execute 2PC Transfer

                    </button>

                </form>

            </div>

        </MainLayout>
    );
}

export default Transfers;