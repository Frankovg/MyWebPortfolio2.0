// logos
import { Ai, Node, Bootstrap, Css, EmotionCss, Express, Figma, Firebase, Git, GithubBig, Gitlab, Html, Js, Ladle, MySql, Nextjs, Playwright, PostgreSql, Prisma, Ps, ReactIcon, Sass, ShadcnUi, Sql, Storybook, StyledComponents, Tailwind, Ts, Turborepo, Vercel } from "@/icons/techs";
import { Alex, AsafeDigital, Fix, GrupoQuiero, Ikea, Micropack, Norush, Pubext } from "@/icons/jobs"
import { Amstel, Axe, CocaCola, Coty, CruzCampo, ElAguila, Garnier, Gillete, Johnsons, Loreal, Maybelline, Mondelez, Movistar, Nestle, NewBalance, Pepsico, Refresco, Rimmel, SallyHansen, TheProcterAndGambleCompany, Unilever, ViaCelere, Vichy, Volkswagen } from "@/icons/companies"

export const ROUTES = [
  {
    label: 'Home',
    path: 'home'
  },
  {
    label: 'Tech stack',
    path: 'tech-stack'
  },
  {
    label: 'Projects',
    path: 'projects'
  },
  {
    label: 'About me',
    path: 'about-me'
  },
]

