import { FC, useState, useMemo } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import { Typography, Grid, CardContent, Card as MuiCard } from '@mui/material';
import { green } from '@mui/material/colors';
import { spacing } from '@mui/system';

import useDeviceDetect from '@hooks/useDeviceDetect';

const Card = styled(MuiCard)(spacing);

const GreenText = styled.span`
  color: ${green[400]};
`;

type sort = 'asc' | 'desc';

interface ReactPlayerProps {
  controls: boolean;
  width: string;
  height?: string;
  url: string;
  onDuration?: (value: number) => void;
  onProgress?: (value: any) => void;
}

interface video {
  url: string;
  title: string;
  status: boolean;
}

interface YoutubeCardProps {
  data: video[];
}

const CardDetail: FC<any> = (val: any) => {
  const isMobile = useDeviceDetect();
  const [halfVideo, setHalfVideo] = useState<number>(0);

  const variant = isMobile ? 'subtitle2' : 'subtitle1';
  const props = useMemo(() => {
    const defaultProps: ReactPlayerProps = {
      controls: true,
      width: '100%',
      url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
      onDuration: (duration: number) => setHalfVideo(duration / 2),
      onProgress: ({ playedSeconds }: any) => {
        if (playedSeconds >= halfVideo) {
          // To do: update status video
        }
      },
    };
    if (isMobile) {
      defaultProps.height = ' 100%';
    }
    return defaultProps;
  }, [isMobile, halfVideo]);

  return (
    <Card variant="outlined">
      <ReactPlayer {...props} />
      <CardContent>
        <Typography variant={variant}>Title</Typography>
        <Typography variant={variant}>
          Status: <GreenText>Cleared</GreenText>
        </Typography>
      </CardContent>
    </Card>
  );
};

const YoutubeCards: FC<YoutubeCardProps> = ({ data }: YoutubeCardProps) => {
  const [sort, setSort] = useState<sort>('desc');

  // example data
  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <Typography mb={6} variant="h5">
        You have watched 1/6 videos this month
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={8} md={8}>
              <Typography mb={2} variant="h6">
                Videos
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <div>sort</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container spacing={3}>
            {temp.map((val) => (
              <Grid item key={val} xs={6} sm={4} md={3}>
                <CardDetail val={val} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default YoutubeCards;
