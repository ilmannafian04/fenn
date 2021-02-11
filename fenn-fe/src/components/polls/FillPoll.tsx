import React from 'react';
import { useParams } from 'react-router-dom';

const FillPoll = () => {
  const { pollId } = useParams<{ pollId: string }>();
  return (
    <>
      <h1>loading</h1>
    </>
  );
};

export default FillPoll;
