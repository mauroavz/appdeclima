import React from 'react';
import PropTypes from 'prop-types';

const Header = ({titulo}) => {
    return ( 
        <nav>
            <div className="nav-wrappen light-blue darken-2">
                <a href='#!' className="brand-logo">{titulo}</a>

            </div>
        </nav>
     );
}

Header.prototype = {
    titulo: PropTypes.string.isRequired
}
 
export default Header;