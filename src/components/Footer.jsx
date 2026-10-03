import { LinkedInIcon, MailIcon, GithubIcon, PhoneIcon } from "./icons.jsx";
import { calButtonProps } from "../lib/booking.js";
import Legal from "./Legal.jsx";
import {
  Container,
  SectionHeader,
  buttonStyles,
  linkClass,
  HoverArrow,
  NewTabHint,
} from "./ui.jsx";

const EMAIL = "brieuc.degoussencourt@gmail.com";
const PHONE = "+32 472 80 22 25";
const LINKEDIN = "https://www.linkedin.com/in/brieuc-de-goussencourt-003324304";
const GITHUB = "https://github.com/brieucdegoussencourt";

export default function Footer() {
  const year = new Date().getFullYear();
  const barLink = `${linkClass} min-h-11 hover:text-canvas`;

  return (
    <footer
      id="contact"
      className="rounded-t-[2rem] bg-charcoal text-canvas sm:rounded-t-[3rem]"
    >
      {/* Closing invitation */}
      <section aria-labelledby="contact-title" className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHeader
            id="contact-title"
            tone="dark"
            eyebrow="Contact"
            title="Vous avez un projet en tête ?"
          >
            <p>
              Le plus simple, c'est d'en parler. Prenez rendez-vous, appelez-moi
              ou écrivez-moi, je vous réponds rapidement.
            </p>

            <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                {...calButtonProps}
                className={buttonStyles.primaryOnDark}
              >
                Prendre rendez-vous
                <HoverArrow />
              </button>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className={buttonStyles.secondaryOnDark}
              >
                <PhoneIcon className="h-4 w-4" />
                <span className="sr-only">Téléphone : </span>
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className={buttonStyles.secondaryOnDark}>
                <MailIcon className="h-4 w-4" />
                <span className="sr-only">Envoyer un </span>E-mail
              </a>
            </div>
          </SectionHeader>
        </Container>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-canvas/10">
        <Container className="flex flex-col gap-4 py-6 text-sm text-canvas/70 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-serif text-base text-canvas">
              Brieuc de Goussencourt<span className="text-clay-soft">.</span>
            </span>
            <span className="mx-2 text-canvas/40" aria-hidden="true">·</span>
            © {year}
          </p>

          <nav aria-label="Liens secondaires">
            <ul className="flex flex-wrap items-center gap-x-7">
              <li>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={barLink}>
                  <LinkedInIcon className="h-4 w-4" />
                  <span className="link-underline">LinkedIn</span>
                  <NewTabHint />
                </a>
              </li>
              <li>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={barLink}>
                  <GithubIcon className="h-4 w-4" />
                  <span className="link-underline">GitHub</span>
                  <NewTabHint />
                </a>
              </li>
              <li>
                <Legal className={barLink} />
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
