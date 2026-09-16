export type Status = 'Definitely unused' | 'Probably unused' | 'Needs verification' | 'Broken' | 'Keep' | 'Review';
export type Confidence = 'High' | 'Medium' | 'Low';
export type Category = 'Folder' | 'File' | 'Code' | 'Dependency' | 'DevDependency' | 'Config' | 'Tooling' | 'Docs';

export interface AuditItem {
  id: string;
  path: string;
  category: Category;
  status: Status;
  confidence: Confidence;
  reason: string;
  size?: string;
  sizeBytes?: number;
  filesCount?: number;
  recommendation?: string;
  commandBash?: string;
  commandPowerShell?: string;
  sectionRef?: number;
  details?: string;
  isSafeToRemove?: boolean;
}

export interface DuplicateGroup {
  id: number;
  title: string;
  description: string;
  files: string[];
  recommendation: string;
}

export interface VerificationItem {
  id: number;
  item: string;
  question: string;
  impact: 'High' | 'Medium' | 'Low';
  action: string;
}

export interface DeadCodeItem {
  id: number;
  title: string;
  location: string;
  description: string;
  severity: 'Critical' | 'Moderate' | 'Low';
}

export interface DependencyAudit {
  name: string;
  type: 'Dependency' | 'DevDependency';
  status: 'Unused' | 'Redundant' | 'Confirmed Used';
  evidence: string;
  recommendation: string;
}

export interface ArchitectureItem {
  name: string;
  path: string;
  status: string;
  note?: string;
  alert?: string;
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  entry: string;
  items: ArchitectureItem[];
}

