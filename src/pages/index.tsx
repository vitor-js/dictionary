import Home from './home';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global';
import myTheme from '../styles/theme';

export default function Index() {
  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
}
