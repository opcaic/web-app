import React from 'react';
import TournamentForm from '../../../components/Tournament/TournamentForm';

const initialState = {
  username: {
    value: 'test!',
  },
};

const TournamentCreatePage = () => (
  <TournamentForm
    {...initialState}
    onChange={changedFields => console.log(changedFields)}
  />
);

export default TournamentCreatePage;
