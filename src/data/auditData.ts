import { AuditItem, DuplicateGroup, VerificationItem, DeadCodeItem, DependencyAudit, ArchitectureLayer } from '../types';

export const PROJECT_METADATA = {
  name: "Dagim Pharmacy Management System",
  shortName: "pharmacy",
  repo: "https://github.com/mejiid/Dagim.git",
  branch: "main",
  headCommit: "0e22dc9",
  auditDate: "2026-09-16",
  scope: "Full repository inspection (tracked + untracked files). No files were modified or deleted during this audit.",
  method: "Entry-point tracing (index.html → src/main.tsx → routes.tsx; electron/main/index.ts → IPC controllers → services → repositories), full import/export/IPC-channel analysis, dependency usage search across electron/, src/, shared/, scripts/, plus review of all configs, CI workflows, docs, and build outputs.",
  stats: {
    totalReclaimableDiskMb: 194.8,
    definitelyUnusedCount: 25,
    probablyUnusedCount: 11,
    verificationItemsCount: 7,
    deadDependenciesCount: 5,
    duplicateCodeGroupsCount: 8,
    brokenConfigsCount: 1,
    cleanAppCodeVerified: true,
  }
};

export const MASTER_AUDIT_ITEMS: AuditItem[] = [
  {
    id: "item-1",
    path: "asar-extract-release/",
    category: "Folder",
    status: "Definitely unused",
    confidence: "High",
    reason: "129.4 MB extracted old build; zero references. Contains ~8,000 files including its own node_modules/dist-electron. Only its package.json is tracked in git; the rest is untracked debris.",
    size: "129.4 MB",
    sizeBytes: 135685734,
    filesCount: 8000,
    isSafeToRemove: true,
    commandBash: "rm -rf asar-extract-release && git rm -f asar-extract-release/package.json 2>/dev/null || true",
    commandPowerShell: "Remove-Item -Recurse -Force asar-extract-release; git rm -f asar-extract-release/package.json"
  },
  {
    id: "item-2",
    path: "asar-extract-temp/",
    category: "Folder",
    status: "Definitely unused",
    confidence: "High",
    reason: "51.3 MB extracted old build (preload/index.js era); 1,796 files; zero references. Only package.json tracked.",
    size: "51.3 MB",
    sizeBytes: 53791948,
    filesCount: 1796,
    isSafeToRemove: true,
    commandBash: "rm -rf asar-extract-temp && git rm -f asar-extract-temp/package.json 2>/dev/null || true",
    commandPowerShell: "Remove-Item -Recurse -Force asar-extract-temp; git rm -f asar-extract-temp/package.json"
  },
  {
    id: "item-3",
    path: "electron-vite-react-debug.gif",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "Template demo screenshot (9.64 MB). Referenced by no file anywhere in markdown or code.",
    size: "9.64 MB",
    sizeBytes: 10108272,
    isSafeToRemove: true,
    commandBash: "rm -f electron-vite-react-debug.gif && git rm -f electron-vite-react-debug.gif 2>/dev/null || true",
    commandPowerShell: "Remove-Item -Force electron-vite-react-debug.gif"
  },
  {
    id: "item-4",
    path: "electron-vite-react.gif",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "Template demo screenshot (3.41 MB). Referenced by no file anywhere.",
    size: "3.41 MB",
    sizeBytes: 3575644,
    isSafeToRemove: true,
    commandBash: "rm -f electron-vite-react.gif && git rm -f electron-vite-react.gif 2>/dev/null || true",
    commandPowerShell: "Remove-Item -Force electron-vite-react.gif"
  },
  {
    id: "item-5",
    path: "src/components/update/",
    category: "Folder",
    status: "Definitely unused",
    confidence: "High",
    reason: "Docs (README.md, README.zh-CN.md) for template's update component components/update/index.tsx which does not exist in this app. Auto-update is handled in electron/main/services/auto-update-service.ts.",
    isSafeToRemove: true,
    commandBash: "rm -rf src/components/update",
    commandPowerShell: "Remove-Item -Recurse -Force src/components/update"
  },
  {
    id: "item-6",
    path: "src/type/electron-updater.d.ts",
    category: "Code",
    status: "Definitely unused",
    confidence: "High",
    reason: "Ambient VersionInfo/ErrorType interfaces — referenced nowhere in the entire repo except itself. Served deleted template component.",
    isSafeToRemove: true,
    commandBash: "rm -f src/type/electron-updater.d.ts",
    commandPowerShell: "Remove-Item -Force src/type/electron-updater.d.ts"
  },
  {
    id: "item-7",
    path: "src/assets/logo-{vite, electron, tailwindcss, v1}.svg, tailwlindcss.svg",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "5 template leftover logos. Only 'dagim logo.png' (Sidebar) and 'dagim logo with name.png' (Login, Sales receipt) are imported.",
    isSafeToRemove: true,
    commandBash: "rm -f src/assets/logo-electron.svg src/assets/logo-tailwindcss.svg src/assets/logo-v1.svg src/assets/logo-vite.svg src/assets/tailwlindcss.svg",
    commandPowerShell: "Remove-Item -Force src/assets/logo-*.svg, src/assets/tailwlindcss.svg"
  },
  {
    id: "item-8",
    path: "src/pages/PlaceholderPage.tsx + routes.tsx:5 import",
    category: "Code",
    status: "Definitely unused",
    confidence: "High",
    reason: "Imported in src/routes.tsx line 5 but never rendered. Every route now points to a real functional page. Dead import + dead file.",
    isSafeToRemove: true,
    commandBash: "rm -f src/pages/PlaceholderPage.tsx",
    commandPowerShell: "Remove-Item -Force src/pages/PlaceholderPage.tsx"
  },
  {
    id: "item-9",
    path: "src/hooks/useConfirmPassword.ts",
    category: "Code",
    status: "Definitely unused",
    confidence: "High",
    reason: "Exported useConfirmPassword() is never imported anywhere. Sensitive actions use PasswordConfirmDialog component instead.",
    isSafeToRemove: true,
    commandBash: "rm -f src/hooks/useConfirmPassword.ts",
    commandPowerShell: "Remove-Item -Force src/hooks/useConfirmPassword.ts"
  },
  {
    id: "item-10",
    path: "electron/main/domain/index.ts",
    category: "Code",
    status: "Definitely unused",
    confidence: "High",
    reason: "Empty stub: '// Domain rules ... will live here in later phases' + 'export {}'. Never imported.",
    isSafeToRemove: true,
    commandBash: "rm -rf electron/main/domain",
    commandPowerShell: "Remove-Item -Recurse -Force electron/main/domain"
  },
  {
    id: "item-11",
    path: "temp_*.py (6 scripts)",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "One-off Python patch scripts (temp_check, temp_create_ico, temp_create_repo, temp_script, temp_update_backup_section, temp_update_index). Already applied.",
    isSafeToRemove: true,
    commandBash: "rm -f temp_*.py",
    commandPowerShell: "Remove-Item -Force temp_*.py"
  },
  {
    id: "item-12",
    path: "tmp_check_price.cjs, tmp_query_dispatcher.py",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "One-off DB debug queries with hardcoded paths (C:/Users/MEJID/...); tmp_check_price.cjs references old app name ('pharmacy-management-system').",
    isSafeToRemove: true,
    commandBash: "rm -f tmp_check_price.cjs tmp_query_dispatcher.py",
    commandPowerShell: "Remove-Item -Force tmp_check_price.cjs, tmp_query_dispatcher.py"
  },
  {
    id: "item-13",
    path: "check-db.cjs, fix_redirect.py, generate-doc.cjs",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "Untracked root-level one-off utilities: DB inspection, patch applied to google-drive-service.ts, and doc generator. None wired in package.json.",
    isSafeToRemove: true,
    commandBash: "rm -f check-db.cjs fix_redirect.py generate-doc.cjs",
    commandPowerShell: "Remove-Item -Force check-db.cjs, fix_redirect.py, generate-doc.cjs"
  },
  {
    id: "item-14",
    path: "tsc-check.txt, task-list.md, report_parts/",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "Scratch file (0 bytes), completed checklist ('Debug EXE installation issue - all [x]'), and 3 markdown fragments of one-time Graphify analysis.",
    isSafeToRemove: true,
    commandBash: "rm -rf tsc-check.txt task-list.md report_parts/",
    commandPowerShell: "Remove-Item -Recurse -Force tsc-check.txt, task-list.md, report_parts"
  },
  {
    id: "item-15",
    path: ".playwright.config.txt, .vite.config.flat.txt",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "Old config snapshots. The vite one imports no-longer-used vite-plugin-electron-renderer.",
    isSafeToRemove: true,
    commandBash: "rm -f .playwright.config.txt .vite.config.flat.txt",
    commandPowerShell: "Remove-Item -Force .playwright.config.txt, .vite.config.flat.txt"
  },
  {
    id: "item-16",
    path: "README.zh-CN.md",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "Pure template readme in Chinese describing electron-vite-react starter (references pnpm test:e2e, src/demos/, components/update).",
    isSafeToRemove: true,
    commandBash: "rm -f README.zh-CN.md",
    commandPowerShell: "Remove-Item -Force README.zh-CN.md"
  },
  {
    id: "item-17",
    path: "public/book.jpg",
    category: "File",
    status: "Definitely unused",
    confidence: "High",
    reason: "140 KB image file not referenced by any code, CSS, or doc. (All other public/ assets like favicon and bank/wallet logos ARE used).",
    size: "140 KB",
    sizeBytes: 143360,
    isSafeToRemove: true,
    commandBash: "rm -f public/book.jpg",
    commandPowerShell: "Remove-Item -Force public/book.jpg"
  },
  {
    id: "item-18",
    path: "test/e2e/e2e.spec.ts",
    category: "Code",
    status: "Definitely unused",
    confidence: "High",
    reason: "Template test asserting non-existent UI: asserts title 'Electron + Vite + React', h1 'A sharp starter...', and counter button. Always fails.",
    isSafeToRemove: true,
    commandBash: "rm -rf test/e2e",
    commandPowerShell: "Remove-Item -Recurse -Force test/e2e"
  },
  {
    id: "item-19",
    path: "docx, @radix-ui/react-tooltip",
    category: "Dependency",
    status: "Definitely unused",
    confidence: "High",
    reason: "Zero imports in electron/, src/, scripts/, shared/. PDF receipts use Chromium printToPDF, not docx. No tooltip component exists.",
    isSafeToRemove: true,
    commandBash: "npm uninstall docx @radix-ui/react-tooltip",
    commandPowerShell: "npm uninstall docx @radix-ui/react-tooltip"
  },
  {
    id: "item-20",
    path: "electron-rebuild, vite-plugin-electron-renderer, @types/bcryptjs",
    category: "DevDependency",
    status: "Definitely unused",
    confidence: "High",
    reason: "Deprecated rebuild tool not in scripts; renderer plugin never imported in vite.config.ts; bcryptjs@3.0.3 ships built-in TypeScript types.",
    isSafeToRemove: true,
    commandBash: "npm uninstall -D electron-rebuild vite-plugin-electron-renderer @types/bcryptjs",
    commandPowerShell: "npm uninstall -D electron-rebuild vite-plugin-electron-renderer @types/bcryptjs"
  },
  {
    id: "item-21",
    path: "tsconfig.json uncommitted change",
    category: "Config",
    status: "Broken",
    confidence: "High",
    reason: "CRITICAL: 'files': [] without references causes npm run typecheck to fail with TS18002: The 'files' list in config file ... is empty. Must be resolved immediately.",
    isSafeToRemove: false,
    recommendation: "Revert 'files': [] or configure proper TypeScript project references"
  },
  {
    id: "item-22",
    path: "tsconfig.node.json",
    category: "Config",
    status: "Probably unused",
    confidence: "Medium",
    reason: "Orphaned config: tsconfig.json has no references and no script uses -p tsconfig.node.json. Its electron/ include list is never typechecked.",
    isSafeToRemove: false,
    recommendation: "Wire it via project references to enable electron typechecking, or delete if single-root tsconfig is adopted."
  },
  {
    id: "item-23",
    path: "playwright.config.ts + @playwright/test",
    category: "Config",
    status: "Probably unused",
    confidence: "Medium",
    reason: "No 'test:e2e' npm script exists; the only consumer is the stale template e2e spec. Remove only if e2e testing is deferred.",
    isSafeToRemove: false,
    recommendation: "Keep if real E2E tests are planned; otherwise uninstall @playwright/test."
  },
  {
    id: "item-24",
    path: "test/index.test.ts",
    category: "Code",
    status: "Probably unused",
    confidence: "Medium",
    reason: "Trivial smoke test (1+1=2, NODE_ENV check). Runs on npm test, but tests no pharmacy application code.",
    isSafeToRemove: false,
    recommendation: "Keep as scaffold for real unit tests or replace with domain test suites."
  },
  {
    id: "item-25",
    path: ".vscode/tasks.json",
    category: "Config",
    status: "Probably unused",
    confidence: "Medium",
    reason: "References .vscode/.debug.script.mjs which does not exist (template's debug helper). 'Before Debug' task fails.",
    isSafeToRemove: false,
    recommendation: "Remove defunct task reference or recreate debug script."
  },
  {
    id: "item-26",
    path: ".github/workflows/{ci, pr-guard}.yml",
    category: "Config",
    status: "Probably unused",
    confidence: "Medium",
    reason: "Untailored template workflows (pr-guard text references electron-vite-vue issue #192; ci.yml only lints markdown).",
    isSafeToRemove: false,
    recommendation: "Replace with customized CI workflow running npm run build and npm run typecheck."
  },
  {
    id: "item-27",
    path: ".npmrc (shamefully-hoist=true)",
    category: "Config",
    status: "Probably unused",
    confidence: "Medium",
    reason: "pnpm-only configuration line. Under standard npm, prints 'Unknown project config' warning. Inert.",
    isSafeToRemove: true,
    commandBash: "sed -i '/shamefully-hoist/d' .npmrc 2>/dev/null || true",
    commandPowerShell: "Get-Content .npmrc | Where-Object { $_ -notmatch 'shamefully-hoist' } | Set-Content .npmrc"
  },
  {
    id: "item-28",
    path: "vitest.config.ts exclude line",
    category: "Config",
    status: "Probably unused",
    confidence: "Medium",
    reason: "Excludes 'test/e2e.spec.ts' which does not exist (actual path is test/e2e/e2e.spec.ts). Stale line.",
    isSafeToRemove: false,
    recommendation: "Fix path or remove line."
  },
  {
    id: "item-29",
    path: "0013_add_destination_column.sql",
    category: "File",
    status: "Needs verification",
    confidence: "Medium",
    reason: "Not registered in drizzle meta/_journal.json (journal stops at 0012). Destination column is actually handled at runtime by ensureDestinationColumn() in migrate.ts:56.",
    isSafeToRemove: false,
    recommendation: "Safe to delete ONLY if ensureDestinationColumn() remains active and no external runner expects this file."
  },
  {
    id: "item-30",
    path: ".env / .env.example GOOGLE_DRIVE_*",
    category: "Config",
    status: "Needs verification",
    confidence: "High",
    reason: "Dead config: Code reads Drive credentials exclusively from SQLite DB (settingsRepository), never from process.env. Contains real secret in plaintext on disk!",
    isSafeToRemove: false,
    recommendation: "Rotate compromised secret, delete unused vars from .env and .env.example, and correct DEPLOYMENT.md."
  },
  {
    id: "item-31",
    path: ".neon, skills-lock.json, .agents/",
    category: "Tooling",
    status: "Needs verification",
    confidence: "Medium",
    reason: "Neon Postgres agent skills in an SQLite application. Residue from AI tooling setup.",
    isSafeToRemove: false,
    recommendation: "Confirm no external agent relies on them, then remove."
  },
  {
    id: "item-32",
    path: "components.json",
    category: "Config",
    status: "Keep",
    confidence: "High",
    reason: "shadcn CLI config. Only needed if adding UI components via npx shadcn add. Safe to keep.",
    isSafeToRemove: false
  },
  {
    id: "item-33",
    path: "mobile app/, .kiro/, docs/, pharmacy/",
    category: "Docs",
    status: "Review",
    confidence: "Medium",
    reason: "Heavy documentation overlap across multiple folders (DOCUMENTATION.md 33.5KB, DATABASE_DOCUMENTATION.md 33.4KB, COMPLETE_SYSTEM_DOCUMENTATION.md 30KB). Mobile app folder holds future roadmap.",
    isSafeToRemove: false,
    recommendation: "Consolidate into single canonical docs/ folder."
  },
  {
    id: "item-34",
    path: "DOCUMENTATION.doc",
    category: "File",
    status: "Review",
    confidence: "High",
    reason: "Generated HTML artifact saved as .doc checked into git. Can be regenerated anytime via generate-doc.cjs.",
    isSafeToRemove: false,
    recommendation: "Untrack from git and add to .gitignore."
  },
  {
    id: "item-35",
    path: "scripts/cleanup-* and migrate-destination-column",
    category: "File",
    status: "Review",
    confidence: "High",
    reason: "Duplicate language pairs (.cjs, .ts, .py). For example, cleanup-duplicate-medicines in both .cjs and .ts.",
    isSafeToRemove: false,
    recommendation: "Keep the .cjs versions, remove redundant .py and .ts versions."
  },
  {
    id: "item-36",
    path: "All electron/, src/, shared/ application code",
    category: "Code",
    status: "Keep",
    confidence: "High",
    reason: "Traced and confirmed: All 20 IPC controllers, 14 schema tables, sync services, reports, pages, and components are fully imported, registered, and active!",
    isSafeToRemove: false
  }
];

