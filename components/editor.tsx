// // "use client";

// // import dynamic from "next/dynamic";
// // import { useMemo } from "react";

// // import "react-quill/dist/quill.snow.css";

// // interface EditorProps {
// //   onChange: (value: string) => void;
// //   value: string;
// // }

// // const Editor = ({ onChange, value }: EditorProps) => {
// //   const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
// //   return (
// //     <div className="bg-white">
// //       <ReactQuill theme="snow" value={value} onChange={onChange} />
// //     </div>
// //   );
// // };

// // export default Editor;



"use client";

import { useEditor, EditorContent, Editor as TiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Highlighter,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

interface EditorProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg dark:prose-invert min-h-[150px] p-3 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("mt-2 border rounded-md bg-white")}>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

interface EditorToolbarProps {
  editor: TiptapEditor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
      {/* History Controls */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          !editor.can().undo() && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Undo"
      >
        <Undo2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          !editor.can().redo() && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Redo"
      >
        <Redo2 size={18} />
      </button>
      <div className="h-5 w-px bg-slate-300 mx-1" />

      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("bold") && "bg-slate-100"
        )}
        aria-label="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("italic") && "bg-slate-100"
        )}
        aria-label="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("underline") && "bg-slate-100"
        )}
        aria-label="Underline"
      >
        <UnderlineIcon size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("highlight") && "bg-slate-100"
        )}
        aria-label="Highlight"
      >
        <Highlighter size={18} />
      </button>
      <div className="h-5 w-px bg-slate-300 mx-1" />

      {/* Headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("heading", { level: 1 }) && "bg-slate-100"
        )}
        aria-label="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("heading", { level: 2 }) && "bg-slate-100"
        )}
        aria-label="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("heading", { level: 3 }) && "bg-slate-100"
        )}
        aria-label="Heading 3"
      >
        <Heading3 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("heading", { level: 4 }) && "bg-slate-100"
        )}
        aria-label="Heading 4"
      >
        <Heading4 size={18} />
      </button>
      <div className="h-5 w-px bg-slate-300 mx-1" />

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("bulletList") && "bg-slate-100"
        )}
        aria-label="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive("orderedList") && "bg-slate-100"
        )}
        aria-label="Ordered List"
      >
        <ListOrdered size={18} />
      </button>
      <div className="h-5 w-px bg-slate-300 mx-1" />

      {/* Alignment */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive({ textAlign: "left" }) && "bg-slate-100"
        )}
        aria-label="Align Left"
      >
        <AlignLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive({ textAlign: "center" }) && "bg-slate-100"
        )}
        aria-label="Align Center"
      >
        <AlignCenter size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive({ textAlign: "right" }) && "bg-slate-100"
        )}
        aria-label="Align Right"
      >
        <AlignRight size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={cn(
          "p-1.5 rounded-md hover:bg-slate-100",
          editor.isActive({ textAlign: "justify" }) && "bg-slate-100"
        )}
        aria-label="Justify"
      >
        <AlignJustify size={18} />
      </button>
    </div>
  );
};


// "use client";

// import { useEditor, EditorContent, Editor as TiptapEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Highlight from "@tiptap/extension-highlight";
// import Link from "@tiptap/extension-link";
// import TextAlign from "@tiptap/extension-text-align";
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";
// import {
//   Bold,
//   Italic,
//   Underline as UnderlineIcon,
//   Highlighter,
//   Link as LinkIcon,
//   Undo2,
//   Redo2,
//   Heading1,
//   Heading2,
//   Heading3,
//   Heading4,
//   List,
//   ListOrdered,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
// } from "lucide-react";

// interface EditorProps {
//   value?: string;
//   onChange: (value: string) => void;
// }

// export default function Editor({ value, onChange }: EditorProps) {
//   const [linkUrl, setLinkUrl] = useState("");
//   const [showLinkInput, setShowLinkInput] = useState(false);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: {
//           levels: [1, 2, 3, 4],
//         },
//       }),
//       Underline,
//       Highlight.configure({
//         multicolor: true,
//       }),
//       Link.configure({
//         openOnClick: true,
//       }),
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//         alignments: ["left", "center", "right", "justify"],
//       }),
//     ],
//     content: value || "",
//     onUpdate({ editor }) {
//       onChange(editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm sm:prose lg:prose-lg dark:prose-invert min-h-[150px] p-3 focus:outline-none",
//       },
//     },
//   });

//   useEffect(() => {
//     if (editor && value && editor.getHTML() !== value) {
//       editor.commands.setContent(value);
//     }
//   }, [value, editor]);

//   const setLink = () => {
//     if (linkUrl) {
//       editor
//         ?.chain()
//         .focus()
//         .extendMarkRange("link")
//         .setLink({ href: linkUrl })
//         .run();
//       setLinkUrl("");
//     }
//     setShowLinkInput(false);
//   };

