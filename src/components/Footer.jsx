import { motion } from "motion/react";
import { LinkedInIcon, MailIcon, GithubIcon, PhoneIcon } from "./icons.jsx";
import { calButtonProps } from "../lib/booking.js";
import { fadeUp, stagger, inView } from "../lib/motion.js";
import Legal from "./Legal.jsx";
import { Typewriter, Scramble } from "./TextFx.jsx";
import {
  Container,
  Prompt,
  Kbd,
  buttonStyles,
  linkClass,
  NewTabHint,
} from "./ui.jsx";

const EMAIL = "brieuc.degoussencourt@gmail.com";
const PHONE = "+32 472 80 22 25";
const LINKEDIN = "https://www.linkedin.com/in/brieuc-de-goussencourt-003324304";
const GITHUB = "https://github.com/brieucdegoussencourt";

export default function Footer() {
  const year = new Date().getFullYear();
  const barLink = `${linkClass} min-h-11 hover:text-white`;

  return (
    <footer id="contact" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="overflow-hidden rounded-2xl bg-ink text-white">
        {/* Closing invitation, framed as a terminal session */}
        <section aria-labelledby="contact-title" className="py-16 sm:py-24">
          <Container>
            <motion.div variants={stagger(0.08)} {...inView}>
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 border-b border-white/10 pb-4"
              >
                <span className="font-mono text-[13px] text-white/40" aria-hidden="true">
                  04
                </span>
                <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                <Prompt cmd="contact --nouveau-projet" tone="dark" cursor />
              </motion.div>

              <div className="grid gap-6 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12">
                <Typewriter
                  as="h2"
                  id="contact-title"
                  className="text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:col-span-6"
                >
                  Vous avez un projet en tête ?
                </Typewriter>
                <motion.div variants={fadeUp} className="space-y-8 lg:col-span-6 lg:pt-2">
                  <Scramble className="text-lg leading-relaxed text-white/70">
                    Le plus simple, c'est d'en parler. Prenez rendez-vous,
                    appelez-moi ou écrivez-moi, je vous réponds rapidement.
                  </Scramble>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button type="button" {...calButtonProps} className={buttonStyles.primaryOnDark}>
                      Prendre rendez-vous
                      <Kbd className="border-ink/15 text-ink/60">↵</Kbd>
                    </button>
                    <a href={`tel:${PHONE.replace(/\s/g, "")}`} className={buttonStyles.secondaryOnDark}>
                      <PhoneIcon className="h-4 w-4" />
                      <span className="sr-only">Téléphone : </span>
                      <span className="font-mono text-[13px]">{PHONE}</span>
                    </a>
                    <a href={`mailto:${EMAIL}`} className={buttonStyles.secondaryOnDark}>
                      <MailIcon className="h-4 w-4" />
                      <span className="sr-only">Envoyer un </span>E-mail
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <Container className="flex flex-col gap-3 py-5 font-mono text-[13px] text-white/60 md:flex-row md:items-center md:justify-between">
            <p>
              <span className="text-white">brieuc</span>
              <span className="text-white/40">.co</span>
              <span className="mx-2 text-white/30" aria-hidden="true">·</span>© {year}
            </p>

            <nav aria-label="Liens secondaires">
              <ul className="flex flex-wrap items-center gap-x-6">
                <li>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={barLink}>
                    <LinkedInIcon className="h-3.5 w-3.5" />
                    <span className="link-underline">LinkedIn</span>
                    <NewTabHint />
                  </a>
                </li>
                <li>
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={barLink}>
                    <GithubIcon className="h-3.5 w-3.5" />
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
      </div>
    </footer>
  );
}
