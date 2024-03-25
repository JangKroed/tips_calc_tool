const arr = require('fs').readFileSync('./links.txt').toString().split('\n');

const USER_NAME = 'your_user_name';
const ADDRESS = 'your_wallet_address';

const USE_POINT_URL = `https://www.degen.tips/api/airdrop2/season2/points?address=${ADDRESS}`;
const USE_TIP_URL = `https://www.degen.tips/api/airdrop2/tip-allowance?address=${ADDRESS}`;
const newArr = [...new Set(arr)];

(async () => {
  let cnt = 0;
  for (const url of newArr) {
    if (url.includes(USER_NAME)) {
      continue;
    }
    cnt++;
    console.log(url);
  }

  console.log('//////////////////////////////////////////////////////////////');

  const { points: My_Point } = await responseToJson(USE_POINT_URL);
  const { user_rank, tip_allowance, remaining_allowance } = await responseToJson(USE_TIP_URL);

  console.log(`Tip per 1 person: ${Math.floor(Number(tip_allowance) / cnt)} $degen`);

  console.log('//////////////////////////////////////////////////////////////');

  console.log({ My_Point });
  console.log({ user_rank });
  console.log({ tip_allowance });
  console.log({ remaining_allowance });
})();

async function responseToJson(url) {
  const response = await fetch(url);
  const json_data = await response.json();
  return json_data[0];
}
