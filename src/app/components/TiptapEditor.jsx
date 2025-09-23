"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-t-md p-2 flex flex-wrap gap-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded hover:bg-gray-200'}>Gras</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded hover:bg-gray-200'}>Italique</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded hover:bg-gray-200'}>Titre</button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded hover:bg-gray-200'}>Texte</button>
    </div>
  );
};

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: content,
    editorProps: {
      attributes: {
        class: 'rounded-b-md border-x border-b border-gray-300 min-h-[300px] bg-white p-4 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div >
       <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;