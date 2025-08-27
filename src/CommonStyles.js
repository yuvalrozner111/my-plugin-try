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
    // color palette (plugins can override or extend this)
    palette: {
      accent: '#9b59b6',
      extraColor: '#f39c12',
    },
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
    // color palette (plugins can override or extend this)
    palette: {
      accent: '#3498db',
      extraColor: '#f1c40f',
    },
    button: {
      bgColor: '#ddd',
      bgColor2: '#d8f3ffff',
      textColor: 'black',
      textColor2: '#333',
    }
  }
};

export default AppCommonsStyles;
