import { ClothingRailHero, type RailGarment } from "@/components/ui/product-rail-gallery";

/** Set NEXT_PUBLIC_WHATSAPP (international format, digits only, e.g. 2126XXXXXXXX) to enable ordering buttons. */
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || null;
const orderHref = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Salam Loujy Mood, je souhaite commander un caftan.")}`
  : "#commande";

const KAFTANS: RailGarment[] = [
  {
    id: "majorelle",
    name: "Caftan Majorelle",
    image: "/kaftans/royal-blue.webp",
    tag: "Henné · Fiançailles",
    description:
      "Bleu Majorelle profond, col officier brodé de guipure et drapé noué à la taille. Une ceinture en satin bleu ciel fermée par une broche bijou.",
    details: [
      "Crêpe fluide, drapé froncé devant",
      "Guipure ton sur ton au col, au plastron et aux manches",
      "Manches évasées doublées de satin bleu ciel",
      "Ceinture satin à nouer avec broche dorée",
    ],
  },
  {
    id: "lil",
    name: "Caftan Lil",
    image: "/kaftans/noir.webp",
    tag: "Soirée · Cérémonie",
    description:
      "Velours noir, broderies en relief et sfifa le long de l'ouverture. L'élégance nocturne du caftan fassi, pensée pour les grandes soirées.",
    details: [
      "Velours noir au tombé lourd",
      "Passementerie et motifs en relief au buste et aux manches",
      "Sfifa et 3akad faits main sur toute la longueur",
      "Mdamma perlée noire assortie",
    ],
  },
  {
    id: "zmorrodi",
    name: "Caftan Zmorrodi",
    image: "/kaftans/zmorrodi.webp",
    tag: "Mariage · Aïd",
    description:
      "Brocart jacquard émeraude aux reflets dorés, bordé de sfifa verte et ceinturé d'une mdamma en médaillons ciselés. Le caftan de la lalla.",
    details: [
      "Brocart jacquard à fleurs, reflets vert et or",
      "Sfifa et 3akad tressés à la main",
      "Mdamma dorée à médaillons et broche au col",
      "Manches amples bordées de passementerie",
    ],
  },
  {
    id: "qahwa",
    name: "Caftan Qahwa",
    image: "/kaftans/qahwa.webp",
    tag: "Ramadan · Ftour",
    description:
      "Satin rayé couleur café, plastron brodé de tarz ton sur ton. Une coupe ajustée et sobre pour les ftours, les visites de l'Aïd et les réunions de famille.",
    details: [
      "Satin rayé chocolat, effet ton sur ton",
      "Tarz brodé au col en V et au plastron",
      "Taille marquée, jupe fluide jusqu'au sol",
      "Se porte avec ou sans ceinture",
    ],
  },
];

const OCCASIONS = [
  { ar: "العرس", fr: "Mariage", text: "Pour la mariée, la famille et les invitées : brocarts, mdamma dorées et caftans de cérémonie." },
  { ar: "الحناء", fr: "Henné", text: "Le vert et le bleu de la baraka, des tissus légers pour une soirée pleine de youyous." },
  { ar: "الخطوبة", fr: "Fiançailles", text: "Des couleurs franches et une guipure délicate pour la khotba et la remise des cadeaux." },
  { ar: "العيد", fr: "Aïd", text: "Caftans lumineux pour la prière, les visites et le grand repas en famille." },
  { ar: "رمضان", fr: "Ramadan", text: "Coupes confortables et satins doux pour les ftours et les soirées de Laylat al-Qadr." },
  { ar: "السهرة", fr: "Soirée", text: "Velours, broderies en relief et allure nocturne pour les grandes réceptions." },
];

const CRAFT = [
  { name: "Sfifa", text: "Galon tressé à la main qui borde l'ouverture et les manches du caftan." },
  { name: "3akad", text: "Petits boutons en fil noués un par un, signature de la couture marocaine." },
  { name: "Tarz", text: "Broderie traditionnelle, de Fès à Rabat, travaillée ton sur ton ou au fil doré." },
  { name: "Mdamma", text: "La ceinture qui structure la silhouette : métal ciselé, perles ou satin." },
];

function OrderButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href={orderHref}
      {...(WHATSAPP ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={
        "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors " +
        (light
          ? "bg-[var(--saffron)] text-[#2a1d12] hover:bg-[#e0b55c]"
          : "bg-[var(--zellige)] text-white hover:bg-[#0b4843]")
      }
    >
      {WHATSAPP ? "Commander sur WhatsApp" : "Commander mon caftan"}
    </a>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path d="M12 1l3 6.8L22 9l-5 5 1.2 7L12 17.8 5.8 21 7 14 2 9l7-1.2z" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Top band */}
      <div className="zellige h-3" aria-hidden="true" />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <a href="#" className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-semibold tracking-wide">Loujy Mood</span>
          <span className="font-arabic text-lg text-[var(--terracotta)]" lang="ar">لوجي مود</span>
        </a>
        <nav className="hidden gap-8 text-sm sm:flex">
          <a href="#collection" className="hover:text-[var(--terracotta)]">Collection</a>
          <a href="#occasions" className="hover:text-[var(--terracotta)]">Occasions</a>
          <a href="#savoir-faire" className="hover:text-[var(--terracotta)]">Savoir-faire</a>
          <a href="#commande" className="hover:text-[var(--terracotta)]">Commande</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="zellige-soft relative px-4 pb-10 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-arabic text-2xl text-[var(--terracotta)]" lang="ar">
            القفطان المغربي، أناقة كل مناسبة
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] sm:text-7xl">
            L&apos;héritage marocain,
            <br />
            <em className="font-medium text-[var(--zellige)]">pour chaque occasion</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed opacity-80">
            Caftans cousus dans la tradition : sfifa, 3akad, tarz et mdamma. Du henné au mariage, de l&apos;Aïd aux
            soirées de Ramadan, choisissez la pièce qui portera votre histoire.
          </p>
        </div>

        <div className="divider mx-auto my-10 max-w-xs" aria-hidden="true" />

        <div id="collection" className="scroll-mt-6">
          <ClothingRailHero
            items={KAFTANS}
            eyebrow="La collection"
            heading="Sur le portant"
            caption="Survolez ou touchez un caftan pour le tourner vers vous, puis ouvrez-le pour voir les détails."
            action={<OrderButton />}
            labels={{ front: "Devant", back: "Dos", close: "Fermer", show: "Voir le caftan" }}
          />
        </div>
      </section>

      {/* Occasions */}
      <section id="occasions" className="zellige scroll-mt-0 px-4 py-20 text-[#f8f1e3] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--saffron)]">Les occasions</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Un caftan pour chaque moment</h2>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OCCASIONS.map((o) => (
              <li
                key={o.fr}
                className="arch flex flex-col items-center border border-[var(--saffron)]/50 bg-[#0b4843]/85 px-6 pb-8 pt-14 text-center backdrop-blur-sm"
              >
                <Star className="h-5 w-5 text-[var(--saffron)]" />
                <p className="mt-4 font-arabic text-3xl" lang="ar">{o.ar}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--saffron)]">{o.fr}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-85">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Craft */}
      <section id="savoir-faire" className="zellige-soft scroll-mt-0 px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="arch relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden border-4 border-[var(--saffron)] bg-[#efe3cb]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kaftans/zmorrodi.webp"
              alt="Caftan Zmorrodi en brocart émeraude avec mdamma dorée"
              className="absolute inset-x-0 top-6 mx-auto h-[115%] w-auto max-w-none"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--rail-accent)]">Savoir-faire</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Le geste des maâlems</h2>
            <p className="mt-4 max-w-lg leading-relaxed opacity-80">
              Chaque caftan Loujy Mood garde les finitions qui font la couture marocaine. Ce sont elles qui donnent
              au vêtement son tombé, sa lumière et sa valeur.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {CRAFT.map((c) => (
                <div key={c.name} className="border-l-2 border-[var(--terracotta)] pl-4">
                  <dt className="font-display text-2xl font-semibold">{c.name}</dt>
                  <dd className="mt-1 text-sm leading-relaxed opacity-80">{c.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Order */}
      <section id="commande" className="scroll-mt-0 bg-[var(--terracotta)] px-4 py-20 text-[#f8f1e3] sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-arabic text-2xl" lang="ar">مرحبا بيكم</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Commander votre caftan</h2>
          <ol className="mt-10 grid gap-6 text-left sm:grid-cols-3">
            {[
              ["Choisissez", "Votre modèle et votre couleur dans la collection."],
              ["Mesurez", "Nous vous guidons pour vos mesures, ou essayage sur rendez-vous."],
              ["Recevez", "Votre caftan prêt pour le jour J, retouches comprises."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-xl border border-white/25 bg-white/5 p-5">
                <span className="font-display text-4xl text-[var(--saffron)]">0{i + 1}</span>
                <p className="mt-2 font-display text-2xl font-semibold">{t}</p>
                <p className="mt-1 text-sm opacity-85">{d}</p>
              </li>
            ))}
          </ol>
          {WHATSAPP && (
            <div className="mt-10">
              <OrderButton light />
            </div>
          )}
        </div>
      </section>

      <footer className="zellige px-4 py-10 text-center text-[#f8f1e3] sm:px-6">
        <p className="font-display text-2xl">Loujy Mood</p>
        <p className="mt-1 font-arabic text-lg text-[var(--saffron)]" lang="ar">لوجي مود · من المغرب بحب</p>
        <p className="mt-4 text-xs opacity-70">© {new Date().getFullYear()} Loujy Mood. Fait avec amour, au Maroc.</p>
      </footer>
    </main>
  );
}
