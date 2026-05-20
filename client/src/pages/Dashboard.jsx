import MainLayout from "../layouts/MainLayout";
function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

       <MainLayout>
            <div className="p-10">

            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>

            <p className="mt-4">

                Welcome {user?.name}

            </p>

        </div>
       </MainLayout>
    );
}

export default Dashboard;