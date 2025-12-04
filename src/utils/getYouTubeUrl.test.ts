import { getYouTubeUrl } from "./getYouTubeUrl";

describe("getYouTubeUrl", () => {

  it("returns watch URL when given a valid embed URL", () => {
    const url = "https://www.youtube.com/embed/gl_RSSi1YCo?si=TTgwpr7JoYCgRSGv";

    const result = getYouTubeUrl(url);

    expect(result).toBe("https://www.youtube.com/watch?v=gl_RSSi1YCo");
  });

  it("returns null when given an invalid URL", () => {
    const result = getYouTubeUrl("invalidUrl");

    expect(result).toBeNull();
  });
});
