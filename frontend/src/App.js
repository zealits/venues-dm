import './App.css';
import FromVendor from './pages/from_vendor/form_vendor';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Dashboard from './pages/dashboard/dashboard';
import Settings from './pages/Settings/settings';
import Vendor from './pages/vendor/vendor';
import  Venue from './pages/venue/venue';
import FromVenue from './pages/form_venue/form_venue'
function App() {
  return (
    <>
  
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/venue' element={<Venue />}></Route>
        <Route path='/venue/add' element={<FromVenue />} />
        <Route path='/vendor' element={<Vendor />}></Route>
        <Route path='/vendor/add' element={<FromVendor />} /> 
        <Route path='/settings' element={<Settings />}></Route>
    </Routes>
  </BrowserRouter>
   
    </>
  );
}

export default App;