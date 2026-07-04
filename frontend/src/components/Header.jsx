import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
//react-icons
import { FaSearch } from "react-icons/fa"; // search icon
import { GiHamburgerMenu } from "react-icons/gi"; // menu icon
import { RxCross2 } from "react-icons/rx"; // cross icon
import { useUser } from "../context/UserContext";

function Header() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const { user , logout} = useUser();
  const islogin = Boolean(user);
  const path = useLocation();
  // console.log(path);

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  function redirectUser() {
    if(user?.role == "teacher") {
      return "/teacher/courses";
    }
    else {
      return "/student/courses";
    }
  }

  return (
    <header>
      <nav>
        <div className=".logo">
          <h1>EduVerse</h1>
        </div>
        <div className="nav-links">
          <ul>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    to={link.url}
                    className={path.pathname == link.url ? "selected" : ""}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav-right">
          <div className="search">
            <FaSearch className="search-icon" />{" "}
            <input type="text" placeholder="Search Courses" />
          </div>
          {islogin ? (
            <div className="after-login-header-btns">
                <Link to={redirectUser()}>Dashboard</Link>
                <button onClick={logout}>Logout</button> 
            </div>
          ) : (
            <Link className="signup-btn" to="/register">
              Signup
            </Link>
          )}
        </div>
        <div className="mobile-menu-btn">
          {isMenuOpen ? (
            <RxCross2 onClick={() => setIsMenuOpen(false)} />
          ) : (
            <GiHamburgerMenu onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </nav>
      {/* Mobile Menu start (means responsive) */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <ul>
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={link.url}
                      className={path.pathname == link.url ? "selected" : ""}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mobile-search">
              <FaSearch className="mobile-search-icon" />{" "}
              <input type="text" placeholder="Search Courses" />
            </div>
            {islogin ? (
            <div className="after-login-header-btns">
                <Link to={redirectUser()}>Dashboard</Link>
                <button onClick={logout}>Logout</button> 
            </div>
          ) : (
            <Link className="signup-btn" to="/register">
              Signup
            </Link>
          )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
