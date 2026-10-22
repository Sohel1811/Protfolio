import { useEffect, useState } from "react";
import {
  profile,
  results,
  job,
  projects,
  skills,
  education,
  recognition,
} from "./data.js";

/* Photos are optional. Drop files in src/assets and they appear; nothing
   renders (and nothing 404s) when they are missing. */
const photoFiles = import.meta.glob("./assets/photo.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const photoUrl = Object.values(photoFiles)[0];

const projectFiles = import.meta.glob("./assets/projects/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
function projectImage(slug) {
  const key = Object.keys(projectFiles).find(
    (k) => k.split("/").pop().replace(/\.[^.]+$/, "") === slug
  );
  return key ? projectFiles[key] : undefined;
}

const NAV = [
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["contact", "Contact"],
];
const NAV_IDS = NAV.map(([id]) => id);

/* Fade sections in as they scroll into view. Content stays visible if
   IntersectionObserver or JavaScript is unavailable. */
function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    root.classList.add("reveal-ready");
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}

/* Marks the nav link for the last section whose top has passed 30% of the
   viewport. Nothing is marked above the first section, and the final section
   is marked at the bottom of the page even when it is too short to reach the line. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return active;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const set = document.documentElement.dataset.theme;
    if (set === "light" || set === "dark") return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem("theme");
      } catch (err) {
        /* storage unavailable */
      }
      if (!stored) setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (err) {
      /* storage unavailable */
    }
    setTheme(next);
  };
  return [theme, toggle];
}

function ThemeToggle({ theme, onToggle }) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      id="theme-toggle"
      data-mode={theme}
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
    >
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
      </svg>
    </button>
  );
}

function Section({ id, title, children, reveal = true }) {
  const headId = `h-${id}`;
  return (
    <section
      className={reveal ? "sec reveal" : "sec"}
      id={id}
      aria-labelledby={headId}
    >
      <h2 id={headId}>{title}</h2>
      <div className="body">{children}</div>
    </section>
  );
}

function PackageCard() {
  const P = ({ children }) => <span className="p">{children}</span>;
  const K = ({ children }) => <span className="k">{children}</span>;
  const S = ({ children }) => <span className="s">{children}</span>;
  return (
    <div
      className="pkg rise"
      style={{ "--i": 2 }}
      role="img"
      aria-label="package.json style summary: MERN Stack Developer, 4 years of experience, open to work in Hyderabad, Bengaluru and Pune"
    >
      <div><P>{"{"}</P></div>
      <div>  <K>"name"</K><P>:</P> <S>"mohammad-sohel"</S><P>,</P></div>
      <div>  <K>"role"</K><P>:</P> <S>"MERN Stack Developer"</S><P>,</P></div>
      <div>  <K>"experience"</K><P>:</P> <S>"4 years"</S><P>,</P></div>
      <div>  <K>"stack"</K><P>:</P> <P>[</P><S>"React"</S><P>,</P> <S>"TypeScript"</S><P>,</P></div>
      <div>            <S>"Node.js"</S><P>,</P> <S>"MongoDB"</S><P>],</P></div>
      <div>  <K>"ai"</K><P>:</P> <S>"Vertex AI"</S><P>,</P></div>
      <div>  <K>"cloud"</K><P>:</P> <S>"AZ-900"</S><P>,</P></div>
      <div>  <K>"open"</K><P>:</P> <P>[</P><S>"Hyderabad"</S><P>,</P> <S>"Bengaluru"</S><P>,</P></div>
      <div>           <S>"Pune"</S><P>]</P></div>
      <div><P>{"}"}</P></div>
    </div>
  );
}

