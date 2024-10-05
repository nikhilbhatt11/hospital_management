import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./header/LogoutBtn";

function Menubar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <RxHamburgerMenu onClick={toggleMenu} />
      <nav
        className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-transform duration-200 ${
          isOpen
            ? "transform scale-100 opacity-100"
            : "transform scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
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
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Menubar;
