import { render, act } from '@testing-library/react'

import HashScrollHandler from './hashScrollHandler'

// Mock next/navigation
const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

describe('HashScrollHandler', () => {
  let mockScrollIntoView: jest.Mock
  let hashChangeListeners: ((event: Event) => void)[]

  beforeEach(() => {
    jest.useFakeTimers()
    mockScrollIntoView = jest.fn()
    hashChangeListeners = []

    // Mock addEventListener and removeEventListener
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      if (event === 'hashchange') {
        hashChangeListeners.push(handler as (event: Event) => void)
      }
    })

    jest.spyOn(window, 'removeEventListener').mockImplementation((event, handler) => {
      if (event === 'hashchange') {
        const index = hashChangeListeners.indexOf(handler as (event: Event) => void)
        if (index > -1) {
          hashChangeListeners.splice(index, 1)
        }
      }
    })

    mockUsePathname.mockReturnValue('/')

    // Reset location hash using the proper jsdom way
    window.location.hash = ''
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
    window.location.hash = ''
  })

  it('should render null', () => {
    const { container } = render(<HashScrollHandler />)
    expect(container.firstChild).toBeNull()
  })

  it('should scroll to element immediately when hash exists on mount for "/" pathname', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'test-section'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    window.location.hash = '#test-section'
    mockUsePathname.mockReturnValue('/')

    render(<HashScrollHandler />)

    // Should scroll immediately without waiting for timer
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockElement)
  })

  it('should scroll to element when hash exists on mount for "/home" pathname', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'about'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    window.location.hash = '#about'
    mockUsePathname.mockReturnValue('/home')

    render(<HashScrollHandler />)

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockElement)
  })

  it('should not scroll when on a different pathname', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'test-section'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    window.location.hash = '#test-section'
    mockUsePathname.mockReturnValue('/projects')

    render(<HashScrollHandler />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockScrollIntoView).not.toHaveBeenCalled()

    document.body.removeChild(mockElement)
  })

  it('should retry scrolling when element does not exist initially', () => {
    window.location.hash = '#delayed-section'
    mockUsePathname.mockReturnValue('/')

    render(<HashScrollHandler />)

    // Element doesn't exist yet, so no scroll
    expect(mockScrollIntoView).not.toHaveBeenCalled()

    // Advance timer for first retry attempt
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Still no element
    expect(mockScrollIntoView).not.toHaveBeenCalled()

    // Now add the element
    const mockElement = document.createElement('div')
    mockElement.id = 'delayed-section'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    // Advance timer for next retry
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Now it should have scrolled
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockElement)
  })

  it('should stop retrying after max attempts', () => {
    window.location.hash = '#non-existent'
    mockUsePathname.mockReturnValue('/')

    render(<HashScrollHandler />)

    // Advance through all retry attempts (10 attempts * 100ms each)
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('should not scroll when there is no hash', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'test-section'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    window.location.hash = ''
    mockUsePathname.mockReturnValue('/')

    render(<HashScrollHandler />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockScrollIntoView).not.toHaveBeenCalled()

    document.body.removeChild(mockElement)
  })

  it('should add hashchange event listener on mount', () => {
    mockUsePathname.mockReturnValue('/')

    render(<HashScrollHandler />)

    expect(window.addEventListener).toHaveBeenCalledWith('hashchange', expect.any(Function))
  })

  it('should remove hashchange event listener on unmount', () => {
    mockUsePathname.mockReturnValue('/')

    const { unmount } = render(<HashScrollHandler />)

    unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith('hashchange', expect.any(Function))
  })

  it('should scroll when hashchange event is triggered', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'contact'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    mockUsePathname.mockReturnValue('/')
    window.location.hash = ''

    render(<HashScrollHandler />)

    // Simulate hash change
    window.location.hash = '#contact'
    hashChangeListeners.forEach(listener => listener(new Event('hashchange')))

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockElement)
  })

  it('should re-run effect when pathname changes', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'section'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    window.location.hash = '#section'
    mockUsePathname.mockReturnValue('/other')

    const { rerender } = render(<HashScrollHandler />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockScrollIntoView).not.toHaveBeenCalled()

    // Change pathname to home
    mockUsePathname.mockReturnValue('/')
    rerender(<HashScrollHandler />)

    // Should scroll immediately since element exists
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockElement)
  })

  it('should not add event listener when on different pathname', () => {
    mockUsePathname.mockReturnValue('/projects')

    render(<HashScrollHandler />)

    // The listener should not be added for non-home paths
    expect(hashChangeListeners.length).toBe(0)
  })

  it('should handle hash change with retry for delayed elements', () => {
    mockUsePathname.mockReturnValue('/')
    window.location.hash = ''

    render(<HashScrollHandler />)

    // Simulate hash change to a section that doesn't exist yet
    window.location.hash = '#lazy-section'
    hashChangeListeners.forEach(listener => listener(new Event('hashchange')))

    expect(mockScrollIntoView).not.toHaveBeenCalled()

    // Add the element after a delay
    const mockElement = document.createElement('div')
    mockElement.id = 'lazy-section'
    mockElement.scrollIntoView = mockScrollIntoView
    document.body.appendChild(mockElement)

    // Advance timer to allow retry
    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockElement)
  })
})
