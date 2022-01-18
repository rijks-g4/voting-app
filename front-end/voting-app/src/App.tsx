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
import TopBar from './components/top-bar/TopBar';
import { Box } from '@mui/material';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box marginBottom="2em">
          <TopBar />
          <Routes>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/artObjects/:objectNumber" element={<Details />} />
            <Route path="/summaryStats" element={<Summary />} />
          </Routes>
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
