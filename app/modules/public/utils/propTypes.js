import PropTypes from 'prop-types';

export const entityReferencePropType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export const tournamentPropType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  game: PropTypes.shape(entityReferencePropType).isRequired,
  format: PropTypes.number.isRequired,
  scope: PropTypes.number.isRequired,
  rankingStrategy: PropTypes.number.isRequired,
  playersCount: PropTypes.number.isRequired,
  submissionsCount: PropTypes.number.isRequired,
  deadline: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  imageOverlay: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export const tournamentListItemPropType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  game: PropTypes.shape(entityReferencePropType).isRequired,
  format: PropTypes.number.isRequired,
  scope: PropTypes.number.isRequired,
  rankingStrategy: PropTypes.number.isRequired,
  playersCount: PropTypes.number.isRequired,
  submissionsCount: PropTypes.number.isRequired,
  deadline: PropTypes.string,
  availability: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageOverlay: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export const gamePropType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  activeTournamentsCount: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  defaultTournamentImageOverlay: PropTypes.number,
  defaultTournamentImage: PropTypes.string,
  defaultTournamentThemeColor: PropTypes.string,
};

export const matchPropType = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number,
  tournament: PropTypes.shape(entityReferencePropType).isRequired,
  executions: PropTypes.arrayOf(
    PropTypes.shape({
      executed: PropTypes.string,
      botResults: PropTypes.arrayOf(
        PropTypes.shape({
          submission: PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.shape({
              id: PropTypes.number.isRequired,
              username: PropTypes.string.isRequired,
            }),
          }),
          score: PropTypes.number.isRequired,
          additionalDataJson: PropTypes.string,
        }),
      ),
    }),
  ),
};
