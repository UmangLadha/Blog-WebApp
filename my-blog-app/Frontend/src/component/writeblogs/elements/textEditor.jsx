import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./textEditor.css";

const TextEditor = (props) => {
  const { content, setContent } = props;

  const onEditorStateChange = (newEditorState) => {
    setContent(newEditorState);
  };

  return (
    <>
      <Editor
        editorState={content}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
		placeholder="Tell your story..."
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
};

export default TextEditor;
