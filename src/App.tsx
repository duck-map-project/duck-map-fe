import ReduxModalRoot from './features/modal/ReduxModalRoot';
import { Router } from './router';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <ReduxModalRoot />
      <Router />
    </>
  );
}

export default App;
