import React from "react";
import Link from "next/link";

const HeaderComp = () => {
  return (
    <header>
      <nav className=" navbar-expand-lg navbar-light bg-dark ">
        <ul className="nav">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link text-light">Excel</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/micro">
              <a className="nav-link text-light">Micro</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComp;
