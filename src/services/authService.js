// // Create a new file: src/hooks/useAuth.js
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { login, logout } from '../ReduxStateManagement/user/action';

// export const authService = () => {
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     // Check if token exists in localStorage on app load
//     const token = localStorage.getItem('authToken');
//     const email = localStorage.getItem('userEmail');
    
//     if (token && email) {
//       // Auto-login with stored credentials
//       dispatch(login({ email }, token));
//     }
//   }, [dispatch]);
  
//   const logoutUser = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userEmail');
//     dispatch(logout());
//   };
  
//   return { logoutUser };
// };