export const CATEGORIES = [
  {
    label: 'Essentials for Web App Development',
    value: 'basics',
    techs: [
      { name: 'React', value: 'react', description: "A JavaScript library for building user interfaces", link: "https://es.react.dev/", icon: ReactIcon },
      { name: 'Next.js', value: 'nextjs', description: "The React Framework – created and maintained by Vercel.", link: "https://nextjs.org/", icon: Nextjs },
      { name: 'Turborepo', value: 'turborepo', description: "A multi-package repository tool for monorepos.", link: "https://turbo.build/", icon: Turborepo },
      { name: 'Typescript', value: 'typescript', description: "A typed superset of JavaScript that compiles to plain JavaScript.", link: "https://www.typescriptlang.org/", icon: Ts },
      { name: 'JavaScript', value: 'javascript', description: "A high-level, interpreted programming language.", link: "https://www.javascript.com/", icon: Js },
      { name: 'HTML', value: 'html', description: "The standard markup language for documents designed to be displayed in a web browser.", link: "https://html.com/", icon: Html },
      { name: 'CSS', value: 'css', description: "A style sheet language used for describing the presentation of a document written in a markup language such as HTML.", link: "https://css3.com/", icon: Css },
      { name: 'Node.js', value: 'node', description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for backend.", link: "https://nodejs.org/en/", icon: Node },
      { name: 'Express', value: 'express', description: "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.", link: "https://expressjs.com/", icon: Express },
    ]
  },
  {
    label: 'Styling and Related Libraries',
    value: 'styling',
    techs: [
      { name: 'Tailwind', value: 'tailwind', description: "A utility-first CSS framework for rapidly building custom designs.", link: "https://tailwindcss.com/", icon: Tailwind },
      { name: 'Sass', value: 'sass', description: "A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.", link: "https://sass-lang.com/", icon: Sass },
      { name: 'Styled Components', value: 'styledcomponents', description: "A CSS-in-JS library that allows you to write actual CSS code to style your components.", link: "https://styled-components.com/", icon: StyledComponents },
      { name: 'Emotion', value: 'emotioncss', description: "A library designed for writing css styles with JavaScript.", link: "https://emotion.sh/docs/introduction", icon: EmotionCss },
      { name: 'Bootstrap', value: 'bootstrap', description: "A free and open-source CSS framework directed at responsive, mobile-first front-end web development.", link: "https://getbootstrap.com/", icon: Bootstrap },
      { name: 'Shadcn/ui', value: 'shadcnui', description: "A component library for React applications.", link: "https://ui.shadcn.com/", icon: ShadcnUi },
    ]
  },
  {
    label: 'Design and UX/UI tools',
    value: 'design',
    techs: [
      { name: 'Figma', value: 'figma', description: "A vector graphics editor and prototyping tool which is primarily web-based.", link: "https://www.figma.com/", icon: Figma },
      { name: 'Adobe Photoshop', value: 'ps', description: "A raster graphics editor developed and published by Adobe Inc.", link: "https://www.adobe.com/es/products/photoshop/landpa.html?gclid=CjwKCAjw_ZC2BhAQEiwAXSgCljZ7mUGKQ6oPtcPdGQOY2B3qtS_38R4SRQnUjh_rWKBmNxEEHwnL-xoC1zsQAvD_BwE&mv=search&s_kwcid=AL!3085!3!697424706875!e!!g!!photoshop!1445901735!56657232416&mv=search&mv2=paidsearch&sdid=2XBSBWBF&ef_id=CjwKCAjw_ZC2BhAQEiwAXSgCljZ7mUGKQ6oPtcPdGQOY2B3qtS_38R4SRQnUjh_rWKBmNxEEHwnL-xoC1zsQAvD_BwE:G:s&s_kwcid=AL!3085!3!697424706875!e!!g!!photoshop!1445901735!56657232416&gad_source=1", icon: Ps },
      { name: 'Adobe Illustrator', value: 'ai', description: "A vector graphics editor developed and marketed by Adobe Inc.", link: "https://www.adobe.com/es/products/illustrator/campaign/pricing.html?gclid=CjwKCAjw_ZC2BhAQEiwAXSgClpGrbdrcdMPTS6Krw0cjNIqQe2p__gLRxw-dAU2RIsxBkRdmJ2RK7RoCOHoQAvD_BwE&mv=search&mv=search&mv2=paidsearch&sdid=GMCWY69B&ef_id=CjwKCAjw_ZC2BhAQEiwAXSgClpGrbdrcdMPTS6Krw0cjNIqQe2p__gLRxw-dAU2RIsxBkRdmJ2RK7RoCOHoQAvD_BwE:G:s&s_kwcid=AL!3085!3!441886954708!e!!g!!illustrator!1479761001!62724397092&gad_source=1", icon: Ai },
    ]
  },
  {
    label: 'Database Management',
    value: 'db',
    techs: [
      { name: 'SQL', value: 'sql', description: "A domain-specific language used in programming and designed for managing data held in a relational database management system.", link: "https://www.w3schools.com/sql/sql_intro.asp", icon: Sql },
      { name: 'PostgreSQL', value: 'postgresql', description: "A powerful, open source object-relational database system.", link: "https://www.postgresql.org/", icon: PostgreSql },
      { name: 'MySQL', value: 'mysql', description: "An open-source relational database management system.", link: "https://www.mysql.com/", icon: MySql },
      { name: 'Prisma', value: 'prisma', description: "It serves as a bridge between the application and the database, offering a comprehensive toolkit that simplifies database access and management.", link: "https://www.prisma.io/?via=start&gad_source=1", icon: Prisma },
    ]
  },
  {
    label: 'Testing and QA',
    value: 'testing',
    techs: [
      { name: 'Playwright', value: 'playwright', description: "It enables reliable end-to-end testing for modern web apps.", link: "https://playwright.dev/", icon: Playwright },
      { name: 'Ladle', value: 'ladle', description: "A testing library for React applications.", link: "https://ladle.dev/", icon: Ladle },
      { name: 'Storybook', value: 'storybook', description: "An open source tool for developing UI components in isolation for React, Vue, and Angular.", link: "https://storybook.js.org/", icon: Storybook },
    ]
  },
  {
    label: 'Version Control and Deployment',
    value: 'deployment',
    techs: [
      { name: 'Git', value: 'git', description: "A distributed version-control system for tracking changes in source code during software development.", link: "https://git-scm.com/", icon: Git },
      { name: 'Github', value: 'github', description: "GitHub is an online software development platform. It's used for storing, tracking, and collaborating on software projects.", link: "https://github.com/", icon: GithubBig },
      { name: 'Gitlab', value: 'gitlab', description: "A web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking, and CI/CD pipeline features, using an open-source license.", link: "https://about.gitlab.com/", icon: Gitlab },
      { name: 'Vercel', value: 'vercel', description: "A cloud platform for static sites and Serverless Functions.", link: "https://vercel.com/", icon: Vercel },
      { name: 'Firebase', value: 'firebase', description: "A platform developed by Google for creating mobile and web applications.", link: "https://firebase.google.com/", icon: Firebase },
    ]
  }
]

export const WORKED_WITH = [
  { name: 'EstudioFIX', value: 'estudio-fix', description: "An innovative industrial design studio specializing in creating functional and aesthetically pleasing products.", link: "https://www.linkedin.com/company/estudio-fix/", icon: Fix },
  { name: 'Micropack', value: 'micropack', description: "Design and development of packing, display cases, packaging, POPs (Points of Purchase), display-flash and elements of visual communication made from corrugated cardboard.", link: "https://micropacklatamamericas.godaddysites.com/", icon: Micropack },
  { name: 'Grupo Quiero', value: 'grupo-quiero', description: "A leading company specializing in brand design, P.O.P displays, and commercial architecture, dedicated to creating impactful and innovative solutions.", link: "https://www.grupoquiero.com/", icon: GrupoQuiero },
  { name: 'Norush', value: 'norush', description: "A brand of wallets made with Tyvek® known for their durability and unique design.", link: "", icon: Norush },
  { name: 'Pubext', value: 'pubext', description: "A full-service advertising agency primarily focused on outdoor advertising and large-format printing, offering tailored communication solutions for your business.", link: "https://pubext.com/", icon: Pubext },
  { name: 'Ikea', value: 'ikea', description: "A global leader in home furnishings, offering a wide range of well-designed, functional products at affordable prices.", link: "https://www.ikea.com", icon: Ikea },
  { name: 'RotulosAlex', value: 'rotulos-alex', description: "An studio specializing in creating impactful and visually appealing outdoor advertising solutions.", link: "", icon: Alex },
  { name: 'A-SAFE Digital', value: 'a-safe-digital', description: "A software development studio specializing in creating innovative and efficient digital solutions.", link: "https://asafedigital.com/", icon: AsafeDigital },
]

export const COMPANY_CLIENTS = [
  { name: 'Amstel', value: 'amstel', description: "Amstel is a Dutch brewery founded in 1870 on the Mauritskade in Amsterdam.", link: "https://www.amstel.com/", icon: Amstel },
  { name: 'Axe', value: 'axe', description: "Axe fragrances are worn by men in more than 90 countries across the globe.", link: "https://www.axe.com/", icon: Axe },
  { name: 'Coca Cola', value: 'coca-cola', description: "The Coca-Cola Company is an American corporation founded in 1892 and today engaged primarily in the manufacture and sale of syrup and concentrate for Coca-Cola, a sweetened carbonated beverage that is a cultural institution in the United States and a global symbol of American tastes.", link: "https://www.coca-cola.com/", icon: CocaCola },
  { name: 'Coty', value: 'coty', description: "Coty Inc. is an American multinational beauty company founded in 1904 by François Coty. With its subsidiaries, it develops, manufactures, markets, and distributes fragrances, cosmetics, skin care, nail care, and both professional and retail hair care products. Coty owns around 40 brands as of 2024.", link: "https://www.coty.com/", icon: Coty },
  { name: 'Cruzcampo', value: 'cruz-campo', description: "Cruzcampo was founded in Seville in 1904 – the first brewer to be based in the south of Spain, established with the ambition to brew beer that would retain its quality flavour even when served at the sub-zero temperatures demanded by the heat of the southern sun.", link: "https://www.cruzcampo.es/", icon: CruzCampo },
  { name: 'El Águila', value: 'el-aguila', description: "El Águila is a brand of Spanish beer, founded in Madrid in 1900, which in 2019 has returned to the market. It is currently owned by the Dutch brewing group Heineken International.", link: "https://cervezaelaguila.es/", icon: ElAguila },
  { name: 'Garnier', value: 'garnier', description: "Garnier is an international haircare and skincare brand with sub-brands in four categories and 7 areas of expertise. With products formulated to meet the needs of women everywhere in the world, we offer innovative, affordable care solutions.", link: "https://www.garnierusa.com/", icon: Garnier },
  { name: 'Gillete', value: 'gillete', description: "Gillette is an American brand of safety razors and other personal care products including shaving supplies, owned by the multi-national corporation Procter & Gamble (P&G).", link: "https://gillette.com/", icon: Gillete },
  { name: 'Johnson & Johnson', value: 'johnsons', description: "is an American multinational pharmaceutical, biotechnology, and medical technologies corporation headquartered in New Brunswick, New Jersey.", link: "https://www.jnj.com/", icon: Johnsons },
  { name: "L'Oréal Paris", value: 'loreal', description: "It is the world's largest cosmetics company, with activities spanning skin care, sun protection, make-up, perfume, hair care and hair color.", link: "https://www.lorealparisusa.com/", icon: Loreal },
  { name: "Maybelline", value: 'maybelline', description: "An American multinational cosmetics, skin care, perfume, and personal care company, based in New York City. It was founded in Chicago in 1914.", link: "https://www.maybelline.com/", icon: Maybelline },
  { name: "Mondeléz", value: 'mondelez', description: "The Mondelez International company manufactures chocolate, cookies, biscuits, gum, confectionery, and powdered beverages.", link: "https://www.mondelezinternational.com/", icon: Mondelez },
  { name: "Movistar", value: 'movistar', description: "Movistar is Telefónica's Spanish-speaking market brand operating in 14 countries, including Spain where it is the largest mobile phone operator with more than 20 million customers and where it also offers landline, broadband, and pay television services.", link: "https://www.movistar.es/", icon: Movistar },
  { name: "Nestlé", value: 'nestle', description: "Is a Swiss multinational food and drink processing conglomerate corporation headquartered in Vevey, Switzerland.", link: "https://www.nestle.com/", icon: Nestle },
  { name: "New Balance", value: 'new-balance', description: "New Balance Athletic Inc (New Balance) manufactures, markets and sells shoes, apparels and accessories for men, women and children.", link: "https://www.newbalance.co.uk/", icon: NewBalance },
]