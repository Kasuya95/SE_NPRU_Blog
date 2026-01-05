import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import authService from "../../services/auth.service";

const Navbar = () => {
  const { userInfo, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout(); // clear token on server if needed
    logOut(); // update context → currentUser จะเป็น null
    navigate("/"); // navigate ไปหน้า home
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
          {userInfo ? (
            <>
              {/* แสดงชื่อผู้ใช้ */}
              <li className="mr-2">
                <span className="px-3">{userInfo.username}</span>
              </li>

              {/* ปุ่ม Create Post */}
              <li className="mr-2">
                <Link className="btn btn-success" to="/create">
                  Create Post
                </Link>
              </li>

              {/* ปุ่ม Logout */}
              <li>
                <button className="btn btn-error" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="btn btn-info" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="btn btn-warning" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
