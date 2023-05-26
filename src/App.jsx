import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./pages/contact";
import BookPage from "./pages/book";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import { useEffect } from "react";
import { callFetchAccount } from "./services/api";
import { useDispatch } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
export default function App() {
const dispatch = useDispatch();
  const getAccount = async ()=> {
    try {
      const res = await callFetchAccount();
      console.log(res)
   if(res && res.data){
    dispatch(doGetAccountAction(res.data.data.user));
   }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

      getAccount();
    },[])
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 NOT FOUND</div>,
      children: [
        { index: true, element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/book", element: <BookPage /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element:<Register/>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