export const DUPLICATE_GROUPS: DuplicateGroup[] = [
  {
    id: 1,
    title: "Duplicate Medicine Cleanup Scripts",
    description: "Identical logic implemented in two different languages: CommonJS and TypeScript. The TypeScript variant requires npx tsx which is not in devDependencies.",
    files: ["scripts/cleanup-duplicate-medicines.cjs", "scripts/cleanup-duplicate-medicines.ts"],
    recommendation: "Keep scripts/cleanup-duplicate-medicines.cjs and delete the .ts variant."
  },
  {
    id: 2,
    title: "Medicine Inventory Cleanup Scripts",
    description: "The same 'Option A' cleanup logic written in both Node.js and Python.",
    files: ["scripts/cleanup-medicines.cjs", "scripts/cleanup-medicines.py"],
    recommendation: "Keep cleanup-medicines.cjs to stay within the JavaScript/Node ecosystem; remove the Python script."
  },
  {
    id: 3,
    title: "Destination Column Migration Scripts",
    description: "One-off ALTER TABLE scripts in CommonJS and Python. Both are completely superseded by ensureDestinationColumn() in electron/main/db/migrate.ts.",
    files: ["scripts/migrate-destination-column.cjs", "scripts/migrate-destination-column.py"],
    recommendation: "Both scripts can be deleted since runtime auto-migration handles the column automatically."
  },
  {
    id: 4,
    title: "App Icon Generators",
    description: "Both scripts generate build/icon.ico from icon.png. Only generate-icons.js is wired into npm run generate-icons.",
    files: ["temp_create_ico.py", "scripts/generate-icons.js"],
    recommendation: "Delete temp_create_ico.py; maintain scripts/generate-icons.js."
  },
  {
    id: 5,
    title: "Database Inspection & Diagnosis Tools",
    description: "Three overlapping diagnostic tools that perform similar database queries and integrity checks.",
    files: ["check-db.cjs (root)", "scripts/check-all-databases.py", "scripts/diagnose-stock-issue.cjs"],
    recommendation: "Consolidate into scripts/diagnose-stock-issue.cjs; remove check-db.cjs from root."
  },
  {
    id: 6,
    title: "Payment Label Maps & Provider Constants (3x Duplication)",
    description: "Payment label dictionaries and hardcoded lists of BANK_PROVIDERS and WALLET_PROVIDERS duplicated across 3 separate view components.",
    files: ["src/pages/SalesPage.tsx:48-51", "src/components/dashboard/PaymentDonutChart.tsx:15-19", "src/pages/ReportsPage.tsx:32-36"],
    recommendation: "Extract into shared/constants/payments.ts or src/config/payments.ts."
  },
  {
    id: 7,
    title: "Overlapping Documentation Suites",
    description: "Three massive overlapping docs (~33KB each) explaining the same architecture, database schemas, and endpoints.",
    files: ["DOCUMENTATION.md", "DATABASE_DOCUMENTATION.md", "docs/COMPLETE_SYSTEM_DOCUMENTATION.md", "pharmacy/ vs mobile app/"],
    recommendation: "Retain docs/COMPLETE_SYSTEM_DOCUMENTATION.md as canonical; archive or remove the root markdown copies."
  },
  {
    id: 8,
    title: "Extracted Asar Package Manifests",
    description: "Old package.json snapshots from previous builds tracked in git under extracted directories.",
    files: ["asar-extract-release/package.json", "asar-extract-temp/package.json"],
    recommendation: "Untrack and delete both asar-extract directories entirely."
  }
];

