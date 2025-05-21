import React, { useState, useEffect } from 'react';
import './header.css'; // giữ nguyên CSS cũ
import { Link } from 'react-router-dom';
import NotificationList from '../Notification/NotificationList';
import logo from '../../assets/images/logo.png';
import defaultAvatar from '../../assets/images/default-avatar.png';

const Header = () => {
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [usernameStorage, setUsernameStorage] = useState("");
    const [showNotifi, setShowNotifi] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive((prev) => !prev);
    };

    //Lấy username lưu trong local storage
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setUsernameStorage(username);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarActive(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Đóng popup notification
    useEffect(() => {
        const handleClose = () => setShowNotifi(false);
        window.addEventListener("closeNotification", handleClose);
        return () => window.removeEventListener("closeNotification", handleClose);
    }, []);

    return (
        <header className='fixed z-[1000]'>
            <div className="logo">
                <Link to="/" href="#">
                    <img src={logo} alt="logo" />
                </Link>
                <h3 className="name-page font-bold">Family Farm</h3>
            </div>

            <div className="search-box">
                <div className="search-box-wrapper">
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" placeholder="Search" className="search-input" />
                </div>
            </div>

            <div className="action">
                <div className="notifi-box" onClick={() => setShowNotifi(!showNotifi)}>
                    <i className="fa-solid fa-bell"></i>
                    <div className="notifi-number">4</div>
                    {/* 💬 Hiển thị popup ở đây */}
                    {showNotifi && (
                        <div className="absolute top-10 right-0">
                        <NotificationList />
                        </div>
                    )}
                </div>
                <div className="chat-box">
                    <i className="fa-solid fa-comment"></i>
                    <div className="chat-number">10</div>
                </div>

                {/* xử lý hiện thị khi login thành công  */}
                {usernameStorage ? (
                    <div className="avatar-box">
                        <div className="avatar-circle">
                            <img src={defaultAvatar} alt="avatar" />
                        </div>
                        <p className="name-account">Phuong Nam</p>
                    </div>

                ) : (
                    <div class="login-box">
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </div>

            <div className="menu-responsive" onClick={toggleSidebar}>
                <i className="fa-solid fa-bars"></i>
            </div>

            <div className={`sidebar-menu ${isSidebarActive ? 'active' : ''}`}>
                <Link to="/" className="sidebar-item">
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </Link>

                <Link to="/" className="sidebar-item">
                    <i className="fa-solid fa-user"></i>
                    <p>Friend</p>
                </Link>

                <Link to="/" className="sidebar-item">
                    <i className="fa-solid fa-user-group"></i>
                    <p>Group</p>
                </Link>

                <Link to="/" className="sidebar-item">
                    <i className="fa-brands fa-servicestack"></i>
                    <p>Service</p>
                </Link>

                {usernameStorage ? (
                    <div
                        className="sidebar-item sidebar-item-profile"
                        onClick={() => setDropdownVisible((prev) => !prev)}
                    >
                        <div className="sidebar-item-profile-avatar">
                            <div>
                                <div>
                                    <img src={defaultAvatar} alt="avatar" />
                                </div>
                                <p>Personal</p>
                            </div>
                            <i className="fa-solid fa-caret-down dropdown-icon"></i>
                        </div>

                        {dropdownVisible && (
                            <div className="dropdown-personal">
                                <ul>
                                    <li>Profile</li>
                                    <li>Notifications</li>
                                    <li>Chats</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" class="sidebar-item">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <p>Login</p>
                    </Link>
                )}

            </div>
        </header>
    );
};

export default Header;