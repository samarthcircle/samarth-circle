const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function updateHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 160);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Layer 2 — structured service / approach detail content. */
const detailData = {
  compliance: {
    eyebrow: "01 — SOCIETY COMPLIANCE",
    title: "Society Compliance",
    intro: "Compliance is strongest when it is built into the society's records, processes and decisions—not treated as an annual exercise.",
    items: [
      ["Statutory Registers", "Maintaining and reviewing the registers and records expected to support a properly administered cooperative society."],
      ["Elections", "Guidance around election-related processes, records, notices and the procedural requirements that accompany committee transitions."],
      ["Recovery Proceedings", "Practical assistance in matters involving recovery of society dues, including Section 101 / 154B-29 related proceedings and documentation."],
      ["Registrar & Cooperative Department Matters", "Support in preparing records, correspondence and responses for matters requiring interaction with the Cooperative Department."],
      ["Filings & Compliance Reviews", "Periodic review of statutory obligations, documentation and filing requirements to identify gaps before they become larger issues."],
      ["Audit & Records Coordination", "Structured coordination around audit-related records and the documentation required to keep the society's compliance position clear."]
    ]
  },
  accounts: {
    eyebrow: "02 — ACCOUNTS & OPERATIONS",
    title: "Accounts & Operations",
    intro: "Sound administration depends on financial records that are orderly, understandable and maintained with consistency.",
    items: [
      ["Maintenance Billing", "Structured monthly billing processes designed to keep member accounts clear and collections organised."],
      ["Society Accounting", "Book-keeping and financial records that give the committee a dependable view of the society's position."],
      ["TDS & GST Support", "Practical support for applicable tax-related processes, records and filing coordination."],
      ["Budgets & Financial Administration", "Assistance with budgets, expenditure tracking, reconciliations and routine financial administration."],
      ["Operational Systems", "Practical support for recurring administrative processes so that everyday society work is not dependent on ad-hoc follow-up."],
      ["Managerial Support", "Where required, operational support that helps the committee translate decisions into consistent day-to-day execution."]
    ]
  },
  governance: {
    eyebrow: "03 — GOVERNANCE & DOCUMENTATION",
    title: "Governance & Documentation",
    intro: "Good governance gives a committee a clear process for making decisions, recording them and carrying them forward.",
    items: [
      ["Committee Meetings", "Support for structured meetings, agendas and the documentation required for meaningful committee decisions."],
      ["AGM / SGM Documentation", "Assistance with notices, agendas, resolutions, minutes and supporting records for general meetings."],
      ["Resolutions & Records", "Clear documentation of decisions so that the society retains a reliable institutional record."],
      ["Policies & Procedures", "Helping committees establish practical internal processes that create consistency without unnecessary bureaucracy."],
      ["Notices & Correspondence", "Professional drafting and documentation support for routine society communications and important matters."],
      ["Committee Continuity", "Organised records and processes that allow incoming committee members to understand what has been decided and what remains pending."]
    ]
  },
  advisory: {
    eyebrow: "04 — SPECIALISED ADVISORY",
    title: "Specialised Advisory",
    intro: "Some society matters require a broader view—bringing together regulation, property, projects, risk and practical decision-making.",
    items: [
      ["Conveyance", "Advisory support around the society's conveyance journey, documentation and coordination requirements."],
      ["Redevelopment", "Structured support for societies evaluating redevelopment matters, processes, documentation and project considerations."],
      ["Society Registration", "Guidance for the registration of cooperative societies and the foundational documentation and procedural requirements involved."],
      ["MahaRERA / MHADA / SRA", "Advisory support where housing-society matters intersect with real-estate regulation, authorities or project frameworks."],
      ["Solar Advisory", "Consultation for societies considering rooftop or common-area solar initiatives, including practical, administrative and risk considerations."],
      ["Risk Assessment", "A structured review of operational, compliance, documentation and property-related risks that may require committee attention."],
      ["Insurance & Coverage", "Advisory on appropriate building and society-related insurance considerations, with a focus on mandated and practical coverage requirements."],
      ["Other Regulatory & Project Matters", "Focused consultation for matters that do not fit neatly into routine administration but require informed planning and coordination."]
    ]
  },
  manage: {
    eyebrow: "M — MANAGE",
    title: "Management",
    intro: "The everyday work of a society deserves systems that are dependable, orderly and practical.",
    items: [
      ["Administration", "Coordinating recurring society work and keeping routine matters moving with clarity."],
      ["Operations", "Practical support for the processes that keep a community functioning day to day."],
      ["Records & Follow-through", "Maintaining continuity between decisions, records and the work that follows them."],
      ["Committee Support", "Helping committees translate decisions into organised execution."]
    ]
  },
  advise: {
    eyebrow: "A — ADVISE",
    title: "Strategy & Projects",
    intro: "When a society faces a significant decision, good advice begins with understanding the matter in its wider context.",
    items: [
      ["Strategic Review", "Clarifying the issue, available routes and the practical considerations before a committee commits to a course of action."],
      ["Projects", "Structured support for property, redevelopment, conveyance and other matters that require sustained attention."],
      ["Regulatory Context", "Bringing relevant statutory and regulatory considerations into the decision-making process."],
      ["Decision Support", "Helping committees ask the right questions and document the basis of important decisions."]
    ]
  },
  govern: {
    eyebrow: "G — GOVERN",
    title: "People, Policies & Processes",
    intro: "Strong governance is less about hierarchy and more about creating a clear, fair and documented way of working.",
    items: [
      ["People", "Supporting committees and residents through clearer roles, communication and institutional continuity."],
      ["Policies", "Developing practical policies and internal frameworks suited to the society's actual needs."],
      ["Processes", "Creating repeatable processes for meetings, decisions, records and recurring responsibilities."],
      ["Documentation", "Ensuring important decisions and actions have a clear documentary trail."]
    ]
  },
  insure: {
    eyebrow: "I — INSURE",
    title: "Consultation, Risk & Coverage",
    intro: "Insurance is not merely a policy document; for a housing society, it is part of responsible risk management and building protection.",
    items: [
      ["Building Insurance", "Advisory around building insurance requirements and the protection of the society's common property."],
      ["Coverage Review", "Helping committees understand whether existing coverage addresses the society's relevant exposure."],
      ["Risk Assessment", "Identifying practical areas of operational, property and documentation risk that may warrant attention."],
      ["Insurance Consultation", "A structured conversation around coverage, exclusions, adequacy and the questions a committee should ask before renewal or placement."]
    ]
  },
  comply: {
    eyebrow: "C — COMPLY",
    title: "Statutory & Regulatory",
    intro: "Compliance is the discipline of keeping the society's obligations, records and processes aligned with the applicable statutory and regulatory framework.",
    items: [
      ["Statutory Obligations", "Identifying the recurring obligations that apply to the society and maintaining visibility over them."],
      ["Regulatory Requirements", "Interpreting relevant regulatory processes and documentation in the context of the society's circumstances."],
      ["Records & Registers", "Keeping the documentary foundation of compliance organised and reviewable."],
      ["Reviews & Remedial Action", "Identifying gaps and establishing a practical route to address them rather than allowing them to accumulate."]
    ]
  },
  "expertise-compliance": {
    eyebrow: "03 — EXPERTISE",
    title: "Cooperative Society Compliance",
    intro: "A working understanding of the cooperative housing framework, applied to the records, processes and obligations of an actual society.",
    items: [["Applied statutory understanding", "Connecting statutory and regulatory requirements with the society's day-to-day records and decisions."],["Practical compliance", "Turning obligations into workable processes rather than abstract checklists."]]
  },
  "expertise-accounts": {
    eyebrow: "03 — EXPERTISE",
    title: "Accounting & Operations",
    intro: "Financial discipline and operational consistency provide the foundation for a society that can function with confidence.",
    items: [["Financial administration", "Accounting, billing, reconciliations and financial records."],["Operational continuity", "Processes that make recurring society work more predictable and manageable."]]
  },
  "expertise-governance": {
    eyebrow: "03 — EXPERTISE",
    title: "Governance & Documentation",
    intro: "Sound governance depends on people, policies, processes and records working together.",
    items: [["People & committees", "Clear roles, communication and continuity."],["Policies & processes", "Practical frameworks for meetings, decisions and recurring responsibilities."],["Documentation", "A reliable record of what was decided and why."]]
  },
  "expertise-advisory": {
    eyebrow: "03 — EXPERTISE",
    title: "Advisory, Risk & Projects",
    intro: "Some matters require more than routine administration: they require context, planning and an appreciation of risk.",
    items: [["Strategy & projects", "Advisory support for complex society matters and projects."],["Risk", "Identifying areas where exposure may warrant committee attention."],["Coverage & consultation", "Bringing practical advice to decisions that have longer-term consequences."]]
  }
};

