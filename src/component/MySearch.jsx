import { useState } from 'react';
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Modal,
    Box,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import MovieDetails from './MovieDetails';
import { useQuery } from '@tanstack/react-query';

export default function MySearch() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    const [open, setOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data: searchResults = [], isLoading, isError } = useQuery({
        queryKey: ['searchResults', searchTerm],
        queryFn: async () => {
            if (!searchTerm) return [];
            const url = `https://api.themoviedb.org/3/search/movie?api_key=0faae1a6675715831e53b50647abf6d6&query=${encodeURIComponent(searchTerm)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            return data.results;
        },
        enabled: !!searchTerm, // only fetch when there is a term
    });

    if (isLoading) {
        return <Container><Typography>Loading...</Typography></Container>;
    }

    if (isError || searchResults.length === 0) {
        return (
            <Container maxWidth="lg" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-amber-50 font-bold text-2xl"
                >
                    No movie found for "{searchTerm}"
                </motion.div>
            </Container>
        );
    }

    return (
        <>
            <Container maxWidth="lg" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <Typography variant="h2" gutterBottom style={{ margin: '2rem' }}>
                    Search Results for "{searchTerm}"
                </Typography>
                <Grid container spacing={4}>
                    {searchResults.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} key={movie.id}>
                            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                                <Card sx={{ maxWidth: 250 }}>
                                    <motion.div
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSelectedMovie(movie);
                                            handleOpen();
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                                    : '/fallback-image.jpg'
                                            }
                                            alt={movie.title}
                                        />
                                        <CardContent className="bg-black text-amber-50">
                                            <Typography variant="h6" className="line-clamp-1" gutterBottom>
                                                {movie.title}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Release date: {movie.release_date}
                                            </Typography>
                                        </CardContent>
                                    </motion.div>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Modal open={open} onClose={handleClose} aria-describedby="movie-modal-description">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: 24,

                        p: 4,
                    }}
                    className="w-1/2"
                >
                    <Typography id="movie-modal-description">
                        <MovieDetails id={selectedMovie?.id} />
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}