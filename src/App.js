
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import VotingPage from './pages/VotingPage';
import AdminHomePage from './pages/AdminHomePage';
import UserProvider from './context/UserProvider';
import PrivateRoute from './auth/PrivateRoute';
import TopNavbar from './components/TopNavbar';
import ElectionContext from './context/ElectionContext';

function App() {
  return (
      <>
      <UserProvider>
        <ElectionContext>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<RegistrationPage />}/>
              <Route path='/login' element={<LoginPage />}/>
              <Route path='/user' element={<PrivateRoute />}>
                <Route path='voting' element={<VotingPage />}/>
                <Route path='admin' element={<AdminHomePage />}/>
              </Route>
          </Routes>
        </BrowserRouter>
        </ElectionContext>
      </UserProvider>
      </>
  );
}

export default App;
