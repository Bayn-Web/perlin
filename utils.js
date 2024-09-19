/**
 *   Random Table Generator
 *   @param {Number} size
 *   @return {Array}
*/
export function getRandomArray(size = 256) {
  let table = [];
  for (let i = 0; i < size; i++) {
    table.push(i);
  }
  for (let e = size - 1; e > 0; e--) {
    let index = Math.floor(Math.random() * (e + 1));
    [table[e], table[index]] = [table[index], table[e]];
  }
  return table;
}

/**
 *   Adapt DPR
 *   @param {Object} canvas
 *   @param {Object} ctx
*/
export const adaptDPR = (canvas, ctx, scaleRate = 1) => {
  const dpr = window.devicePixelRatio;
  canvas.width = canvas.clientWidth * dpr / scaleRate;
  canvas.height = canvas.clientHeight * dpr / scaleRate;
  ctx.scale(dpr * scaleRate, dpr * scaleRate);
}
