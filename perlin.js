import { getRandomArray, adaptDPR } from './utils.js';
export const drawPerlin = function (ctxDom, perlinGrid) {
  let ctx = ctxDom.getContext('2d');
  adaptDPR(ctxDom, ctx);
  function renderGrid(ctx, width, height) {
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let rgb = Math.round(255 * perlinGrid[x][y]);
        if (perlinGrid[x][y] < 0.7)
          ctx.fillStyle = `rgba(0,0,${rgb * 2},1.0)`;
        else
          ctx.fillStyle = `rgba(${rgb},${rgb},${rgb},1.0)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  renderGrid(ctx, ctxDom.clientWidth, ctxDom.clientHeight)
};
