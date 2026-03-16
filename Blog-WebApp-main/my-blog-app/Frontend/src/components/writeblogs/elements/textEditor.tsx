import { Editor, EditorState } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./textEditor.css";

type EditorPropType ={
  content:EditorState;
  setContent:(newstate:EditorState)=>void;
};

const TextEditor = ({ content, setContent }:EditorPropType) => {
  const onEditorStateChange = (newEditorState:EditorState) => {
    setContent(newEditorState);
  };

  //showing the seleted options in toolbar 
  const toolbarOptions = {
    options: ["inline", "fontSize", "fontFamily", "list", "textAlign", "link", "image"], // selected options
    inline: {
      options: ["bold", "italic", "underline"],
    },
    fontSize: {
      options: [7, 8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
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
      options: ["left", "center", "right", "justify"],
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
