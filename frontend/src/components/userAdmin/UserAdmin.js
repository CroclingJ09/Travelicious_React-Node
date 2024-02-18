import React from 'react';
import {Link} from "react-router-dom";
import {FaPencil} from "react-icons/fa6";

const UserAdmin = ({user, key}) => {

    return (
        <div className='adminBloc' key={key}>
            <section className='adminText'>
                <h2>{user.first_name}</h2>
                <p>{user.email}</p>
                {user.admin === true && (
                    <>
                        <p>Admin</p>
                    </>
                )}
            </section>
            <section className='adminBtn'>
                <button className='blueBtn'><FaPencil/><Link to={user ? '/updateUser' + `?id=${user._id}` : '/'}>Modifer</Link> </button>
            </section>

        </div>
    );
};

export default UserAdmin;