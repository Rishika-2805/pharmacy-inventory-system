import { Link } from "react-router-dom";

function Sidebar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

            {/* TITLE */}

            <h1 className="text-2xl font-bold mb-10">

                Pharmacy System

            </h1>


            {/* NAVIGATION */}

            <div className="space-y-4">

                {/* DASHBOARD */}

                <Link
                    to="/dashboard"
                    className="block hover:text-blue-400"
                >

                    Dashboard

                </Link>


                {/* ADMIN */}

                {
                    user?.role === "admin" && (

                        <>

                            <Link
                                to="/medicines"
                                className="block hover:text-blue-400"
                            >

                                Manage Medicines

                            </Link>


                            <Link
                                to="/stores"
                                className="block hover:text-blue-400"
                            >

                                Manage Stores

                            </Link>


                            <Link
                                to="/transfers"
                                className="block hover:text-blue-400"
                            >

                                Transfer System

                            </Link>

                        </>
                    )
                }


                {/* WAREHOUSE MANAGER */}

                {
                    user?.role ===
                    "warehouse_manager" && (

                        <>

                            <Link
                                to="/medicines"
                                className="block hover:text-blue-400"
                            >

                                Warehouse Inventory

                            </Link>


                            <Link
                                to="/transfers"
                                className="block hover:text-blue-400"
                            >

                                Transfer Medicines

                            </Link>

                        </>
                    )
                }


                {/* STORE MANAGER */}

                {
                    user?.role ===
                    "store_manager" && (

                        <>

                            <Link
                                to="/medicines"
                                className="block hover:text-blue-400"
                            >

                                Store Inventory

                            </Link>


                            <Link
                                to="/shop"
                                className="block hover:text-blue-400"
                            >

                                Sales Portal

                            </Link>

                        </>
                    )
                }


                {/* USER */}

                {
                    user?.role === "user" && (

                        <>

                            <Link
                                to="/shop"
                                className="block hover:text-blue-400"
                            >

                                Buy Medicines

                            </Link>


                            <Link
                                to="/my-orders"
                                className="block hover:text-blue-400"
                            >

                                My Orders

                            </Link>

                        </>
                    )
                }


                {/* LOGOUT */}

                <button
                    onClick={() => {

                        localStorage.clear();

                        window.location.href =
                            "/login";
                    }}
                    className="mt-10 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >

                    Logout

                </button>

            </div>

        </div>
    );
}

export default Sidebar;