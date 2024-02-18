import React from 'react';
import {Link} from "react-router-dom";
import {FaSearch, FaUser, FaUserAlt} from "react-icons/fa";
import {useSelector} from "react-redux";
import logo from "../../assets/Logo.png";


const Header = () => {

    const {user} = useSelector((state) => state.auth)

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'><img src={logo} alt="logo"/></Link>
            </div>
            <form action="/search" className="searchBar">
                <input type="text"/>
                <button className='searchButton' type='submit'>
                    <FaSearch/>
                </button>
            </form>
            <div className="accountHeader">
                {user ? (
                    <>
                        <Link to='/account'>
                            <FaUserAlt/>
                        </Link>
                    </>

                ) : (
                    <>
                        <Link to='/login'>
                            <FaUser/>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;