import { Editor, useCurrentEditor } from '@tiptap/react';

export function useTiptapEditor(editor?: Editor | null): Editor | null {
    const { editor: currentEditor } = useCurrentEditor();
    return editor || currentEditor || null;
}
