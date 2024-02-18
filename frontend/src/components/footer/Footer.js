import React from 'react';
import {Link} from "@react-email/components";

const Footer = () => {
    return (
        <footer>
            <h3>Travelicious</h3>
            <p>Chemin du Placeholder 19 - 404 Blank</p>
            <p>066 420 42 69</p>
            <p><Link href='https://react.email/docs/introduction' target='_blank'></Link></p>
        </footer>
    );
};

export default Footer;