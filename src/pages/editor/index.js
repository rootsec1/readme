import React, { useContext } from "react";
import { UserContext } from "../../providers/user.provider";
import CoreEditor from './components/editor.core';

function EditorPage() {
    const user = useContext(UserContext);
    if (user) {
        return (
            <div>
                <div>
                    <span style={{ fontSize: 16 }}>README.txt</span>
                    <button>Sign Out</button>
                </div>
                <CoreEditor />
            </div>
        );
    }

    return <div>Loading</div>;
}

export default EditorPage;
