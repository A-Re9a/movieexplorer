import { Container, Typography, Box, Rating, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

export default function MovieDetails({ id }) {
    const { data: movieDetails, isLoading, isError } = useQuery({
        queryKey: ['movieDetails', id],
        queryFn: async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=0faae1a6675715831e53b50647abf6d6`
            );
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <Box className="flex justify-center items-center h-64">
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !movieDetails) {
        return (
            <Typography color="error" className="text-center mt-10">
                Failed to load movie details.
            </Typography>
        );
    }

    return (
        <>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-5xl font-bold underline mt-2 mb-6 text-white"
            >
                Movie Details
            </motion.h1>

            <Container maxWidth="lg" className="flex justify-center">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                    <Box
                        className="border p-10 rounded-xl shadow-xl text-white"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/w500/${movieDetails.poster_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            maxWidth: 700,
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            <strong>{movieDetails.title}</strong>
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {movieDetails.overview}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            <strong>Release Date:</strong> {movieDetails.release_date}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            <strong>Genres:</strong>{' '}
                            {movieDetails.genres.map((genre) => genre.name).join(', ')}
                        </Typography>

                        <Box className="flex items-center gap-2 mt-4">
                            <Typography variant="h6">
                                <strong>Rating:</strong>
                            </Typography>
                            <Rating
                                value={movieDetails.vote_average / 2}
                                precision={0.1}
                                readOnly
                                size="large"
                            />
                            <Typography variant="body2">({movieDetails.vote_count})</Typography>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </>
    );
}