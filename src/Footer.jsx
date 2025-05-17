import { Container,  Typography, Box } from '@mui/material'

export default function Footer() {
    return (
        <>
        <div className='relative'>
            <Box sx={{ bgcolor: '#000845', pt: 8, mt: 8 }} className='apsolute bottom-0 right-0 left-0 mt-20' >
                <Container maxWidth="sm" component="main" className='flex flex-col items-center justify-center '>
                    <Typography variant="body2" className='text-blue-800' >
                        {'Copyright © '}
                        <a className='text-white' href="/">
                            MovieEx
                        </a>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
                
            </Box>
        </div>
        </>
    )
}
