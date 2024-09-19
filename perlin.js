import { adaptDPR } from './utils.js';
export const drawPerlin = function (ctxDom, perlinGrid) {
  let ctx = ctxDom.getContext('2d');
  adaptDPR(ctxDom, ctx);
  for (let x = 0; x < ctxDom.clientWidth; x++) {
    let rgb = Math.round(255 * perlinGrid[x]);
    if (perlinGrid[x] < 0.7)
      ctx.fillStyle = `rgba(0,0,${rgb * 2},1.0)`;
    else
      ctx.fillStyle = `rgba(${rgb},${rgb},${rgb},1.0)`;
    const height = 700;
    ctx.fillRect(x, height - rgb, 1, rgb);
  }
};
