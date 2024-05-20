import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Login } from "./components/authentications/Login";
import AddBanner from "./components/banner/AddBanner";
import Banners from "./components/banner/Banners";
import ProductList from "./components/context/ProductContext";
import { FullPageLoading } from "./components/helpers/Loading";
import { getAllProduct, useAuth } from "./components/helpers/firebase";
import { Homepage } from "./components/homepage/HomePage";
import { Layout } from "./components/layout/Layout";
import AddProduct from "./components/product/AddProduct";
import { Product } from "./components/product/Product";
import { Transaction } from "./components/transaction/Transaction";

const App = () => {
  const [allProduct, setAllProduct] = useState();

  useEffect(() => {
    getAllProduct(setAllProduct);
  }, []);

  let userState = useAuth();
  if (userState === undefined) {
    return <FullPageLoading />;
  }
  return (
    <>
      <ProductList.Provider value={{ allProduct, setAllProduct }}>
        <Routes>
          <Route
            path="/login"
            element={userState?.email ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            exact
            path="/"
            element={userState?.email ? <Layout /> : <Navigate to="/login" />}
          >
            <Route path="homepage" element={<Homepage />}></Route>

            {/* Product route */}
            <Route path="product" element={<Product />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/edit/:productId" element={<AddProduct />} />

            <Route path="product" element={<Product />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/edit/:productId" element={<AddProduct />} />

            <Route path="banners" element={<Banners />}></Route>
            <Route path="banners/:id" element={<AddBanner />}></Route>
            <Route path="banners/add" element={<AddBanner />}></Route>

            <Route path="transaction" element={<Transaction />}></Route>
          </Route>
        </Routes>
      </ProductList.Provider>
    </>
  );
};
export default App;
