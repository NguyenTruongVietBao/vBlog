// 'use client';

// import React from 'react';
// import TiptapEditor from '@/components/common/post/tiptap-editor';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import ContentRenderer from '@/components/common/post/content-render';
// import { jsonToHtml } from '@/lib/utils';
// import { Switch } from '@/components/ui/switch';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';

// export default function CreatePostForm() {
//   // Sửa schema để accept JSON object cho content
//   const formSchema = z.object({
//     title: z.string().min(2, {
//       message: 'Title must be at least 2 characters.',
//     }),
//     summary: z.string(),
//     content_json: z.any().refine(
//       (data) => {
//         return data && typeof data === 'object' && data.type === 'doc';
//       },
//       {
//         message: 'Content must be valid Tiptap JSON format.',
//       }
//     ),
//     subtitle: z.string().min(2, {
//       message: 'Subtitle must be at least 2 characters.',
//     }),
//     featured: z.boolean(),
//     status: z.enum(['PRIVATE', 'PUBLIC', 'ARCHIVED']),
//     content_html: z.any(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: '',
//       summary: '',
//       content_json: {
//         type: 'doc',
//         content: [],
//       },
//       subtitle: '',
//       featured: false,
//       status: 'PRIVATE',
//     },
//   });

//   const onContentChange = (content: any) => {
//     form.setValue('content_json', content);
//     form.trigger('content_json');
//   };

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     const contentJson = values.content_json;
//     const contentHtml = jsonToHtml(contentJson);
//     delete values.content_json;
//     values.content_json = contentJson as any;
//     values.content_html = contentHtml as any;
//     console.log('Form values:', values);

//     // const html = jsonToHtml(values.content);
//     // console.log('Content JSON:', JSON.stringify(values.content, null, 2));
//     // console.log('Content HTML:', html);
//   };

//   return (
//     <div className='container mx-auto py-8'>
//       <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
//         {/* Form Column */}
//         <div>
//           <h2 className='text-2xl font-bold mb-4'>Create Blog Post</h2>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
//               <FormField
//                 control={form.control}
//                 name='title'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Title</FormLabel>
//                     <FormControl>
//                       <Input placeholder='Enter blog title...' {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='subtitle'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Subtitle</FormLabel>
//                     <FormControl>
//                       <Input placeholder='Enter subtitle...' {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='summary'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Summary</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder='Enter summary...'
//                         {...field}
//                         rows={4}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='content_json'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Content</FormLabel>
//                     <FormControl>
//                       <TiptapEditor
//                         contents={field.value}
//                         onChangeJson={onContentChange}
//                         className='border-2 rounded-md min-h-[300px]'
//                       />
//                     </FormControl>
//                     <FormDescription>
//                       Write your blog content using the rich text editor
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='featured'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Featured</FormLabel>
//                     <FormControl>
//                       <Switch
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='status'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder='Select status' />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value='PRIVATE'>Private</SelectItem>
//                           <SelectItem value='PUBLIC'>Public</SelectItem>
//                           <SelectItem value='ARCHIVED'>Archived</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type='submit' className='w-full'>
//                 Create Blog Post
//               </Button>
//             </form>
//           </Form>
//         </div>

//         {/* Preview Column */}
//         <div>
//           <h2 className='text-2xl font-bold mb-4'>Live Preview</h2>
//           <div className='border rounded-lg p-6 bg-card'>
//             {form.watch('title') && (
//               <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-4'>
//                 {form.watch('title')}
//               </h1>
//             )}

//             {form.watch('subtitle') && (
//               <p className='text-muted-foreground text-xl leading-7 mb-6'>
//                 {form.watch('subtitle')}
//               </p>
//             )}

//             <div className='border-t pt-6'>
//               <ContentRenderer content={form.watch('content_json')} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Debug Panel (remove in production) */}
//       {/* <div className='mt-8 p-4 bg-muted rounded-lg'>
//         <h3 className='font-semibold mb-2'>Debug Info:</h3>
//         <pre className='text-xs overflow-x-auto'>
//           {JSON.stringify(form.watch(), null, 2)}
//         </pre>
//       </div> */}
//     </div>
//   );
// }
