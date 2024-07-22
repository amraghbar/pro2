import React, { useState, useEffect } from 'react';
import './css/home.css';
import { FaGripHorizontal } from "react-icons/fa";
import { FaBurger } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import Dashboard from '../pages/Dashboard';
import Food from '../pages/Food';
import Messages from '../pages/Messages';
import Bills from '../pages/Bills';
import Settings from '../pages/Settings';
import Support from '../pages/Support';
import Notifications from '../pages/Notifications';

function Dash() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    if (window.innerWidth > 767) {
      sidebar.classList.remove('show-sidebar');
      mainContent.classList.remove('show-sidebar');
    }
  };

  useEffect(() => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = 'index.html';
      });
    }
  }, []);

  const menuTabs = [
    { name: 'Food & Drinks', icon: <FaBurger  />, component: Food, src: './pages/Food.jsx' },
    { name: 'Dashboard', icon:<FaGripHorizontal /> , component: Dashboard, src: 'pages/Dashboard.jsx' },
    { name: 'Messages', icon: <FaMessage />, component: Messages, src: 'pages/Messages.jsx' },
    { name: 'Bills', icon: <FaFileInvoiceDollar />, component: Bills, src: 'pages/Bills.jsx' },
    { name: 'Settings', icon: <FaGear />, component: Settings, src: 'pages/Settings.jsx' },
  ];

  const otherTabs = [
    { name: 'Notifications', icon: <FaBell />, component: Notifications, src: 'pages/Notifications.jsx' },
    { name: 'Support', icon: <FaHeadset />, component: Support, src: 'pages/Support.jsx' },
  ];


  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setSelectedComponent(menuTabs[tabIndex].component);
  };

  const handleOtherTabClick = (tabIndex) => {
    setSelectedComponent(otherTabs[tabIndex].component);
  };


  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    sidebar.classList.toggle('show-sidebar');
    mainContent.classList.toggle('show-sidebar');
  };

  return (
    <div className='d-flex'>
      <aside className="col-2" id="sidebar" style={{ height: '100vh', width: '500px' }}>
        <div id="auppers" className="col-12 b d-flex justify-content-center align-items-center flex-row gap-3 p-2" style={{ height: '9vh' }}>
          <img src="src/assets/components/css/img/logo.png" alt="Logo" height="50px" />
          <p className="m-0">Smart<span>POS</span></p>
        </div>
        <div id="centerSe" className="col-12">
          <ul className="d-flex flex-column pt-4 mb-0">
            {menuTabs.map((tab, index) => (
              <li
                key={index}
                className={`d-flex align-items-center gap-3 mb-1 ${index === activeTab ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                <i className={`fa-solid ${tab.icon.props.className}`} style={{ fontSize: '10px' }}>{tab.icon}</i>
                <p className="mb-0" style={{ fontSize: '10px' }}>{tab.name}</p>
              </li>
            ))}
          </ul>
          <p className="other col-12 px-2 m-0">others</p>
          <ul className="d-flex flex-column pt-4 mb-0">
            {otherTabs.map((tab, index) => (
              <li
                key={index}
                className="d-flex align-items-center gap-3 mb-1"
                onClick={() => handleOtherTabClick(index)}
              >
                <i className={`fa-solid ${tab.icon.props.className}`} style={{ fontSize: '10px' }}>{tab.icon}</i>
                <p className="mb-0" style={{ fontSize: '10px' }}>{tab.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-10 userinfo gap-1 d-flex flex-wrap justify-content-center align-items-center">
          <img src="src/assets/components/css/img/user1.png" alt="User" />
          <p className="col-12 text-center mb-0" style={{ fontWeight: 600 }}>Amr Aghbar</p>
          <p className="col-12 text-center mb-0 userdata">User info</p>
          <button id="logoutButton" className="col-12 btn">Log out</button>
        </div>
      </aside>
      <main className="d-flex flex-grow-1 col-10" style={{ height: '60vh' }}>
        {selectedComponent}
      </main>
      <button id="menui" onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
  );
}

export default Dash;