export const VERIFICATION_ITEMS: VerificationItem[] = [
  {
    id: 1,
    item: "electron/main/db/migrations/0013_add_destination_column.sql",
    question: "Is this migration file needed if drizzle meta/_journal.json does not track it?",
    impact: "Medium",
    action: "Safe to remove only if ensureDestinationColumn() remains active in migrate.ts:56 and no external automated CI script runs raw SQL migration files."
  },
  {
    id: 2,
    item: "Missing Drizzle Snapshots in meta/",
    question: "Snapshots only exist for 0000–0008 and 0011; 0009, 0010, 0012, 0013 lack snapshots. Will future drizzle-kit generate fail?",
    impact: "Medium",
    action: "Hygiene notice: Next time drizzle-kit generate is run, review generated diffs carefully against the live SQLite schema."
  },
  {
    id: 3,
    item: ".env Google Drive Client Credentials (Dead Config + Plaintext Secret)",
    question: "Why are GOOGLE_DRIVE_CLIENT_ID and SECRET in .env if code never reads process.env?",
    impact: "High",
    action: "Code in google-drive-service.ts loads credentials directly from SQLite settings table. The .env variables are ignored. Rotate the plaintext secret immediately and remove from .env and .env.example."
  },
  {
    id: 4,
    item: ".neon, skills-lock.json, .agents/skills/*",
    question: "Why are Neon Postgres AI-agent skills in a local SQLite application?",
    impact: "Low",
    action: "Verify with the development team if any automated AI coding agent uses these skills; otherwise delete them."
  },
  {
    id: 5,
    item: ".kiro/ Specs (Phases 3–5)",
    question: "Are planning documents for already-completed phases required in git?",
    impact: "Low",
    action: "Features are already implemented in code. Archive to a wiki or developer docs folder, or delete."
  },
  {
    id: 6,
    item: "components.json (shadcn CLI)",
    question: "Is components.json necessary if components are already generated?",
    impact: "Low",
    action: "Harmless to keep. Useful if team runs 'npx shadcn add <component>' in the future."
  },
  {
    id: 7,
    item: "public/logo/Banks/Nib INternational Bank.png (Typo match)",
    question: "The filename has a typo 'INternational', but SalesPage.tsx:64 references the exact typo. Should it be renamed?",
    impact: "Medium",
    action: "Do NOT rename the file on disk without simultaneously updating SalesPage.tsx:64."
  }
];

