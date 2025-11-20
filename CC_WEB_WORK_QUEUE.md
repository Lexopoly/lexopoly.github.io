# CC-WEB Work Queue

**Last Updated**: 2025-11-19 23:30
**Current Sprint**: Week 1-2 (Nov 19 - Dec 1, 2025)
**Agent**: CC-WEB (Federation Marketing Agent)
**Managed Sites**: lexopoly.com, cyclecore.ai, slmbench.com, mcpbodega.com

---

## How to Use This Queue

**For User (CC-FCO)**:
- Update priorities daily (~5-10 min)
- Add new tasks as they arise
- Move completed tasks to archive at end of sprint

**For CC-WEB**:
- Check this file at session start
- Work top-down through priorities (P0 → P1 → P2 → P3)
- Post progress to Super Bus
- Ask user if priorities unclear or blockers encountered

**For Product Agents**:
- Post CONTENT_READY_FOR_PUBLICATION to Super Bus when content ready
- User will add to this queue with appropriate priority

---

## P0 - CRITICAL (Do Immediately)

- [ ] **CycleCore.ai**: Deploy product pages + transparency fixes to production (1-2h) - WAITING: User approval
  - Status: Complete (Nov 18), staged, ready to push live
  - Files: Product pages (CycleSum, MCPBodega), hosting disclosure, verification claims
  - Action: Deploy to cyclecore.ai production

---

## P1 - HIGH (This Week: Nov 19-24)

- [ ] **SLMBench**: Porkbun DNS configuration for slmbench.com (1-2h)
  - Dependency: Porkbun account access
  - Action: Configure DNS to point to DigitalOcean hosting

- [ ] **SLMBench**: DigitalOcean hosting setup + deploy slmbench.com (2-3h)
  - Dependency: Porkbun DNS complete
  - Action: Set up static hosting, deploy website HTML/CSS
  - Reference: FC_INQ_011 (SLM-Bench branding approved)

- [ ] **SLMBench**: Create product page on cyclecore.ai/slmbench (4-6h)
  - Dependency: CC-SLM provides content sections
  - Action: Integrate into cyclecore.ai template, add CTA buttons, SEO

- [ ] **SLMBench**: Update branding (EdgeBench → SLM-Bench) in website copy (2-3h)
  - Reference: FCO_INQ_011 Part B (primary brand is "SLM-Bench")
  - Action: Global find/replace in website HTML, meta descriptions
  - Preserve: EdgeJSON, EdgeIntent, EdgeFuncCall as technical test names

- [ ] **MCPBodega**: Review content brief, confirm handoff details with CC-MCP (1h)
  - Reference: `/home/rain/MCPBodega/docs/CC_WEB_CONTENT_BRIEF.md`
  - Action: Understand scope, timeline (Dec 8 launch), dependencies

---

## P2 - MEDIUM (Week 2-3: Nov 25 - Dec 8)

### MCPBodega Launch (Target: Dec 8, 2025)

**Total Estimated: 56-79 hours** (Week 2-3 heavy workload)

**Website Development**:
- [ ] Landing page HTML/CSS (8-12h) - WAITING: CC-MCP staging access
- [ ] Pricing page HTML/CSS (4-6h) - WAITING: CC-MCP screenshots
- [ ] Domain setup (mcpbodega.com) via Porkbun (2-3h)
- [ ] DigitalOcean deployment (3-4h)

**Documentation** (Markdown):
- [ ] Getting Started guide (3-4h) - WAITING: CC-MCP documentation
- [ ] First MCP tutorial (4-5h)
- [ ] 5+ MCP deployment guides (10-15h total, 2-3h each)
- [ ] 3+ integration guides (Claude Desktop, Cursor, Windsurf) (9-12h total, 3-4h each)

**Marketing**:
- [ ] Launch blog post (2000-3000 words) (6-8h) - WAITING: CC-MCP product details
- [ ] Show HN post draft (1-2h)

**Developer Resources**:
- [ ] GitHub examples repo structure + 3 examples (6-8h)
- [ ] API documentation (coordinate with CC-MCP)

### SLMBench Ongoing

- [ ] Publish blog post #1 from CC-SLM draft (3-4h) - WAITING: CC-SLM draft markdown
  - Dependency: CC-SLM posts CONTENT_READY_FOR_PUBLICATION event
  - Action: Format, add graphics, SEO, publish to slmbench.com/blog

- [ ] SEO optimization for slmbench.com (meta tags, structured data) (2-3h)

---

## P3 - LOW (When Time Permits)

- [ ] **ComplianceLogger**: Execute video hybrid strategy (0.5-1h)
  - Action: Reframe + generate videos (hybrid approach from status doc)

- [ ] **MCPBodega**: Remaining MCP guides (5+) (10-15h) - POST-LAUNCH (Dec 9+)
- [ ] **MCPBodega**: API documentation formatting (4-6h) - POST-LAUNCH
- [ ] **MCPBodega**: Troubleshooting guide (3-4h) - POST-LAUNCH
- [ ] **MCPBodega**: FAQ page (2-3h) - POST-LAUNCH
- [ ] **MCPBodega**: Community seeding (Reddit, Dev.to) (4-6h) - POST-LAUNCH

---

## BLOCKED (Waiting on Others)

- [ ] **FamilyCalc Michigan**: Deploy to production (0.5-1h)
  - BLOCKED: User testing, custom domain, approval
  - Status: Ready to deploy (staged Oct 27), not pushed
  - Action: Deploy when user approves

---

## Completed This Sprint (Archive at Sprint End)

- [x] **CycleCore.ai**: Product pages + transparency fixes (Nov 18)
  - Files: Product pages (CycleSum, MCPBodega), hosting disclosure
  - Status: Staged, awaiting deployment approval

- [x] **Lexopoly**: FamilyCalc Michigan staging (Oct 27)
  - Status: Staged, waiting on user testing

---

## Sprint Summary

**Total Estimated Hours**: 74-107 hours over 4 weeks (Weeks 1-4)
- **Week 1-2**: SLMBench launch (16-24h) + MCPBodega prep (1h)
- **Week 2-3**: MCPBodega launch (56-79h) ← HEAVY WORKLOAD
- **Week 4**: Post-launch cleanup, ongoing tasks

**Workload Distribution**:
- MCPBodega: 56-79 hours (77% of total)
- SLMBench: 16-24 hours (21% of total)
- Other: 2-4 hours (2% of total)

**Critical Dependencies**:
- **CC-MCP**: Production access, screenshots, documentation, brand assets (Week 2)
- **CC-SLM**: Blog post drafts, model performance data (Week 1-2)
- **User**: Approvals for CycleCore deployment, FamilyCalc deployment

---

## Notes for User

**Week 2-3 Workload Alert**: MCPBodega launch requires 7-10 full workdays of effort. This is the heaviest workload period. Consider:
- Prioritizing MCPBodega work in Week 2-3 (deprioritize other tasks)
- Ensuring CC-MCP provides access/assets early (Week 2 start)
- Postponing non-critical tasks to Week 4

**Handoff Protocol**: Per DOCK-026, product agents (CC-MCP, CC-SLM) should post CONTENT_READY_FOR_PUBLICATION to Super Bus. User adds to this queue with priority.

**Orchestra Transition**: When Orchestra 2.0 ready, this queue can be migrated to automated work orchestration system.

---

**Maintained by**: User (CC-FCO) + CC-WEB
**Review Frequency**: Daily (5-10 min updates)
**Next Sprint Review**: 2025-12-01 (end of Week 2)
