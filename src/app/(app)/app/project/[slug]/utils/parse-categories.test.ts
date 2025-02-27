import { mockCategories } from "./__mocks__/categories"
import { parseCategories } from "./parse-categories"


describe('parseCategories', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return the category data with only one project", () => {
    const parsedResult = [
      {
        id: 'cm6q3wlfp0033y1owm11xlr9a',
        name: 'Test Category',
        value: 'graphic-design',
        firstProjectSlug: 'testing-data-3'
      },
      {
        id: 'cm6q3wlfp0033y1owm11xlr9a',
        name: 'Testing Data 2',
        value: 'testing-data-2',
        firstProjectSlug: 'testing-data-3'
      }
    ]
    expect(parseCategories(mockCategories.categoryData)).toEqual(parsedResult)
  })

  it("should return an empty array", () => {
    expect(parseCategories([])).toEqual([])
  })

  it("should return a category data with undefined projects", () => {
    const parsedResultWithoutProjects = [
      {
        id: 'cm6q3wlfp0033y1owm11xlr9a',
        name: 'Test Category',
        value: 'graphic-design',
        firstProjectSlug: undefined
      },
    ]
    expect(parseCategories(mockCategories.categoryWithoutProjects)).toEqual(parsedResultWithoutProjects)
  })
})