'use client';
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node';
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './toolbar';

function Tiptap({ description, onChange }: { description: string; onChange: (richText: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Image,
            ImageUploadNode.configure({
                accept: 'image/*',
                maxSize: MAX_FILE_SIZE,
                limit: 3,
                upload: handleImageUpload,
                onError: (error) => console.error('Upload failed:', error),
            }),
            Superscript,
            Subscript,
        ],
        immediatelyRender: false,
        content: description,
        editorProps: {
            attributes: {
                class: 'rounded-md border min-h-[150px] border-input bg-background focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 p-2',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return (
        <EditorContext.Provider value={{ editor }}>
            <div className="flex min-h-[250px] w-full flex-col justify-stretch">
                <ToolBar editor={editor} />
                <EditorContent editor={editor} />
            </div>
        </EditorContext.Provider>
    );
}

export default Tiptap;
