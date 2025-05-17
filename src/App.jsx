
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from './component/MovieList'
import Navbar from './Navbar';
import MySearch from './component/mySearch';
import Footer from './Footer';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import {persistQueryClient,} from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/movieexplorer/">
    <Navbar/>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/search" element={<MySearch />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
