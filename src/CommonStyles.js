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
    textColor1: '#037cacff',
    textColor3: '#a0a0a0',
    borderColor1: '#555',
    borderColor3: '#777',
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
    textColor1: '#fc6464ff',
    textColor3: '#d5ec4eff',
    borderColor1: '#fc6464ff',
    borderColor3: '#d5ec4eff',
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
