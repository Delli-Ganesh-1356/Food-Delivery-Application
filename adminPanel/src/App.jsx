import React, { useState } from 'react'
import { Routes, Route } from 'react-router';
import Sidebar from './components/Sidebar/sideBar';
import Menubar from './components/Menubar/menuBar';
import Orders from './pages/Orders/Orders';
import AddFood from './pages/AddFood/addFood';
import ListFood from './pages/ListFood/listFood';
  import { ToastContainer} from 'react-toastify';

const App = () => {
   const [sidebarVisible, setSidebarVisible] = useState(true);

   const toggleSidebar= () => {
      setSidebarVisible(!sidebarVisible);
   }
  return (
     <div className="d-flex" id="wrapper">
           
          <Sidebar sidebarVisible={sidebarVisible}/>

            <div id="page-content-wrapper">
                 
                <Menubar toggleSidebar={toggleSidebar}/>
                <ToastContainer />
                <div className="container-fluid">
                   <Routes>
                      <Route path='/add' element={<AddFood />} />
                      <Route path='/list' element={<ListFood />} />
                      <Route path='/orders' element={<Orders />} />
                      <Route path='/' element={<ListFood />} />
                   </Routes>
                </div>
            </div>
        </div>
  )
}

export default App;