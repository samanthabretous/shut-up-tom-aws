import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

export default ({ gists }) => (
    <div>
      {gists && <p>gists</p>}
    </div>
);
