import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
function Home() {

    return (
        <Box sx={{ display: 'flex', m: 3 }}>
            <Paper elevation={2} style={{ width: "100%", textAlign: "center", fontSize: 36 }}>
                HOME
            </Paper>
        </Box>
    )
}

export default Home;