export const DEAD_CODE_ITEMS: DeadCodeItem[] = [
  {
    id: 1,
    title: "Broken tsconfig.json State (TS18002)",
    location: "tsconfig.json",
    description: "An uncommitted change introduces 'files': [] without 'references', causing 'npm run typecheck' to immediately crash with TS18002.",
    severity: "Critical"
  },
  {
    id: 2,
    title: "Dead Import of PlaceholderPage",
    location: "src/routes.tsx:5",
    description: "import { PlaceholderPage } from './pages/PlaceholderPage'; is present, but every route now renders a production page. Dead file + dead import.",
    severity: "Moderate"
  },
  {
    id: 3,
    title: "Debug File Write Shipped to Production",
    location: "electron/main/index.ts:103-109",
    description: "Writes preload-resolved.txt into userData and console.logs the path on every single app startup. Pure debug code.",
    severity: "Moderate"
  },
  {
    id: 4,
    title: "Template E2E Tests Asserting Non-Existent UI",
    location: "test/e2e/e2e.spec.ts",
    description: "Asserts starter template elements ('A sharp starter...', counter button, template title) that do not exist in Dagim Pharmacy.",
    severity: "Moderate"
  },
  {
    id: 5,
    title: "Vitest Config Stale Exclude Path",
    location: "vitest.config.ts:7",
    description: "Config excludes 'test/e2e.spec.ts', but the actual file path is 'test/e2e/e2e.spec.ts'.",
    severity: "Low"
  },
  {
    id: 6,
    title: "Unused Custom Hook",
    location: "src/hooks/useConfirmPassword.ts",
    description: "useConfirmPassword() hook is exported but never imported anywhere. Sensitive workflows use PasswordConfirmDialog component.",
    severity: "Moderate"
  },
  {
    id: 7,
    title: "Empty Domain Layer Stub",
    location: "electron/main/domain/index.ts",
    description: "File contains only '// Domain rules ... will live here in later phases' and 'export {}'. Never imported.",
    severity: "Low"
  },
  {
    id: 8,
    title: "Documentation Credential Drift",
    location: "README.md vs electron/main/db/seed.ts",
    description: "seed.ts creates default user credentials (mejid / iconscot), while README.md states mejid / mejid@1234.",
    severity: "Moderate"
  },
  {
    id: 9,
    title: "Dead VSCODE_DEBUG Branch",
    location: "vite.config.ts:63 and electron/electron-env.d.ts",
    description: "VSCODE_DEBUG environment variable branch is no longer configured or toggled anywhere in launch configs.",
    severity: "Low"
  }
];

