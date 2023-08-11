import React from 'react';
import logo from '../images/logo.svg';

const Header = React.memo(() => {
    return (
        <header className="header">
            <img src={logo} alt="логотип Место" className="header__logo" />
        </header>
    );
});

export default Header;