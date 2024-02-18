import React from 'react';
import {Link} from "react-router-dom";
import {FaHome, FaSearch, FaUser, FaUserAlt} from "react-icons/fa";
import {useSelector} from "react-redux";

const MenuBar = () => {

    const {user} = useSelector((state) => state.auth)

    return (
        <nav className='menuMobile'>
            <ul>
                <li>
                    <Link to='/search'>
                        <FaSearch/>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <FaHome/>
                    </Link>
                </li>
                <li>
                    {user ? (
                        <>
                            <Link to='/account'>
                                <FaUser/>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>
                                <FaUserAlt/>
                            </Link>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default MenuBar;