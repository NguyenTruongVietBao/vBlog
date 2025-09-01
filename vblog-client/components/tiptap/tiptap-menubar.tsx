// import { Editor } from '@tiptap/react';
// import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button';
// import { ColorHighlightPopover } from '@/components/tiptap-ui/color-highlight-popover';
// import { HeadingButton } from '@/components/tiptap-ui/heading-button';
// import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu';
// import { TextAlignButton } from '@/components/tiptap-ui/text-align-button';
// import { BlockquoteButton } from '../../tiptap-ui/blockquote-button';
// import { ListButton } from '../../tiptap-ui/list-button';
// // import { ImageUploadButton } from '../tiptap-ui/image-upload-button';
// import { UndoRedoButton } from '../../tiptap-ui/undo-redo-button';
// import { MarkButton } from '../../tiptap-ui/mark-button';

// export default function TiptapMenubar({
//   editor,
//   className,
// }: {
//   editor: Editor;
//   className?: string;
// }) {
//   // FIX: Check editor exists and is initialized
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div
//       className={`flex flex-wrap gap-1 justify-start items-center p-2 ${className}`}
//     >
//       {/* Heading Buttons Group */}
//       <div className='flex gap-1 items-center border-r pr-2 mr-2'>
//         <UndoRedoButton
//           editor={editor}
//           action='undo'
//           hideWhenUnavailable={true}
//         />
//         <UndoRedoButton editor={editor} action='redo' />
//         <HeadingButton editor={editor} level={1} hideWhenUnavailable={true} />
//         <HeadingButton editor={editor} level={2} hideWhenUnavailable={true} />
//         <HeadingButton editor={editor} level={3} hideWhenUnavailable={true} />
//         <HeadingDropdownMenu
//           editor={editor}
//           levels={[1, 2, 3, 4, 5, 6]}
//           hideWhenUnavailable={true}
//           portal={false}
//         />
//       </div>

//       {/* Text Alignment Group */}
//       <div className='flex gap-1 items-center border-r pr-2 mr-2'>
//         <MarkButton editor={editor} type='bold' hideWhenUnavailable={true} />
//         <MarkButton type='italic' />
//         <MarkButton type='strike' />
//         <MarkButton type='code' />
//         <MarkButton type='underline' />
//         <MarkButton type='superscript' />
//         <MarkButton type='subscript' />
//         <TextAlignButton editor={editor} align='left' />
//         <TextAlignButton editor={editor} align='center' />
//         <TextAlignButton editor={editor} align='right' />
//         <TextAlignButton editor={editor} align='justify' />
//       </div>

//       {/* Formatting Group */}
//       <div className='flex gap-1 items-center border-r pr-2 mr-2'>
//         <ColorHighlightPopover editor={editor} hideWhenUnavailable={true} />
//         <BlockquoteButton editor={editor} hideWhenUnavailable={true} />
//         <ListButton
//           editor={editor}
//           type='orderedList'
//           hideWhenUnavailable={true}
//           onToggled={() => console.log('List toggled!')}
//         />
//         <ListButton
//           editor={editor}
//           type='bulletList'
//           hideWhenUnavailable={true}
//           onToggled={() => console.log('List toggled!')}
//         />
//         <CodeBlockButton editor={editor} hideWhenUnavailable={true} />
//       </div>

//       {/* Media Group */}
//       {/* <div className='flex gap-1 items-center'>
//         <ImageUploadButton editor={editor} hideWhenUnavailable={true} />
//       </div> */}
//     </div>
//   );
// }
