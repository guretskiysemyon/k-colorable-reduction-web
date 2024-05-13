import React, { useEffect, useState } from 'react';
import styles from "./OutputComponent.module.css"

const OutputWindowComponent = ({ text }) => {
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
  useEffect( () => {
    
  })

  return (
    <div className={styles.container}>
      <pre className={styles.output_window}>
        {text}
      </pre>
      <button onClick={handleCopy} className={styles.copy_button}>
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

export default OutputWindowComponent;
