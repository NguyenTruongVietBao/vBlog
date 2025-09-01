// 'use client';

// import React, { useEffect } from 'react';
// import TiptapMenubar from '@/components/common/post/tiptap-menubar';
// import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
// import { StarterKit } from '@tiptap/starter-kit';
// import { Highlight } from '@tiptap/extension-highlight';
// import { TextAlign } from '@tiptap/extension-text-align';
// import { TextStyle } from '@tiptap/extension-text-style';

// import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';
// import '@/components/tiptap-node/heading-node/heading-node.scss';
// import '@/components/tiptap-node/code-block-node/code-block-node.scss';
// import '@/components/tiptap-node/blockquote-node/blockquote-node.scss';
// import '@/components/tiptap-node/list-node/list-node.scss';
// import '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss';

// const extensions = [
//   TextStyle,
//   StarterKit,
//   Highlight.configure({ multicolor: true }),
//   TextAlign.configure({ types: ['heading', 'paragraph'] }),
// ];

// interface TiptapEditorProps {
//   contents: any;
//   onChangeJson: (content: any) => void;
//   onChangeHtml?: (content: any) => void;
//   className?: string;
// }

// export default function TiptapEditor({
//   contents,
//   onChangeJson,
//   onChangeHtml,
//   className,
// }: TiptapEditorProps) {
//   const editor = useEditor({
//     extensions,
//     immediatelyRender: false,
//     content: contents || { type: 'doc', content: [] },
//     onUpdate: ({ editor }) => {
//       onChangeJson(editor.getJSON());
//       if (onChangeHtml) {
//         onChangeHtml(editor.getHTML());
//       }
//     },
//     editorProps: {
//       attributes: {
//         class:
//           'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
//       },
//     },
//     parseOptions: {
//       preserveWhitespace: 'full',
//     },
//   });

//   useEffect(() => {
//     if (editor && contents !== undefined) {
//       const currentContent = editor.getJSON();
//       if (JSON.stringify(currentContent) !== JSON.stringify(contents)) {
//         editor.commands.setContent(contents);
//       }
//     }
//   }, [editor, contents]);

//   if (!editor) {
//     return (
//       <div className={`${className} border rounded-md`}>
//         <div className='h-12 border-b bg-muted animate-pulse' />
//         <div className='h-48 p-4 bg-muted/20 animate-pulse flex items-center justify-center'>
//           <span className='text-muted-foreground'>Loading editor...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${className} border rounded-md overflow-hidden`}>
//       <EditorContext.Provider value={{ editor }}>
//         <TiptapMenubar
//           editor={editor}
//           className='border-b px-3 py-2 bg-muted/30'
//         />
//         <div className='relative'>
//           <EditorContent
//             editor={editor}
//             role='presentation'
//             className='min-h-[200px] max-h-[400px] overflow-y-auto focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
//           />
//         </div>
//       </EditorContext.Provider>
//     </div>
//   );
// }
