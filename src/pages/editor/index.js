import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Header, Text, Button } from 'grommet';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react';

import { logOut } from "../../services/firebase.service";
import { UserContext } from "../../providers/user.provider";
import { Navigate } from "react-router-dom";

let firebaseDatabase = null;

function EditorPage() {
    const user = useContext(UserContext);
    const editor = useMemo(() => withReact(createEditor()), []);

    const [textContent, setTextContent] = useState([
        {
            children: [{ text: "" }],
        }
    ]);

    const onSaveButtonClick = useCallback(async () => {
        if (firebaseDatabase) {
            try {
                const formattedTextContent = JSON.stringify(textContent);
                const key = ref(firebaseDatabase, `content/${user['uid']}`);
                await set(key, formattedTextContent);
                toast.success("🦄 saved");
            }
            catch (err) {
                toast.error("There was an error saving");
            }
        }
    }, [textContent, user]);

    const headerComponent = useMemo(() => {
        return (
            <Header direction="row" flex sticky="scrollUp" style={{ padding: 8 }}>
                <Text size="large">readme.txt</Text>
                <div>
                    <Button size="medium" primary label="Save" style={{ marginRight: 8 }} onClick={onSaveButtonClick} />
                    <Button label="Sign Out"
                        onClick={async () => {
                            await logOut();
                            window.location = "/";
                        }} />
                </div>
            </Header>
        );
    }, [onSaveButtonClick]);

    useEffect(() => {
        if (firebaseDatabase && user) {
            const key = ref(firebaseDatabase, `content/${user['uid']}`);
            onValue(key, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const jsonData = JSON.parse(data);
                    console.table(jsonData);
                    setTextContent(jsonData);
                    editor.children = jsonData;
                }
            });
        }
    }, [user, editor]);


    if (user) {
        if (!firebaseDatabase) firebaseDatabase = getDatabase();

        return (
            <div>
                {headerComponent}
                <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 8 }}>
                    <Slate
                        editor={editor}
                        value={textContent}
                        onChange={value => {
                            const isAstChange = editor.operations.some(
                                op => 'set_selection' !== op.type
                            )
                            if (isAstChange) {
                                setTextContent(value);
                            }
                        }}
                    >
                        <Editable
                            contentEditable
                            placeholder="loading..."
                            autoFocus
                            style={{ fontSize: 14 }}
                            spellCheck
                            inputMode="text"
                        />
                    </Slate>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={500}
                />
            </div >
        );
    }
    else {
        return <Navigate to="/" />;
    }
}

export default EditorPage;
