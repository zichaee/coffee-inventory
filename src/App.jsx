import { fetchGet } from "./controller.jsx"
import {
  Spinner,
} from "./components.jsx"
import { customTheme } from "./theme.jsx";

import Login from "./pages/login.jsx";
import Landing from "./pages/landing.jsx";
import Home from "./pages/home.jsx";
import Inventory from "./pages/inventory.jsx";
import Catalogue from "./pages/catalogue.jsx";
import Suppliers from "./pages/suppliers.jsx";
import Orders from "./pages/orders.jsx";
import OrderDetails from "./pages/order_details.jsx";
import Report from "./pages/report.jsx";
//import Sales from "./pages/sales.jsx";
//import Invoices from "./pages/invoices.jsx";
import Users from "./pages/users.jsx";
import View from "./pages/view.jsx";

import './App.css'
import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
} from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Your username or password cannot be empty.');
    } else {
      try {
        const token = await fetchGet(`/api/auth/credentials/${username}/${password}`);
        localStorage.setItem('auth_token', token);
        location.reload();
      } catch(e) {
        alert('Wrong username or password.');
      }
    }
  };

  const [tokenValidity, setTokenValidity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storedToken = localStorage.getItem('auth_token');

  if (storedToken !== null) {
    useEffect(() => {
      setIsLoading(true);
      fetchGet(`/api/auth/token/${storedToken}`)
        .then((data) => {
          setTokenValidity(data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (tokenValidity === false) {
    return (
      <ThemeProvider theme={customTheme}>
        <Login
          setUsername={(e) => setUsername(e.target.value)}
          setPassword={(e) => setPassword(e.target.value)}
          handleLogin={handleLogin}
        />
      </ThemeProvider>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing content={<Home />} />} />
          <Route path='/catalogue' element={<Landing content={<Catalogue />} />} />
          <Route path='/suppliers' element={<Landing content={<Suppliers />} />} />
          <Route path='/orders' element={<Landing content={<Orders />} />} />
          <Route path='/users' element={<Landing content={<Users />} />} />
          <Route path='/inventory/*' element={<Landing content={<Inventory />} />} />
          <Route path='/order-details/*' element={<Landing content={<OrderDetails />} />} />
          <Route path='/report' element={<Report />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
