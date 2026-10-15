import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowRight, FiCode, FiUsers, FiMessageSquare, FiArrowUpRight } from "react-icons/fi";
import { Brand } from "./UI";
import Footer from "./Footer";
const steps = [
  { icon: FiCode, title: "Let your work speak.", text: "Introduce yourself with a profile that puts your skills and interests first." },
  { icon: FiUsers, title: "Find common ground.", text: "Discover developers, explore their tech stacks, and send a connection request." },
  { icon: FiMessageSquare, title: "Start a conversation.", text: "Turn a connection into a conversation with real-time messaging." },
];
export default function HomePage() {
  const user = useSelector((store) => store.user);
  return <div className="dm-landing">
    <a className="dm-skip" href="#main-content">Skip to content</a>
    <header className="dm-public-header"><nav className="dm-container"><Brand /><a href="#how-it-works" className="dm-public-about">How it works</a><div className="dm-inline"><Link to={user ? "/feed" : "/login"} className="dm-text-link">{user ? "Your workspace" : "Log in"}</Link><Link to={user ? "/profile" : "/signup"} className="dm-button dm-button-small">{user ? "Your profile" : "Get started"}<FiArrowUpRight /></Link></div></nav></header>
    <main id="main-content">
      <section className="dm-hero dm-container">
        <div className="dm-hero-copy"><p className="dm-eyebrow"><span className="dm-status-dot" /> A NETWORK FOR THE PEOPLE WHO BUILD</p><h1>Find your people.<br /><span>Build what’s next.</span></h1><p className="dm-hero-description">Good code starts with an idea.<br />Great things start with the right people.</p><p className="dm-muted">Connect with developers who share your ambition, discover meaningful collaborations, and grow your network.</p><div className="dm-hero-actions"><Link to={user ? "/feed" : "/signup"} className="dm-button">{user ? "Discover developers" : "Find your people"}<FiArrowRight /></Link><a href="#how-it-works" className="dm-button dm-button-secondary">See how it works</a></div><p className="dm-hero-footnote">Your skills. Your interests. Your next connection.</p></div>
        <div className="dm-network-visual" aria-label="Discover, connect, and start a conversation">
          <div className="dm-orbit dm-orbit-one" /><div className="dm-orbit dm-orbit-two" />
          <div className="dm-network-center"><FiCode /><span>devmatch</span></div>
          <div className="dm-network-node dm-node-one"><FiCode /><div><small>01 / DISCOVER</small><strong>A shared curiosity.</strong></div></div>
          <div className="dm-network-node dm-node-two"><FiUsers /><div><small>02 / CONNECT</small><strong>A new perspective.</strong></div></div>
          <div className="dm-network-node dm-node-three"><FiMessageSquare /><div><small>03 / CONVERSATION</small><strong>A simple hello.</strong></div></div>
          <div className="dm-visual-caption"><span /> Built around connection.</div>
        </div>
      </section>
      <section id="how-it-works" className="dm-how dm-container"><div className="dm-section-title"><p className="dm-eyebrow">LESS NOISE. MORE CONNECTION.</p><h2>There’s a person behind every commit.</h2><p className="dm-muted">Get to know the developers you could build with.</p></div><div className="dm-feature-grid">{steps.map(({icon: Icon, title, text}, index) => <article key={title} className="dm-feature"><div className="dm-feature-top"><Icon /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="dm-cta dm-container"><div><p className="dm-eyebrow">MAKE YOUR NEXT CONNECTION</p><h2>Your next “hello” could lead somewhere.</h2></div><Link to={user ? "/feed" : "/signup"} className="dm-button">Let’s find out <FiArrowRight /></Link></section>
    </main><Footer />
  </div>;
}
