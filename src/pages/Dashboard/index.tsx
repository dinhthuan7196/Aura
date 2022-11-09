import { FC, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import styled from 'styled-components';

import { Box, CssBaseline, Paper as MuiPaper } from '@mui/material';
import { spacing } from '@mui/system';

import GlobalStyle from '@components/GlobalStyle';
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar/Sidebar';

import { useUser } from '@hooks/useUser';
import { useContent } from '@hooks/useContent';

const drawerWidth = 320;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up('md')} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard: FC = ({ children }) => {
  const { user } = useUser();
  const { getDashboardItems } = useContent();

  const [mobileOpen, setMobileOpen] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const renderItems = getDashboardItems();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!accessToken || !user) {
    return <Navigate to="/" />;
  }

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Sidebar
            PaperProps={{
              style: {
                width: '100%',
                height: 'fit-content',
              },
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={renderItems}
            anchor="top"
          />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={renderItems}
          />
        </Box>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={5}>
          {children}
          <Outlet />
        </MainContent>
      </AppContent>
    </Root>
  );
};

export default Dashboard;
