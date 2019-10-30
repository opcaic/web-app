import PropTypes from 'prop-types';

export const emailTemplatePropType = {
  name: PropTypes.string.isRequired,
  languageCode: PropTypes.string.isRequired,
  subjectTemplate: PropTypes.string,
  templateVariables: PropTypes.arrayOf(PropTypes.string),
  bodyTemplate: PropTypes.string,
};
