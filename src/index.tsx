import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter basename="/asme-aura">
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
