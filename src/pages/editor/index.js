import React, { useContext } from "react";
import { UserContext } from "../../providers/user.provider";

function EditorPage() {
    const user = useContext(UserContext);
    if (user) {
        console.log(user);
        return <div>editor</div>;
    }

    return <div>Loading</div>;
}

export default EditorPage;
