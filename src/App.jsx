
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from './component/MovieList'
import Navbar from './Navbar';
import MySearch from './component/mySearch';
import Footer from './Footer';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
let queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/movieexplorer" element={<MovieList />} />
        <Route path="/search" element={<MySearch />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
