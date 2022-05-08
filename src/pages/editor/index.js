import React, { useContext } from "react";
import { Header, Text, Button } from 'grommet';
import { UserContext } from "../../providers/user.provider";
import CoreEditor from './components/editor.core';

function EditorPage() {
    const user = useContext(UserContext);
    if (user) {
        return (
            <div>
                <Header background="brand" direction="row" flex sticky="scrollUp" style={{ padding: 8 }}>
                    <Text size="large">readme.txt</Text>
                    <div>
                        <Button size="medium" primary label="Save" style={{ marginRight: 8 }} />
                        <Button label="Sign Out" />
                    </div>
                </Header>
                <CoreEditor />
            </div >
        );
    }

    return <div>Loading</div>;
}

export default EditorPage;
