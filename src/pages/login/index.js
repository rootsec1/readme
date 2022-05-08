import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { signInWithGoogle } from "../../services/firebase.service";
import { UserContext } from "../../providers/user.provider";

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
        <div className="login-buttons">
            <GoogleButton onClick={signInWithGoogle} />
        </div>
    );
}

export default LoginPage;
