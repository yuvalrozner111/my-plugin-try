import { useTranslation } from 'react-i18next';

const FormatMessage = ({ id, children = null }) => {
    const { t } = useTranslation();
    return (
        <>
            {t(id)}
            {children}
        </>
    );
}

export default FormatMessage;
