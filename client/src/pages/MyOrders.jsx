import { useEffect, useState } from "react";

import API from "../api/axios";

import MainLayout from "../layouts/MainLayout";
function MyOrders() {

    const [orders, setOrders] =
        useState([]);


    const fetchOrders = async () => {

        try {

            const res =
                await API.get(
                    "/orders/my-orders"
                );

            setOrders(res.data);

        } catch(error){

            console.log(error);
        }
    };


    useEffect(() => {

        fetchOrders();

    }, []);


    return(
        <MainLayout>

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-10">

                My Orders

            </h1>


            <div className="space-y-6">

                {
                    orders.map((order) => (

                        <div
                            key={order._id}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >

                            <h2 className="text-2xl font-bold">

                                {
                                    order.medicine?.name
                                }

                            </h2>


                            <p className="mt-2">

                                Quantity:
                                {" "}
                                {order.quantity}

                            </p>


                            <p className="mt-2">

                                Total:
                                {" "}
                                ₹{order.totalPrice}

                            </p>


                            <p className="mt-2">

                                Store:
                                {" "}
                                {
                                    order.store?.name
                                }

                            </p>


                            <p className="mt-2">

                                Status:
                                {" "}
                                {order.status}

                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
        </MainLayout>
    );

}

export default MyOrders;