function CopyButton({ text, targetId, id }) {
  const [copied, setCopied] = useState(false);

  const done = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const fallback = () => {
    try {
      const el = document.getElementById(targetId);
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {
      /* ignore */
    }
  };
  const onClick = () => {
    try {
      navigator.clipboard.writeText(text).then(done, fallback);
    } catch (e) {
      fallback();
    }
  };

  return (
    <button
      className="copy"
      type="button"
      id={id}
      data-copied={copied}
      onClick={onClick}
    >
      <span className="copy-idle" aria-hidden={copied}>Copy</span>
      <span className="copy-done" aria-hidden={!copied} aria-live="polite">Copied</span>
    </button>
  );
}

function Project({ p, index }) {
  const img = projectImage(p.slug);
  return (
    <article className="proj reveal" style={{ "--i": index }}>
      <h3>{p.title}</h3>
      <div className="proj-body">
        {img && (
          <img
            className="proj-shot"
            src={img}
            alt={`Screenshot of ${p.title}`}
            width="960"
            height="600"
            loading="lazy"
            decoding="async"
          />
        )}
        <p>{p.text}</p>
        {(p.code || p.demo) && (
          <p className="links">
            {p.code && <a href={p.code} target="_blank" rel="noreferrer">View code</a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}
          </p>
        )}
        <ul className="tags" aria-label="Technologies">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function App() {
  useReveal();
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(NAV_IDS);

  return (
    <div className="wrap">
      <a className="skip" href="#main">Skip to content</a>

      <header className="top">
        <span className="mark">~/sohel</span>
        <nav aria-label="Sections">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="name">
          <div>
            <p className="eyebrow rise" style={{ "--i": 0 }}>
              {profile.role} · {profile.location}
            </p>
            <h1 id="name" className="rise" style={{ "--i": 1 }}>
              <span>Mohammad</span>
              <span>Sohel</span>
            </h1>
            <p className="lede rise" style={{ "--i": 2 }}>{profile.lede}</p>
            <div className="cta rise" style={{ "--i": 3 }}>
              <a className="btn btn-primary" href="#contact">Get in touch</a>
              <a className="btn btn-ghost" href="#experience">See my work</a>
            </div>
            <p className="status rise" style={{ "--i": 4 }}>
              Open to roles in {profile.openTo.join(", ")}
            </p>
          </div>
          <PackageCard />
        </section>

        <ul className="results" aria-label="Results at Tech Mahindra">
          {results.map((r, i) => (
            <li key={r.label} className="reveal" style={{ "--i": i }}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
            </li>
          ))}
        </ul>

        <Section id="about" title="About">
          <div className={photoUrl ? "about has-photo" : "about"}>
            <div className="about-text">
              {profile.about.map((p, i) => (
                <p key={p} className={i === 0 ? "lead" : undefined}>{p}</p>
              ))}
            </div>
            {photoUrl && (
              <figure className="portrait">
                <img
                  src={photoUrl}
                  alt={`Portrait of ${profile.name}`}
                  width="640"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{profile.location}</figcaption>
              </figure>
            )}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <article className="role">
            <header>
              <h3>{job.title}</h3>
              <p className="meta">{job.meta}</p>
            </header>
            {job.clients.map((c) => (
              <div className="client-block" key={c.name}>
                <p className="client">{c.name}</p>
                {c.groups.map((g) => (
                  <div className="group" key={g.label || "all"}>
                    {g.label && <h4>{g.label}</h4>}
                    <ul>
                      {g.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </article>
        </Section>

        <Section id="projects" title="Projects" reveal={false}>
          <div className="proj-list">
            {projects.map((p, i) => (
              <Project p={p} index={i} key={p.slug} />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="skills">
            {skills.map(([label, items]) => (
              <div className="row" key={label}>
                <dt>{label}</dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education and awards">
          <div className="facts">
            {education.map((e) => (
              <div key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
                {e.when && <p className="when">{e.when}</p>}
              </div>
            ))}
          </div>
          <div className="facts facts-awards">
            {recognition.map((e) => (
              <div key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <p className="contact-lede">
            Open to full-time MERN and full-stack roles in{" "}
            {profile.openTo.slice(0, -1).join(", ")} and{" "}
            {profile.openTo[profile.openTo.length - 1]}.
          </p>
          <div className="email-row">
            <a className="email" id="v-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <CopyButton text={profile.email} targetId="v-email" id="c-email" />
          </div>
          <ul className="contact-list">
            <li>
              <span className="lbl">Phone</span>
              <span className="val" id="v-phone">{profile.phone}</span>
              <CopyButton text={profile.phone} targetId="v-phone" id="c-phone" />
            </li>
            <li>
              <span className="lbl">Location</span>
              <span className="val">{profile.location}</span>
            </li>
            <li>
              <span className="lbl">LinkedIn</span>
              {profile.linkedinUrl ? (
                <a className="val" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                  {profile.linkedinLabel}
                </a>
              ) : (
                <span className="val">{profile.linkedinLabel}</span>
              )}
            </li>
            {profile.githubUrl && (
              <li>
                <span className="lbl">GitHub</span>
                <a className="val" href={profile.githubUrl} target="_blank" rel="noreferrer">
                  GitHub profile
                </a>
              </li>
            )}
          </ul>
        </Section>
      </main>

      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </div>
  );
}
