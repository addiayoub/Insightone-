export function generateRandomColorsArray(length) {
  const randomColor = () => Math.floor(Math.random() * 256);
  const randomColorString = () =>
    `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;

  const isCloseToWhite = (color) => {
    const [r, g, b] = color.match(/\d+/g).map(Number);
    const distanceToWhite = Math.sqrt(
      Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2)
    );
    return distanceToWhite < 100; // Adjust this threshold as needed
  };

  const uniqueColors = new Set();

  while (uniqueColors.size < length) {
    const color = randomColorString();
    if (!isCloseToWhite(color)) {
      uniqueColors.add(color);
    }
  }

  return Array.from(uniqueColors);
}
