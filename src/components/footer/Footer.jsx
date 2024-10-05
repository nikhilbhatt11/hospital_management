import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";
function Footer() {
  return (
    <div className="bg-white mt-10 flex justify-evenly">
      <div className="mb-4 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-600 text-center mt-2">
          $$ PowerdBy Mediplus $$
        </p>
        <Logo width="100px" />{" "}
        <p className="text-sm text-gray-600 text-center">
          $$ &copy; Copyright 2024. All Rights Reserved by DevUI. $${" "}
        </p>
      </div>
      <ul className="flex flex-wrap gap-2 justify-center items-center">
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Features
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Pricing
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Affiliate Program
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Press Kit
          </Link>
        </li>
      </ul>
      <ul className="flex flex-wrap gap-2 justify-center items-center">
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Account
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Help
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Contact Us
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Customer Support
          </Link>
        </li>
      </ul>
      <ul className="flex flex-wrap gap-2 justify-center items-center">
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Terms &amp; Conditions
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Privacy Policy
          </Link>
        </li>
        <li className="mb-1">
          <Link
            className=" text-base font-medium text-gray-900 hover:text-gray-700"
            to="/"
          >
            Licensing
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
