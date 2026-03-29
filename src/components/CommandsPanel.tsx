import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import type { GitCommands } from "@/types/repoTypes";

type PushMethod = "gh_cli" | "ssh" | "https";

const tabs: { key: PushMethod; label: string }[] = [
  { key: "gh_cli", label: "GitHub CLI" },
  { key: "ssh", label: "SSH" },
  { key: "https", label: "HTTPS" },
];

export function CommandsPanel({ commands }: { commands: GitCommands }) {
  const [method, setMethod] = useState<PushMethod>("gh_cli");
  const [copied, setCopied] = useState<string | null>(null);

  const allCommands = [
    ...commands.init,
    ...commands.stage,
    ...commands.commit,
    ...(method === "gh_cli" ? commands.push_gh_cli : method === "ssh" ? commands.push_ssh : commands.push_https),
  ];

  const copyAll = () => {
    const text = allCommands.map(c => c.cmd).join("\n");
    navigator.clipboard.writeText(text);
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyOne = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          Git Commands
        </h2>
        <button
          onClick={copyAll}
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          {copied === "all" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied === "all" ? "Copied!" : "Copy all"}
        </button>
      </div>

      <div className="flex gap-1 p-1 bg-secondary rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMethod(tab.key)}
            className={`flex-1 text-xs font-mono py-1.5 rounded-md transition-all ${
              method === tab.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">terminal</span>
        </div>
        <div className="p-4 space-y-1">
          {allCommands.map((item, i) => (
            <div key={i} className="group flex items-start gap-2">
              <span className="text-primary font-mono text-sm select-none shrink-0">$</span>
              <code className="text-sm font-mono flex-1 text-foreground/90">{item.cmd}</code>
              <button
                onClick={() => copyOne(item.cmd)}
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              >
                {copied === item.cmd ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <Copy className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                )}
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-primary font-mono text-sm select-none">$</span>
            <span className="w-2 h-4 bg-primary animate-terminal-blink" />
          </div>
        </div>
      </div>
    </div>
  );
}
