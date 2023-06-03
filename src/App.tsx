import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { routers } from './router';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <RouterProvider router={routers} />
    </AuthProvider>
  );
}

export default App;
