import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import authService from '../../services/auth.service';
import tokenService from '../../services/token.service';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
    setCurrentUser(tokenService.getUser());
  }, []);

 const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate('/');
  };

return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          SE NPRU BLOG
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {currentUser ? (
            <>
              <li className="mr-2"><span className="px-3">{currentUser.username}</span></li>
              <li>
                <button className="btn btn-error" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="btn btn-info" to="/login">Login</Link>
              </li>
              <li>
                <Link className="btn btn-warning" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;