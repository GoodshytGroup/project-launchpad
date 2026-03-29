import { AlertTriangle, AlertCircle, Info, AlertOctagon } from "lucide-react";
import type { Risk } from "@/types/repoTypes";

const severityConfig = {
  high: { icon: AlertOctagon, color: "text-destructive", border: "border-destructive/30", bg: "bg-destructive/5" },
  medium: { icon: AlertTriangle, color: "text-warning", border: "border-warning/30", bg: "bg-warning/5" },
  low: { icon: AlertCircle, color: "text-info", border: "border-info/30", bg: "bg-info/5" },
  info: { icon: Info, color: "text-muted-foreground", border: "border-border", bg: "bg-secondary/50" },
};

export function RisksPanel({ risks }: { risks: Risk[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Risks Before Push</h2>
      <div className="space-y-2">
        {risks.map((risk, i) => {
          const config = severityConfig[risk.severity];
          const Icon = config.icon;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${config.border} ${config.bg} animate-slide-in`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} />
              <div className="flex-1">
                <span className="text-sm">{risk.message}</span>
              </div>
              <span className={`text-xs font-mono uppercase ${config.color}`}>
                {risk.severity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
