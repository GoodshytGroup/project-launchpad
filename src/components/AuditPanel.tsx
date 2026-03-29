import { CheckCircle2, XCircle, AlertTriangle, ArrowUpCircle } from "lucide-react";
import type { AuditItem } from "@/types/repoTypes";

const statusConfig = {
  pass: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Pass" },
  missing: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Missing" },
  upgrade: { icon: ArrowUpCircle, color: "text-warning", bg: "bg-warning/10", label: "Upgrade" },
  action: { icon: AlertTriangle, color: "text-info", bg: "bg-info/10", label: "Action" },
};

export function AuditPanel({ items }: { items: AuditItem[] }) {
  const passed = items.filter(i => i.status === "pass").length;
  const total = items.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Repository Audit</h2>
        <span className="font-mono text-sm text-muted-foreground">
          {passed}/{total} passing
        </span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(passed / total) * 100}%` }}
        />
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-secondary/50 transition-colors group"
            >
              <div className={`p-1 rounded ${config.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
              </div>
              <span className="font-mono text-sm flex-1">{item.label}</span>
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity max-w-[200px] truncate">
                {item.detail}
              </span>
              <span className={`text-xs font-mono ${config.color}`}>
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
