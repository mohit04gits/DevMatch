/* eslint-disable react/prop-types -- Presentational primitives accept React nodes. */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiCode, FiArrowUpRight, FiX } from "react-icons/fi";

export function Brand() {
  return <Link to="/" className="dm-brand" aria-label="DevMatch home"><span className="dm-brand-mark"><FiCode /></span>devmatch<span className="dm-brand-dot">.</span></Link>;
}

export function PageHeading({ eyebrow, title, children, action }) {
  return <header className="dm-page-heading"><div><p className="dm-eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <p className="dm-description">{children}</p>}</div>{action}</header>;
}

export function AuthStory() {
  return <aside className="dm-auth-story"><p className="dm-eyebrow">GOOD PEOPLE. GREAT POSSIBILITIES.</p><h2>Your next chapter<br />starts with<br /><span>a connection.</span></h2><p>Meet the people behind the code. Share what you know, find a fresh perspective, and build your network.</p><div className="dm-code-window"><div><span /><span /><span /><small>connection.js</small></div><pre><span className="dm-muted">{"// Better, together."}</span>{"\n"}<span className="dm-code-purple">const</span>{" nextChapter = {\n  curiosity: "}<span className="dm-code-green">true</span>{",\n  possibilities: "}<span className="dm-code-green">&quot;open&quot;</span>{",\n  startsWith: "}<span className="dm-code-green">&quot;hello&quot;</span>{"\n};"}</pre></div><Link className="dm-text-link" to="/">Explore DevMatch <FiArrowUpRight /></Link></aside>;
}

export function PhotoDialog({ src, name, onClose }) {
  const ref = useRef(null);
  useEffect(() => { const dialog = ref.current; dialog.showModal(); return () => dialog.close(); }, []);
  return <dialog ref={ref} className="dm-photo-dialog" onCancel={onClose} onClick={(event) => { if (event.target === ref.current) onClose(); }}><button autoFocus className="dm-icon-button" onClick={onClose} aria-label="Close photo"><FiX /></button><img src={src} alt={name || "Profile photo"} /></dialog>;
}
