import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Archive,
  BookOpen,
  Boxes,
  Calendar,
  ChevronRight,
  Compass,
  Copy,
  Crosshair,
  Eye,
  FileText,
  Gem,
  Globe2,
  Image,
  Layers3,
  Maximize2,
  Menu,
  Minimize2,
  Moon,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  PlayCircle,
  Radio,
  Rocket,
  Search,
  Shield,
  Sparkles,
  ScrollText,
  Swords,
  Wand2,
  X
} from "lucide-react";
import "./styles.css";

const baseUrl = "/";
const docsRoot = `${baseUrl}docs/`;
const indexFile = "VRMMO_INDEX.md";
const logoSrc = `${baseUrl}references/cardinal-creation-logo.png`;
const realmColorSrc = `${baseUrl}references/human-overworld-realm-color.jpeg`;
const realmSketchSrc = `${baseUrl}references/human-overworld-realm-sketch.png`;

const docRoutes = {
  "VRMMO_DESIGN_BLUEPRINT.md": "design",
  "VRMMO_INDEX.md": "index",
  "WORLD_AND_RENDERING.md": "world",
  "TECHNICAL_ARCHITECTURE.md": "tech",
  "DIEGETIC_UI_CARDINAL_AND_VITAE.md": "ui",
  "COMBAT_MAGIC.md": "magic",
  "COMBAT_MELEE.md": "melee",
  "COMBAT_RANGED.md": "ranged",
  "ITEMIZATION_SPELLSTONES_AND_CRAFTING.md": "items",
  "DEMON_EYES_AND_REPUTATION.md": "demon-eyes",
  "PROGRESSION_BALANCE_AND_ROADMAP.md": "roadmap"
};

const routeDocs = Object.fromEntries(Object.entries(docRoutes).map(([file, slug]) => [slug, file]));

const sitePages = [
  { key: "home", path: "/", label: "Home", icon: Sparkles },
  { key: "archive", path: "/archive", label: "Design Archive", icon: Archive },
  { key: "devlogs", path: "/devlogs", label: "Dev Logs", icon: Radio },
  { key: "roadmap", path: "/roadmap", label: "Roadmap", icon: Rocket }
];

const devlogEntries = [
  {
    title: "Foundation Notes",
    date: "May 2026",
    tag: "Design",
    text: "The archive begins with combat pillars, diegetic UI, world scale, spellstones, demon eyes, and the first pass of the Cardinal Creation site."
  },
  {
    title: "Prototype Target",
    date: "Upcoming",
    tag: "Build",
    text: "Next dev logs can track the first Unreal movement slice, grimoire interaction tests, stance detection, and ranged recall experiments."
  },
  {
    title: "Media Slot",
    date: "Later",
    tag: "Video",
    text: "YouTube trailers, short clips, prototype captures, and commentary videos can be linked here once the channel is ready."
  }
];

const roadmapItems = [
  {
    phase: "Phase 0",
    title: "Research And Validation",
    status: "Current",
    icon: Compass,
    points: ["UE 5.7 VR rendering validation", "SpacetimeDB Unreal integration", "World scale performance tests"]
  },
  {
    phase: "Phase 1",
    title: "Movement And Interface Slice",
    status: "Next",
    icon: Sparkles,
    points: ["VR pawn", "Cardinal familiar pocket UI", "Vitae glove and vial charms"]
  },
  {
    phase: "Phase 2",
    title: "Combat Prototype",
    status: "Planned",
    icon: Swords,
    points: ["Sword stances", "Grimoire spell ring", "Bow recall crystal and curve shots"]
  },
  {
    phase: "Phase 3",
    title: "Network Prototype",
    status: "Planned",
    icon: Network,
    points: ["Nearby player subscriptions", "Remote avatar smoothing", "Cell interest management"]
  },
  {
    phase: "Phase 4",
    title: "World Scale Prototype",
    status: "Planned",
    icon: Globe2,
    points: ["8-16 km test world", "HLOD and far proxies", "Nanite foliage test fields"]
  },
  {
    phase: "Phase 5",
    title: "Progression Slice",
    status: "Planned",
    icon: Gem,
    points: ["Spellstone series", "Dwarven crafting", "Demon eye social consequence"]
  }
];

