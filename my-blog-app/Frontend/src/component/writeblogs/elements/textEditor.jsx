import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./textEditor.css";

const TextEditor = (props) => {
  const { content, setContent } = props;

  const onEditorStateChange = (newEditorState) => {
    setContent(newEditorState);
  };

  //showing the seleted options in toolbar 
  const toolbarOptions = {
    options: ["inline", "fontSize", "fontFamily", "list", "textAlign"], // selected options
    inline: {
      options: ["bold", "italic", "underline"],
    },
    fontSize: {
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    },
    fontFamily: {
      options: [
        "Arial",
        "Georgia",
        "Impact",
        "Tahoma",
        "Times New Roman",
        "Verdana",
      ],
    },
    list: {
      options: ["unordered", "ordered"], 
    },
    textAlign: {
      options: ["left", "center", "right"],
    },
  };

  return (
    <>
      <Editor
        editorState={content}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        placeholder="Tell your story..."
        toolbar={toolbarOptions}
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
};

export default TextEditor;
