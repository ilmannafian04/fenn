import { Box, Paper } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Poll from '../../types/Poll';

const FillPoll = () => {
  const { pollId } = useParams<{ pollId: string }>();
  const [poll, setPoll] = useState<Poll>();
  useEffect(() => {
    axios
      .get<Poll>('/api/poll', { params: { id: pollId } })
      .then((value) => {
        setPoll(value.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return poll ? (
    <>
      <h1>{poll.title}</h1>
      <Paper square>
        <Box padding="1rem">
          {poll.options.map((value, index) => (
            <h2 key={index}>{value.name}</h2>
          ))}
        </Box>
      </Paper>
    </>
  ) : (
    <>
      <h1>loading</h1>
    </>
  );
};

export default FillPoll;
