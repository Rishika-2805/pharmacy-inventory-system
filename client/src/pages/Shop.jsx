import { useEffect, useState } from "react";

import API from "../api/axios";

import socket from "../socket/socket";
import MainLayout from "../layouts/MainLayout";

function Shop() {

    const [medicines, setMedicines] =
        useState([]);

    const [quantities, setQuantities] =
        useState({});


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


    useEffect(() => {

        fetchMedicines();


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


    // HANDLE QUANTITY
    const handleQuantityChange = (
        id,
        value
    ) => {

        setQuantities({
            ...quantities,
            [id]: value
        });
    };


    // BUY MEDICINE
    const buyMedicine = async (
        medicineId
    ) => {

        try {

            const quantity =
                quantities[medicineId] || 1;


            await API.post(
                "/orders/buy",
                {
                    medicineId,
                    quantity
                }
            );


            alert(
                "Medicine Purchased Successfully"
            );

            fetchMedicines();

        } catch(error){

            alert(
                error.response?.data?.message
            );
        }
    };


    return(
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-10">

                Buy Medicines

            </h1>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {
                    medicines.map(
                        (medicine) => (

                            <div
                                key={medicine._id}
                                className="bg-white p-6 rounded-xl shadow-md"
                            >

                                <h2 className="text-2xl font-bold mb-2">

                                    {medicine.name}

                                </h2>


                                <p className="mb-2">

                                    Store:
                                    {" "}
                                    {
                                        medicine.storeId?.name
                                    }

                                </p>


                                <p className="mb-2">

                                    Price:
                                    {" "}
                                    ₹{medicine.price}

                                </p>


                                <p className="mb-2">

                                    Stock:
                                    {" "}
                                    {medicine.quantity}

                                </p>


                                <p className="mb-4">

                                    Expiry:
                                    {" "}
                                    {
                                        new Date(
                                            medicine.expiryDate
                                        ).toLocaleDateString()
                                    }

                                </p>


                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Quantity"
                                    className="border p-2 rounded w-full mb-4"
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            medicine._id,
                                            e.target.value
                                        )
                                    }
                                />


                                <button
                                    onClick={() =>
                                        buyMedicine(
                                            medicine._id
                                        )
                                    }
                                    className="bg-green-600 text-white w-full py-3 rounded-lg"
                                >

                                    Buy Medicine

                                </button>

                            </div>
                        )
                    )
                }

            </div>

        </div>

        </MainLayout>
    );

}

export default Shop;