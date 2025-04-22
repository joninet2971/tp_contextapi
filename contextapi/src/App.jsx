import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import UnicornRoutes from './layouts/unicorns/index';
import HomeView from './layouts/home/HomeView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/unicornios/*"
          element={
            <UnicornProvider>
              <UnicornRoutes />
            </UnicornProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
