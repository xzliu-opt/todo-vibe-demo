"use client";

import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";

type Filter = "all" | "active" | "completed";

export default function Home() {
  const { todos, isLoaded, addTodo, toggleTodo, deleteTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col items-center px-4 pt-16 pb-8 sm:px-6 sm:pt-24">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-7xl font-thin tracking-tighter text-[#1d1d1f]">
            flow.
          </h1>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#86868b]">
            Crafted by Mia &amp; Serge
          </p>
        </header>

        {/* Floating Surface */}
        <div className="w-full max-w-2xl rounded-[32px] sm:rounded-[40px] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-6 sm:p-10 md:p-12">
          {/* Input */}
          <div className="mb-8">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#e8e8ed] pb-4">
            <div className="flex items-center gap-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`
                    rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 cursor-pointer
                    ${filter === f.key
                      ? "bg-[#f5f5f7] text-[#1d1d1f]"
                      : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]/60"
                    }
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="text-[13px] text-[#aeaeb2]">
              {activeCount} left
            </span>
          </div>

          {/* List */}
          <div className="min-h-[240px]">
            {!isLoaded ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#e8e8ed] border-t-[#1d1d1f]" />
              </div>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
          </div>

          {/* Clear completed */}
          {completedCount > 0 && (
            <div className="flex justify-center border-t border-[#e8e8ed] pt-4">
              <button
                onClick={clearCompleted}
                className="text-[13px] font-medium text-[#aeaeb2] hover:text-[#ff3b30] transition-colors cursor-pointer"
              >
                Clear completed ({completedCount})
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 text-center">
        <p className="text-[10px] text-[#aeaeb2]">&copy; 2024 Liuxiaozhi.org</p>
      </footer>
    </div>
  );
}
