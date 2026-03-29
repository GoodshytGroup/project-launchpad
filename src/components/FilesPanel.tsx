import { useState } from "react";
import { FileText, ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import { generatedFiles } from "@/data/generatedFiles";

export function FilesPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyFile = (name: string) => {
    navigator.clipboard.writeText(generatedFiles[name]);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Generated Files</h2>
      <div className="space-y-1">
        {Object.keys(generatedFiles).map((name) => (
          <div key={name} className="rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === name ? null : name)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
            >
              {expanded === name ? (
                <ChevronDown className="h-4 w-4 text-primary" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <FileText className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm flex-1 text-left">{name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyFile(name);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied === name ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </button>
            {expanded === name && (
              <div className="border-t border-border bg-card">
                <pre className="p-4 text-xs font-mono text-foreground/80 overflow-x-auto max-h-[400px] overflow-y-auto">
                  {generatedFiles[name]}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
