import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Medicines from "./pages/Medicines";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Shop from "./pages/Shop";

import MyOrders from "./pages/MyOrders";

import ProtectedRoute
from "./routes/ProtectedRoute";

import RoleProtectedRoute
from "./routes/RoleProtectedRoute";

import Stores from "./pages/Stores";

import Transfers from "./pages/Transfers";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />
       <Route
  path="/medicines"
  element={

    <RoleProtectedRoute
      allowedRoles={[
        "admin",
        "warehouse_manager",
        "store_manager"
      ]}
    >

      <Medicines />

    </RoleProtectedRoute>
  }
/>
    <Route
  path="/shop"
  element={

    <RoleProtectedRoute
      allowedRoles={[
        "user",
        "store_manager"
      ]}
    >

      <Shop />

    </RoleProtectedRoute>
  }
/>


<Route
  path="/my-orders"
  element={

    <RoleProtectedRoute
      allowedRoles={[
        "user"
      ]}
    >

      <MyOrders />

    </RoleProtectedRoute>
  }
/>

 <Route
  path="/transfers"
  element={

    <RoleProtectedRoute
      allowedRoles={[
        "admin",
        "warehouse_manager"
      ]}
    >

      <Transfers />

    </RoleProtectedRoute>
  }
/>

<Route
  path="/stores"
  element={

    <RoleProtectedRoute
      allowedRoles={[
        "admin"
      ]}
    >

      <Stores />

    </RoleProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;