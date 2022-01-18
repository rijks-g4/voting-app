import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css';
import Gallery from './pages/gallery/Gallery';
import Details from './pages/details/Details';
import Summary from './pages/summary/Summary';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Routes>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/artObjects/:objectNumber" element={<Details />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
