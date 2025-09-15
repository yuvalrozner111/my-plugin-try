import React from 'react';
import i18next from '../entry/i18n.js';

export const i18Languages = {
    formatMessage: (id) => i18next.t(id),
};

const LanguageContext = React.createContext(i18Languages.formatMessage);

export default LanguageContext;