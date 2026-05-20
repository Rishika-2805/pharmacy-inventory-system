import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../api/axios";

import socket from "../socket/socket";


function Medicines() {

    const [medicines, setMedicines] =
        useState([]);

    const [stores, setStores] =
        useState([]);


    const [formData, setFormData] =
        useState({

            name: "",

            batchNumber: "",

            manufacturer: "",

            expiryDate: "",

            quantity: "",

            price: "",

            category: "",

            storeId: ""
        });


    // FETCH MEDICINES
    const fetchMedicines = async () => {

        try {

            const res =
                await API.get("/medicines");

            setMedicines(res.data);

        } catch(error){

            console.log(error);
        }
    };


    // FETCH STORES
    const fetchStores = async () => {

        try {

            const res =
                await API.get("/stores");

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


    // ADD MEDICINE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/medicines",
                formData
            );

            alert(
                "Medicine Added"
            );

            fetchMedicines();

        } catch(error){

            console.log(error);
        }
    };


    // DELETE MEDICINE
    const deleteMedicine = async (id) => {

        try {

            await API.delete(
                `/medicines/${id}`
            );

            fetchMedicines();

        } catch(error){

            console.log(error);
        }
    };


    return(
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">

                Medicines Management

            </h1>


            {/* ADD FORM */}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Medicine Name"
                    className="border p-3 rounded"
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="batchNumber"
                    placeholder="Batch Number"
                    className="border p-3 rounded"
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="manufacturer"
                    placeholder="Manufacturer"
                    className="border p-3 rounded"
                    onChange={handleChange}
                />


                <input
                    type="date"
                    name="expiryDate"
                    className="border p-3 rounded"
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    className="border p-3 rounded"
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="border p-3 rounded"
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="border p-3 rounded"
                    onChange={handleChange}
                />


                {/* STORE SELECT */}

                <select
                    name="storeId"
                    className="border p-3 rounded"
                    onChange={handleChange}
                >

                    <option>

                        Select Store

                    </option>

                    {
                        stores.map((store) => (

                            <option
                                key={store._id}
                                value={store._id}
                            >

                                {store.name}

                            </option>
                        ))
                    }

                </select>


                <button
                    className="bg-blue-600 text-white p-3 rounded md:col-span-2"
                >

                    Add Medicine

                </button>

            </form>


            {/* MEDICINES TABLE */}

            <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">

                                Name

                            </th>

                            <th>

                                Quantity

                            </th>

                            <th>

                                Price

                            </th>

                            <th>

                                Store

                            </th>

                            <th>

                                Expiry

                            </th>

                            <th>

                                Actions

                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            medicines.map(
                                (medicine) => (

                                    <tr
                                        key={medicine._id}
                                        className="border-b"
                                    >

                                        <td className="py-3">

                                            {medicine.name}

                                        </td>

                                        <td>

                                            {medicine.quantity}

                                        </td>

                                        <td>

                                            ₹{medicine.price}

                                        </td>

                                        <td>

                                            {
                                                medicine.storeId?.name
                                            }

                                        </td>

                                        <td>

                                            {
                                                new Date(
                                                    medicine.expiryDate
                                                ).toLocaleDateString()
                                            }

                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    deleteMedicine(
                                                        medicine._id
                                                    )
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>
                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
        </MainLayout>
    );
}

export default Medicines;