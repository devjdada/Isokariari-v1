import { Editor } from '@tiptap/react';
import { Node } from 'prosemirror-model';

export const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

export const handleImageUpload = (file: File, onProgress?: (event: { progress: number }) => void, abortSignal?: AbortSignal): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Simulate a file upload
        const reader = new FileReader();
        reader.onload = (e) => {
            // In a real application, you would upload the file to a server
            // and get a URL back. For this example, we'll just use a data URL.
            if (e.target?.result) {
                if (onProgress) {
                    onProgress({ progress: 100 });
                }
                resolve(e.target.result as string);
            } else {
                reject(new Error('Failed to read file'));
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

export function isNodeInSchema(name: string, editor: Editor | null): boolean {
    return Boolean(editor?.schema.nodes[name]);
}

export function isMarkInSchema(name: string, editor: Editor | null): boolean {
    return Boolean(editor?.schema.marks[name]);
}

export function isEmptyNode(node: Node | null | undefined): boolean {
    if (!node) {
        return true;
    }
    if (node.isText && (!node.text || node.text.trim() === '')) {
        return true;
    }
    if (node.childCount === 0) {
        return true;
    }
    // If the node has children, check if all of them are empty
    for (let i = 0; i < node.childCount; i++) {
        if (!isEmptyNode(node.child(i))) {
            return false;
        }
    }
    return true;
}

export function findNodePosition(editor: Editor, node: Node): number {
    let pos = -1;
    editor.state.doc.descendants((n, p) => {
        if (n === node) {
            pos = p;
            return false;
        }
        return true;
    });
    return pos;
}

export function sanitizeUrl(url: string): string {
    if (!url || typeof url !== 'string') {
        return '';
    }
    // Basic sanitization: allow http, https, mailto protocols
    const allowedProtocols = /^(https?|mailto):/i;
    if (allowedProtocols.test(url)) {
        return url;
    }
    // For other cases, prepend https:// to prevent potential XSS
    return 'https://' + url.replace(/[/\?#]/g, '');
}
