import { getRandomArray, adaptDPR } from './utils.js';
import { getPerlinGrid } from "./get-perlin-grid.js"
export const drawPerlin = function (ctxDom) {
  let ctx = ctxDom.getContext('2d');
  adaptDPR(ctxDom, ctx);
  const perlinGrid = getPerlinGrid(ctxDom.clientHeight, ctxDom.clientWidth, 255);
  function renderGrid2(ctx, grid, width, height) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let rgb = Math.round(255 * grid[x][y]);
        if (grid[x][y] < 0.7)
          ctx.fillStyle = `rgba(0,0,${rgb * 2},1.0)`;
        else
          ctx.fillStyle = `rgba(${rgb},${rgb},${rgb},1.0)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  renderGrid2(ctx, perlinGrid, ctxDom.clientWidth, ctxDom.clientHeight)
};
