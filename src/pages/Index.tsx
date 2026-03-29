import { useState } from "react";
import { GitBranch, Shield, FileCode, Terminal, Settings, Rocket, AlertTriangle, ChevronRight } from "lucide-react";
import { octatouchAudit } from "@/data/octatouchAudit";
import { AuditPanel } from "@/components/AuditPanel";
import { RisksPanel } from "@/components/RisksPanel";
import { CommandsPanel } from "@/components/CommandsPanel";
import { FilesPanel } from "@/components/FilesPanel";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ChecklistPanel } from "@/components/ChecklistPanel";

type Section = "audit" | "risks" | "commands" | "files" | "settings" | "checklist";

const sections: { key: Section; label: string; icon: typeof GitBranch }[] = [
  { key: "audit", label: "Audit", icon: GitBranch },
  { key: "risks", label: "Risks", icon: AlertTriangle },
  { key: "commands", label: "Commands", icon: Terminal },
  { key: "files", label: "Files", icon: FileCode },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "checklist", label: "Checklist", icon: Rocket },
];

const Index = () => {
  const [active, setActive] = useState<Section>("audit");
  const audit = octatouchAudit;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-primary">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                Repo<span className="text-gradient-primary">Launch</span>
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                GitHub repository launch copilot
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              {audit.repoName}
            </div>
          </div>
        </div>
      </header>

      {/* Repo info bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded">{audit.visibility}</span>
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded">{audit.license}</span>
            {audit.techStack.map(t => (
              <span key={t} className="bg-accent/10 text-accent px-2 py-1 rounded">{t}</span>
            ))}
            <span className="text-muted-foreground ml-auto hidden sm:inline">
              @{audit.username}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{audit.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-border bg-background sticky top-[73px] z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-1 scrollbar-hide">
            {sections.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                  active === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl">
          {active === "audit" && <AuditPanel items={audit.auditItems} />}
          {active === "risks" && <RisksPanel risks={audit.risks} />}
          {active === "commands" && <CommandsPanel commands={audit.gitCommands} />}
          {active === "files" && <FilesPanel />}
          {active === "settings" && <SettingsPanel settings={audit.githubSettings} />}
          {active === "checklist" && <ChecklistPanel items={audit.launchChecklist} />}
        </div>

        {/* Quick nav footer */}
        {active !== "checklist" && (
          <div className="max-w-3xl mt-8">
            <button
              onClick={() => {
                const idx = sections.findIndex(s => s.key === active);
                if (idx < sections.length - 1) setActive(sections[idx + 1].key);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border hover:border-glow bg-card hover:bg-secondary/50 transition-all group"
            >
              <span className="text-sm text-muted-foreground">Next step</span>
              <span className="flex items-center gap-2 text-sm font-medium group-hover:text-primary transition-colors">
                {sections[sections.findIndex(s => s.key === active) + 1]?.label}
                <ChevronRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
