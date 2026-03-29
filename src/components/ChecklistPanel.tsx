import { useState } from "react";
import { CheckSquare, Square, Rocket } from "lucide-react";
import type { ChecklistItem } from "@/types/repoTypes";

export function ChecklistPanel({ items: initialItems }: { items: ChecklistItem[] }) {
  const [items, setItems] = useState(initialItems);
  const done = items.filter(i => i.done).length;
  const total = items.length;

  const toggle = (index: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          Launch Checklist
        </h2>
        <span className="font-mono text-sm text-muted-foreground">
          {done}/{total} complete
        </span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(done / total) * 100}%`,
            background: done === total
              ? "hsl(var(--primary))"
              : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
          }}
        />
      </div>
      <div className="space-y-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-secondary/50 ${
              item.done ? "opacity-60" : ""
            }`}
          >
            {item.done ? (
              <CheckSquare className="h-4 w-4 text-primary shrink-0" />
            ) : (
              <Square className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
            <span className={`text-sm text-left ${item.done ? "line-through text-muted-foreground" : ""}`}>
              {item.task}
            </span>
          </button>
        ))}
      </div>
      {done === total && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center animate-slide-in">
          <Rocket className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="font-semibold text-primary">Ready to launch! 🚀</p>
          <p className="text-xs text-muted-foreground mt-1">Your repo is production-ready.</p>
        </div>
      )}
    </div>
  );
}
