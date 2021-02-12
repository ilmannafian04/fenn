import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FillPoll = () => {
  const { pollId } = useParams<{ pollId: string }>();
  useEffect(() => {
    axios
      .get('/api/poll', { params: { id: pollId } })
      .then((value) => {
        console.log(value);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <h1>loading</h1>
    </>
  );
};

export default FillPoll;
