import { FC, useState, useMemo } from 'react';
import styled from 'styled-components';

import {
  Grid,
  Typography,
  Paper,
  Button,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Divider as MuiDivider,
  TextField as MuiTextField,
} from '@mui/material';

import { spacing } from '@mui/system';

import Title from '@components/Title';

const Divider = styled(MuiDivider)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Wrapper = styled(Paper)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(5)};
  }
`;

interface badgeInformation {
  title?: string;
  desc?: string;
  image?: any;
}

interface userInfo {
  badge?: string;
  user?: string;
}

const Badges: FC = () => {
  const [badge, setBadge] = useState<badgeInformation>({});
  const [user, setUser] = useState<userInfo>({});
  const [search, setSearch] = useState<string>('');

  const handleCapture = (target: any) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      console.log('==image==: ', e?.target?.result);
    };
  };

  const renderCurrentBadges = useMemo(() => {
    return (
      <Grid item xs={12} md={12} my={3}>
        {[1, 2, 3].map((value) => (
          <Grid key={value} container>
            <Grid item xs={8} md={8}>
              <FormControlLabel
                label="Description ........"
                control={
                  <Checkbox
                    checked
                    onChange={({ target }: any) => console.log(target.checked)}
                  />
                }
              />
            </Grid>
            <Grid
              item
              direction="column"
              display="flex"
              justifyContent="center"
              xs={2}
              md={2}
            >
              <Button variant="outlined" color="warning">
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }, []);

  return (
    <>
      <Title title="Badges" />
      <Wrapper>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Grid item xs md>
              <Typography variant="h4">Add New Badges</Typography>
            </Grid>
            <Grid item xs md my={3}>
              <TextField
                fullWidth
                label="Title"
                value={badge?.title}
                onChange={({ target }: any) =>
                  setBadge((prev) => ({
                    ...prev,
                    title: target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs md my={3}>
              <TextField
                multiline
                fullWidth
                label="Desc"
                value={badge?.desc}
                rows={2}
                onChange={({ target }: any) =>
                  setBadge((prev) => ({
                    ...prev,
                    desc: target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs md my={3}>
              <label htmlFor="contained-button-file">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={({ target }: any) => handleCapture(target.value)}
                />
                <Button variant="outlined" component="span">
                  Choose file
                </Button>
              </label>
            </Grid>
            <Grid item xs md>
              <Button variant="contained" color="primary">
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Divider my={6} />
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Grid item xs md>
              <Typography variant="h4">Assign To User</Typography>
            </Grid>
            <Grid item xs md my={3}>
              <Autocomplete
                disablePortal
                fullWidth
                options={[{ label: 'Select', value: null }]}
                renderInput={(params) => (
                  <TextField {...params} label="Badge" />
                )}
              />
            </Grid>
            <Grid item xs md my={3}>
              <TextField
                fullWidth
                label="User"
                value={user?.user}
                onChange={({ target }: any) =>
                  setBadge((prev) => ({
                    ...prev,
                    user: target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs md>
              <Button variant="contained" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid item xs md>
              <Typography variant="h4">User Badges Lookup/Remove</Typography>
            </Grid>
            <Grid item xs md my={3}>
              <Grid container spacing={5}>
                <Grid item xs={8} md={8}>
                  <TextField
                    fullWidth
                    label="Search User"
                    value={search}
                    onChange={({ target }: any) => setSearch(target.value)}
                  />
                </Grid>
                <Grid
                  item
                  direction="column"
                  display="flex"
                  justifyContent="center"
                  xs={2}
                  md={2}
                >
                  <Button variant="outlined" color="primary">
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs md>
              <Typography variant="h4">Current Badges</Typography>
            </Grid>
            {renderCurrentBadges}
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};
export default Badges;
