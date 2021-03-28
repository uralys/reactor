// -----------------------------------------------------------------------------

import React from 'react';
import {render} from 'react-dom';
import {createGlobalStyle} from 'styled-components';

// -----------------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;

    display:flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
    color: #ededed;
    background-color: #101;
  }
`;

// -----------------------------------------------------------------------------

const createApp = (options = {}) => {
  if (!options.container) {
    console.error('[App] Requires a container.');
  }

  const container = document.getElementById(options.container);
  render(
    <div>
      <GlobalStyle />
      <h1>Booted with Reactor</h1>
    </div>,
    container
  );
};

// -----------------------------------------------------------------------------

if (window && !window.createApp) {
  window.createApp = createApp;
}
