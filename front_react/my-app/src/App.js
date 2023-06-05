import './App.css';
import {BrowserRouter,  Route, Routes} from "react-router-dom";
import Catalog from "./components/Catalog";
import Main from "./components/Main";
import Product from "./components/Product";
import Drawer from "./components/Drawer";
import Register from "./components/Register";
import Login from "./components/Login";
import ManagerPage from "./components/ManagerPage";
import MyBooking from "./components/MyBooking";
import NewService from "./components/NewService";
import UpdateService from "./components/UpdateService";


function App() {
  return (
      <div className="App">
          <BrowserRouter basename="/">
              <Routes>
                  <Route exact path="/catalog" element={<Catalog/>}/>
                  <Route exact path="/" element={<Main/>}/>
                  <Route exact path="/product/:id" element={<Product/>}/>
                  <Route exact path="/drawer" element={<Drawer/>}/>
                  <Route exact path="/register" element={<Register/>}/>
                  <Route exact path='/login' element={<Login/>}/>
                  <Route exact path='/manage' element={<ManagerPage/>}/>
                  <Route exact path='/mybooking' element={<MyBooking/>}/>
                  <Route exact path='/newservice' element={<NewService/>}/>
                  <Route exact path='/updateservice/:id' element={<UpdateService/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;

// import './App.css';
// import ShoppingCart from "./components/shoppingCart";
//
// function App() {
//     return (
//         <div className="App">
//             <ShoppingCart/>
//         </div>
//     );
// }

// export default App;