export async function delayMS(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}