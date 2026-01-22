import { getImageUrlPlaceholder, getFileUrlPlaceholder } from './utils';

describe('getImageUrlPlaceholder', () => {
  it('should return the expected placeholder string', () => {
    const placeholder = getImageUrlPlaceholder();

    expect(placeholder).toBe(
      'https://drive.google.com/uc?export=view&id= or https://res.cloudinary.com/webportfolio/image/upload/'
    );
  });

  it('should contain Google Drive URL prefix', () => {
    const placeholder = getImageUrlPlaceholder();

    expect(placeholder).toContain('https://drive.google.com/uc?export=view&id=');
  });

  it('should contain Cloudinary URL prefix', () => {
    const placeholder = getImageUrlPlaceholder();

    expect(placeholder).toContain('https://res.cloudinary.com/webportfolio/image/upload/');
  });
});

describe('getFileUrlPlaceholder', () => {
  it('should return the expected placeholder string', () => {
    const placeholder = getFileUrlPlaceholder();

    expect(placeholder).toBe(
      'https://drive.google.com/file/d/ or https://res.cloudinary.com/webportfolio/image/upload/'
    );
  });

  it('should contain Google Drive file URL prefix', () => {
    const placeholder = getFileUrlPlaceholder();

    expect(placeholder).toContain('https://drive.google.com/file/d/');
  });

  it('should contain Cloudinary URL prefix', () => {
    const placeholder = getFileUrlPlaceholder();

    expect(placeholder).toContain('https://res.cloudinary.com/webportfolio/image/upload/');
  });
});
