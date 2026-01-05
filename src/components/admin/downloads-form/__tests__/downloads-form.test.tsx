import { render, screen } from '@testing-library/react';

import { FileSection } from '../sections/file-section';

// Mock constants
jest.mock('@/lib/constants', () => ({
  DEFAULT_FILE_URL: 'https://example.com/files/',
  GOOGLE_DRIVE_IMAGE_URL: 'https://example.com/images/',
  CLOUDINARY_IMAGE_URL: 'https://cloudinary.com/images/',
  IMAGE_URL_PREFIXES: ['https://example.com/images/', 'https://cloudinary.com/images/'],
  isValidImageUrl: (url: string | undefined | null) => {
    if (!url) return false;
    return ['https://example.com/images/', 'https://cloudinary.com/images/'].some(
      prefix => url.startsWith(prefix) && url.length > prefix.length
    );
  },
  getImageUrlPlaceholder: () => 'https://example.com/images/ or https://cloudinary.com/images/',
}));

// Mock form store values
const mockRegister = jest.fn().mockReturnValue({});
const mockTrigger = jest.fn();
const mockGetValues = jest.fn().mockReturnValue({
  imageUrl: '',
  fileHref: '',
});
const mockWatch = jest.fn().mockReturnValue('');

let mockErrors: Record<string, { message: string }> = {};
let mockIsPending = false;
const mockOnSubmit = jest.fn();

jest.mock('@/stores/use-download-form-store', () => ({
  useDownloadFormStore: () => ({
    register: mockRegister,
    errors: mockErrors,
    isPending: mockIsPending,
    onSubmit: mockOnSubmit,
    trigger: mockTrigger,
    getValues: mockGetValues,
    watch: mockWatch,
    control: {},
  }),
}));

// Mock Controller from react-hook-form
jest.mock('react-hook-form', () => ({
  Controller: ({ name, render }: { name: string; render: (props: any) => React.ReactNode }) => {
    const field = {
      name,
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    };
    return render({ field });
  },
}));

// Mock LabelLink component
jest.mock('../../label-link', () => ({
  LabelLink: ({ href, label }: { href: string; label: string }) => (
    <a href={href} data-testid="label-link">{label}</a>
  ),
}));

describe('DownloadsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockErrors = {};
    mockIsPending = false;
    mockWatch.mockReturnValue('');
    mockGetValues.mockReturnValue({
      imageUrl: '',
      fileHref: '',
    });
  });

  describe('FileSection', () => {
    describe('Rendering', () => {
      it('should render the section title', () => {
        render(<FileSection />);

        expect(screen.getByText('File details')).toBeInTheDocument();
      });

      it('should render name input', () => {
        render(<FileSection />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      });

      it('should render file url input', () => {
        render(<FileSection />);

        expect(screen.getByLabelText(/file url/i)).toBeInTheDocument();
      });

      it('should render format input', () => {
        render(<FileSection />);

        expect(screen.getByLabelText(/format/i)).toBeInTheDocument();
      });

      it('should render image url input', () => {
        render(<FileSection />);

        expect(screen.getByLabelText(/hero image url/i)).toBeInTheDocument();
      });

      it('should render alternative text input', () => {
        render(<FileSection />);

        expect(screen.getByLabelText(/alternative text/i)).toBeInTheDocument();
      });

      it('should render description textarea', () => {
        render(<FileSection />);

        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      });

      it('should render publish checkbox', () => {
        render(<FileSection />);

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByText(/publish the file/i)).toBeInTheDocument();
      });

      it('should render placeholder for file url', () => {
        render(<FileSection />);

        expect(screen.getByPlaceholderText('https://example.com/files/')).toBeInTheDocument();
      });

      it('should render placeholder for image url', () => {
        render(<FileSection />);

        expect(screen.getByPlaceholderText('https://example.com/images/ or https://cloudinary.com/images/')).toBeInTheDocument();
      });
    });

    describe('Error Display', () => {
      it('should display error message for name when error exists', () => {
        mockErrors = {
          name: { message: 'Name is required' },
        };

        render(<FileSection />);

        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });

      it('should display error message for fileHref when error exists', () => {
        mockErrors = {
          fileHref: { message: 'File URL is required' },
        };

        render(<FileSection />);

        expect(screen.getByText('File URL is required')).toBeInTheDocument();
      });

      it('should display error message for format when error exists', () => {
        mockErrors = {
          format: { message: 'Format is required' },
        };

        render(<FileSection />);

        expect(screen.getByText('Format is required')).toBeInTheDocument();
      });

      it('should display error message for imageUrl when error exists', () => {
        mockErrors = {
          imageUrl: { message: 'Image URL is required' },
        };

        render(<FileSection />);

        expect(screen.getByText('Image URL is required')).toBeInTheDocument();
      });

      it('should display error message for alt when error exists', () => {
        mockErrors = {
          alt: { message: 'Alternative text is required' },
        };

        render(<FileSection />);

        expect(screen.getByText('Alternative text is required')).toBeInTheDocument();
      });

      it('should display error message for description when error exists', () => {
        mockErrors = {
          description: { message: 'Description is required' },
        };

        render(<FileSection />);

        expect(screen.getByText('Description is required')).toBeInTheDocument();
      });

      it('should not display error messages when there are no errors', () => {
        mockErrors = {};

        render(<FileSection />);

        expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
      });
    });

    describe('Link Display', () => {
      it('should not show file link when file URL is not set', () => {
        mockWatch.mockReturnValue('');
        mockGetValues.mockReturnValue({ fileHref: '' });

        render(<FileSection />);

        expect(screen.queryByText('Open file')).not.toBeInTheDocument();
      });

      it('should not show image link when image URL is not set', () => {
        mockWatch.mockReturnValue('');
        mockGetValues.mockReturnValue({ imageUrl: '' });

        render(<FileSection />);

        expect(screen.queryByText('Open image')).not.toBeInTheDocument();
      });
    });

    describe('Form Interaction', () => {
      it('should render editable name input', () => {
        render(<FileSection />);

        const nameInput = screen.getByRole('textbox', { name: /name/i });
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).not.toBeDisabled();
      });

      it('should render editable file url input', () => {
        render(<FileSection />);

        const fileUrlInput = screen.getByLabelText(/file url/i);
        expect(fileUrlInput).toBeInTheDocument();
        expect(fileUrlInput).not.toBeDisabled();
      });

      it('should render editable description textarea', () => {
        render(<FileSection />);

        const descriptionInput = screen.getByLabelText(/description/i);
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).not.toBeDisabled();
      });
    });

    describe('Accessibility', () => {
      it('should have associated labels for all inputs', () => {
        render(<FileSection />);

        expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /file url/i })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /format/i })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /hero image url/i })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /alternative text/i })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
      });

      it('should have proper id attributes for inputs', () => {
        render(<FileSection />);

        expect(screen.getByRole('textbox', { name: /name/i })).toHaveAttribute('id', 'name');
        expect(screen.getByRole('textbox', { name: /file url/i })).toHaveAttribute('id', 'fileHref');
        expect(screen.getByRole('textbox', { name: /format/i })).toHaveAttribute('id', 'format');
        expect(screen.getByRole('textbox', { name: /hero image url/i })).toHaveAttribute('id', 'imageUrl');
        expect(screen.getByRole('textbox', { name: /alternative text/i })).toHaveAttribute('id', 'alt');
        expect(screen.getByRole('textbox', { name: /description/i })).toHaveAttribute('id', 'description');
      });
    });
  });
});
