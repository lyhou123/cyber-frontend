import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditorComponent: React.FC = () => {
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    console.log('Editor Data:', data);
  };

  return (
    <div>
      <h2>CKEditor in Next.js with TypeScript</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Type your content here!</p>"
        onChange={handleEditorChange}
        onBlur={(event, editor) => console.log('Blur:', editor)}
        onFocus={(event, editor) => console.log('Focus:', editor)}
      />
    </div>
  );
};

export default EditorComponent;
