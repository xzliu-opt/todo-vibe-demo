"use client";

import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
      <main className="flex flex-1 flex-col items-center px-4 pt-16 pb-8 sm:pt-24">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Liuxiaozhi Todo
          </h1>
          <p className="mt-2 text-sm text-gray-400 italic">
            Simplicity is the ultimate sophistication.
          </p>
        </header>

        {/* Main Card */}
        <Card className="w-full max-w-xl">
          {/* Input */}
          <div className="p-5 pb-4">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-100 px-5 pb-3">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`
                  rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer
                  ${filter === f.key
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                {f.label}
              </button>
            ))}

            <span className="ml-auto text-xs text-gray-400">
              {activeCount} left
            </span>
          </div>

          {/* List */}
          <div className="min-h-[200px]">
            {!isLoaded ? (
              <div className="flex items-center justify-center py-16">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-500" />
              </div>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
          </div>

          {/* Footer bar */}
          {completedCount > 0 && (
            <div className="border-t border-gray-100 px-5 py-3">
              <Button variant="ghost" size="sm" onClick={clearCompleted}>
                Clear completed ({completedCount})
              </Button>
            </div>
          )}
        </Card>
      </main>

      {/* Page Footer */}
      <footer className="pb-8 text-center">
        <p className="text-xs text-gray-400">© 2024 Liuxiaozhi.org</p>
      </footer>
    </div>
  );
}
