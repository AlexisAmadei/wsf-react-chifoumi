import React from 'react'
import TextInput from '../TextInput/TextInput'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm({ handleSubmit }) {
    const navigate = useNavigate();
    return (
        <form onSubmit={handleSubmit}>
            <p onClick={() => navigate('/')} style={{ margin: '0', padding: '0', textAlign: 'left', cursor: 'pointer', width: 'fit-content' }}>&larr; Retour</p>
            <TextInput
                type='text'
                required={true}
                title="username"
                name="username"
                placeholder="Username"
            />
            <TextInput
                type="password"
                required={true}
                title="password"
                name="password"
                placeholder="Password"
            />
            <TextInput
                type="password"
                required={true}
                title="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
            />
            <Button type="submit" variant="contained" classes={{ root: 'login-button' }}>Register</Button>
        </form>
    )
}
