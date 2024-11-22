import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import NotFound from './pages/Notfound.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SignUp from './pages/SignUp.jsx';
import AddContact from './pages/AddContact.jsx';

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css'


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/add-contact' element={<AddContact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
