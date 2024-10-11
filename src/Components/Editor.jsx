import React, { useState, useEffect } from "react";
import Editor, { monaco } from "@monaco-editor/react";
import { message } from 'antd';
import useStore from '../store';

function MyEditor() {
    const { strInputGraph, setStrInputGraph } = useStore();
    const [error, setError] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const MAX_LENGTH = 4000;

    useEffect(() => {
        setCharCount(strInputGraph.length);
    }, [strInputGraph]);

    function handleEditorChange(value, event) {
        const newLength = value.length;
        setCharCount(newLength);
        handleLengthCheck(newLength);
        
        if (newLength <= MAX_LENGTH) {
            setStrInputGraph(value);
        }
    }

    function handleLengthCheck(length) {
        if (length <= MAX_LENGTH) {
            setError(false);
        } else {
            if (!error) {
                message.error(`Maximum length of ${MAX_LENGTH} characters exceeded`);
                setError(true);
            }
        }
    }

    const editorOptions = {
        
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollbar: {
            vertical: 'auto',
            horizontal: 'hidden',
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: 10,
            alwaysConsumeMouseWheel: false
        },
        overviewRulerLanes: 0,
        fontSize: 14,
        fontFamily: '"DejaVu Sans Mono", monospace',
        lineNumbers: 'on',
        folding: false,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        wordWrap: 'on',
        wrappingStrategy: 'advanced',
        wordWrapColumn: 80,
        renderLineHighlight: 'none',
        scrollBeyondLastLine: false,
    };

    function handleEditorWillMount(monaco) {
        monaco.languages.register({ id: 'dot' });
        monaco.languages.setMonarchTokensProvider('dot', {
            tokenizer: {
                root: [
                    [/\b(graph|node|edge|digraph|subgraph)\b/, "keyword"],
                    [/\{|\}/, "bracket"],
                    [/\[|\]/, "square-bracket"],
                    [/--|->/, "edge-operator"],
                    [/=/, "equals"],
                    [/".*?"/, "string"],
                    [/\/\/.*$/, "comment"],
                    [/[0-9]+/, "number"],
                    [/[a-zA-Z_]\w*/, "identifier"],
                ]
            }
        });

        monaco.editor.defineTheme('dotTheme', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: '000000' },
                { token: 'bracket', foreground: '000000' },
                { token: 'square-bracket', foreground: '000000' },
                { token: 'edge-operator', foreground: '000000', fontStyle: 'bold' },
                { token: 'equals', foreground: '000000' },
                { token: 'string', foreground: '000000' },
                { token: 'comment', foreground: 'B7B7B7' },
                { token: 'number', foreground: '8C3061' },
                { token: 'identifier', foreground: '000000' },
            ],
            colors: {
                'editor.foreground': '#000000',
                'editor.background': '#FFFFFF',
                'editorCursor.foreground': '#000000',
                'editor.lineHighlightBackground': '#FFFFFF',
                'editorLineNumber.foreground': '#999999',
                'editorLineNumber.background': '#F0F0F0',
                'editor.selectionBackground': '#ADD6FF',
                'editor.inactiveSelectionBackground': '#E5EBF1',
            }
        });
    }

    return (
        <div style={{ position: 'relative', height: '500px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <Editor
                height="100%"
                defaultLanguage="dot"
                value={strInputGraph}
                onChange={handleEditorChange}
                options={editorOptions}
                beforeMount={handleEditorWillMount}
                theme="dotTheme"
            />
            <div style={{
                position: 'absolute',
                bottom: '5px',
                right: '10px',
                fontSize: '12px',
                color: error ? 'red' : 'inherit',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '3px 5px',
                borderRadius: '3px'
            }}>
                {charCount} / {MAX_LENGTH}
            </div>
        </div>
    );
}

export default MyEditor;
