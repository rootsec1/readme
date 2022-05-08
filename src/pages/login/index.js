import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { signInWithGoogle } from "../../services/firebase.service";
import { UserContext } from "../../providers/user.provider";
import { Box } from "grommet";

function LoginPage() {
    const user = useContext(UserContext);
    const [redirect, setredirect] = useState(null);

    useEffect(() => {
        if (user) {
            setredirect('/editor');
        }
    }, [user])
    if (redirect) {
        return <Navigate to={redirect} />;
    }
    return (
        <Box
            direction="row"
            align="center"
            style={{
                height: window.innerHeight,
                flex: 1
            }}>
            <div className="login-buttons">
                <GoogleButton onClick={signInWithGoogle} />
            </div>
        </Box>
    );
}

export default LoginPage;
