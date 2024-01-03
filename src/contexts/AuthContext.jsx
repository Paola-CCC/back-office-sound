import React, {  useCallback, useContext, useEffect, useMemo } from 'react';
import { createContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { usersService } from '../services/users/UsersService';

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState([]);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : '';
    
    const handleLogout = useCallback(() => {
      if (localStorage.getItem('jwt')) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole([]);
        setUsername('');
      }
      navigate('/');

    }, [navigate]);

    
    const isJWTinlocalStorage = useCallback(() => {
      if (!localStorage.getItem('jwt')) {
        return false;
      } else {
        return true;
      }
    }, []);

    useEffect(() => {
      setIsAuthenticated(isJWTinlocalStorage());

      if( isAuthenticated ){
        let jwtDecoded  = jwt_decode(JSON.parse(token));
        setUserId(parseInt(jwtDecoded.userId));
        setUserRole(jwtDecoded.roles);
        setUsername(jwtDecoded.username);
      }

    }, [isJWTinlocalStorage ,token,userId,isAuthenticated]);

  
    const contextValue = useMemo(
      () => ({
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId,
        userRole,
        setUserRole,
        username,
        setUsername,
        handleLogout,
        usersService

      }),
      [isAuthenticated, userId, userRole , username ,handleLogout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
    );
}

export { useAuthContext, AuthContextProvider} ;