// 获得打散数组
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

export const adaptDPR = (canvas, ctx) => {
  const dpr = window.devicePixelRatio;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
}
