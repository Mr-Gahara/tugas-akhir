"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { GripVertical, Pencil } from "lucide-react"; 

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id)
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter.id} index={index} draggableId={chapter.id}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    {/* Drag handle */}
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition cursor-grab active:cursor-grabbing",
                        chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    
                    {/* Chapter title */}
                    <div className="flex-1 min-w-0">
                      <span className="truncate block">
                        {chapter.title}
                      </span>
                    </div>
                    
                    {/* Publication and Free status */}
                    <div className="flex items-center gap-x-2">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full whitespace-nowrap",
                        chapter.isPublished 
                          ? "bg-sky-700 text-white font-bold" 
                          : "bg-slate-500 text-white"
                      )}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </span>
                      
                      {/* Free status badge */}
                      {chapter.isFree && (
                        <span className="text-xs px-2 py-1 rounded-full whitespace-nowrap bg-emerald-700 text-white font-bold">
                          Free
                        </span>
                      )}
                      
                      {/* Edit button */}
                      <button
                        onClick={() => onEdit(chapter.id)}
                        className="p-2 hover:opacity-75 transition"
                        title="Edit chapter"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;