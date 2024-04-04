const randomizer = (max: number) => Math.floor(Math.random() * max);
const convertToHex = (num: number) => num.toString(16);
const formatHex = (hex: string) => hex.length === 1 ? `0${hex}` : hex;

const generateColorCode = (): string => {
    const red = randomizer(255);
    const green = randomizer(255);
    const blue = randomizer(255);
    const redHex = formatHex(convertToHex(red));
    const greenHex = formatHex(convertToHex(green));
    const blueHex = formatHex(convertToHex(blue));
    return `#${redHex}${greenHex}${blueHex}`;
    }

export default function generateColor(): string {
  return generateColorCode();
}