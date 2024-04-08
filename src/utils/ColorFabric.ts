class ColorGenerator {
  static generateHex() {
    const randomHexR = Math.floor(Math.random() * 256).toString(16);
    const randomHexG = Math.floor(Math.random() * 256).toString(16);
    const randomHexB = Math.floor(Math.random() * 256).toString(16);

    return `#${randomHexR.length === 1 ? "0" + randomHexR : randomHexR}${randomHexG.length === 1 ? "0" + randomHexG : randomHexG}${randomHexB.length === 1 ? "0" + randomHexB : randomHexB}`;
  }

  static generateRgb() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }

  static generateHsl() {
    return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 101)}%, ${Math.floor(Math.random() * 81 + 10)}%)`;
  }
}

class ColorValidator {

  static validateHex(color1: string, color2: string) {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    const r1 = c1 >> 16;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;
    const r2 = c2 >> 16;
    const g2 = (c2 >> 8) & 255; 
    const b2 = c2 & 255;
    return Math.round(
      (256 * 3 -
        Math.sqrt(
          Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
        ))
     / 768 * 1000 );
  }

  static validateRgb(color1: string, color2: string) {
    const c1 = color1.slice(4, -1).split(",").map(Number);
    const c2 = color2.slice(4, -1).split(",").map(Number);
    return Math.round(
      256 * 3 -
        Math.sqrt(
          Math.pow(c1[0] - c2[0], 2) +
            Math.pow(c1[1] - c2[1], 2) +
            Math.pow(c1[2] - c2[2], 2)
        )
    );
  }

  static validateHsl(color1: string, color2: string) {
    const c1 = color1
      .replace(/[^0-9,]/g, "")
      .split(",")
      .map(Number);
    const c2 = color2
      .replace(/[^0-9,]/g, "")
      .split(",")
      .map(Number);

    const calcDiff = (a: number, b: number) => {
      return (
        (Math.min(
          Math.abs(a - b),
          Math.abs(a - b + 360),
          Math.abs(a - b - 360)
        ) /
          360) *
        100
      );
    };

    const hueDiff = calcDiff(c1[0], c2[0]);
    const satDiff = Math.abs(c1[1] - c2[1]);
    const lightDiff = Math.abs(c1[2] - c2[2]);
    console.log(hueDiff, satDiff, lightDiff);

    return Math.round((300 - hueDiff - satDiff - lightDiff) / 300 * 1000);
  }
}

export { ColorGenerator, ColorValidator };
