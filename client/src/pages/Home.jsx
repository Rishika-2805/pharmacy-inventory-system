import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">

            <h1 className="text-5xl font-bold mb-10">

                Pharmacy Inventory System

            </h1>


            <div className="flex gap-6">

                <Link to="/register">

                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg">

                        Register

                    </button>

                </Link>


                <Link to="/login">

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">

                        Login

                    </button>

                </Link>

            </div>

        </div>
    );
}

export default Home;