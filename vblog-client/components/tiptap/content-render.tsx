// // components/ContentRenderer.jsx
// import React from 'react';
// import { cn } from '@/lib/utils'; // ShadCN utility function

// const ContentRenderer = ({ content }: { content: any }) => {
//   const renderBlock = (block: any, index = 0) => {
//     if (!block || !block.type) return null;

//     switch (block.type) {
//       case 'doc':
//         return (
//           <div className='prose-content'>
//             {block.content?.map((childBlock: any, i: number) =>
//               renderBlock(childBlock, i)
//             )}
//           </div>
//         );

//       case 'heading':
//         return renderHeading(block, index);

//       case 'paragraph':
//         return renderParagraph(block, index);

//       case 'blockquote':
//         return renderBlockquote(block, index);

//       case 'bulletList':
//         return renderBulletList(block, index);

//       case 'orderedList':
//         return renderOrderedList(block, index);

//       case 'listItem':
//         return renderListItem(block, index);

//       case 'codeBlock':
//         return renderCodeBlock(block, index);

//       case 'horizontalRule':
//         return <hr key={index} className='my-8 border-border' />;

//       case 'table':
//         return renderTable(block, index);

//       case 'tableRow':
//         return renderTableRow(block, index);

//       case 'tableCell':
//       case 'tableHeader':
//         return renderTableCell(block, index);

//       default:
//         return null;
//     }
//   };

//   const renderHeading = (block: any, index: number) => {
//     const level = block.attrs?.level || 1;
//     const textAlign = block.attrs?.textAlign;
//     const textContent = extractText(block.content);

//     const headingClasses = {
//       1: 'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
//       2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
//       3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
//       4: 'scroll-m-20 text-xl font-semibold tracking-tight',
//       5: 'scroll-m-20 text-lg font-semibold tracking-tight',
//       6: 'scroll-m-20 text-base font-semibold tracking-tight',
//     };

//     const HeadingTag = `h${level}`;

//     return React.createElement(
//       HeadingTag,
//       {
//         key: index,
//         className: cn(
//           headingClasses[level as keyof typeof headingClasses],
//           textAlign === 'center' && 'text-center',
//           textAlign === 'right' && 'text-right',
//           level >= 2 && 'mt-10'
//         ),
//         style: textAlign ? { textAlign } : undefined,
//       },
//       textContent
//     );
//   };

//   const renderParagraph = (block: any, index: number) => {
//     if (!block.content || block.content.length === 0) {
//       return <p key={index} className='leading-7 [&:not(:first-child)]:mt-6' />;
//     }

//     const textAlign = block.attrs?.textAlign;

//     return (
//       <p
//         key={index}
//         className={cn(
//           'leading-7 [&:not(:first-child)]:mt-6',
//           textAlign === 'center' && 'text-center',
//           textAlign === 'right' && 'text-right'
//         )}
//         style={textAlign ? { textAlign } : undefined}
//       >
//         {renderInlineContent(block.content)}
//       </p>
//     );
//   };

//   const renderBlockquote = (block: any, index: number) => {
//     return (
//       <blockquote key={index} className='mt-6 border-l-2 pl-6 italic'>
//         {renderInlineContent(block.content)}
//       </blockquote>
//     );
//   };

//   const renderBulletList = (block: any, index: number) => {
//     return (
//       <ul key={index} className='my-6 ml-6 list-disc [&>li]:mt-2'>
//         {block.content?.map((listItem: any, i: number) =>
//           renderBlock(listItem, i)
//         )}
//       </ul>
//     );
//   };

//   const renderOrderedList = (block: any, index: number) => {
//     return (
//       <ol key={index} className='my-6 ml-6 list-decimal [&>li]:mt-2'>
//         {block.content?.map((listItem: any, i: number) =>
//           renderBlock(listItem, i)
//         )}
//       </ol>
//     );
//   };

//   const renderListItem = (block: any, index: number) => {
//     return (
//       <li key={index}>
//         {block.content?.map((childBlock: any, i: number) => {
//           if (childBlock.type === 'paragraph') {
//             return renderInlineContent(childBlock.content);
//           }
//           return renderBlock(childBlock, i);
//         })}
//       </li>
//     );
//   };

