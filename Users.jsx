import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';
import { Grid } from '@mui/material';

function Users() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const handleRole = (event) => {
        setFormData({
            ...formData,
            [event.target.role]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("https://cmsback.sampaarsh.cloud/admin/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                alert('Registration submitted! Check the console for data.');
            })
    };

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/auth/login');
    }

    const handleUsers = () => {
        navigate('/admin');
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
                        <Button color="inherit" onClick={handleUsers}>My Clinic</Button>
                        <Button color="inherit">Users</Button>
                        <Button color="inherit" variant='outlined' onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container component="main" maxWidth="xs">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.role}
                            label="Role"
                            onChange={handleRole}
                        >
                            <MenuItem value={'Doctor'}>Doctor</MenuItem>
                            <MenuItem value={'Patient'}>Patient</MenuItem>
                            <MenuItem value={'Receptionist'}>Receptionist</MenuItem>
                        </Select>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add User
                    </Button>
                </Box>
            </Container>

        </>
    );
}

export default Users;