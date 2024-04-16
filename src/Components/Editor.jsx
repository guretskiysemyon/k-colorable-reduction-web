import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function MyEditor() {
    const [code, setCode] = useState("")
    const placeholder = "Enter you graph here in this way \n{\n '1' : [2,3],\n '2': [1,4],...}"
      return (
        <Editor
          placeholder={placeholder}
          className="text_editor"
          value={code}
          padding={10}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          
        />
      );
    }
export default MyEditor;