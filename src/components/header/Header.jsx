import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../index";
import Menubar from "../Menubar";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Patients",
      url: "/all-patient",
      active: authStatus,
    },
    {
      name: "Add Patient",
      url: "/add-patient",
      active: authStatus,
    },

    {
      name: "All Doctors",
      url: "/all-docs",
      active: authStatus,
    },
    {
      name: "Add Doctor",
      url: "/add-doc",
      active: authStatus,
    },
  ];

  return (
    <header className=" bg-white w-full py-4">
      <Container>
        <nav className="flex m-auto items-center text-black">
          <div className="mr-2 sm:mr-4 ">
            <Link to="/">
              <Logo width="120px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="invisible sm:visible">
                  <button
                    onClick={() => navigate(item.url)}
                    className=" inline-block px-1 m-0.5 text-sm font-serif duration-200  hover:border-red-500 hover:border-b-2 sm:text-base sm:px-2 sm:m-2 lg:text-xl lg:px-3"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="invisible sm:visible">
                <LogoutBtn />
              </li>
            )}
            <li className="text-3xl -ml-96  sm:invisible sm:text-xs sm:-ml-10">
              <Menubar />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
