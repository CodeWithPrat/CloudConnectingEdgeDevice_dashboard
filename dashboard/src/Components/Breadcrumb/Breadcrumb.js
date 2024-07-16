import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Breadcrumb.css";
import { IoMdOptions } from "react-icons/io";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="Breadcrumb" className=" py-3 px-4  mb-6">
      <ol className="list-none p-0 flex flex-wrap items-center text-gray-600">
        <li className="flex items-center">
          <Link to="/mainindex" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center">
            <IoMdOptions className="mr-2" />
            <span className="hover:underline">Modules</span>
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={routeTo} className="flex items-center">
              <svg className="w-6 h-6 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              {isLast ? (
                <span className="text-gray-800 font-medium">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
