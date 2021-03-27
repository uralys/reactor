// -----------------------------------------------------------------------------

import React from 'react';
import {render} from 'react-dom';
import {createGlobalStyle} from 'styled-components';

// -----------------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

// -----------------------------------------------------------------------------

const createYourApp = (options = {}) => {
  if (!options.container) {
    console.error('[App] Requires a container.');
  }

  const container = document.getElementById(options.container);
  render(
    <div>
      <GlobalStyle />
      <b>🚀 skeleton-react</b>
    </div>,
    container
  );
};

if (window && !window.createYourApp) {
  window.createYourApp = createYourApp;
}