const detailOverlay = document.getElementById("detailOverlay");
const detailTitle = document.getElementById("detailTitle");
const detailEyebrow = document.getElementById("detailEyebrow");
const detailIntro = document.getElementById("detailIntro");
const detailList = document.getElementById("detailList");
let lastDetailTrigger = null;

function openDetail(key, trigger) {
  const data = detailData[key];
  if (!data || !detailOverlay) return;
  lastDetailTrigger = trigger || null;
  detailEyebrow.textContent = data.eyebrow;
  detailTitle.textContent = data.title;
  detailIntro.textContent = data.intro;
  detailList.innerHTML = data.items.map(([title, text]) => `\n    <button class="detail-row" type="button">\n      <span><strong>${title}</strong><small>${text}</small></span>\n      <b>+</b>\n    </button>`).join("");
  detailList.querySelectorAll(".detail-row").forEach(row => {
    row.addEventListener("click", () => row.classList.toggle("open"));
  });
  detailOverlay.classList.add("open");
  detailOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("detail-open");
  requestAnimationFrame(() => detailOverlay.querySelector(".detail-panel").focus({preventScroll:true}));
}

function closeDetail() {
  if (!detailOverlay) return;
  detailOverlay.classList.remove("open");
  detailOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
  if (lastDetailTrigger) lastDetailTrigger.focus({preventScroll:true});
  lastDetailTrigger = null;
}

document.querySelectorAll("[data-detail]").forEach(el => {
  if (el.closest(".detail-overlay")) return;
  const activate = () => openDetail(el.dataset.detail, el);
  el.addEventListener("click", activate);
  el.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
  });
});

document.querySelectorAll("[data-detail-close]").forEach(el => el.addEventListener("click", closeDetail));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && detailOverlay?.classList.contains("open")) closeDetail();
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 330)}ms`);
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
