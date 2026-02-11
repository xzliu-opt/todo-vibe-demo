"use client";

import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TodoInput } from "@/components/todo/TodoInput";
import { TodoList } from "@/components/todo/TodoList";

type Filter = "all" | "active" | "completed";

export default function Home() {
  const { todos, isLoaded, addTodo, toggleTodo, deleteTodo, clearCompleted, reorderTodos } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");
  const { isDark, toggle: toggleDark } = useDarkMode();

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .sort((a, b) => Number(a.completed) - Number(b.completed));

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex min-h-dvh flex-col" style={{ transition: "background-color 500ms, color 500ms" }}>
      <ThemeToggle isDark={isDark} toggle={toggleDark} />
      <main className="flex flex-1 flex-col items-center px-4 pt-16 pb-8 sm:px-6 sm:pt-24">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1
            className="text-7xl font-thin tracking-tighter"
            style={{ color: "var(--color-text)", transition: "color 500ms" }}
          >
            flow.
          </h1>
          <p
            className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Crafted by Mia &amp; Serge
          </p>
        </header>

        {/* Floating Surface */}
        <div
          className="w-full max-w-2xl rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12"
          style={{
            backgroundColor: "var(--color-surface)",
            boxShadow: "var(--shadow-surface)",
            border: "var(--border-surface)",
            transition: "background-color 500ms, box-shadow 500ms, border 500ms",
          }}
        >
          {/* Input */}
          <div className="mb-8">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 pb-4"
            style={{ borderBottom: "1px solid var(--color-border-light)", transition: "border-color 500ms" }}
          >
            <div className="flex items-center gap-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: filter === f.key ? "var(--color-filter-active-bg)" : "transparent",
                    color: filter === f.key ? "var(--color-filter-active-text)" : "var(--color-text-secondary)",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
              {activeCount} left
            </span>
          </div>

          {/* List */}
          <div className="min-h-[240px]">
            {!isLoaded ? (
              <div className="flex items-center justify-center py-20">
                <div
                  className="h-5 w-5 animate-spin rounded-full border-2"
                  style={{
                    borderColor: "var(--color-spinner-track)",
                    borderTopColor: "var(--color-spinner-head)",
                  }}
                />
              </div>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onReorder={reorderTodos}
              />
            )}
          </div>

          {/* Clear completed */}
          {completedCount > 0 && (
            <div
              className="flex justify-center pt-4"
              style={{ borderTop: "1px solid var(--color-border-light)", transition: "border-color 500ms" }}
            >
              <button
                onClick={clearCompleted}
                className="text-[13px] font-medium transition-colors cursor-pointer"
                style={{ color: "var(--color-text-tertiary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-danger)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-tertiary)")}
              >
                Clear completed ({completedCount})
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 text-center">
        <p className="text-[10px]" style={{ color: "var(--color-text-quaternary)" }}>
          &copy; 2026 liuxiaozhi.org
        </p>
      </footer>
    </div>
  );
}