//   const Toolbar = () => {
//     if (!editor) return null;

//     return (
//       <div className="flex flex-wrap items-center gap-2 p-2 border-b">
//         {/* History Controls */}
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().undo().run()}
//           disabled={!editor.can().undo()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             !editor.can().undo() && "opacity-50 cursor-not-allowed"
//           )}
//           aria-label="Undo"
//         >
//           <Undo2 size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().redo().run()}
//           disabled={!editor.can().redo()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             !editor.can().redo() && "opacity-50 cursor-not-allowed"
//           )}
//           aria-label="Redo"
//         >
//           <Redo2 size={18} />
//         </button>
//         <div className="h-5 w-px bg-slate-300 mx-1" />

//         {/* Text Formatting */}
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("bold") && "bg-slate-100"
//           )}
//           aria-label="Bold"
//         >
//           <Bold size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("italic") && "bg-slate-100"
//           )}
//           aria-label="Italic"
//         >
//           <Italic size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("underline") && "bg-slate-100"
//           )}
//           aria-label="Underline"
//         >
//           <UnderlineIcon size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleHighlight().run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("highlight") && "bg-slate-100"
//           )}
//           aria-label="Highlight"
//         >
//           <Highlighter size={18} />
//         </button>
//         <div className="h-5 w-px bg-slate-300 mx-1" />

//         {/* Headings */}
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("heading", { level: 1 }) && "bg-slate-100"
//           )}
//           aria-label="Heading 1"
//         >
//           <Heading1 size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("heading", { level: 2 }) && "bg-slate-100"
//           )}
//           aria-label="Heading 2"
//         >
//           <Heading2 size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("heading", { level: 3 }) && "bg-slate-100"
//           )}
//           aria-label="Heading 3"
//         >
//           <Heading3 size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("heading", { level: 4 }) && "bg-slate-100"
//           )}
//           aria-label="Heading 4"
//         >
//           <Heading4 size={18} />
//         </button>
//         <div className="h-5 w-px bg-slate-300 mx-1" />

//         {/* Lists */}
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("bulletList") && "bg-slate-100"
//           )}
//           aria-label="Bullet List"
//         >
//           <List size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive("orderedList") && "bg-slate-100"
//           )}
//           aria-label="Ordered List"
//         >
//           <ListOrdered size={18} />
//         </button>
//         <div className="h-5 w-px bg-slate-300 mx-1" />

//         {/* Alignment */}
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().setTextAlign("left").run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive({ textAlign: "left" }) && "bg-slate-100"
//           )}
//           aria-label="Align Left"
//         >
//           <AlignLeft size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().setTextAlign("center").run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive({ textAlign: "center" }) && "bg-slate-100"
//           )}
//           aria-label="Align Center"
//         >
//           <AlignCenter size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().setTextAlign("right").run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive({ textAlign: "right" }) && "bg-slate-100"
//           )}
//           aria-label="Align Right"
//         >
//           <AlignRight size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().setTextAlign("justify").run()}
//           className={cn(
//             "p-1.5 rounded-md hover:bg-slate-100",
//             editor.isActive({ textAlign: "justify" }) && "bg-slate-100"
//           )}
//           aria-label="Justify"
//         >
//           <AlignJustify size={18} />
//         </button>
//         <div className="h-5 w-px bg-slate-300 mx-1" />

//         {/* Link */}
//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => {
//               setShowLinkInput(!showLinkInput);
//               if (editor.isActive("link")) {
//                 setLinkUrl(editor.getAttributes("link").href);
//               }
//             }}
//             className={cn(
//               "p-1.5 rounded-md hover:bg-slate-100",
//               editor.isActive("link") && "bg-slate-100"
//             )}
//             aria-label="Insert Link"
//           >
//             <LinkIcon size={18} />
//           </button>

//           {showLinkInput && (
//             <div className="absolute top-full right-0 mt-1 z-10 bg-white p-2 rounded-md border shadow-lg">
//               <input
//                 type="text"
//                 value={linkUrl}
//                 onChange={(e) => setLinkUrl(e.target.value)}
//                 placeholder="Enter URL"
//                 className="border rounded p-1 text-sm w-40"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") setLink();
//                 }}
//               />
//               <div className="flex gap-1 mt-1">
//                 <button
//                   type="button"
//                   onClick={setLink}
//                   className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                 >
//                   Apply
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     editor?.chain().focus().unsetLink().run();
//                     setShowLinkInput(false);
//                     setLinkUrl("");
//                   }}
//                   className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={cn("mt-2 border rounded-md bg-white")}>
//       <Toolbar />
//       <EditorContent editor={editor} />
//     </div>
//   );
// }