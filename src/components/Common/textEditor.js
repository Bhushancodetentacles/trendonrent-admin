import React, { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"

export default function TextEditor({ data ,setFieldValue}) {
  const editorRef = useRef(null)
  function decodeHTMLEntities(text) {
    let textArea = document.createElement("textarea")
    textArea.innerHTML = text
    return textArea.value
  }
  const saveContent = () => {
    if (editorRef.current) {   
      setFieldValue("description", editorRef.current.getContent()) 
    }
  }
  return (
    <>
      <Editor
        apiKey="no-api-key"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onBlur={() => {
          saveContent()
        }}
        initialValue={
          data && decodeHTMLEntities(data) 
        }
        init={{
          height: 150,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  )
}
