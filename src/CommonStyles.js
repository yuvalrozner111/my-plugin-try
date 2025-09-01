const commonStyleProps = {
  fontFamily: 'sans-serif',
  borderRadius: '6px',
};

// Light theme palette and semantic tokens
const lightTheme = {
  ...commonStyleProps,
  themeValue: 'light',
  // Primary surfaces (backgrounds)
  bgColor: '#f7f8fa',      // app background
  bgColor2: '#ffffff',     // card / surface
  bgColor3: '#f0f6ff',     // subtle alternate surface

  // Text
  titleColor: '#111827',
  textColor1: '#1f2937',   // primary text
  textColor2: '#4b5563',   // secondary text
  textColor3: '#9ca3af',   // muted text

  // Surfaces
  cardBgColor: '#ffffff',
  tableBgColor: '#fbfdff',

  // Borders and dividers
  borderColor: '#e6e9ee',
  borderColor1: '#dfe7f3',

  // Semantic palette
  palette: {
    accent: '#3498db',
    extraColor: '#f1c40f'
  },

  // Buttons and interactive states
  button: {
    bg: '#e6eefb',          // default button background
    bg2: '#d8f3ff',         // secondary/background hover
    text: '#0b3a66',        // button text
    text2: '#333333',
    selected: '#3498db',    // selected / primary action
    hover: '#2f85d1'
  }
};

// Dark theme palette and semantic tokens
const darkTheme = {
  ...commonStyleProps,
  themeValue: 'dark',
  // Primary surfaces (backgrounds)
  bgColor: '#303030',      // app background
  bgColor2: '#1e1e1e',     // card / surface
  bgColor3: '#232323',     // alternate surface

  // Text
  titleColor: '#ffffff',
  textColor1: '#dbeafe',   // primary text (light)
  textColor2: '#a0a0a0',   // secondary text
  textColor3: '#7b7b7b',   // muted text

  // Surfaces
  cardBgColor: '#575757ff',
  tableBgColor: '#151515',

  // Borders and dividers
  borderColor: '#2b2b2b',
  borderColor1: '#333333',

  // Semantic palette
  palette: {
    accent: '#9b59b6',
    extraColor: '#f39c12'
  },

  // Buttons and interactive states
  button: {
    bg: '#2f2f2f',
    bg2: '#232323',
    text: '#ffffff',
    text2: '#cccccc',
    selected: '#9b59b6',
    hover: '#7f3f9a'
  }
};

const AppCommonsStyles = {
  commonStyleProps,
  lightTheme,
  darkTheme
};

export default AppCommonsStyles;
