import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { signInWithGoogle } from "../../services/firebase.service";
import { UserContext } from "../../providers/user.provider";
import { Box, Button, Text } from "grommet";

function LoginPage() {
    const user = useContext(UserContext);
    const [redirect, setredirect] = useState(null);

    useEffect(() => {
        if (user) {
            setredirect('/editor');
        }
    }, [user]);
    if (redirect) {
        return <Navigate to={redirect} />;
    }
    return (
        <Box
            direction="row"
            align="center"
            style={{
                height: window.innerHeight,
                display: "flex",
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <div className="login-buttons">
                <Text size="large">readme.txt</Text><br /><br />
                <Button secondary label="Sign in with google" onClick={signInWithGoogle} />
            </div>
        </Box>
    );
}

export default LoginPage;
