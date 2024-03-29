// 텍스트 파일 경로
const arr = require('fs').readFileSync('./links.txt').toString().split('\n');


// 요청보낼 API 주소
const USE_POINT_URL = `https://www.degen.tips/api/airdrop2/season2/points?address=${ADDRESS}`;
const USE_TIP_URL = `https://www.degen.tips/api/airdrop2/tip-allowance?address=${ADDRESS}`;

const tmpHash = {};

(async () => {
  let cnt = 0; // 미션해야 할 총 인원 수

  for (const url of arr) {
    if (url.includes(USER_NAME)) {
      continue;
    }

    if (tmpHash[url]) {
      tmpHash[url]++;
      continue;
    } else {
      tmpHash[url] = 1;
    }

    cnt++;
  }

  console.log('//////////////////////////////////////////////////////////////');

  Object.keys(tmpHash).forEach((url) => console.log(url));

  console.log('//////////////////////////////////////////////////////////////');

  for (const key in tmpHash) {
    if (tmpHash[key] > 1) {
      console.log(key);
    }
  }

  console.log('//////////////////////////////////////////////////////////////');

  const { points: My_Point } = await responseToJson(USE_POINT_URL);
  const { user_rank, tip_allowance, remaining_allowance } = await responseToJson(USE_TIP_URL);

  console.log(`Tip per 1 person: ${Math.floor(Number(tip_allowance) / cnt)} $DEGEN`);

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
