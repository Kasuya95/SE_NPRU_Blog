import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          SE NPRU BLOG
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="btn btn-info" href="/Login">
              Login
            </a>
          </li>

          <li>
            <a className="btn btn-soft btn-warning" href="/Register">
              Register
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar