import React, { useState } from 'react';
import styles from "./OutputComponent.module.css"
import { Spin } from 'antd'; // Import Spin from Ant Design


const OutputWindowComponent = ({ text, isLoading}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the copied status after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setIsCopied(false);
    }
  };


  return (
    <div className={styles.container}>
      <pre className={styles.output_window}>
        {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spin tip="Loading..." />
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: text }} />
          )}
      </pre>
      <button onClick={handleCopy} className={styles.copy_button}>
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

export default OutputWindowComponent;
