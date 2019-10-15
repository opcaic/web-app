import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const LocalizedContent = props => {
  const content =
    props.localizedContent[props.intl.locale] ||
    props.localizedContent[props.defaultLocale];

  if (props.render) {
    return props.render({ content });
  }

  return content;
};

LocalizedContent.propTypes = {
  defaultLocale: PropTypes.string,
  localizedContent: PropTypes.objectOf(PropTypes.node),
  intl: PropTypes.object.isRequired,
  render: PropTypes.func,
};

LocalizedContent.defaultProps = {
  defaultLocale: 'en',
};

export default injectIntl(LocalizedContent);
