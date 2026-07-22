import Image from "next/image";
import { SiteEffects } from "./components/SiteEffects";
import { SiteHeader } from "./components/SiteHeader";
import { WhatsAppLauncher } from "./components/WhatsAppLauncher";

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "solucoes", label: "Soluções" },
  { id: "varejo", label: "Escola do Varejo" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "equipe", label: "Equipe" },
  { id: "contato", label: "Contato" },
] as const;

const contactOptions = [
  {
    name: "Roque Júnior",
    role: "Consultor sênior",
    phone: "(15) 9 9143-1518",
    href: "https://wa.me/5515991431518",
  },
  {
    name: "Vitor Almeida",
    role: "Área comercial",
    phone: "(11) 9 9766-3723",
    href: "https://wa.me/5511997663723",
  },
] as const;

const focusAreas = [
  {
    number: "01",
    title: "Capacitação de pessoas",
    text: "Desenvolvemos competências e habilidades essenciais para transformar conhecimento em ação.",
  },
  {
    number: "02",
    title: "Desenvolvimento de liderança",
    text: "Formamos e desenvolvemos líderes que mobilizam pessoas e geram resultados sustentáveis.",
  },
  {
    number: "03",
    title: "Resultados",
    text: "Transformamos potencial humano em performance real para pessoas, equipes e negócios.",
  },
] as const;

const specialties = [
  {
    number: "01",
    title: "Liderança",
    text: "Transformamos gestores em líderes que inspiram pessoas, fortalecem equipes e entregam resultados.",
    skills: ["Comunicação", "Feedback", "Gestão de pessoas", "Inteligência emocional", "Cultura de alta performance"],
  },
  {
    number: "02",
    title: "Área comercial",
    text: "Transformamos equipes comerciais em times de alta performance.",
    skills: ["Vendas consultivas", "Negociação", "Comunicação", "Atendimento", "Prospecção"],
  },
  {
    number: "03",
    title: "Varejo — Escola do Varejo Digital",
    text: "Microlearning e inteligência artificial para treinamentos rápidos, personalizados e contínuos na rotina do colaborador.",
    skills: ["Aprendizado na rotina", "Conteúdo personalizado", "Gestão em tempo real"],
  },
  {
    number: "04",
    title: "Perfil comportamental",
    text: "Mapeamos características, estilos de comunicação, pontos fortes e oportunidades de desenvolvimento.",
    skills: ["Autoconhecimento", "Comunicação", "Desenvolvimento"],
  },
] as const;

const retailFeatures = [
  {
    number: "01",
    title: "Suporte em rota",
    text: "Orientações de merchandising, argumentação de vendas e checagem de processos antes da visita ao cliente.",
  },
  {
    number: "02",
    title: "Dúvidas resolvidas na hora",
    text: "Respostas técnicas e operacionais no ato, sem depender da disponibilidade do supervisor.",
  },
  {
    number: "03",
    title: "Sugestões inteligentes",
    text: "Abordagens personalizadas e insights rápidos para potencializar os resultados do dia.",
  },
] as const;

const clientLogos = [
  ["General Mills", "general-mills.png"], ["Fisher-Price", "fisher-price.jpeg"],
  ["Chevrolet", "chevrolet.jpeg"], ["Vale Dourado", "vale-dourado.jpeg"],
  ["Heineken", "heineken.jpeg"], ["ZF", "zf.jpeg"], ["Solar", "solar.jpeg"],
  ["Miolo", "miolo.jpeg"], ["Philip Morris", "philip-morris.jpeg"],
  ["Pilecco Nobre", "pilecco-nobre.png"], ["Pullman", "pullman.jpeg"],
  ["Danone", "danone.jpeg"], ["J. Macêdo", "j-macedo.jpeg"],
  ["Sorocaba Refrescos", "sorocaba-refrescos.jpeg"], ["Yoki", "yoki.png"],
  ["Dia", "dia.png"], ["Dona Benta", "dona-benta.jpeg"], ["Ekobé", "ekobe.png"],
  ["Hering Store", "hering-store.jpeg"], ["DSM", "dsm.png"],
  ["Votorantim", "votorantim.jpeg"], ["Instituto Tortuga", "instituto-tortuga.png"],
  ["Wickbold", "wickbold.png"], ["Usina Laguna", "usina-laguna.png"],
  ["Sol", "sol.png"], ["Rose Plastic", "rose-plastic.png"], ["DCBio", "dcbio.jpeg"],
  ["Premoltex", "premoltex.png"], ["Nemera", "nemera.jpeg"], ["Caeté", "caete.png"],
  ["Kitano", "kitano.png"], ["Coca-Cola", "coca-cola.png"],
  ["Farmabase", "farmabase.png"], ["Nova Slub", "nova-slub.png"], ["Gral", "gral.png"],
] as const;

