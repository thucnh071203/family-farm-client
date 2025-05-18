import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

import addFriendIcon from "../../assets/images/nam_fluent-mdl2_add-friend.svg";
import groupIcon from "../../assets/images/nam_clarity_group-solid.svg";
import serviceIcon from "../../assets/images/nam_eos-icons_service.svg";

const NavbarHeader = () => {
    return (
        <nav className="navbar-header">
            <div className="navbar-header-wrapper">
                <Link to="/" className="navbar-header-item item-active">
                    <i className="fa-solid fa-house"></i>
                    <span>Home</span>
                </Link>

                <Link to="#" className="navbar-header-item">
                    <img
                        src={addFriendIcon}
                        alt="Friends"
                        width="24px"
                        height="24px"
                    />
                    <span>Friends</span>
                </Link>

                <Link to="#" className="navbar-header-item">
                    <img
                        src={groupIcon}
                        alt="Groups"
                        width="24px"
                        height="24px"
                    />
                    <span>Groups</span>
                </Link>

                <Link to="#" className="navbar-header-item">
                    <img
                        src={serviceIcon}
                        alt="Services"
                        width="24px"
                        height="24px"
                    />
                    <span>Services</span>
                </Link>
            </div>
        </nav>
    )
}

export default NavbarHeader