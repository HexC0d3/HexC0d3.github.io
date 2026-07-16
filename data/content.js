/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  SITE CONTENT — single source of truth                        │
 * │  Edit THIS file to update the site. No markup changes needed. │
 * │  • Add a project  → push to `projects`                        │
 * │  • Add press       → push to `press`                          │
 * │  • Add a social    → push to `socials`                        │
 * │  • Rename / re-role → edit `profile`                          │
 * │  Nav numbers (//01, //02…) auto-generate from array order.    │
 * └─────────────────────────────────────────────────────────────┘
 */
export const content = {
  meta: {
    title: "0xCode // Portfolio",
    author: "Himanshu Bhatt",
  },

  profile: {
    initials: "0xC0de",
    kicker: "This is",
    // Each string is rendered on its own line inside the <h1>
    name: ["Himanshu", "Bhatt"],
    role: "A Red Teamer and a Cyber Security Engineer",
    cv: { label: "Download CV", url: "#" },
  },

  // Top navigation. `//0N.` index is derived from position — just add/remove.
  nav: [
    { label: "Home",      href: "#home" },
    { label: "Whoami",    href: "#portfolio" },
    { label: "Dossier",     href: "#press" },
    { label: "Contact",   href: "#contact" },
  ],

  portfolio: {
    title: "Who-am-i",
    // `app` drives the little mock preview inside the lens.
    // accent = theme color (wave/icon/text); icon = "target" | "gear" | "bug"; head = title; subs = topic list.
    projects: [
      {
        name: "Offensive Security Consultant",
        role: "(Red Team • Pentest • AppSec)",
        desc: "Experienced offensive security professional specializing in adversary emulation, penetration testing, and application security. I assess organizations from an attacker's perspective to identify exploitable weaknesses, validate security controls, and provide actionable remediation that strengthens overall security posture.",
        // icon: "target" | "gear" | "bug" — picks the themed glyph in the mock preview.
        app: { head: "Discover your target", subs: ["Recon", "Attack Surface Mapping", "Exploitation", "Privilege Escalation", "Lateral Movement", "Persistence", "Detection Evasion"], icon: "target", accent: "#ff4d4d" },
      },
      {
        name: "Engineer / Builder",
        role: "(Automation • Security Engineering • Tool Development)",
        desc: "Passionate about building security solutions that improve efficiency and scale. I design automation workflows, develop custom tools, and integrate security into engineering processes to reduce manual effort, enhance testing capabilities, and enable continuous security operations.",
        app: { head: "Automate the grind", subs: ["Automation workflows", "Custom tooling", "Recon Engine", "Asset Database", "Scanner", "Report Generator"], icon: "gear", accent: "#5dff5d" },
      },
      {
        name: "Adversary Intelligence & Incident Response",
        role: "(Threat Intelligence • Malware Analysis • Threat Hunting)",
        desc: "I investigate security incidents, analyze malware and attacker tradecraft, and leverage cyber threat intelligence to uncover indicators, map adversary behavior, and improve an organization's detection and response capabilities. My focus is on transforming technical findings into actionable intelligence that strengthens resilience against evolving threats.",
        app: { head: "Track the adversary", subs: ["Threat Modeling", "MITRE ATT&CK Mapping", "Malware Analysis", "Log Analysis and Correlation", "Dark Web CTI", "OSINT"], icon: "bug", accent: "#8f6bff" },
      },
    ],
  },

  press: {
    title: "Dossier",
    // First item renders highlighted by default (see components/press.js).
    items: [
      { name: "Security Research & Publications", date: "CVEs, Articles ands Write-Ups", href: "publications.html" },
      { name: "Professional Credentials",    date: "Badges and Certificates", href: "certifications.html" },
      { name: "Projects",            date: "Tools and Ideas",   href: "projects.html" },
      { name: "Skill-Map",     date: "Tech-Stack, Skills and Competencies",   href: "#" },
    ],
  },

  connect: {
    title: "Connect with me",
    // Positions/sizes are computed automatically — add as many as you like.
    socials: [
      { name: "Linkedin", href: "https://www.linkedin.com/in/-himanshu/" },
      { name: "HackTheBox",     href: "https://profile.hackthebox.com/profile/019d3d69-5028-713e-bf5f-083cc4198921" },
      { name: "Github",  href: "https://github.com/HexC0d3" },
      { name: "Medium",   href: "https://hexc0de.medium.com/" },
    ],
  },

  footer: "Securely vibe-coded with caffeine & green pixels — 0xCode",
};
