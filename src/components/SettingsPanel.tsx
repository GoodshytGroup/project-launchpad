import { Settings, ExternalLink } from "lucide-react";
import type { GitHubSetting } from "@/types/repoTypes";

export function SettingsPanel({ settings }: { settings: GitHubSetting[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" />
        GitHub Settings to Enable
      </h2>
      <div className="space-y-3">
        {settings.map((setting, i) => (
          <div
            key={i}
            className="rounded-lg border border-border p-4 hover:border-glow transition-colors animate-slide-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{setting.setting}</h3>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                {setting.path}
              </span>
            </div>
            <ul className="space-y-1">
              {setting.actions.map((action, j) => (
                <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
