import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/index.js';
import Layout from './components/Layout/Layout';
import DashboardPage from './Pages/DashboardPage';
import MyBookingsPage from './Pages/MyBookingsPage';
import ApprovalsPage from './Pages/ApprovalsPage';
import LoginPage from './Pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <MyBookingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/approvals"
              element={
                <PrivateRoute>
                  <ApprovalsPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;