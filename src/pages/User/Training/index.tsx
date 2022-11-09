import { FC } from 'react';

import YoutubeCards from '@components/Cards/YoutubeCards';
import Title from '@components/Title';

const Training: FC = () => {
  return (
    <>
      <Title title="Training Summary" />
      <YoutubeCards data={[]} />
    </>
  );
};
export default Training;
