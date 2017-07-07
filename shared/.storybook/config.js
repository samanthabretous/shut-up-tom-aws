import { configure } from '@storybook/react';

function loadStories() {
  require('../shared/stories/app.js');
  require('../shared/stories/landing.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);