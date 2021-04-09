import React, { useEffect } from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import { Typography, Box, Grid } from '@material-ui/core';

interface IStartProps {
  setIsStartProgresShown: (isStartProgressShown: boolean) => void;
}

export const CircularProgressStart = (
  props: CircularProgressProps & { value: number }
) => {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Box position="relative" display="inline-flex">
        <CircularProgress
          size={150}
          variant="determinate"
          style={{ color: '#2b4054' }}
          {...props}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h2"
            component="div"
            style={{ color: '#fff' }}
          >{`${props.value / 10}`}</Typography>
        </Box>
      </Box>
      <Typography variant="h4" style={{ color: '#fff', marginTop: '30px' }}>
        Приготовьтесь
      </Typography>
    </Grid>
  );
};

export const Start: React.FC<IStartProps> = ({ setIsStartProgresShown }) => {
  const [progress, setProgress] = React.useState(100);

  useEffect(() => {
    if (progress) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress > 0 ? prevProgress - 10 : 0
        );
      }, 500);
      return () => {
        clearInterval(timer);
      };
    } else {
      setIsStartProgresShown(false);
    }
    // eslint-disable-next-line
  }, [progress]);

  return <CircularProgressStart value={progress} />;
};
