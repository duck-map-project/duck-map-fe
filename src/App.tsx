import { AuthProvider } from './contexts/AuthContext';
import { Router } from './router';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router />
    </AuthProvider>
  );
}

export default App;
