const commonStyleProps = {
    fontFamily: 'sans-serif',
};

const AppCommonsStyles = {
  commonStyleProps,
  darkTheme: {
    ...commonStyleProps,
    themeValue: 'dark',
    titleColor: 'white',
    bgColor1: '#232323',
    borderColor: '#444',
    button: {
      bgColor: '#555',
      bgColor2: '#1a1a1a',
      textColor: 'white',
      textColor2: '#ccc',
    }
  },
  lightTheme: {
    ...commonStyleProps,
    themeValue: 'light',
    titleColor: 'black',
    bgColor1: '#f0f0f0',
    borderColor: '#ddd',
    button: {
      bgColor: '#ddd',
      bgColor2: '#d8f3ffff',
      textColor: 'black',
      textColor2: '#333',
    }
  }
};

export default AppCommonsStyles;
