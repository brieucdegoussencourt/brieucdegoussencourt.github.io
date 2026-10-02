import { useRef } from "react";

const EMAIL = "brieuc.degoussencourt@gmail.com";
const PHONE = "+32 472 80 22 25";

// TODO (Brieuc): remplacer les champs « à compléter » par tes vraies infos.
function ToFill({ children = "à compléter" }) {
  return (
    <span className="rounded bg-dawn/30 px-1.5 font-medium text-charcoal">
      [{children}]
    </span>
  );
}

export default function Legal({ className = "" }) {
  const dialog = useRef(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={className}
      >
        Mentions légales
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="legal-title"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl rounded-3xl border border-stone bg-canvas p-0 text-left text-charcoal shadow-[0_38px_90px_-44px_rgba(58,54,49,0.6)] backdrop:bg-charcoal/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <h2 id="legal-title" className="font-serif text-3xl tracking-tight">
              Mentions légales
            </h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Fermer"
              className="-mr-2 -mt-1 rounded-full px-3 py-1 text-2xl leading-none text-charcoal-soft transition-colors hover:bg-sand hover:text-charcoal"
            >
              ×
            </button>
          </div>

          <div className="mt-8 space-y-7 text-[15px] leading-relaxed text-charcoal-soft">
            <Block title="Éditeur du site">
              <p>
                Brieuc de Goussencourt, développeur
                <br />
                Adresse : <ToFill />
                <br />
                Numéro d'entreprise (BCE) : <ToFill />
                <br />
                TVA : <ToFill />
                <br />
                E-mail :{" "}
                <a href={`mailto:${EMAIL}`} className="underline hover:text-dawn-deep">
                  {EMAIL}
                </a>
                <br />
                Téléphone : {PHONE}
              </p>
            </Block>

            <Block title="Hébergement">
              <p>
                Ce site est hébergé par GitHub Pages (GitHub, Inc.), 88 Colin P.
                Kelly Jr. Street, San Francisco, CA 94107, États-Unis.
              </p>
            </Block>

            <Block title="Propriété intellectuelle">
              <p>
                Les textes, visuels et le code de ce site appartiennent à Brieuc
                de Goussencourt, sauf mention contraire. Les captures d'écran
                des projets présentés restent la propriété de leurs
                propriétaires respectifs. Toute reproduction sans accord
                préalable est interdite.
              </p>
            </Block>

            <Block title="Données personnelles">
              <p>
                Ce site n'utilise pas de cookies de suivi ni d'outil de
                statistiques, et ne collecte aucune donnée via un formulaire.
              </p>
              <p>
                La prise de rendez-vous passe par Cal.com : les informations
                que vous y saisissez (nom, e-mail, message) servent uniquement
                à organiser notre rendez-vous et sont traitées par Cal.com
                selon sa propre politique de confidentialité. Les polices de
                caractères sont chargées depuis Google Fonts, ce qui transmet
                votre adresse IP à Google.
              </p>
              <p>
                Conformément au RGPD, vous pouvez à tout moment demander
                l'accès, la correction ou la suppression de vos données en
                m'écrivant à {EMAIL}. Vous pouvez aussi introduire une plainte
                auprès de l'Autorité de protection des données
                (autoriteprotectiondonnees.be).
              </p>
            </Block>

            <Block title="Responsabilité">
              <p>
                Je fais de mon mieux pour que les informations de ce site
                soient exactes et à jour, mais je ne peux pas garantir
                l'absence d'erreurs. Les liens vers des sites externes ne
                relèvent pas de ma responsabilité.
              </p>
            </Block>
          </div>
        </div>
      </dialog>
    </>
  );
}

function Block({ title, children }) {
  return (
    <section className="space-y-2 border-t border-stone pt-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">
        {title}
      </h3>
      {children}
    </section>
  );
}
