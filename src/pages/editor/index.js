import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Header, Text, Button } from "grommet";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logOut } from "../../services/firebase.service";
import { UserContext } from "../../providers/user.provider";
import { Navigate } from "react-router-dom";

let firebaseDatabase = null;

function EditorPage() {
    const user = useContext(UserContext);
    const [textContent, setTextContent] = useState();

    const onSaveButtonClick = useCallback(async () => {
        if (firebaseDatabase) {
            try {
                const key = ref(firebaseDatabase, `content/${user["uid"]}`);
                await set(key, textContent);
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
                <Text size="large" style={{ textAlign: "center" }}>readme.txt</Text>
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
            const key = ref(firebaseDatabase, `content/${user["uid"]}`);
            onValue(key, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setTextContent(data);
                }
            });
        }
    }, [user]);


    if (user) {
        if (!firebaseDatabase) firebaseDatabase = getDatabase();

        return (
            <div>
                {headerComponent}
                <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 8 }}>
                    <textarea
                        contentEditable={true}
                        readOnly={false}
                        name="editor_content"
                        defaultValue={textContent}
                        placeholder="start typing..."
                        style={{
                            fontSize: 14,
                            lineHeight: "1.1em",
                            wordSpacing: "0.1em",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            color: "white",
                            width: "100%",
                            height: "100vw",
                            resize: "none",
                            paddingBottom: "4%"
                        }}
                        spellCheck
                        inputMode="text"
                        onChange={event => setTextContent(event.target.value)}
                        suppressContentEditableWarning
                    >
                        {textContent}
                    </textarea>
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