const team = [
  {
    name: "Roque Júnior",
    role: "Psicólogo | Especialista em Comportamento Humano",
    image: "/assets/roque-junior.png",
    text: "Atua no desenvolvimento humano, na análise comportamental e na compreensão dos fatores que influenciam atitudes, comunicação e performance profissional.",
  },
  {
    name: "Vinicius Trapp",
    role: "Administrador | Especialista em Gestão de Negócios",
    image: "/assets/vinicius-trapp.png",
    text: "Formado em Administração, com experiência em grandes empresas e atuação em gestão, processos e desenvolvimento estratégico de negócios.",
  },
  {
    name: "Vitor Vieira",
    role: "Especialista Comercial | Desenvolvimento de Negócios",
    image: "/assets/vitor-vieira.png",
    text: "Responsável pela área comercial da RVJ, com atuação em estratégia de mercado, relacionamento com empresas e construção de soluções alinhadas aos desafios dos clientes.",
  },
] as const;

export default function Home() {
  return (
    <>
      <SiteEffects />
      <SiteHeader navItems={navItems} />

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <Image
              src="/assets/hero-rvj.webp"
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
            />
          </div>
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light">Treinamento · Consultoria · Liderança</p>
              <h1 id="hero-title" tabIndex={-1}>
                <span>Desenvolvendo pessoas.</span>
                <span>Fortalecendo líderes.</span>
                <span className="hero-accent">Gerando resultados.</span>
              </h1>
              <p className="hero-lede">
                Há mais de 30 anos, a RVJ atua ao lado das maiores empresas do mercado,
                transformando o potencial humano em performance e resultado.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#contato">
                  Fale com um especialista <span aria-hidden="true">→</span>
                </a>
                <a className="text-link text-link-light" href="#solucoes">
                  Conheça nossas soluções <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="experience-badge">
              <strong>30+</strong>
              <span>anos de experiência</span>
            </div>
          </div>

          <a className="scroll-cue" href="#solucoes" aria-label="Explore: ir para a seção de soluções">
            <span>Explore</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className="focus-section section-shell" id="solucoes" aria-labelledby="focus-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Nosso foco</p>
            <h2 id="focus-title" tabIndex={-1}>
              Desenvolvimento que move <span className="accent-word">pessoas e negócios.</span>
            </h2>
            <p>
              Construímos experiências de aprendizagem que fortalecem competências,
              lideranças e resultados no dia a dia.
            </p>
          </div>

          <div className="focus-grid">
            {focusAreas.map((item) => (
              <article className="focus-card" key={item.number} data-reveal>
                <span className="card-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="specialties-section section-shell" aria-labelledby="specialties-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Somos especialistas em</p>
            <h2 id="specialties-title" tabIndex={-1}>
              Competências que sustentam a <span className="accent-word">alta performance.</span>
            </h2>
            <p>Soluções construídas para os desafios reais de líderes, equipes e operações.</p>
          </div>

          <div className="specialties-grid">
            {specialties.map((item) => (
              <article className="specialty-card" key={item.number} data-reveal>
                <div className="specialty-card-top">
                  <span className="specialty-number">{item.number}</span>
                  <span className="specialty-line" aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul aria-label={`Competências de ${item.title}`}>
                  {item.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="retail-section" id="varejo" aria-labelledby="retail-title">
          <div className="retail-inner">
            <div className="retail-copy" data-reveal>
              <p className="eyebrow eyebrow-light">Solução exclusiva</p>
              <h2 id="retail-title" tabIndex={-1}>
                Escola do <span className="accent-word accent-word-light">Varejo Digital</span>
              </h2>
              <p className="retail-lede">
                Treine sua equipe de vendas com o <strong>Varejinho</strong>, a inteligência artificial
                da Escola do Varejo Digital.
              </p>
              <p>
                Personalizamos a inteligência para a cultura e a necessidade da sua empresa,
                entregando treinamentos práticos diretamente pelo WhatsApp.
              </p>

              <div className="retail-features" role="list" aria-label="Benefícios do Varejinho">
                {retailFeatures.map((item) => (
                  <div key={item.number} role="listitem">
                    <span>{item.number}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a className="button button-outline-light" href="https://escoladovarejo.app" target="_blank" rel="noreferrer">
                Conheça a Escola do Varejo <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="retail-visual" data-reveal>
              <div className="retail-orbit" aria-hidden="true" />
              <Image
                src="/assets/varejinho.jpeg"
                alt="Varejinho, assistente virtual da Escola do Varejo Digital"
                width={1440}
                height={2160}
                unoptimized
                sizes="(max-width: 800px) 88vw, 42vw"
              />
              <div className="retail-callout">
                <span>24/7</span>
                <strong>O consultor de bolso da sua equipe.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="trajectory-section section-shell" id="trajetoria" aria-labelledby="trajectory-title">
          <div className="trajectory-intro" data-reveal>
            <div className="section-heading">
              <p className="eyebrow">Nossa trajetória</p>
              <h2 id="trajectory-title" tabIndex={-1}>
                Experiência construída ao lado de <span className="accent-word">grandes marcas.</span>
              </h2>
            </div>
            <p>
              Ao longo de mais de 30 anos, a RVJ contribuiu para o desenvolvimento de pessoas,
              equipes e líderes em empresas de diferentes segmentos.
            </p>
          </div>

          <div className="metrics-strip" role="list" aria-label="Indicadores da trajetória da RVJ" data-reveal>
            <div role="listitem"><strong>30+</strong><span>Anos de experiência</span></div>
            <div role="listitem"><strong>35</strong><span>Marcas na trajetória</span></div>
            <div role="listitem"><strong>3</strong><span>Especialistas</span></div>
          </div>

          <div className="logo-cloud" role="list" aria-label="Empresas que fazem parte da trajetória da RVJ">
            {clientLogos.map(([name, file]) => (
              <div className="logo-tile" role="listitem" key={name} data-reveal>
                <Image
                  src={`/assets/clients/${file}`}
                  alt={name}
                  width={180}
                  height={54}
                  unoptimized
                  sizes="(max-width: 520px) 38vw, (max-width: 800px) 24vw, 140px"
                />
              </div>
            ))}
          </div>

          <blockquote data-reveal>
            “Grandes empresas são construídas por grandes pessoas. Nossa missão é desenvolver quem faz o negócio acontecer.”
          </blockquote>
        </section>

        <section className="team-section section-shell" id="equipe" aria-labelledby="team-title">
          <div className="team-heading" data-reveal>
            <div className="section-heading">
              <p className="eyebrow">Nossa equipe</p>
              <h2 id="team-title" tabIndex={-1}>
                Nosso time de <span className="accent-word">especialistas.</span>
              </h2>
            </div>
            <p>Experiência multidisciplinar para desenvolver pessoas e negócios.</p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <article className="team-card" key={member.name} data-reveal>
                <div className="team-photo">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized
                    sizes="(max-width: 800px) 92vw, (max-width: 1040px) 45vw, 31vw"
                  />
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <div className="team-card-copy">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p>{member.text}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="team-quote" data-reveal>
            Unindo conhecimento, experiência e estratégia para transformar pessoas em resultados.
          </p>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="contact-title">
          <div className="contact-panel" data-reveal>
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light">Vamos conversar?</p>
              <h2 id="contact-title" tabIndex={-1}>
                Empresas melhores são construídas por <span className="accent-word accent-word-light">pessoas melhores.</span>
              </h2>
              <p>
                A RVJ está pronta para ser sua parceira estratégica. Desenvolvemos as pessoas certas,
                com as competências certas, para transformar os resultados da sua organização.
              </p>
            </div>

            <div className="contact-cards">
              {contactOptions.map((contact) => (
                <a href={contact.href} target="_blank" rel="noreferrer" className="contact-card" key={contact.href}>
                  <span>{contact.role}</span>
                  <strong>{contact.name}</strong>
                  <small>WhatsApp · {contact.phone}</small>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>

            <nav className="social-links" aria-label="Canais da RVJ">
              <a href="https://www.linkedin.com/in/roquejuniorrvjtreinamentos" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://www.instagram.com/rvjconsultoria/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://escoladovarejo.app" target="_blank" rel="noreferrer">Escola do Varejo ↗</a>
            </nav>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <Image
            src="/assets/rvj-logo.png"
            alt="RVJ Treinamentos e Consultoria"
            width={552}
            height={150}
            unoptimized
          />
          <p>Desenvolvendo pessoas. Fortalecendo líderes. Gerando resultados.</p>
        </div>

        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <strong>Navegação</strong>
          {navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
        </nav>

        <div className="footer-contact">
          <strong>Contato</strong>
          {contactOptions.map((contact) => (
            <a href={contact.href} target="_blank" rel="noreferrer" key={contact.href}>
              {contact.role} · {contact.phone}
            </a>
          ))}
          <div>
            <a href="https://www.linkedin.com/in/roquejuniorrvjtreinamentos" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/rvjconsultoria/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 RVJ Treinamento e Desenvolvimento.</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>

      <WhatsAppLauncher options={contactOptions} />
    </>
  );
}
