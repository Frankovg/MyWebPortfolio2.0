const defaultProject = {
  id: 'cm6q3wlfp0034y1owsjxc0bn4',
  title: 'Testing Data 3',
  shortDescription: 'This is a test 3 project',
  description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  image: 'imageURl',
  slug: 'testing-data-3',
  repository: null,
  websiteUrl: 'url',
  videoUrl: null,
  videoTitle: null,
  videoDescription: null,
  company: 'company name',
  companyUrl: 'companyURl',
  client: 'client name',
  clientUrl: 'clientURl',
  categoryId: 'cm6q3wlfp0033y1owm11xlr9a',
  date: new Date("2025-02-04T00:00:00.000Z"),
  updatedAt: new Date("2025-02-04T06:36:24.326Z"),
  createdAt: new Date("2025-02-04T06:36:24.326Z"),
  published: true,
  techStack: [{ id: 'cm6q3wlfp0034y1owsjxc0bn4', name: 'Test Tech', value: 'test-tech' }]
}

const defaultCategories = {
  id: 'cm6q3wlfp0033y1owm11xlr9a',
  name: 'Test Category',
  value: 'graphic-design',
  projects: [
    defaultProject,
    {
      ...defaultProject,
      id: 'cm6q3wlfp0034y1owsjxc0bn4',
      title: 'Testing Data 4',
      shortDescription: 'This is a test 4 project',
      slug: 'testing-data-4',
    }
  ]
}

export const mockCategories = {
  categoryData: [
    defaultCategories,
    {
      ...defaultCategories,
      id: 'cm6q3wlfp0033y1owm11xlr9a',
      name: 'Testing Data 2',
      value: 'testing-data-2',
    }
  ],

  categoryWithoutProjects: [
    {
      ...defaultCategories,
      projects: []
    }
  ],

  firstProject: defaultProject
}
