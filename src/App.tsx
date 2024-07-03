import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import Login from './pages/Login';
import Redirect from './pages/Redirect';
import TransformRedirect from './pages/TransformRedirect';
import JorneyViewEditPage from './pages/JorneyViewEditPage';

function App() {
  // const testing: string = useRecoilValue(test);
  // console.log(testing);

  return (
        <Routes>
           
          <Route path='/' element={<Redirect/>}></Route>
          <Route path="/login" element={<Login />} />
         <Route path='/dashboard/:transform' element={<TransformRedirect/>}/>
         <Route path='/journey/:transform/:date' element={<JorneyViewEditPage/>}/>
        </Routes>
  )
}

export default App;


//register
