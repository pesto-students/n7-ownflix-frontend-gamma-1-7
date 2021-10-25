import { Link } from '@material-ui/core';
import * as React from 'react';
import './Footer.scss';
interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return (
        <div className="Footer">
            <div className="Footer__SiteDetails">
                <h3>WATCHFLIX</h3>
                <p>© 2021 All Rights Reserved</p>
            </div>
            <div className="Footer__Links">
                <Link href="#" className="Footer__Links--Link" onClick={(e) => { e.stopPropagation() }}>Privacy Policy</Link>
                <Link href="#" className="Footer__Links--Link" onClick={(e) => { e.stopPropagation() }}>About</Link>
                <Link href="#" className="Footer__Links--Link" onClick={(e) => { e.stopPropagation() }}>FAQ</Link>
            </div>
        </div>
    );
};

export default Footer;
