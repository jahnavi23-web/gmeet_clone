export function isEmpty(obj) {
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

// const delay = (ms) => {
//   return new Promise((res) => {
//     return setTimeout(res, ms);
//   });
// };

// export const waitNowFor = async (ms) => {
//   await delay(ms);
//   console.log(`Waited ${ms}ms`);
// };

export const waitNowFor = (ms) => {
  return;
  // var start = new Date().getTime();
  // var end = start;
  // while (end < start + ms) {
  //   end = new Date().getTime();
  // }
  // console.log(`Waited ${ms}ms`);
};
