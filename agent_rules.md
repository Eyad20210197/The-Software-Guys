# Agent Rules & Verification Protocols
## The Software Guys - SaaS Portfolio Platform

Welcome, Agent! You are working on the production-grade, bilingual SaaS portfolio platform and admin dashboard for **The Software Guys**. 

As part of this team, you must function as a high-caliber production engineer. Prototype code or lazy placeholders are strictly prohibited. You are expected to deliver robust, secure, and fully verified output.

Below are the mandatory protocols and guidelines you **must** follow.

---

## 🎯 1. THE CODE REVIEW & TASK LIFECYCLE (AGILE WORKFLOW)

We operate under a strict review lifecycle. You do not have permission to mark items as complete (`[x]`) in `task.md` on your own. 

### Step-by-Step Task Lifecycle:
1. **Acknowledge and Select:** Declare which phase/sub-tasks from `task.md` you are working on, and update their status to `[/]` (in-progress).
2. **Implement:** Execute the code following the SOLID, Clean Architecture, and STRIDE guidelines.
3. **Self-Verify & Test:** Verify your work locally (linting, automated tests, types checking).
4. **Deliver to Master Agent:** Present a comprehensive walkthrough of your implementation, listing all created/modified files, architectural decisions, and testing results to **Antigravity (the Master Agent)**.
5. **Master Review:** Antigravity will thoroughly review your code, verify it against the Stitch designs, run tests, and check architectural compliance.
6. **User Review:** Once Antigravity approves, the code is presented to the **USER** for final validation.
7. **Double Acceptance:** When **both** Antigravity and the USER accept the work:
   - The sub-task is officially marked `[x]` (done) in `task.md`.
   - The next item/phase is unlocked.

---

## 🎨 2. STRICT UI/UX & STITCH RULES (IMMUTABLE)

The UI/UX is fully designed in Stitch (`ID: 7307430621799602901`). It is final and **IMMUTABLE**.

* **No Redesigns:** Do not change layouts, spacing, color palettes, or responsiveness rules.
* **Pixel Perfection:** Every border (`border-[3px] border-[#1A1C1C]`), color token (`#003EC7`, `#FEFFB0`, `#1A1C1C`), and solid offset shadow (`shadow-[6px_6px_0px_0px_#1A1C1C]`) must match the design system exactly.
* **Typography:** Bold uppercase headings with tight tracking (`tracking-tighter`, `letter-spacing: -0.04em`) and narrow line heights.
* **Agreed Roundness:** Keep sharp corners for main public branding elements (Hero, Bento sections) and soft standard corners (`rounded-md`/`rounded-lg` for cards, buttons, and inputs) as defined in the layout specifications.
* **No Placeholders:** Real assets only. Use high-fidelity assets, SVGs, or generated artwork. Never use mock boxes or `TODO` text.

---

## 🏗️ 3. ARCHITECTURE & CODING STANDARDS

### Clean Architecture & SOLID Principles
* Keep business logic entirely separated from framework delivery layers (NestJS controllers vs. Core Domain use cases).
* Use Dependency Inversion (inject repositories, interfaces, and shared types).
* Adhere to Single Responsibility: each module, service, and hook must handle exactly one domain concern.

### Bilingual (i18n) & RTL Rules
* All visual spacing, layouts, and containers must support both English (LTR) and Arabic (RTL).
* **Always** use logical Tailwind attributes (e.g., `ps-*` instead of `pl-*`, `pe-*` instead of `pr-*`, `text-start`/`text-end`) to allow dynamic swapping of layouts when `dir` changes.

### STRIDE & OWASP Security Focus
* **Spoofing:** Implement secure JWT validation and HTTP-only cookie-based NextAuth.js tokens.
* **Tampering:** Use rigid NestJS class-validator pipes with `whitelist: true` to prevent raw object pollution.
* **Repudiation:** Log form submissions and audit administrator actions.
* **Information Leak:** Secure all credentials (`DATABASE_URL`, NextAuth secrets) in `.env` variables; never log sensitive data.
* **Denial of Service:** Ensure rate-limiting modules (`nestjs-throttler`) are configured on public routes.
* **Elevation of Privilege:** Restrict dashboard endpoints via roleguards verifying claims on authorization headers.

---

## 🔬 4. DELIVERY CHECKLIST FOR AGENTS

When you complete your assigned sub-task/phase, you **must** supply:
1. **Summary of Changes:** A clear, concise log of what files were added or modified.
2. **Architectural Rationale:** Why did you structure the code this way?
3. **Verification and Testing Proof:**
   - Proof that type checks passed (`tsc --noEmit`).
   - Proof that linter checks passed (`npm run lint`).
   - Proof of successful compilation/build (`npm run build`).
4. **Stitch Blueprint Match Check:** Confirmation that colors, shadows, and paddings align 100% with the Stitch project workspace specifications.