//   const renderCodeBlock = (block: any, index: number) => {
//     const language = block.attrs?.language || '';
//     const code = extractText(block.content);

//     return (
//       <pre
//         key={index}
//         className='mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4'
//       >
//         <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-50'>
//           {code}
//         </code>
//       </pre>
//     );
//   };

//   const renderTable = (block: any, index: number) => {
//     return (
//       <div key={index} className='my-6 w-full overflow-y-auto'>
//         <table className='w-full'>
//           {block.content?.map((row: any, i: number) => renderBlock(row, i))}
//         </table>
//       </div>
//     );
//   };

//   const renderTableRow = (block: any, index: number) => {
//     return (
//       <tr key={index} className='even:bg-muted m-0 border-t p-0'>
//         {block.content?.map((cell: any, i: number) => renderBlock(cell, i))}
//       </tr>
//     );
//   };

//   const renderTableCell = (block: any, index: number) => {
//     const isHeader = block.type === 'tableHeader';
//     const Tag = isHeader ? 'th' : 'td';

//     return (
//       <Tag
//         key={index}
//         className={cn(
//           'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
//           isHeader && 'font-bold'
//         )}
//       >
//         {renderInlineContent(block.content)}
//       </Tag>
//     );
//   };

//   const renderInlineContent = (content: any) => {
//     if (!content) return '';

//     return content.map((node: any, index: number) => {
//       if (!node) return null;

//       switch (node.type) {
//         case 'text':
//           return renderTextNode(node, index);
//         case 'hardBreak':
//           return <br key={index} />;
//         default:
//           return null;
//       }
//     });
//   };

//   const renderTextNode = (node: any, index: number) => {
//     let text = node.text || '';
//     let element = text;

//     // Apply marks (bold, italic, etc.)
//     if (node.marks && node.marks.length > 0) {
//       node.marks.forEach((mark: any) => {
//         switch (mark.type) {
//           case 'bold':
//             element = <strong key={`bold-${index}`}>{element}</strong>;
//             break;
//           case 'italic':
//             element = <em key={`italic-${index}`}>{element}</em>;
//             break;
//           case 'underline':
//             element = <u key={`underline-${index}`}>{element}</u>;
//             break;
//           case 'strike':
//             element = <s key={`strike-${index}`}>{element}</s>;
//             break;
//           case 'code':
//             element = (
//               <code
//                 key={`code-${index}`}
//                 className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
//               >
//                 {element}
//               </code>
//             );
//             break;
//           case 'link':
//             element = (
//               <a
//                 key={`link-${index}`}
//                 href={mark.attrs?.href || '#'}
//                 target={mark.attrs?.target}
//                 className='text-primary font-medium underline underline-offset-4 hover:no-underline'
//               >
//                 {element}
//               </a>
//             );
//             break;
//           default:
//             break;
//         }
//       });
//     }

//     return <React.Fragment key={index}>{element}</React.Fragment>;
//   };

//   const extractText = (content: any) => {
//     if (!content) return '';
//     return content
//       .filter((node: any) => node.type === 'text')
//       .map((node: any) => node.text || '')
//       .join('');
//   };

//   return (
//     <div className='prose prose-zinc dark:prose-invert max-w-none'>
//       {renderBlock(content)}
//     </div>
//   );
// };

// export default ContentRenderer;

// // Example usage:
// // import ContentRenderer from '@/components/ContentRenderer';
// //
// // const blogContent = {
// //   "type": "doc",
// //   "content": [
// //     {
// //       "type": "heading",
// //       "attrs": { "textAlign": "center", "level": 1 },
// //       "content": [{ "type": "text", "text": "My Blog Title" }]
// //     },
// //     {
// //       "type": "paragraph",
// //       "attrs": { "textAlign": null },
// //       "content": [
// //         { "type": "text", "text": "This is " },
// //         { "type": "text", "marks": [{ "type": "bold" }], "text": "bold text" },
// //         { "type": "text", "text": " in a paragraph." }
// //       ]
// //     }
// //   ]
// // };
// //
// // <ContentRenderer content={blogContent} />
