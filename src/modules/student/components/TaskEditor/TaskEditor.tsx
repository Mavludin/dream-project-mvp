import Editor from '@monaco-editor/react';
import styles from './TaskEditor.module.css';

export const TaskEditor = () => (
  <div className={styles.code}>
    <Editor
      height="60vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      defaultValue="// some comment"
    />
  </div>
);
