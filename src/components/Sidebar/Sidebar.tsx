import { FC } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { spacing } from '@mui/system';
import { green } from '@mui/material/colors';

import {
  Box as MuiBox,
  Chip,
  Drawer as MuiDrawer,
  ListItemButton,
} from '@mui/material';

import { SidebarItemsType } from '@utils/types';
import SidebarNav from './SidebarNav';
import { SideBarGlobalContext } from './globalContext';

const Box = styled(MuiBox)(spacing);

const Footer = styled(Box)`
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  border-top: solid 1px #eeeeee12;
  padding: 20px 0px;
  font-size: 10px;
  text-align: center;
`;

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)<{
  component?: React.ReactNode;
  to?: string;
}>`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandChip = styled(Chip)`
  background-color: ${green[700]};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 55%;
  height: 18px;
  margin-left: 2px;
  margin-top: -16px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)};
    padding-right: ${(props) => props.theme.spacing(1.375)};
  }
`;

export type SidebarProps = {
  PaperProps: {
    style: {
      width: any;
      height?: any;
    };
  };
  variant?: 'permanent' | 'persistent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
  anchor?: 'top' | 'left' | 'right' | 'bottom';
};

const Sidebar: FC<SidebarProps> = ({
  items,
  onClose,
  ...rest
}: SidebarProps) => {
  return (
    <SideBarGlobalContext.Provider value={{ onClose }}>
      <Drawer variant="permanent" onClose={onClose} {...rest}>
        <Brand component={NavLink} to="/dashboard/scores">
          <Box ml={1}>
            Aura App <BrandChip label="DEMO" />
          </Box>
        </Brand>
        <SidebarNav items={items} />
        <Footer>
          © {new Date().getFullYear()} <strong>ASME AURA</strong> by TechVSI.
        </Footer>
      </Drawer>
    </SideBarGlobalContext.Provider>
  );
};

export default Sidebar;
