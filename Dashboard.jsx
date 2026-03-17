import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

export default function Dashboard() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [totalUser, setTotalUser] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem('user');

        if (storedData) {
            try {
                const userObject = JSON.parse(storedData);
                setUserData(userObject);
            } catch (error) {
                console.error("Error parsing user data from local storage:", error);
            }
        }
    }, []);

    useEffect(() => {
        fetch("https://cmsback.sampaarsh.cloud/admin/users")
        .then(res=>res.json())
        .then(res=>setTotalUser(res))
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/auth/login');
    }

    const handleUsers = () => {
        navigate('/admin/users');
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Clinic Queue
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 30 }}>
                            {userData.clinicName}
                        </Typography>
                        <Button variant="contained" disabled sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            {userData.role}
                        </Button>
                        <Button color="inherit">My Clinic</Button>
                        <Button color="inherit" onClick={handleUsers}>Users</Button>
                        <Button color="inherit" variant='outlined' onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: "bold", marginTop: '20px', marginLeft: '100px' }}>
                My Clinic
            </Typography>

            <Container sx={{ marginTop: '10px', padding: '10px' }}>
                <Box sx={{ bgcolor: '#EDEADE', pt: 1, pb: 1, pl: 1, pr: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        {userData.clinicName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Clinic Code: <Button variant="contained" disabled>{userData.clinicCode}</Button>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Share this code with patients, doctors, and receptionists so they can register and join your clinic.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Users: 8 - Appointments: 5
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
