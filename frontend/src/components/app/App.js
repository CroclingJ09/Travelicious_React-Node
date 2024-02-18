import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../header/Header";
import Home from "../../pages/home/Home";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import Error from "../../pages/error/Error";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Account from "../../pages/account/Account";
import Search from "../../pages/search/Search";
import MenuBar from "../menuBar/MenuBar";
import AddDestination from "../../pages/addDestination/AddDestination";
import Destination from "../../pages/destination/Destination";
import Admin from "../../pages/admin/Admin";
import UpdateDestination from "../../pages/updateDestination/UpdateDestination";
import BookDestination from "../../pages/bookDestination/BookDestination";
import UpdateUser from "../../pages/updateUser/UpdateUser";
import BookingInfo from "../../pages/bookingInfo/BookingInfo";

function App() {

  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/updateUser' element={<UpdateUser/>}/>
            <Route path='/addDestination' element={<AddDestination/>}/>
            <Route path='/updateDestination' element={<UpdateDestination/>}/>
            <Route path='/bookDestination' element={<BookDestination/>}/>
            <Route path='/destinations' element={<Destination/>} />
            <Route path='/bookingInfo' element={<BookingInfo/>}/>
            <Route path='/*' element={<Error/>}/>
          </Routes>
          <MenuBar/>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
