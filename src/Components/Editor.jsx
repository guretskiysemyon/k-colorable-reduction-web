import React, { useState, useEffect, useRef } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { message } from 'antd';

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function MyEditor({strInputGraph, setStrInputGraph}) {
    const placeholder =  `Enter you undirected graph here in .dot format.
    
    graph {
        1 -- 2;
        1 -- 3;
        2 -- 3;
        ...
    }`;

    const MAX_LENGTH = 4000;
    const [error, setError] = useState(false);
    const [charCount, setCharCount] = useState(0);  // Initialize to 0
    const editorRef = useRef(null);

    useEffect(() => {
        // Update character count on component mount and when strInputGraph changes
        setCharCount(strInputGraph.length);
    }, [strInputGraph]);

    useEffect(() => {
        const handlePaste = () => {
            setTimeout(() => {
                const newLength = editorRef.current?.textContent?.length || 0;
                setCharCount(newLength);
                handleLengthCheck(newLength);
            }, 0);
        };

        const editorElement = editorRef.current;
        if (editorElement) {
            editorElement.addEventListener('paste', handlePaste);
        }

        return () => {
            if (editorElement) {
                editorElement.removeEventListener('paste', handlePaste);
            }
        };
    }, []);

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

    function changeValue(code) {
        const newLength = code.length;
        setCharCount(newLength);
        handleLengthCheck(newLength);
        
        if (newLength <= MAX_LENGTH) {
            setStrInputGraph(code);
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <Editor
                placeholder={placeholder}
                className="text_editor"
                value={strInputGraph}
                padding={10}
                onValueChange={(code) => changeValue(code)}
                highlight={(code) => highlight(code, languages.js)}
                textareaId="codeArea"
                textareaClassName="editor__textarea"
            />
            <div style={{
                position: 'absolute',
                bottom: '5px',
                right: '10px',
                fontSize: '12px',
                color: error ? 'red' : 'inherit'
            }}>
                {charCount} / {MAX_LENGTH}
            </div>
            <div 
                ref={editorRef} 
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}
            />
        </div>
    );
}

export default MyEditor;