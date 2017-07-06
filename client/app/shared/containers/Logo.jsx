import React from 'react';

const Logo = (props) => (
  <div>
    <figure className="logo__container">
      <img src="https://s3.amazonaws.com/dev.shut-up-tom.com/images/shut-up-tom-logo.png" alt="Shut Up Tom Logo" />
    </figure>
    {props.children}
  </div>
);

export default Logo
