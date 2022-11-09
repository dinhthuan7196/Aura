import { FC, useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  Grid,
  Typography,
  Paper,
  TextField as MuiTextField,
} from '@mui/material';
import { spacing } from '@mui/system';

import Title from '@components/Title';
import Draggable from '@components/Draggable';
import { Item } from '@components/Draggable/type';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(5)};
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(5)};
  }
`;

const ContainerDraggable = styled(Grid)`
  max-height: 300px;
`;

interface video {
  title?: string;
  link?: string;
  thumbnail?: any;
}

const temp = [
  {
    id: '1',
    isHidden: true,
    content: 'Demo 1',
  },
  {
    id: '2',
    isHidden: true,
    content: 'Demo 2',
  },
  {
    id: '3',
    isHidden: false,
    content: 'Demo 3',
  },
  {
    id: '4',
    isHidden: true,
    content: 'Demo 4',
  },
  {
    id: '5',
    isHidden: true,
    content: 'Demo 5',
  },
  {
    id: '6',
    isHidden: false,
    content: 'Demo 6',
  },
  {
    id: '7',
    isHidden: true,
    content: 'Demo 7',
  },
  {
    id: '8',
    isHidden: false,
    content: 'Demo 8',
  },
  {
    id: '9',
    isHidden: true,
    content: 'Demo 9',
  },
];

const Training: FC = () => {
  const [information, setInformation] = useState<video>({});

  return (
    <>
      <Title helmetTitle="Training" title="Add New Video" />
      <Wrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Grid item xs md>
              <TextField
                fullWidth
                label="Title"
                value={information?.title}
                onChange={({ target }: any) =>
                  setInformation((prev) => ({
                    ...prev,
                    title: target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs md my={3}>
              <TextField
                fullWidth
                label="Youtube Link"
                value={information?.link}
                onChange={({ target }: any) =>
                  setInformation((prev) => ({
                    ...prev,
                    link: target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs md my={3}>
              Select file
            </Grid>
            <Grid item xs md>
              <Button variant="outlined" color="primary" onClick={() => {}}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} my={3}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">Reorder/Remove Videos</Typography>
          </Grid>
          <ContainerDraggable item xs={12} md={6}>
            <Draggable
              items={temp}
              onSubmit={(values: Item[]) => {
                // To Do: Call api update video training
                console.log('===values: ', values);
              }}
            />
          </ContainerDraggable>
        </Grid>
      </Wrapper>
    </>
  );
};
export default Training;
