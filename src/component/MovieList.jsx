import { useState } from "react";
import {
    Container, Card, CardContent, CardMedia, Typography, Grid, Modal, Box
} from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import MovieDetails from "./MovieDetails";
import { useQuery } from "@tanstack/react-query";

export default function MovieList() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const API_KEY = '0faae1a6675715831e53b50647abf6d6';
    const endpoints = {
        popular: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`,
        nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
        topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
        upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
    };

    const fetchMovies = (url) => fetch(url).then(res => res.json()).then(data => data.results);

    const { data: popularMovies, isLoading: loadingPopular } = useQuery({ queryKey: ['popularMovies'], queryFn: () => fetchMovies(endpoints.popular) });
    const { data: topRatedMovies, isLoading: loadingTopRated } = useQuery({ queryKey: ['topRatedMovies'], queryFn: () => fetchMovies(endpoints.topRated) });
    const { data: nowPlaying, isLoading: loadingNowPlaying } = useQuery({ queryKey: ['nowPlaying'], queryFn: () => fetchMovies(endpoints.nowPlaying) });
    const { data: upcomingMovies, isLoading: loadingUpcoming } = useQuery({ queryKey: ['upcomingMovies'], queryFn: () => fetchMovies(endpoints.upcoming) });

    if (loadingPopular || loadingTopRated || loadingNowPlaying || loadingUpcoming) {
        return <div>Loading...</div>;
    }

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h3" gutterBottom>Now Playing Movies</Typography>
                <Carousel autoPlay responsive={responsive} infinite autoPlaySpeed={2000}>
                    {nowPlaying?.map(movie => (
                        <Link key={movie.id} onClick={() => { setSelectedMovie(movie); handleOpen(); }} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 345, height: '100%' }}>
                                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                                    <CardMedia
                                        component="img"
                                        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </motion.div>
                            </Card>
                        </Link>
                    ))}
                </Carousel>

                <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>popular Movies</Typography>
                <Grid container spacing={4}>
                    {popularMovies?.map(movie => (
                        <Grid item xs={12} sm={6} md={4} key={movie.id}>
                            <Link onClick={() => { setSelectedMovie(movie); handleOpen(); }} style={{ textDecoration: 'none' }}>
                                <Card sx={{ maxWidth: 250 }}>
                                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                                        <CardMedia
                                            component="img"
                                            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt={movie.title}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                        <CardContent sx={{ backgroundColor: '#000', color: '#FFC107' }}>
                                            <Typography variant="h6" gutterBottom>{movie.title}</Typography>
                                            <Typography variant="body2">Release Date: {movie.release_date}</Typography>
                                        </CardContent>
                                    </motion.div>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>Top Rated Movies</Typography>
                <Carousel autoPlay responsive={responsive} infinite autoPlaySpeed={3000}>
                    {topRatedMovies?.map(movie => (
                        <Link key={movie.id} onClick={() => { setSelectedMovie(movie); handleOpen(); }} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 345, height: '100%' }}>
                                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                                    <CardMedia
                                        component="img"
                                        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </motion.div>
                            </Card>
                        </Link>
                    ))}
                </Carousel>

                <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>Upcoming Movies</Typography>
                <Carousel autoPlay responsive={responsive} infinite autoPlaySpeed={4000}>
                    {upcomingMovies?.map(movie => (
                        <Link key={movie.id} onClick={() => { setSelectedMovie(movie); handleOpen(); }} style={{ textDecoration: 'none' }}>
                            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </motion.div>
                        </Link>
                    ))}
                </Carousel>
            </Container>

            <Modal
                open={open}
                onClose={handleClose}
                aria-describedby="movie-modal"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 24,

                }}>
                    {selectedMovie && <MovieDetails id={selectedMovie.id} />}
                </Box>
            </Modal>
        </>
    );
}