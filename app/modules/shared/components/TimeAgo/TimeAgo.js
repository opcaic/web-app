import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import TimeAgoComponent from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import englishStrings from 'react-timeago/lib/language-strings/en';
import czechStrings from 'react-timeago/lib/language-strings/cs';

const formatters = {
  en: buildFormatter(englishStrings),
  cs: buildFormatter(czechStrings),
};

const TimeAgo = ({ date, intl }) => (
  <TimeAgoComponent
    date={date}
    formatter={formatters[intl.locale] || formatters.en}
  />
);

TimeAgo.propTypes = {
  intl: intlShape.isRequired,
  date: PropTypes.string.isRequired,
};

export default injectIntl(TimeAgo);
