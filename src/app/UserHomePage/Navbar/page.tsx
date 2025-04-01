import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const Nav = () => {
  return (
    <nav>
      <img src="/assets/logo.png" alt="Logo" />
      <div>
        <input type="text" placeholder="Search products..." />
      </div>
      <div className='links'>
       
        <Link href={'/UserHomePage/Orders'} className="orders">Orders</Link>
        <Link href="/UserHomePage/Settings" className='settings'>Settings</Link>
         <Link href="/UserHomePage/Cart" className="cart">
            <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;