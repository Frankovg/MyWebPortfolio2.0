import { Prisma } from "@prisma/client";

export const INDUSTRIAL_DESIGN_SEED: Prisma.CategoryCreateInput = {
  name: "Industrial Design",
  value: "industrial-design",
  projects: {
    create: [
      {
        title: "noRush wallets",
        shortDescription: "Innovative wallet design using Tyvek® material, creating ultra-lightweight and extremely durable products with unique and original designs.",
        description: `noRush represents a pioneering approach to wallet design, developed as a collaborative venture focused on creating revolutionary accessories using Tyvek® material.
        The design challenge involved reimagining traditional wallet construction methods to accommodate Tyvek®'s distinctive characteristics, resulting in products that are significantly lighter than conventional leather wallets while being virtually tear-proof and weather-resistant.
        Through extensive prototyping and material testing, I developed proprietary folding techniques and construction methods that maximize the material's strength while creating sleek, minimalist forms that challenge conventional wallet aesthetics.
        Each wallet design incorporates unique graphic elements and color combinations that showcase Tyvek®'s printability, creating distinctive visual identities that appeal to modern consumers seeking both functionality and style.
        The project required developing specialized production techniques that could be implemented efficiently while maintaining consistent quality standards, resulting in a scalable manufacturing process that supports the brand's growth objectives.
      `,
        image: "https://drive.google.com/uc?export=view&id=1nDAHtWlx8pmNoYnjbz-lRyzxp3UnFQFj",
        slug: "norush-wallets",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1uGPWHe39uynRIiBKQNRnudv-0vf9MSV6",
              alt: "noRush Tyvek® wallet featuring vibrant floral pattern design showcasing ultra-lightweight and durable construction.",
              description: `noRush wallet featuring vibrant tropical floral pattern printed on innovative Tyvek® material. This ultra-lightweight design demonstrates the material's exceptional printability while maintaining the durability and water-resistance that makes noRush wallets revolutionary.`,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1FEAFLMu0hhzE3wxu-hdUA3S1o-D0inTU",
              alt: "noRush Tyvek® wallet with vibrant green cactus pattern on pink background, photographed on beach sand.",
              description: `The wallet exemplifies the noRush brand's innovative approach to accessory design, combining functionality with distinctive visual identity. 
                The tropical pattern demonstrates Tyvek®'s exceptional printability, allowing for vibrant, detailed graphics that would be difficult to achieve with traditional wallet materials.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1skjApwnaIyoBUp5QgW__ArNP41E0tzXk",
              alt: "noRush Tyvek® wallet featuring colorful geometric mosaic pattern in pink, blue, and green tones, displayed on natural stone surface.",
              description: `noRush wallet showcasing a vibrant geometric mosaic pattern with interconnected polygonal shapes in soft pink, turquoise blue, and pale green colors. 
                The wallet's ultra-lightweight construction and weather-resistant properties are highlighted by its outdoor setting on natural stone, emphasizing the durability that makes noRush wallets ideal for active lifestyles.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1VnEvA-0e31b6TwuLxjCGm70anZ6wKX69",
              alt: "noRush Tyvek® wallets displayed in eco-friendly recycled cardboard packaging with transparent windows showing floral and coral designs.",
              description: `noRush wallets presented in sustainable packaging made from recycled cardboard. This packaging solution reflects the brand's commitment to environmental responsibility while providing an attractive retail presentation that highlights the innovative Tyvek® material and distinctive patterns of each wallet design.`,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1aoyCTiK5UE5Fa6fyN4m3A0l8ydeOGCwk",
              alt: "noRush Tyvek® wallet featuring iconic graffiti-style collage design with pop culture references and street art elements.",
              description: `The most famous noRush wallet design featuring an eclectic graffiti-style collage that became the brand's signature piece. 
                This particular wallet design gained significant popularity for its rebellious artistic expression and became synonymous with the noRush brand identity.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1zTcyvRXrYOY6mMr3YxMcPqAcXOwaNndc",
              alt: "noRush Tyvek® wallet featuring tropical blue and green palm leaf pattern, displayed open on beach sand with ocean and coastal buildings in background.",
              description: `noRush wallet showcasing a vibrant tropical palm leaf pattern in blue and green tones. 
                The wallet's innovative Tyvek® construction is perfectly suited for coastal and outdoor activities, demonstrating its water-resistant properties and durability in sandy conditions.
              `,
            },
          ],
        },
        date: new Date("2020-11-04"),
        company: "noRush",
        techStack: {
          connect: [
            {
              value: "ps",
            },
            {
              value: "ai",
            },
            {
              value: "coreldraw",
            },
          ],
        },
        roles: {
          create: [
            {
              label: "Founder",
              value: "founder",
              percentage: 100,
            },
            {
              label: "Industrial Designer",
              value: "industrial-designer",
              percentage: 100,
            },
            {
              label: "Art Director",
              value: "art-director",
              percentage: 100,
            },
            {
              label: "Production Engineer",
              value: "production-engineer",
              percentage: 90,
            },
            {
              label: "Product Manager",
              value: "product-manager",
              percentage: 85,
            },
          ],
        },
      },
      {
        title: "Retail Design - Look & Feel",
        shortDescription: "Industrial design specialist at LATAM retail design studio, creating innovative P.O.P displays and retail furniture for major brands across the region.",
        description: `As an Industrial Designer at Grupo Quiero, I contributed to Latin America's most comprehensive retail design studio, specializing in creating impactful point-of-sale displays, retail furniture, and commercial environments for major brands across the region.
          My role involved developing innovative display solutions that enhanced brand visibility and customer engagement in retail spaces, working with materials ranging from traditional wood and metal to cutting-edge plastics and composites.
          I collaborated closely with multidisciplinary teams including graphic designers, architects, and project managers to deliver integrated retail experiences that aligned with each client's brand identity and commercial objectives.
          The projects required deep understanding of manufacturing processes, cost optimization, and logistics considerations specific to Latin American markets, ensuring designs were commercially viable.
          Working with high-profile clients, I developed expertise in translating brand strategies into physical retail elements that drive sales performance while maintaining the highest standards of design excellence and build quality.
        `,
        image: "https://drive.google.com/uc?export=view&id=1a86kXsro2-TjuSq4oKtuNyzhe-WYqFfe",
        slug: "retail-design-look-and-feel",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1e8qCZiibQAvMWz7j0D3Abf4D8pWiy-Sa",
              alt: "Three large L'Oréal Paris cosmetics retail display walls featuring organized product merchandising systems with makeup, skincare, and beauty products in sleek modular units.",
              description: `Retail display walls designed for L'Oréal Paris, showcasing comprehensive cosmetics merchandising solutions developed during my tenure at Grupo Quiero. 
                The design maximizes product visibility and customer accessibility while maintaining L'Oréal's brand identity. 
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1La2SS2nqgieR_YmvQiE27hQ1CGZSamr_",
              alt: "3D architectural rendering of New Balance outlet store interior design featuring red and black brand elements, organized product displays, and modern retail layout with athletic footwear merchandising areas.",
              description: `Complete retail outlet design for New Balance showcasing comprehensive commercial architecture and interior planning developed at Grupo Quiero. 
                The layout features strategically positioned footwear displays, organized merchandising zones, and modern fixtures that enhance the shopping experience while reinforcing New Balance's performance-oriented brand identity.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1-q6qgg2205FIOpNDlJ3s9EEyIkZ-4hOo",
              alt: "Two large cosmetics retail island displays - L'Oréal Paris and Maybelline New York 360º merchandising units featuring comprehensive product organization and brand-specific design elements in modern shopping center environment.",
              description: `Comprehensive retail island displays designed for L'Oréal Paris and Maybelline New York, showcasing 360º merchandising solutions developed at Grupo Quiero. 
                These large-format islands maximize product visibility and accessibility from all angles, featuring organized compartments for products with integrated brand identity elements.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1xiQM4YqIp7EB45pTAqU3SF_8FdNJSlwo",
              alt: "Three vertical Arcor retail displays",
              description: `Point-of-purchase displays designed for Arcor, one of Latin America's leading companies, showcasing specialized merchandising solutions for supermarket environments developed at Grupo Quiero.
                These vertical tower displays maximize product visibility in high-traffic supermarket aisles while efficiently utilizing limited floor space.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1Paq6nQkhydib-ZcuT25Iao4L-seJ-YEu",
              alt: "Rimmel London cosmetics retail display.",
              description: `Retail display designed for Rimmel London showcasing the brand's complete cosmetics range in an eye-catching red merchandising unit developed at Grupo Quiero.
                The multi-tiered design maximizes product visibility while maintaining easy customer access, with strategic lighting and product placement that enhances the shopping experience.
              `,
            },
          ],
        },
        date: new Date("2016-08-17"),
        company: "Grupo Quiero",
        companyUrl: "https://www.grupoquiero.com/",
        client: "L'oréal Paris, Movistar among others",
        techStack: {
          connect: [
            {
              value: "ps",
            },
            {
              value: "ai",
            },
            {
              value: "coreldraw",
            },
            {
              value: "rhinoceros",
            },
            {
              value: "3dsmax",
            },
            {
              value: "vray",
            },
          ],
        },
        roles: {
          create: [
            {
              label: "Industrial Designer",
              value: "industrial-designer",
              percentage: 100,
            },
            {
              label: "Technical Draftsman",
              value: "technical-draftsman",
              percentage: 90,
            },
            {
              label: "Client Relations",
              value: "client-relations",
              percentage: 50,
            },
            {
              label: "Concept Designer",
              value: "concept-designer",
              percentage: 60,
            },
            {
              label: "Sketch Artist",
              value: "sketch-artist",
              percentage: 45,
            },
          ],
        },
      },
      {
        title: "Light displays",
        shortDescription: "Prototype developer and industrial designer at specialized P.O.P solutions company, creating corrugated cardboard displays and packaging for major FMCG brands across Latin America.",
        description: `As a Prototype Developer and Industrial Designer at Micropack Americas, I specialized in creating innovative point-of-purchase solutions and packaging using corrugated cardboard for major FMCG brands across Latin America.
          My role combined hands-on prototyping with industrial design expertise, developing functional display solutions that met both aesthetic and structural requirements while optimizing manufacturing processes for corrugated cardboard production.
          Working directly with CNC cutting equipment, I translated design concepts into precise prototypes, ensuring proper fit, functionality, and structural integrity before full-scale production. This hands-on approach allowed for rapid iteration and refinement of designs.
          The position required deep understanding of corrugated cardboard properties, including grain direction, compression strength, and folding capabilities, enabling me to design displays that maximized material efficiency while maintaining visual impact.
          My work bridged the gap between creative design vision and manufacturing reality, ensuring that innovative display concepts could be efficiently produced using Micropack's specialized corrugated cardboard manufacturing capabilities.
        `,
        image: "https://drive.google.com/uc?export=view&id=1JNy47LkDZmmIxGr38hSId4M5hw5V6sBZ",
        slug: "light-displays",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1TFGAwUMMp4We1eMelXAP1YUvbF6uZ_rE",
              alt: "Cadbury retail display featuring curved arch design showcasing various chocolate products.",
              description: `Custom-designed Cadbury retail display prototype featuring an innovative curved arch configuration that maximizes product visibility while creating an eye-catching brand presence. 
                Developed at Micropack, this prototype demonstrates advanced manufacturing techniques for creating complex curved surfaces while maintaining structural integrity and optimal product accessibility for retail environments.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=12EEmNDwwxey_O7Hvv3oAJOBoKjwpf1ui",
              alt: "Milka retail display prototype featuring distinctive purple branding and curved structural design showcasing various Milka chocolate products.",
              description: `Custom-designed Milka retail display prototype featuring the brand's signature purple color scheme and innovative structural design that maximizes product visibility while creating strong brand recognition. 
                Developed at Micropack, this corrugated cardboard prototype demonstrates specialized manufacturing techniques for incorporating brand-specific colors and graphics while maintaining structural integrity and optimal product accessibility for retail environments.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1W75YqHK7aj0nc5UiBqtIOwiEHMP2aJbo",
              alt: "L'Oréal Paris Elvive hair care display tower and Maybelline New York nail polish counter display showcasing organized product merchandising with brand-specific design elements.",
              description: `Cosmetics retail displays designed for L'Oréal Paris Elvive and Maybelline New York, showcasing specialized merchandising solutions developed at Micropack. 
                The L'Oréal tower display features a vertical multi-shelf configuration optimizing floor space while maximizing product visibility for hair care products. The Maybelline counter display presents nail polish collections in an organized tray system with brand graphics that enhance product appeal and accessibility for customers.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1frev4MGM3n_HtDRpv3-TfhP3ZAxfcsD4",
              alt: "BIC Evolution display featuring vibrant alongside white corrugated cardboard prototype showing castle-inspired morphology with multiple product shelves.",
              description: `BIC retail displays showcasing the complete design development process at Micropack Americas. 
                The left image shows the final production display for BIC Evolution products. The right image reveals the initial white corrugated cardboard prototype used for morphology exploration, featuring an innovative castle-inspired design
              .`,
            },
          ],
        },
        date: new Date("2015-03-10"),
        company: "Micropack Americas",
        companyUrl: "https://micropacklatamamericas.godaddysites.com/",
        client: "Unilever, Mondeléz, Coca-Cola among others",
        techStack: {
          connect: [
            {
              value: "ps",
            },
            {
              value: "ai",
            },
            {
              value: "coreldraw",
            },
            {
              value: "rhinoceros",
            },
            {
              value: "3dsmax",
            },
            {
              value: "vray",
            },
          ],
        },
        roles: {
          create: [
            {
              label: "Industrial Designer",
              value: "industrial-designer",
              percentage: 75,
            },
            {
              label: "Technical Draftsman",
              value: "technical-draftsman",
              percentage: 25,
            },
            {
              label: "Prototype Developer",
              value: "prototype-developer",
              percentage: 100,
            },
            {
              label: "Concept Designer",
              value: "concept-designer",
              percentage: 5,
            },
            {
              label: "CNC Operator",
              value: "cnc-operator",
              percentage: 90,
            },
          ],
        },
      },
      {
        title: "Engineering",
        shortDescription: "Technical documentation and CAD engineering specialist, creating precise technical drawings, 3D models, and manufacturing specifications for industrial design projects across various sectors.",
        description: `As a Technical Engineering specialist, I developed comprehensive technical documentation and CAD modeling expertise, translating conceptual designs into precise manufacturing specifications and detailed technical drawings.
          My work encompassed creating accurate 3D models, generating technical drawings with proper dimensioning and tolerances, and developing manufacturing documentation that ensured seamless transition from design concept to production reality.
          Working with advanced CAD systems, I specialized in creating detailed assembly drawings, exploded views, and technical specifications that facilitated clear communication between design teams, manufacturers, and quality control departments.
          The role required deep understanding of manufacturing processes, material properties, and engineering standards, enabling me to optimize designs for producibility while maintaining design integrity and functionality.
          My technical documentation work supported various industrial design projects, ensuring that creative concepts could be accurately reproduced in manufacturing environments while meeting quality standards and regulatory requirements.
        `,
        image: "https://drive.google.com/uc?export=view&id=1yyU0LQSv-FeJIEBjcJynOm9h0OYG_LnK",
        slug: "engineering",
        gallery: {
          create: [
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1EEpI8IyjXjorF6CcaBcf9A_dNBm9bSYj",
              alt: "Technical engineering drawings and exploded views of a vehicle, showing detailed assembly diagrams, component breakdowns, and manufacturing specifications.",
              description: `Comprehensive technical documentation for a four-wheel drive vehicle featuring fiberglass body construction. 
                The left sheet displays detailed exploded view diagrams showing the vehicle's component hierarchy and assembly sequence. 
                The right sheet contains precise technical drawings with multiple views, cross-sections, and detailed specifications including dimensional tolerances, material callouts, and assembly instructions.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1d8wn1sfrzmqIsdCH10rOAIq9nlk6BXpV",
              alt: "Technical engineering drawings of leaf sweeper side component showing detailed measurements, cross-sections, and stress analysis simulation with color-coded stress mapping.",
              description: `Comprehensive technical documentation for a critical side component of a leaf sweeper, featuring precise dimensional specifications and engineering analysis. 
                The left panel displays a finite element analysis (FEA) simulation showing stress distribution under load conditions.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1ad4z1IkaFgKhMJ_Q5-a93q1H91MUff4O",
              alt: "Technical engineering drawings of wheelbarrow showing detailed assembly diagrams, exploded views, orthographic projections, and component specifications in professional CAD documentation format.",
              description: `The left page displays detailed orthographic projections with precise dimensional specifications, cross-sectional views, and component details including the wheel assembly and structural framework. 
                The right page showcases an exploded view diagram that clearly illustrates the hierarchical assembly sequence and individual component relationships, with numbered parts and detailed callouts. 
                The documentation includes multiple viewing angles, technical specifications, and manufacturing details essential for production.
              `,
            },
            {
              imageUrl:
                "https://drive.google.com/uc?export=view&id=1k7Iv6rqIeKVLEIW4I1EyRqlu9FwBFJL4",
              alt: "Technical instruction manual page showing Vogue Cosmetics mobile retail cart with detailed assembly diagrams, opening/closing mechanisms, and step-by-step usage instructions.",
              description: `This is an instruction manual, demonstrating the opening and closing system for this wheeled point-of-purchase display cart. 
                The technical drawings show the multi-tiered cart in various operational states, including how to remove fixing bolts, lower the frame structure, and access different storage compartments.
              .`,
            },
          ],
        },
        date: new Date("2010-06-22"),
        company: "Grupo Quiero, noRush and freelance",
        client: "L'Oréal Paris, Coty, Movistar among others",
        techStack: {
          connect: [
            {
              value: "ai",
            },
            {
              value: "rhinoceros",
            },
            {
              value: "solidworks",
            },
          ],
        },
        roles: {
          create: [
            {
              label: "Industrial Designer",
              value: "industrial-designer",
              percentage: 90,
            },
            {
              label: "Technical Draftsman",
              value: "technical-draftsman",
              percentage: 85,
            },
            {
              label: "FEA Analyst",
              value: "fea-analyst",
              percentage: 70,
            },
            {
              label: "CAD Engineer",
              value: "cad-engineer",
              percentage: 75,
            },
            {
              label: "Documentation Specialist",
              value: "documentation-specialist",
              percentage: 90,
            },
          ],
        },
      },
    ],
  },
}