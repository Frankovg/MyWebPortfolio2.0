import { mockCategories } from "./__mocks__/categories"
import { parseCategories } from "./parse-categories"

describe('parseCategories', () => {
  // The clearMocks option in jest.config.ts automatically clears mocks
  // No need for manual afterEach with jest.clearAllMocks() anymore

  it("should return the category data with multiple projects", () => {
    // Arrange
    const expectedResult = [
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

    // Act
    const result = parseCategories(mockCategories.categoryData)

    // Assert
    expect(result).toEqual(expectedResult)
  })

  it("should return an empty array when given empty input", () => {
    // Act & Assert
    expect(parseCategories([])).toEqual([])
  })

  it("should return category data with undefined firstProjectSlug when projects array is empty", () => {
    // Arrange
    const expectedResult = [
      {
        id: 'cm6q3wlfp0033y1owm11xlr9a',
        name: 'Test Category',
        value: 'graphic-design',
        firstProjectSlug: undefined
      },
    ]

    // Act
    const result = parseCategories(mockCategories.categoryWithoutProjects)

    // Assert
    expect(result).toEqual(expectedResult)
  })

  it("should handle categories with null or undefined projects gracefully", () => {
    // Arrange
    const categoriesWithNullProjects = [
      {
        id: 'test-id',
        name: 'Test Category',
        value: 'test-value',
        projects: null as any
      }
    ]

    // Act & Assert
    expect(() => parseCategories(categoriesWithNullProjects)).not.toThrow()
  })

  it("should only extract the first project slug from each category", () => {
    // Arrange
    const categoryWithMultipleProjects = [
      {
        id: 'test-id',
        name: 'Test Category',
        value: 'test-value',
        projects: [
          { slug: 'first-project', id: '1', title: 'First' },
          { slug: 'second-project', id: '2', title: 'Second' },
          { slug: 'third-project', id: '3', title: 'Third' }
        ] as any[]
      }
    ]

    // Act
    const result = parseCategories(categoryWithMultipleProjects)

    // Assert
    expect(result[0].firstProjectSlug).toBe('first-project')
  })
})
