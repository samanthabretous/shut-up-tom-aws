import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Landing from '../containers/Landing';

storiesOf('Landing', module)
  .add('default', () => (
    <Landing onClick={action('clicked')}>Hello Landing</Landing>
  ))