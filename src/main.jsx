import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./site.css";

const company = "https://greatwesterninteriors.com/";
const contact = `${company}contact-us/`;
const email = "mailto:info@greatwesterninteriors.com?subject=Ceiling%20conversion%20quote";
const media = (name) => `${import.meta.env.BASE_URL}media/${name}`;

function Arrow({ direction = "right" }) {
  const paths = {
    right: "M4 12h15m-6-6 6 6-6 6",
    down: "M12 4v15m-6-6 6 6 6-6",
    up: "M12 20V5m-6 6 6-6 6 6",
  };
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d={paths[direction]} />
    </svg>
  );
}

function FrameNavigation({ step, next, label, direction = "down" }) {
  return (
    <div className="frame-navigation">
      <div className="frame-progress">
        <span className="frame-marks" aria-hidden="true">
          {[1, 2, 3, 4].map((number) => <span key={number} className={number <= step ? "filled" : undefined} />)}
        </span>
        <span>{step} of 4</span>
      </div>
      <a className="frame-next" href={`#${next}`}>
        {label}
        <span className="frame-arrow"><Arrow direction={direction} /></span>
      </a>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href={company}>
          <img src={media("gwi-logo.svg")} width="1200" height="164" alt="Great Western Interiors home" />
        </a>
        <nav aria-label="Main navigation">
          <a className="desktop-link" href="#process">Process</a>
          <a className="desktop-link" href="#gallery">Gallery</a>
          <a className="header-quote" href="#quote">Get a quote <Arrow /></a>
        </nav>
      </div>
    </header>
  );
}

function Introduction() {
  return (
    <section className="hero frame" id="intro" aria-labelledby="intro-title" tabIndex={-1}>
      <div className="wrap frame-inner">
        <div className="frame-body hero-layout">
          <div className="hero-copy">
            <h1 id="intro-title">A smoother ceiling starts here.</h1>
            <p>Great Western Interiors converts popcorn and stippled ceilings to a smooth drywall finish, from one room to a whole-home update.</p>
          </div>
          <figure className="hero-figure">
            <img src={media("smooth-ceiling.webp")} width="720" height="900" alt="Illustrated living room with natural light across a smooth ceiling." fetchPriority="high" />
            <figcaption>Smooth ceiling finish illustration</figcaption>
          </figure>
        </div>
        <FrameNavigation step={1} next="process" label="See how it works" />
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process frame" id="process" aria-labelledby="process-title" tabIndex={-1}>
      <div className="wrap frame-inner">
        <div className="frame-body section-grid">
          <div className="section-copy">
            <h2 id="process-title">Assessment &amp; prep</h2>
            <p>Here’s what we look at before work starts.</p>
          </div>
          <ol className="process-steps" role="list">
            <li>
              <div>
                <h3>Assess the ceiling</h3>
                <p>We check the texture and drywall condition in the rooms you want to update.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Plan the prep</h3>
                <p>We plan how to protect the room and prep the ceiling, then confirm any priming or painting in your quote.</p>
              </div>
            </li>
          </ol>
        </div>
        <FrameNavigation step={2} next="gallery" label="View the gallery" />
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery frame" id="gallery" aria-labelledby="gallery-title" tabIndex={-1}>
      <div className="wrap frame-inner">
        <div className="frame-body section-grid">
          <div className="section-copy">
            <h2 id="gallery-title">Two finishes.<br />One room.</h2>
            <p>See how popcorn texture and a smooth finish catch the light in the same space.</p>
          </div>
          <figure className="comparison">
            <img src={media("ceiling-comparison.webp")} width="1500" height="1000" alt="The same living room with a popcorn ceiling on the left and a smooth ceiling on the right." loading="lazy" />
            <figcaption>
              <div className="comparison-key" aria-hidden="true"><span>Popcorn texture</span><span>Smooth finish</span></div>
              <small>Illustrative comparison</small>
            </figcaption>
          </figure>
        </div>
        <FrameNavigation step={3} next="quote" label="Get a quote" />
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="quote frame" id="quote" aria-labelledby="quote-title" tabIndex={-1}>
      <div className="wrap frame-inner">
        <div className="frame-body section-grid">
          <div className="section-copy">
            <h2 id="quote-title">Let’s talk about your ceiling.</h2>
            <p>Tell us where you’re located and which rooms you want to update. If you’re emailing us, a wide photo of the room and a close-up of the texture can help.</p>
          </div>
          <div className="contact-actions">
            <a className="quote-button" href={contact}>Request a quote <Arrow /></a>
            <a className="email-link" href={email}>Email GWI</a>
          </div>
        </div>
        <FrameNavigation step={4} next="intro" label="Back to the start" direction="up" />
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    const section = document.getElementById(location.hash.slice(1));
    section?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <Header />
      <main id="content">
        <Introduction />
        <Process />
        <Gallery />
        <Quote />
      </main>
      <footer className="wrap site-footer">
        <span>Great Western Interiors · Ceiling Conversions</span>
        <a href={company}>Main website <Arrow /></a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
