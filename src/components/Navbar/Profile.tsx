import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Menu, MenuItem } from '@mui/material';

import { useUser } from '@hooks/useUser';
interface ProfileProps {
  isOpen: true | false;
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const Profile: FC<ProfileProps> = ({ isOpen, anchorEl, onClose }) => {
  const navigate = useNavigate();
  const { signOut } = useUser();

  return (
    <Menu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          signOut();
          navigate('/');
        }}
      >
        LogOut
      </MenuItem>
    </Menu>
  );
};

export default memo(Profile);
