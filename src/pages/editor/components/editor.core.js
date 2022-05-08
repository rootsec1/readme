import { useEffect } from 'react';

import LexicalComposer from '@lexical/react/LexicalComposer';
import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const theme = {};

function onError(error) {
    console.error(error);
}

function CustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.focus();
    }, [editor]);

    editor.registerTextContentListener(
        (textContent) => {
            console.log(textContent);
        },
    );

    return null;
}

function CoreEditor() {
    const initialConfig = {
        theme,
        onError,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <LexicalPlainTextPlugin
                contentEditable={<LexicalContentEditable />}
                placeholder={<div>A single file to rule them all</div>}
            />
            <HistoryPlugin />
            <CustomAutoFocusPlugin />
        </LexicalComposer>
    );
}

export default CoreEditor;
