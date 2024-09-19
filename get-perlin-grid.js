/**
 *  Get constant vector by v
 *  @param {number} v
 *  @return {[number,number]}
 * */
function GetConstantVector(v) {
  switch (v & 3) {
    case 0: return [1.0, 1.0];
    case 1: return [-1.0, 1.0];
    case 2: return [-1.0, -1.0];
    default: return [1.0, -1.0];
  }
}

/**
 *  Multiply two points
 *  @param {[number,number]} point1
 *  @param {[number,number]} point2
 *  @return {number}
 * */
function multiplyPoints(point1, point2) {
  return point1[0] * point2[0] + point1[1] * point2[1];
}

/**
 *  convergent to 0.5
 *  @param {number} t
 *  @return {number}
 * */
function Fade(t) {
  return ((6 * t - 15) * t + 10) * t * t * t;
}

/**
 *  Lerp between two nums by t
 *  @param {number} t
 *  @param {number} a1
 *  @param {number} a2
 *  @return {number}
 * */
function Lerp(t, a1, a2) {
  return a1 + t * (a2 - a1);
}

/**
 *  Get noise value by x,y and permutationTable
 *  @param {number} x
 *  @param {number} y
 *  @param {number[]} permutationTable
 *  @return {number}
 * 
*/
function Noise2D(x, y, permutationTable) {
  let X = Math.floor(x) & 255;
  let Y = Math.floor(y) & 255;

  let valueBottomLeft = permutationTable[permutationTable[X] + Y];
  let valueTopLeft = permutationTable[permutationTable[X] + Y + 1];
  let valueBottomRight = permutationTable[permutationTable[X + 1] + Y];
  let valueTopRight = permutationTable[permutationTable[X + 1] + Y + 1];

  let xf = x - Math.floor(x);
  let yf = y - Math.floor(y);

  let bottomLeft = [xf, yf];
  let topLeft = [xf, yf - 1.0];
  let bottomRight = [xf - 1.0, yf];
  let topRight = [xf - 1.0, yf - 1.0];

  let dotBottomLeft = multiplyPoints(bottomLeft, GetConstantVector(valueBottomLeft));
  let dotTopLeft = multiplyPoints(topLeft, GetConstantVector(valueTopLeft));
  let dotBottomRight = multiplyPoints(bottomRight, GetConstantVector(valueBottomRight));
  let dotTopRight = multiplyPoints(topRight, GetConstantVector(valueTopRight));

  // convergent to 0.5
  let u = Fade(xf);
  let v = Fade(yf);

  return Lerp(
    u,
    Lerp(v, dotBottomLeft, dotTopLeft),
    Lerp(v, dotBottomRight, dotTopRight)
  );
}

/**
 *  Get perlin grid,ordring height and width
 * @param {number} height
 * @param {number} width
 * @param {number[]} permutationTable
 * @return {number[][]}
*/
export const getPerlinGrid = (height, width, permutationTable) => {
  let perlinGrid = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let n = 0.0;
      let a = 1.0;
      let f = 0.005;
      for (let o = 0; o < 8; o++) {
        let v = a * Noise2D(x * f, y * f, permutationTable);
        n += v;
        a *= 0.5;
        f *= 2.0;
      }
      // count back to range [0,1]
      n += 1.0;
      n *= 0.5;
      if (y == 0) perlinGrid[x] = []
      perlinGrid[x][y] = n;
    }
  }
  return perlinGrid
}
