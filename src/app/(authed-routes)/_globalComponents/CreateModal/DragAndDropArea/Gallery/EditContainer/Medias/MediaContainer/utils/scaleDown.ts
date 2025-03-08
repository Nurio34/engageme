export const scaleDown = (width: number, height: number) => {
  const megapixels = (width * height) / 1_000_000;
  const MAX_MP = 25; //** Enhance is not applied to images more than 25 mpx */
  let newWidth = width;
  let newHeight = height;

  if (megapixels > MAX_MP) {
    // Scale down while maintaining aspect ratio
    const scaleFactor = Math.sqrt(MAX_MP / megapixels);
    newWidth = Math.floor(width * scaleFactor);
    newHeight = Math.floor(height * scaleFactor);
  }

  return { newWidth, newHeight };
};
