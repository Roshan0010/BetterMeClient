import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';

// Import your page components
import Login from './pages/Login';
import Redirect from './pages/Redirect';
import TransformRedirect from './pages/TransformRedirect';
import JorneyViewEditPage from './pages/JorneyViewEditPage';
import Header from './components/Header';

// Layout component that includes the Header
const Layout: React.FC = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard/:transform" element={<TransformRedirect />} />
        <Route path="/journey/:transform/:date" element={<JorneyViewEditPage />} />
      </Route>
    </Routes>
  ); 
}

export default App;