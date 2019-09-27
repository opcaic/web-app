import 'cookieconsent';
import 'cookieconsent/build/cookieconsent.min.css';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const theme = {
  PRIMARY_COLOR: '#1890ff',
  TOP_MENU_COLOR: '#001529',
  SUCCESS_COLOR: '#52c41a',
  DANGER_COLOR: '#faad14',
  ERROR_COLOR: '#f5222d',
};

const cookieConsentIntl = defineMessages({
  message: { id: 'app.shared.cookieConsent.message' },
  dismiss: { id: 'app.shared.cookieConsent.dismiss' },
  link: { id: 'app.shared.cookieConsent.link' },
});

export function handleCookieConsent() {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: '#000',
      },
      button: {
        background: '#f1d600',
      },
    },
    content: {
      message: intlGlobal.formatMessage(cookieConsentIntl.message),
      dismiss: intlGlobal.formatMessage(cookieConsentIntl.dismiss),
      link: intlGlobal.formatMessage(cookieConsentIntl.link),
    },
  });
}
