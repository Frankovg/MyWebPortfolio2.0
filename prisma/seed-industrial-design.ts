import { Prisma } from "@prisma/client";

export const INDUSTRIAL_DESIGN_SEED: Prisma.CategoryCreateInput = {
  name: "Industrial Design",
  value: "industrial-design",
  projects: {
    create: [
      {
        title: "noRush",
        shortDescription: "Innovative wallet design using Tyvek® material, creating ultra-lightweight and extremely durable products with unique and original designs.",
        description: `noRush represents a pioneering approach to wallet design, developed as a collaborative venture focused on creating revolutionary accessories using Tyvek® material.
        The design challenge involved reimagining traditional wallet construction methods to accommodate Tyvek®'s distinctive characteristics, resulting in products that are significantly lighter than conventional leather wallets while being virtually tear-proof and weather-resistant.
        Through extensive prototyping and material testing, I developed proprietary folding techniques and construction methods that maximize the material's strength while creating sleek, minimalist forms that challenge conventional wallet aesthetics.
        Each wallet design incorporates unique graphic elements and color combinations that showcase Tyvek®'s printability, creating distinctive visual identities that appeal to modern consumers seeking both functionality and style.
        The project required developing specialized production techniques that could be implemented efficiently while maintaining consistent quality standards, resulting in a scalable manufacturing process that supports the brand's growth objectives.
      `,
        image: "https://drive.google.com/uc?export=view&id=1K9sLyxC7sRRjSz6dlI1WAjHgP3ThQ15U",  //TODO: replace for a better one
        slug: "norush",
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
        title: "Grupo Quiero",
        shortDescription: "Industrial design specialist at LATAM retail design studio, creating innovative point-of-sale displays and retail furniture for major brands across the region.",
        description: `As an Industrial Designer at Grupo Quiero, I contributed to Latin America's most comprehensive retail design studio, specializing in creating impactful point-of-sale displays, retail furniture, and commercial environments for major brands across the region.
          My role involved developing innovative display solutions that enhanced brand visibility and customer engagement in retail spaces, working with materials ranging from traditional wood and metal to cutting-edge plastics and composites.
          I collaborated closely with multidisciplinary teams including graphic designers, architects, and project managers to deliver integrated retail experiences that aligned with each client's brand identity and commercial objectives.
          The projects required deep understanding of manufacturing processes, cost optimization, and logistics considerations specific to Latin American markets, ensuring designs were commercially viable.
          Working with high-profile clients, I developed expertise in translating brand strategies into physical retail elements that drive sales performance while maintaining the highest standards of design excellence and build quality.
        `,
        image: "https://drive.google.com/uc?export=view&id=1KF9RUtgh-cN5NRJep2llZRkqExx4Zd9K", //TODO: replace for a better one
        slug: "grupo-quiero",
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
    ],
  },
}