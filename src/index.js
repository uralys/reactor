import React from 'react';
import {render} from 'react-dom';

const YourApp = (options = {}) => {
  if (!options.container) {
    console.error('[YourApp] Requires a container.');
  }

  const container = document.getElementById(options.container);
  render(<div>plop!</div>, container);
};

if (window && !window.YourApp) {
  window.YourApp = YourApp;
}

export default YourApp;
