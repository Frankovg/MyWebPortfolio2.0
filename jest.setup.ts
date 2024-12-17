import '@testing-library/jest-dom'

// Extender expect
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveStyle(style: Record<string, any>): R
    }
  }
}
