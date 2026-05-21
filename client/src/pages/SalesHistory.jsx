import { useEffect, useState }
from "react";

import API from "../api/axios";

import { useNavigate }
from "react-router-dom";

function SalesHistory() {

    const [sales, setSales] =
    useState([]);
    
    const navigate =
useNavigate();

    const fetchSales =
    async () => {

        try {

            const res =
            await API.get(

                "/orders/sales-history"
            );

            setSales(
                res.data
            );

        } catch(error){

            console.log(error);
        }
    };


    useEffect(() => {

        fetchSales();

    }, []);


    return (
        

        <div className="p-6">
            <button
    onClick={() =>
        navigate("/dashboard")
    }

    className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
>

    Close

</button>

            <h1 className="text-3xl font-bold mb-6">

                Sales History

            </h1>


            <table className="w-full border">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="p-3">

                            Medicine

                        </th>

                        <th className="p-3">

                            Buyer

                        </th>

                        <th className="p-3">

                            Quantity

                        </th>

                        <th className="p-3">

                            Total

                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        sales.map((sale) => (

                            <tr
                                key={sale._id}
                                className="border-t"
                            >

                                <td className="p-3">

                                    {
                                        sale.medicine?.name
                                    }

                                </td>

                                <td className="p-3">

                                    {
                                        sale.user?.email
                                    }

                                </td>

                                <td className="p-3">

                                    {
                                        sale.quantity
                                    }

                                </td>

                                <td className="p-3">

                                    ₹{
                                        sale.totalPrice
                                    }

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default SalesHistory;