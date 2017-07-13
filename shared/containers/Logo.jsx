import React from 'react';

const Logo = (props) => (
  <div>
    <figure className="logo__container">
      <img src={require('../../siteContent/images/shut-up-tom-logo.png')} alt="Shut Up Tom Logo" />
    </figure>
    {props.children}
  </div>
);

export default Logo
