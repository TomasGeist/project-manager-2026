import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Auth from '../context/Auth';

function App() {
  return (
    <BrowserRouter>
      <Auth>
        <AppRoutes />
      </Auth>
    </BrowserRouter>
  );
}

export default App;
