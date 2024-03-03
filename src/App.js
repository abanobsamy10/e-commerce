import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/register';
import Brand from './components/brand/Brand';
import Category from './components/category/Category';
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import AuthProvider from './Context/Auth/auth';
import Profile from './components/Profile/Profile';
import PrptectedRoute from './components/Test/test';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import CartProcider from './Context/Cart/Cart';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import Wishprovider from './Context/Wish/Wish';
import Wish from './components/Wish/Wish';
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import ResetPassword from './components/resetpassword/ResetPassword';
import ResetingPassword from './components/resetingpassword/ResetingPassword.jsx';


let router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <PrptectedRoute><Home /></PrptectedRoute> },
      { path: "login", element: <Login /> },
      { path: "forget", element: <ForgetPassword/>},
      { path: "resetingpassword", element: <ResetingPassword/>},
      { path: "ResetPassword", element: <ResetPassword/>},
      { path: "details/:id", element: <PrptectedRoute><ProductDetails/></PrptectedRoute>},
      { path: "cart", element: <PrptectedRoute><Cart/></PrptectedRoute>},
      { path: "payment", element: <PrptectedRoute><Payment/></PrptectedRoute>},
      { path: "allorders", element: <PrptectedRoute><AllOrders/></PrptectedRoute>},
      { path: "wish", element: <PrptectedRoute><Wish/></PrptectedRoute>},
      { path: "register", element: <Register /> },
      { path: "profile", element: <PrptectedRoute><Profile /></PrptectedRoute> },
      { path: "brand", element: <PrptectedRoute><Brand /></PrptectedRoute> },
      { path: "category", element: <PrptectedRoute><Category /></PrptectedRoute> },
      { path: "*", element: <NotFound /> },
    ]
  }
])



let queryClient = new QueryClient({})
function App() {
  return (
    <div >
      <QueryClientProvider client={queryClient}>
      <Toaster/>
      <Wishprovider>
        <CartProcider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        </CartProcider>
        </Wishprovider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
