import React, { useState, useEffect, createContext } from "react";

import { auth } from "../services/firebase.service";
export const UserContext = createContext({ user: null });

function UserProvider(props) {
    const [user, setuser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { displayName, email, uid } = user;
                setuser({
                    displayName,
                    email,
                    uid
                });
            }
        })
    }, [])
    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
}

export default UserProvider;
