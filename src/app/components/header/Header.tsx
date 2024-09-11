"use client";

import React from 'react';
import '../../styles/components/header.scss';
import { FaUser } from 'react-icons/fa'; 

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: NavItem[];
}

interface HeaderProps {
  title: string;
  navItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ title, navItems }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
              {item.dropdownItems && (
                <div className="dropdown">
                  {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <a key={dropdownIndex} href={dropdownItem.href}>
                      {dropdownItem.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <button className="login-button">
          <FaUser /> Portal HU
        </button>
      </nav>
    </header>
  );
};

export default Header;