export const DEPENDENCY_AUDIT_LIST: DependencyAudit[] = [
  {
    name: "docx",
    type: "Dependency",
    status: "Unused",
    evidence: "Zero imports or requires anywhere in electron/, src/, scripts/, or shared/. PDF receipt generation uses Chromium's native printToPDF in pdf-service.",
    recommendation: "Uninstall immediately: npm uninstall docx"
  },
  {
    name: "@radix-ui/react-tooltip",
    type: "Dependency",
    status: "Unused",
    evidence: "No import in any source file. No tooltip UI component exists in src/components/ui.",
    recommendation: "Uninstall immediately: npm uninstall @radix-ui/react-tooltip"
  },
  {
    name: "electron-rebuild",
    type: "DevDependency",
    status: "Unused",
    evidence: "Deprecated package. Not used by any package.json script. postinstall utilizes 'electron-builder install-app-deps'.",
    recommendation: "Uninstall: npm uninstall -D electron-rebuild"
  },
  {
    name: "vite-plugin-electron-renderer",
    type: "DevDependency",
    status: "Unused",
    evidence: "Not imported in vite.config.ts. Only referenced inside the stale .vite.config.flat.txt template snapshot.",
    recommendation: "Uninstall: npm uninstall -D vite-plugin-electron-renderer"
  },
  {
    name: "@types/bcryptjs",
    type: "DevDependency",
    status: "Redundant",
    evidence: "bcryptjs@3.0.3 ships its own TypeScript typings (umd/index.d.ts verified in package.json).",
    recommendation: "Uninstall redundant types: npm uninstall -D @types/bcryptjs"
  },
  {
    name: "better-sqlite3 & drizzle-orm",
    type: "Dependency",
    status: "Confirmed Used",
    evidence: "Primary database engine: 14 schemas, migrations, seed, repository layers.",
    recommendation: "Keep"
  },
  {
    name: "googleapis",
    type: "Dependency",
    status: "Confirmed Used",
    evidence: "Used for Google Drive automated database backup in google-drive-service.ts.",
    recommendation: "Keep"
  },
  {
    name: "electron-updater",
    type: "Dependency",
    status: "Confirmed Used",
    evidence: "Used in auto-update-service.ts to handle desktop app updates.",
    recommendation: "Keep"
  },
  {
    name: "react & react-dom (in devDependencies)",
    type: "DevDependency",
    status: "Confirmed Used",
    evidence: "Vite bundles renderer code into static assets; only main process dependencies are packaged in electron asar.",
    recommendation: "Keep (correct architecture for Vite + Electron)"
  }
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "renderer",
    title: "1. Renderer Process (React 19 + Vite)",
    entry: "index.html ──► src/main.tsx ──► src/App.tsx ──► src/routes.tsx",
    items: [
      { name: "Dashboard", path: "src/pages/Dashboard.tsx", status: "Active" },
      { name: "Sales & POS", path: "src/pages/SalesPage.tsx", status: "Active" },
      { name: "Store Operations", path: "src/pages/StorePage.tsx", status: "Active" },
      { name: "Dispatcher", path: "src/pages/DispatcherPage.tsx", status: "Active" },
      { name: "Medicines Catalog", path: "src/pages/MedicinesPage.tsx", status: "Active" },
      { name: "Prescription Book", path: "src/pages/PrescriptionRegistrationPage.tsx", status: "Active" },
      { name: "Reports & Analytics", path: "src/pages/ReportsPage.tsx", status: "Active" },
      { name: "Audit Logs", path: "src/pages/AuditLogsPage.tsx", status: "Active" },
      { name: "Settings", path: "src/pages/SettingsPage.tsx", status: "Active" },
      { name: "PlaceholderPage", path: "src/pages/PlaceholderPage.tsx", status: "Orphaned", alert: "Imported in routes.tsx:5, never rendered!" }
    ]
  },
  {
    id: "preload",
    title: "2. IPC & Preload Bridge",
    entry: "electron/preload/index.cjs ──► window.pharmacyApi",
    items: [
      { name: "IPC Bridge", path: "electron/preload/index.cjs", status: "Active", note: "Mirrors all 20 controller groups through contextBridge" },
      { name: "Hook Layer", path: "src/hooks/usePharmacyApi.ts", status: "Active", note: "Provides typed React hooks for IPC invocations" },
      { name: "useConfirmPassword", path: "src/hooks/useConfirmPassword.ts", status: "Orphaned", alert: "Never imported anywhere in the UI" }
    ]
  },
  {
    id: "main",
    title: "3. Main Process Engine (Electron 33)",
    entry: "electron/main/index.ts",
    items: [
      { name: "Database Migrations", path: "electron/main/db/migrate.ts", status: "Active", note: "Runs Drizzle migrations + ensureDestinationColumn()" },
      { name: "IPC Handlers", path: "electron/main/ipc/register-handlers.ts", status: "Active", note: "Registers 20 IPC controllers" },
      { name: "Sync Engine", path: "electron/main/sync/index.ts", status: "Active", note: "Background sync worker, status tracker, conflict resolver" },
      { name: "Auto Update Service", path: "electron/main/services/auto-update-service.ts", status: "Active", note: "electron-updater integration" },
      { name: "Google Drive Backup", path: "electron/main/services/google-drive-service.ts", status: "Active", note: "DB-stored credentials OAuth backup" },
      { name: "Domain Stub", path: "electron/main/domain/index.ts", status: "Orphaned", alert: "Empty stub; never imported" }
    ]
  },
  {
    id: "db",
    title: "4. Database & Storage Layer",
    entry: "better-sqlite3 + Drizzle ORM",
    items: [
      { name: "14 Schema Files", path: "electron/main/db/schema/*.ts", status: "Active", note: "All 14 tables actively used and re-exported" },
      { name: "Repositories", path: "electron/main/repositories/*.ts", status: "Active", note: "Clean data access layer" },
      { name: "0013 Migration SQL", path: "electron/main/db/migrations/0013_*.sql", status: "Untracked in Journal", alert: "Missing from meta/_journal.json; column handled by migrate.ts" }
    ]
  }
];
