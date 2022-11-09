import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { withStore } from 'react-context-hook';
import { useRoutes, useNavigate } from 'react-router-dom';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { StyledEngineProvider } from '@mui/styled-engine-sc';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StylesProvider from '@mui/styles/StylesProvider';

import { THEMES } from '@utils/constants';
import { useUser } from '@hooks/useUser';
import { useContent } from '@hooks/useContent';

import createTheme from './theme';

function App() {
  const navigate = useNavigate();

  const { handling, user } = useUser();
  const { getRoutes } = useContent();
  const content = useRoutes(getRoutes());

  useEffect(() => {
    if (user && !handling) navigate('/dashboard/scores');
  }, [user, handling]);

  return (
    <>
      <StylesProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={createTheme(THEMES.DEFAULT)}>
              <ThemeProvider theme={createTheme(THEMES.DEFAULT)}>
                {content}
              </ThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </StylesProvider>
    </>
  );
}

const ContainerApp = () => {
  const { handling } = useUser();

  if (typeof window !== 'undefined') {
    injectStyle();
  }

  return (
    <HelmetProvider>
      <Helmet titleTemplate="Aura App" defaultTitle="Aura App" />
      <ToastContainer />
      {!handling && <App />}
    </HelmetProvider>
  );
};

const initialState = {};

const storeConfig = {
  listener: (state: any, key: any, prevValue: any, nextValue: any) => {
    // console.log('-------------------------------------');
    // console.log(`the key "${key}" changed in the store`);
    // console.log('the old value is', prevValue);
    // console.log('the current value is', nextValue);
    // console.log('the state is', state);
    // console.log('-------------------------------------');
  },
  logging: process.env.NODE_ENV !== 'production',
};

export default withStore(ContainerApp, initialState, storeConfig);
