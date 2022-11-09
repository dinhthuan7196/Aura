import { MouseEventHandler, FC, useState } from 'react';
import styled, { withTheme } from 'styled-components';

import {
  Grid,
  Toolbar,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';

import Profile from './Profile';

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Header = styled(AppBar)`
  border-bottom: solid 1px #9e9e9e36;
`;

type NavbarProps = {
  theme: {};
  onDrawerToggle: MouseEventHandler<HTMLElement>;
};

const Navbar: FC<NavbarProps> = ({ onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Header position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={6}
              md={12}
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <IconButton
                aria-haspopup="true"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  setAnchorEl(event.currentTarget)
                }
              >
                <AccountCircle />
              </IconButton>
              <Profile
                isOpen={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </Header>
    </>
  );
};

export default withTheme(Navbar);
