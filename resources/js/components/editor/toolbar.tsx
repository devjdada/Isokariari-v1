'use client';
import type { Editor } from '@tiptap/react';
import { HeadingDropdownMenu } from '../tiptap-ui/heading-dropdown-menu';
import { ListDropdownMenu } from '../tiptap-ui/list-dropdown-menu';

import '@/components/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';
import '../../styles/_variables.scss';

import '@/components/tiptap-node/image-upload-node/image-upload-node.scss';
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button';
import '../../styles/_keyframe-animations.scss';
import { BlockquoteButton } from '../tiptap-ui/blockquote-button';
import { CodeBlockButton } from '../tiptap-ui/code-block-button';
import { ColorHighlightPopover } from '../tiptap-ui/color-highlight-popover';
import { ImageUploadButton } from '../tiptap-ui/image-upload-button';
import { LinkPopover } from '../tiptap-ui/link-popover';
import { MarkButton } from '../tiptap-ui/mark-button';
import { TextAlignButton } from '../tiptap-ui/text-align-button';

type Props = {
    editor: Editor | null;
};

function ToolBar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    return (
        <div className="my-2 flex gap-3 rounded-lg border border-input p-1">
            <div className="tiptap-button-group" data-orientation="horizontal">
                <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
                <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />
                <BlockquoteButton />
                <CodeBlockButton />
                <ColorHighlightPopover />
                <TextAlignButton align="left" />
                <TextAlignButton align="center" />
                <TextAlignButton align="right" />
                <TextAlignButton align="justify" />
                <ImageUploadButton text="Add" />
                <LinkPopover />
                <MarkButton type="bold" />
                <MarkButton type="italic" />
                <MarkButton type="strike" />
                <MarkButton type="code" />
                <MarkButton type="underline" />
                <MarkButton type="superscript" />
                <MarkButton type="subscript" />
                <UndoRedoButton action="undo" />
                <UndoRedoButton action="redo" />
            </div>
        </div>
    );
}

export default ToolBar;
