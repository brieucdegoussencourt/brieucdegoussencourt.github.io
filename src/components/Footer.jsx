import { useReveal } from "../lib/useReveal.js";
import { ArrowIcon, LinkedInIcon, MailIcon, GithubIcon } from "./icons.jsx";
import { calButtonProps } from "../lib/booking.js";

const EMAIL = "brieuc.degoussencourt@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/brieuc-de-goussencourt-003324304";
const GITHUB = "https://github.com/brieucdegoussencourt";

export default function Footer() {
  const cta = useReveal();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-charcoal text-canvas">
      {/* Closing invitation */}
      <div className="px-6 py-24 lg:px-8 lg:py-32">
        <div ref={cta} className="reveal mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-clay-soft">
            Let's Connect
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Technology should be an asset,
            <br className="hidden sm:block" /> never a headache.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-canvas/70">
            If something digital is slowing your business down — or you simply
            want it to feel more effortless — let's have a calm, jargon-free
            conversation about it.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              {...calButtonProps}
              className="group inline-flex items-center gap-2.5 rounded-full bg-canvas px-7 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:bg-dawn-soft active:scale-[0.97]"
            >
              Start the conversation
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-dawn/70 bg-dawn/10 px-7 py-3.5 text-sm font-semibold text-canvas transition-all duration-300 hover:border-dawn hover:bg-dawn/25 active:scale-[0.97]"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Standard footer bar */}
      <div className="border-t border-canvas/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 lg:flex-row lg:px-8">
          <p className="font-serif text-lg">
            Brieuc de Goussencourt<span className="text-clay-soft">.</span>
          </p>

          <nav
            aria-label="Footer"
            className="flex items-center gap-7 text-sm text-canvas/70"
          >
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-dawn-soft"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-dawn-soft"
            >
              <MailIcon className="h-4 w-4" /> Contact
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-dawn-soft"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
          </nav>
        </div>

        <p className="pb-8 text-center text-xs text-canvas/40">
          © {year} Brieuc de Goussencourt — Independent Web Developer.
        </p>
      </div>
    </footer>
  );
}
