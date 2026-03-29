export interface AuditItem {
  label: string;
  status: "pass" | "missing" | "upgrade" | "action";
  detail: string;
}

export interface Risk {
  severity: "high" | "medium" | "low" | "info";
  message: string;
}

export interface GitCommand {
  cmd: string;
  note: string;
}

export interface GitCommands {
  init: GitCommand[];
  stage: GitCommand[];
  commit: GitCommand[];
  push_gh_cli: GitCommand[];
  push_ssh: GitCommand[];
  push_https: GitCommand[];
}

export interface GitHubSetting {
  setting: string;
  path: string;
  actions: string[];
}

export interface ChecklistItem {
  task: string;
  done: boolean;
}

export interface RepoAudit {
  repoName: string;
  description: string;
  techStack: string[];
  visibility: string;
  license: string;
  username: string;
  status: string;
  auditItems: AuditItem[];
  risks: Risk[];
  gitCommands: GitCommands;
  githubSettings: GitHubSetting[];
  filesToGenerate: string[];
  launchChecklist: ChecklistItem[];
}
