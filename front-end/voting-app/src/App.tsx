import React from 'react';
import {
    Routes,
    Route,
    useLocation,
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
import { COLORS } from './constants';
import Home from './pages/home/Home';
import AboutPage from './pages/AboutPage';
import MetricsPage from './pages/MetricsPage';
import ContributePage from './pages/ContributePage';
import ScrollToTop from './components/ScrollToTop';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        //   refetchOnmount: false,
          refetchOnReconnect: false,
          retry: false,
          staleTime: twentyFourHoursInMs,
        },
    },
});

function App() {
    const location = useLocation();

    return (
        <QueryClientProvider client={queryClient}>
            <ScrollToTop />
            <Box
                marginBottom="2em"
                style={{
                    backgroundColor: COLORS.DARK,
                    minHeight: '100vh',
                    // eslint-disable-next-line
                    paddingBottom: location.pathname != '/' && location.pathname != '' ? '3rem' : '0',
                    marginBottom: 0,
                }}
            >
                <TopBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/artObjects/:objectNumber" element={<Details />} />
                    <Route path="/summaryStats" element={<Summary />} />
                    <Route path="/contribute" element={<ContributePage />} />
                    <Route path="/metrics" element={<MetricsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Box>
        </QueryClientProvider>
    );
}

export default App;
