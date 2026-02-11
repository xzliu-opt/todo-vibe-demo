"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronRight, GripVertical, Star, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/Checkbox";
import { SubtaskList } from "@/components/todo/SubtaskList";
import { formatTime, formatDuration } from "@/lib/time";
import type { Todo } from "@/types/todo";

export interface TodoLabels {
    created: string;
    done: string;
    took: string;
}

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onUpdate: (id: string, text: string) => void;
    onDelete: (id: string) => void;
    onToggleFavorite: (id: string) => void;
    onSetReminder: (id: string, timestamp: number) => void;
    onClearReminder: (id: string) => void;
    onAddSubtask: (parentId: string, text: string) => void;
    onUpdateSubtask: (parentId: string, subtaskId: string, text: string) => void;
    onToggleSubtask: (parentId: string, subtaskId: string) => void;
    onDeleteSubtask: (parentId: string, subtaskId: string) => void;
    subtaskPlaceholder?: string;
    labels?: TodoLabels;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete, onToggleFavorite, onSetReminder, onClearReminder, onAddSubtask, onUpdateSubtask, onToggleSubtask, onDeleteSubtask, subtaskPlaceholder, labels }: TodoItemProps) {
    const [showClearHint, setShowClearHint] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.text);
    const inputRef = useRef<HTMLInputElement>(null);

    const l = labels ?? { created: "Created", done: "Done", took: "Took" };
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id, disabled: todo.completed });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
    };

    const duration =
        todo.completed && todo.completedAt
            ? formatDuration(todo.completedAt - todo.createdAt)
            : null;

    const subtaskCount = todo.subtasks.length;
    const doneCount = todo.subtasks.filter((s) => s.completed).length;
    const hasSubtasks = subtaskCount > 0;

    const handleEditStart = () => {
        if (todo.completed) return; // Prevent editing completed todos
        setIsEditing(true);
        setEditValue(todo.text);
        // Focus will be handled by autoFocus on input
    };

    const handleEditSave = () => {
        if (editValue.trim() && editValue.trim() !== todo.text) {
            onUpdate(todo.id, editValue.trim());
        } else {
            setEditValue(todo.text); // Revert if empty or unchanged
        }
        setIsEditing(false);
    };

    const handleEditCancel = () => {
        setEditValue(todo.text);
        setIsEditing(false);
    };

    return (
        <div>
            <motion.div
                ref={setNodeRef}
                layout={!isDragging}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="group flex items-start gap-3 rounded-2xl px-4 py-3.5 transition-colors"
                style={style}
                onMouseEnter={(e) => {
                    if (!isDragging) e.currentTarget.style.backgroundColor = "var(--color-item-hover)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
            >
                {/* Chevron + Drag handle area */}
                {!todo.completed ? (
                    <div className="flex items-center gap-0.5">
                        {/* Subtask chevron */}
                        <motion.button
                            onClick={() => setExpanded((prev) => !prev)}
                            animate={{ rotate: expanded ? 90 : 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            aria-label={expanded ? "Collapse subtasks" : "Expand subtasks"}
                            className="flex items-center justify-center h-5 w-5 cursor-pointer transition-opacity duration-150"
                            style={{
                                color: hasSubtasks ? "var(--color-text-secondary)" : "var(--color-text-tertiary)",
                                opacity: hasSubtasks ? 0.7 : undefined,
                            }}
                        >
                            <ChevronRight
                                size={13}
                                strokeWidth={1.5}
                                className={hasSubtasks ? "" : "opacity-0 group-hover:opacity-30 transition-opacity duration-150"}
                            />
                        </motion.button>
                        <button
                            {...attributes}
                            {...listeners}
                            aria-label="Drag to reorder"
                            className="opacity-0 group-hover:opacity-60 flex items-center justify-center h-6 w-6 mt-0.5 cursor-grab active:cursor-grabbing transition-opacity duration-150 touch-none"
                            style={{ color: "var(--color-text-tertiary)" }}
                        >
                            <GripVertical size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="w-6" />
                )}

                <Checkbox
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    id={`todo-checkbox-${todo.id}`}
                />

                {/* Favorite star */}
                <motion.button
                    onClick={() => onToggleFavorite(todo.id)}
                    aria-label={todo.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className="flex items-center justify-center h-6 w-6 mt-0.5 cursor-pointer transition-opacity duration-150"
                    style={{
                        opacity: todo.isFavorite ? 1 : undefined,
                    }}
                    whileTap={{ scale: 1.4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                    <Star
                        size={14}
                        strokeWidth={1.5}
                        className={todo.isFavorite ? "" : "opacity-0 group-hover:opacity-40 transition-opacity duration-150"}
                        style={{
                            color: todo.isFavorite ? "#facc15" : "var(--color-text-tertiary)",
                            fill: todo.isFavorite ? "#facc15" : "none",
                        }}
                    />
                </motion.button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleEditSave}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleEditSave();
                                else if (e.key === "Escape") handleEditCancel();
                            }}
                            autoFocus
                            className="w-full bg-transparent text-[19px] font-normal leading-relaxed outline-none"
                            style={{
                                color: "var(--color-text)",
                                caretColor: "var(--color-primary)",
                            }}
                        />
                    ) : (
                        <span
                            onClick={handleEditStart}
                            className="text-[19px] font-normal leading-relaxed transition-all duration-300 block cursor-text"
                            style={{
                                color: todo.completed ? "var(--color-text-tertiary)" : "var(--color-text)",
                                textDecoration: todo.completed ? "line-through" : "none",
                                textDecorationColor: todo.completed ? "var(--color-border)" : undefined,
                            }}
                        >
                            {todo.text}
                        </span>
                    )}

                    {/* Subtask progress — only show when collapsed and has subtasks */}
                    {!expanded && hasSubtasks && (
                        <span
                            className="ml-2 text-[10px] font-light tracking-wide"
                            style={{ color: doneCount === subtaskCount ? "var(--color-checkbox-checked-border)" : "var(--color-text-tertiary)" }}
                        >
                            {doneCount}/{subtaskCount}
                        </span>
                    )}

                    {/* Time metadata */}
                    <motion.div
                        initial={todo.completed ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mt-0.5 text-[10px] font-light tracking-wider"
                        style={{ color: "var(--color-text-tertiary)" }}
                    >
                        {todo.completed && todo.completedAt ? (
                            <>
                                {l.created} {formatTime(todo.createdAt)} · {l.done}{" "}
                                {formatTime(todo.completedAt)} · {l.took} {duration}
                            </>
                        ) : (
                            <>{l.created} {formatTime(todo.createdAt)}</>
                        )}
                    </motion.div>

                    {/* Reminder indicator */}
                    {todo.reminderAt && !todo.completed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-0.5 text-[10px] font-light tracking-wider flex items-center gap-1"
                            style={{ color: "#3b82f6" }}
                        >
                            <Bell size={9} />
                            {new Date(todo.reminderAt).toLocaleString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </motion.div>
                    )}
                </div>

                {/* Reminder bell */}
                {!todo.completed && (
                    <div
                        className="relative flex items-center"
                        onMouseEnter={() => todo.reminderAt && setShowClearHint(true)}
                        onMouseLeave={() => setShowClearHint(false)}
                    >
                        <motion.button
                            onClick={() => {
                                if (todo.reminderAt) {
                                    onClearReminder(todo.id);
                                    setShowClearHint(false);
                                } else {
                                    dateInputRef.current?.showPicker();
                                }
                            }}
                            aria-label={todo.reminderAt ? "Clear reminder" : "Set reminder"}
                            className="flex items-center justify-center h-8 w-8 mt-0.5 rounded-full cursor-pointer transition-all duration-200"
                            style={{
                                color: todo.reminderAt ? "#3b82f6" : "var(--color-text-tertiary)",
                                opacity: todo.reminderAt ? 1 : undefined,
                            }}
                            whileTap={{ scale: 1.3 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                            <Bell
                                size={14}
                                strokeWidth={1.5}
                                className={todo.reminderAt ? "" : "opacity-0 group-hover:opacity-40 transition-opacity duration-150"}
                                style={{
                                    fill: todo.reminderAt ? "#3b82f6" : "none",
                                }}
                            />
                        </motion.button>

                        {/* Hidden datetime input */}
                        <input
                            ref={dateInputRef}
                            type="datetime-local"
                            className="absolute inset-0 opacity-0 pointer-events-none w-0 h-0"
                            tabIndex={-1}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val) {
                                    onSetReminder(todo.id, new Date(val).getTime());
                                    e.target.value = "";
                                }
                            }}
                        />

                        {/* Clear hint tooltip */}
                        {showClearHint && todo.reminderAt && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-1 text-[9px] font-medium"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    color: "var(--color-text-secondary)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                    border: "1px solid var(--color-border-light)",
                                }}
                            >
                                Click to clear
                            </motion.div>
                        )}
                    </div>
                )}

                <button
                    onClick={() => onDelete(todo.id)}
                    aria-label={`Delete "${todo.text}"`}
                    className="opacity-0 group-hover:opacity-100 flex items-center justify-center h-8 w-8 mt-0.5 rounded-full transition-all duration-200 cursor-pointer"
                    style={{ color: "var(--color-text-tertiary)" }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-danger)";
                        e.currentTarget.style.backgroundColor = "var(--color-danger-bg)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-text-tertiary)";
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </motion.div>

            {/* Expandable subtask list */}
            {!todo.completed && (
                <AnimatePresence initial={false}>
                    {expanded && (
                        <SubtaskList
                            parentId={todo.id}
                            subtasks={todo.subtasks}
                            onAdd={onAddSubtask}
                            onUpdate={onUpdateSubtask}
                            onToggle={onToggleSubtask}
                            onDelete={onDeleteSubtask}
                            placeholder={subtaskPlaceholder ?? "Add a subtask"}
                        />
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