const fallbackDocs = [
  "VRMMO_DESIGN_BLUEPRINT.md",
  "WORLD_AND_RENDERING.md",
  "TECHNICAL_ARCHITECTURE.md",
  "DIEGETIC_UI_CARDINAL_AND_VITAE.md",
  "COMBAT_MAGIC.md",
  "COMBAT_MELEE.md",
  "COMBAT_RANGED.md",
  "ITEMIZATION_SPELLSTONES_AND_CRAFTING.md",
  "DEMON_EYES_AND_REPUTATION.md",
  "PROGRESSION_BALANCE_AND_ROADMAP.md"
];

const categoryRules = [
  { key: "combat", label: "Combat", icon: Swords, words: ["COMBAT", "Magic", "Melee", "Ranged"] },
  { key: "world", label: "World", icon: Globe2, words: ["WORLD", "Rendering", "Realm"] },
  { key: "systems", label: "Systems", icon: Network, words: ["TECHNICAL", "Architecture", "SpacetimeDB"] },
  { key: "ui", label: "Diegetic UI", icon: Sparkles, words: ["DIEGETIC", "CARDINAL", "VITAE", "UI"] },
  { key: "items", label: "Items", icon: Gem, words: ["ITEMIZATION", "Spellstones", "Crafting"] },
  { key: "lore", label: "Lore", icon: Eye, words: ["DEMON", "Reputation"] },
  { key: "planning", label: "Planning", icon: Compass, words: ["PROGRESSION", "BALANCE", "ROADMAP"] },
  { key: "master", label: "Master", icon: Archive, words: ["BLUEPRINT", "INDEX"] }
];

function titleFromFile(file) {
  return file
    .replace(/\.md$/i, "")
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function docCategory(doc) {
  const haystack = `${doc.file} ${doc.title}`.toLowerCase();
  return categoryRules.find((rule) => rule.words.some((word) => haystack.includes(word.toLowerCase()))) ?? categoryRules.at(-1);
}

function parseIndexLinks(markdown) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
  const links = [];
  let match;

  while ((match = linkPattern.exec(markdown)) !== null) {
    const file = match[2].split("/").pop();
    if (!links.some((link) => link.file === file)) {
      links.push({ title: match[1], file });
    }
  }

  fallbackDocs.forEach((file) => {
    if (!links.some((link) => link.file === file)) {
      links.push({ title: titleFromFile(file), file });
    }
  });

  return links;
}

function extractHeading(markdown, fallback) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

function extractSummary(markdown) {
  const clean = markdown
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#") && !line.startsWith(">") && !line.startsWith("|") && !line.startsWith("```"))
    .map((line) => line.replace(/[-*]\s+/, "").trim())
    .find((line) => line.length > 38);

  return clean ? `${clean.slice(0, 160)}${clean.length > 160 ? "..." : ""}` : "Design notes and system details for the VRMMO archive.";
}

function extractToc(markdown) {
  return markdown
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (!match) return null;
      return { depth: match[1].length, label: match[2].replace(/[#`]/g, "").trim() };
    })
    .filter(Boolean)
    .slice(0, 18);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function inlineMarkdown(text) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_full, label, href) => {
      const file = href.endsWith(".md") ? href.split("/").pop() : "";
      const safeHref = file ? getDocPath(file) : href;
      return `<a href="${safeHref}">${label}</a>`;
    });
}

function getDocPath(file) {
  return `/doc/${docRoutes[file] ?? slugify(file.replace(/\.md$/i, ""))}`;
}

function getFileFromLocation(docs = []) {
  const legacyHash = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("doc");
  if (legacyHash) return legacyHash;

  const routeMatch = window.location.pathname.match(/\/doc\/([^/]+)\/?$/);
  if (routeMatch) return routeDocs[decodeURIComponent(routeMatch[1])] ?? "";

  const knownPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (!knownPath || knownPath === "index.html") return "";

  const directFile = docs.find((doc) => slugify(doc.title) === knownPath || doc.file.toLowerCase() === `${knownPath}.md`);
  return directFile?.file ?? "";
}

function getPageFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/doc/")) return "archive";
  if (path === "/archive") return "archive";
  if (path === "/devlogs") return "devlogs";
  if (path === "/roadmap") return "roadmap";
  return "home";
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*:?-{3,}/.test(line))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => inlineMarkdown(cell.trim())));

  if (!rows.length) return "";
  const [head, ...body] = rows;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderMarkdown(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let list = [];
  let table = [];
  let code = [];
  let codeMode = false;
  let codeLang = "";

  const flushList = () => {
    if (list.length) {
      html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      list = [];
    }
  };

  const flushTable = () => {
    if (table.length) {
      html.push(renderTable(table));
      table = [];
    }
  };

  lines.forEach((raw) => {
    const line = raw.trimEnd();

    if (line.startsWith("```")) {
      flushList();
      flushTable();
      if (codeMode) {
        if (codeLang === "mermaid") {
          html.push(`<pre class="mermaid-card">${escapeHtml(code.join("\n"))}</pre>`);
        } else {
          html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        }
        code = [];
        codeMode = false;
        codeLang = "";
      } else {
        codeMode = true;
        codeLang = line.replace("```", "").trim();
      }
      return;
    }

    if (codeMode) {
      code.push(raw);
      return;
    }

    if (/^\|.+\|$/.test(line.trim())) {
      flushList();
      table.push(line);
      return;
    }

    flushTable();

    if (!line.trim() || line.trim() === "---") {
      flushList();
      if (line.trim() === "---") html.push("<hr />");
      return;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushList();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      return;
    }

    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      flushList();
      html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`);
      return;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      list.push(bullet[1]);
      return;
    }

    flushList();
    html.push(`<p>${inlineMarkdown(line.trim())}</p>`);
  });

  flushList();
  flushTable();
  return html.join("\n");
}

function referenceItems(indexMarkdown) {
  const imagePattern = /\[([^\]]+)\]\(([^)]+\.(?:png|jpg|jpeg|webp|gif|svg))\)/gi;
  const refs = [];
  let match;
  while ((match = imagePattern.exec(indexMarkdown)) !== null) {
    const rawSrc = match[2];
    let src = rawSrc;
    if (!/^https?:\/\//i.test(rawSrc) && !rawSrc.startsWith("/")) {
      src = rawSrc.replace(/^\.\.\//, `${baseUrl}`).replace(/^\.\//, baseUrl);
    }
    refs.push({ title: match[1], src });
  }
  return refs;
}

function App() {
  const [docs, setDocs] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [page, setPage] = useState(getPageFromLocation);
  const [activeRoadmap, setActiveRoadmap] = useState(0);
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [readerWide, setReaderWide] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [indexMarkdown, setIndexMarkdown] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadDocs() {
      const indexResponse = await fetch(`${docsRoot}${indexFile}`);
      const indexText = await indexResponse.text();
      const links = parseIndexLinks(indexText);
      const loaded = await Promise.all(
        links.map(async (link) => {
          const response = await fetch(`${docsRoot}${link.file}`);
          const markdown = response.ok ? await response.text() : `# ${link.title}\n\nMissing source file: ${link.file}`;
          return {
            ...link,
            title: extractHeading(markdown, link.title),
            summary: extractSummary(markdown),
            toc: extractToc(markdown),
            markdown
          };
        })
      );

      setIndexMarkdown(indexText);
      setDocs(loaded);
      const requested = getFileFromLocation(loaded);
      setSelectedFile(requested && loaded.some((doc) => doc.file === requested) ? requested : loaded[0]?.file ?? "");
      setPage(getPageFromLocation());
    }

    loadDocs().catch(() => {
      setDocs([]);
    });
  }, []);

  const selectedDoc = docs.find((doc) => doc.file === selectedFile) ?? docs[0];

  useEffect(() => {
    if (selectedDoc && page === "archive" && window.location.pathname.startsWith("/doc/")) {
      const expectedPath = getDocPath(selectedDoc.file);
      if (window.location.pathname !== expectedPath) {
        window.history.replaceState(null, "", expectedPath);
      }
    }
  }, [selectedDoc]);

  useEffect(() => {
    const syncFromLocation = () => {
      setPage(getPageFromLocation());
      const requested = getFileFromLocation(docs);
      if (requested && docs.some((doc) => doc.file === requested)) {
        setSelectedFile(requested);
      }
    };

    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);
    return () => {
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, [docs]);

  useEffect(() => {
    const handleReaderShortcuts = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isTyping || event.ctrlKey || event.metaKey || event.altKey || page !== "archive") return;

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        setReaderWide((value) => !value);
      }

      if (event.key === "Escape") {
        setReaderWide(false);
      }
    };

    window.addEventListener("keydown", handleReaderShortcuts);
    return () => window.removeEventListener("keydown", handleReaderShortcuts);
  }, [page]);

  const enrichedDocs = useMemo(
    () => docs.map((doc) => ({ ...doc, category: docCategory(doc) })),
    [docs]
  );

  const filteredDocs = useMemo(() => {
    const search = query.trim().toLowerCase();
    return enrichedDocs.filter((doc) => {
      const categoryMatch = category === "all" || doc.category.key === category;
      const searchMatch =
        !search ||
        `${doc.title} ${doc.file} ${doc.summary} ${doc.markdown}`.toLowerCase().includes(search);
      return categoryMatch && searchMatch;
    });
  }, [enrichedDocs, query, category]);

  const references = useMemo(() => referenceItems(indexMarkdown), [indexMarkdown]);
  const selectedCategory = selectedDoc ? docCategory(selectedDoc) : categoryRules[0];
  const SelectedIcon = selectedCategory.icon;

  const openDoc = (file) => {
    setSelectedFile(file);
    setPage("archive");
    setSidebarOpen(false);
    window.history.pushState(null, "", getDocPath(file));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPage = (targetPage) => {
    const route = sitePages.find((item) => item.key === targetPage)?.path ?? "/";
    setPage(targetPage);
    setSidebarOpen(false);
    window.history.pushState(null, "", route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSidebarCompact = () => {
    setSidebarCompact((value) => !value);
  };

  const copyDocLink = async () => {
    if (!selectedDoc) return;
    const url = `${window.location.origin}${getDocPath(selectedDoc.file)}`;
    await navigator.clipboard?.writeText(url);
  };

  const renderHome = () => (
    <>
      <section className="home-hero">
        <div className="home-map-stack" aria-hidden="true">
          <img src={realmColorSrc} alt="" />
          <img src={realmSketchSrc} alt="" />
          <div className="portal-core">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="home-copy">
          <p className="eyebrow">Mistake Studios flagship hub</p>
          <h2>Cardinal Creation is becoming a living VRMMO atlas.</h2>
          <p>
            A public home for trailers, dev logs, roadmap beats, lore archives, and the design codex as the project grows from planning into prototypes.
          </p>
          <div className="home-actions">
            <button className="primary-link" type="button" onClick={() => openPage("archive")}>
              <Archive size={18} />
              Open Archive
            </button>
            <button className="ghost-button" type="button" onClick={() => openPage("roadmap")}>
              <Rocket size={18} />
              View Roadmap
            </button>
          </div>
        </div>
      </section>

      <section className="portal-grid">
        {[
          { page: "archive", title: "Design Archive", text: "Read the planning docs, lore systems, combat pillars, and technical notes.", icon: Archive },
          { page: "devlogs", title: "Dev Logs", text: "A future home for videos, prototype notes, trailers, and development updates.", icon: PlayCircle },
          { page: "roadmap", title: "Roadmap", text: "Track phases from research through combat, networking, world scale, and progression.", icon: Rocket }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button className="portal-card" type="button" key={item.page} onClick={() => openPage(item.page)}>
              <span><Icon size={24} /></span>
              <strong>{item.title}</strong>
              <small>{item.text}</small>
              <ChevronRight size={18} />
            </button>
          );
        })}
      </section>

      <section className="signal-band">
        <div>
          <p className="eyebrow">Current identity</p>
          <h2>Power is physical, visible, crafted, and consequential.</h2>
        </div>
        <div className="signal-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </>
  );

  const renderDevlogs = () => (
    <>
      <section className="page-hero compact-hero">
        <p className="eyebrow">Development updates</p>
        <h2>Dev logs will live here when the first prototypes start moving.</h2>
        <p>Keep this simple for now: entries, embedded video slots later, and links to YouTube or supporter posts when they exist.</p>
      </section>
      <section className="devlog-list">
        {devlogEntries.map((entry) => (
          <article className="devlog-card" key={entry.title}>
            <div>
              <span>{entry.tag}</span>
              <time>{entry.date}</time>
            </div>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
            <div className="video-placeholder">
              <PlayCircle size={28} />
              Future video / trailer embed
            </div>
          </article>
        ))}
      </section>
    </>
  );

  const renderRoadmap = () => {
    const active = roadmapItems[activeRoadmap];
    const ActiveIcon = active.icon;
    return (
      <>
        <section className="page-hero compact-hero">
          <p className="eyebrow">Interactive roadmap</p>
          <h2>From research notes to a playable VRMMO vertical slice.</h2>
          <p>Select a phase to inspect the work track. This can later become a public progress board with dates, videos, and status updates.</p>
        </section>
        <section className="roadmap-shell">
          <div className="roadmap-orbit" aria-hidden="true">
            {roadmapItems.map((item, index) => (
              <button
                className={`road-node ${activeRoadmap === index ? "active" : ""}`}
                type="button"
                key={item.phase}
                style={{ "--i": index }}
                onClick={() => setActiveRoadmap(index)}
                aria-label={item.title}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="roadmap-detail">
            <span className="reader-icon"><ActiveIcon size={24} /></span>
            <p className="eyebrow">{active.phase} / {active.status}</p>
            <h2>{active.title}</h2>
            <ul>
              {active.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="roadmap-timeline">
            {roadmapItems.map((item, index) => (
              <button className={activeRoadmap === index ? "active" : ""} type="button" key={item.phase} onClick={() => setActiveRoadmap(index)}>
                <span>{item.phase}</span>
                <strong>{item.title}</strong>
                <small>{item.status}</small>
              </button>
            ))}
          </div>
        </section>
      </>
    );
  };

  const renderArchive = () => (
    <>
      <section className="hero-console">
        <div className="orbital-stage" aria-hidden="true">
          <div className="vr-ring ring-one" />
          <div className="vr-ring ring-two" />
          <div className="floating-panel panel-a"><BookOpen size={18} /></div>
          <div className="floating-panel panel-b"><Crosshair size={18} /></div>
          <div className="floating-panel panel-c"><Wand2 size={18} /></div>
          <div className="cardinal"><span className="wing wing-left" /><span className="wing wing-right" /><span className="body" /></div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Living source of truth</p>
          <h2>Docs, maps, references, and system ideas in one spatial workspace.</h2>
          <p>Update the markdown files and keep <code>VRMMO_INDEX.md</code> fresh. The archive turns those links into navigation, search, cards, and shareable pages.</p>
        </div>
        <div className="realm-preview" aria-label="Human realm visual references">
          <img src={realmColorSrc} alt="Human overworld realm color reference" />
          <img src={realmSketchSrc} alt="Human overworld realm sketch map reference" />
        </div>
        <div className="vial-stack" aria-label="Archive status"><div className="vial red"><span /></div><div className="vial blue"><span /></div></div>
      </section>

      <section className={`content-grid ${readerWide ? "reader-wide" : ""}`}>
        <div className="doc-browser">
          <div className="section-head">
            <div><p className="eyebrow">Archive</p><h2>{filteredDocs.length} documents</h2></div>
            <span>{category === "all" ? "All categories" : categoryRules.find((rule) => rule.key === category)?.label}</span>
          </div>

          <div className="doc-cards">
            {filteredDocs.map((doc) => {
              const docRule = doc.category;
              const Icon = docRule.icon;
              return (
                <button className={`doc-card ${selectedDoc?.file === doc.file ? "selected" : ""}`} type="button" key={doc.file} onClick={() => openDoc(doc.file)}>
                  <span className="doc-icon"><Icon size={18} /></span>
                  <span><strong>{doc.title}</strong><small>{doc.summary}</small></span>
                  <ChevronRight size={17} />
                </button>
              );
            })}
          </div>

          <div className="reference-dock">
            <div className="section-head compact"><div><p className="eyebrow">Reference shelf</p><h2>Images</h2></div><Image size={18} /></div>
            {references.length ? (
              <div className="reference-list">
                {references.map((ref) => (
                  <a key={ref.src} href={ref.src} target="_blank" rel="noreferrer"><img src={ref.src} alt="" /><span><Image size={15} />{ref.title}</span></a>
                ))}
              </div>
            ) : (
              <p className="empty-note">Add image links to <code>VRMMO_INDEX.md</code> and place files in a references folder to populate this shelf.</p>
            )}
          </div>
        </div>

        <article className="reader-panel">
          {selectedDoc ? (
            <>
              <div className="reader-header">
                <span className="reader-icon"><SelectedIcon size={22} /></span>
                <div><p className="eyebrow">{selectedCategory.label}</p><h2>{selectedDoc.title}</h2><span>{selectedDoc.file}</span></div>
                <button className="reader-toggle" type="button" onClick={() => setReaderWide((value) => !value)} title={readerWide ? "Return to normal reader width (F or Esc)" : "Widen reader panel (F)"}>
                  {readerWide ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                  <span>{readerWide ? "Normal F/Esc" : "Focus F"}</span>
                </button>
              </div>
              <div
                className="markdown-body"
                onClick={(event) => {
                  const link = event.target.closest("a");
                  if (!link) return;
                  const href = link.getAttribute("href") ?? "";
                  if (!href.startsWith("/doc/")) return;
                  const slug = decodeURIComponent(href.replace("/doc/", "").replace(/\/$/, ""));
                  const file = routeDocs[slug] ?? "";
                  if (!docs.some((doc) => doc.file === file)) return;
                  event.preventDefault();
                  openDoc(file);
                }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedDoc.markdown) }}
              />
            </>
          ) : (
            <div className="loading-state"><Moon size={28} />Loading archive...</div>
          )}
        </article>

        <aside className="toc-panel">
          <div className="section-head compact"><div><p className="eyebrow">Current doc</p><h2>Table of contents</h2></div><Shield size={18} /></div>
          {selectedDoc?.toc?.length ? (
            <nav>{selectedDoc.toc.map((item) => <a className={item.depth === 3 ? "sub" : ""} href={`#${slugify(item.label)}`} key={`${item.depth}-${item.label}`}>{item.label}</a>)}</nav>
          ) : (
            <p className="empty-note">Open a document to reveal its sections.</p>
          )}
          <div className="mini-system"><Boxes size={18} /><strong>Archive loop</strong><p>Add docs, update the index, push to GitHub Pages, share the link.</p></div>
        </aside>
      </section>
    </>
  );

  return (
    <div className={`archive-app ${sidebarCompact ? "rail-compact" : ""}`}>
      <div className="space-grid" aria-hidden="true" />
      <aside className={`side-rail ${sidebarOpen ? "open" : ""}`}>
        <button className="close-nav" type="button" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
          <X size={18} />
        </button>
        <div className="brand">
          <img className="brand-logo" src={logoSrc} alt="Cardinal Creation logo" />
          <div>
            <p>Cardinal Creation</p>
            <strong>Mistake Studios</strong>
          </div>
        </div>

        <button className="rail-toggle" type="button" onClick={toggleSidebarCompact} title={sidebarCompact ? "Expand sidebar" : "Collapse sidebar"}>
          {sidebarCompact ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          <span>{sidebarCompact ? "Expand" : "Collapse"}</span>
        </button>

        <div className="site-nav">
          {sitePages.map((item) => {
            const Icon = item.icon;
            return (
              <button className={page === item.key ? "active" : ""} type="button" key={item.key} onClick={() => openPage(item.key)} title={item.label} data-tip={item.label}>
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search docs, systems, lore..." />
        </label>

        <div className="category-list">
          <p className="rail-label">Archive Filters</p>
          <button className={category === "all" ? "active" : ""} type="button" onClick={() => setCategory("all")} title="All Systems" data-tip="All Systems">
            <Layers3 size={17} />
            <span>All Systems</span>
          </button>
          {categoryRules.map((rule) => {
            const Icon = rule.icon;
            return (
              <button className={category === rule.key ? "active" : ""} type="button" key={rule.key} onClick={() => setCategory(rule.key)} title={rule.label} data-tip={rule.label}>
                <Icon size={17} />
                <span>{rule.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rail-footer">
          <span className="pulse-dot" />
          Index driven by <code>VRMMO_INDEX.md</code>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <button className="mobile-menu" type="button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <div>
            <p className="eyebrow">{page === "home" ? "Flagship hub" : page === "devlogs" ? "Studio updates" : page === "roadmap" ? "Build path" : "Static GitHub Pages archive"}</p>
            <h1>{page === "home" ? "Mistake Studios" : page === "devlogs" ? "Dev Logs" : page === "roadmap" ? "Roadmap" : "Cardinal Creation Design Library"}</h1>
          </div>
          <div className="top-actions">
            {page === "archive" && <a className="ghost-button" href={`${docsRoot}${selectedDoc?.file ?? indexFile}`} target="_blank" rel="noreferrer">
              <FileText size={17} />
              Source
            </a>}
            {page === "archive" && <button className="ghost-button" type="button" onClick={copyDocLink}>
              <Copy size={17} />
              Share
            </button>}
          </div>
        </header>
        {page === "home" && renderHome()}
        {page === "devlogs" && renderDevlogs()}
        {page === "roadmap" && renderRoadmap()}
        {page === "archive" && renderArchive()}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
