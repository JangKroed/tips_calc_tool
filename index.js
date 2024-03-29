// 텍스트 파일 경로 (워프캐스트 주소)
const arr = require('fs').readFileSync('./links.txt').toString().split('\n');

const USER_NAME = 'your_user_name'; // 본인 닉네임(fname) 입력
const ADDRESS = 'your_wallet_address'; // 연결된 지갑주소 입력

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

  console.log(`인당 팁: ${Math.floor(Number(tip_allowance) / cnt)} $DEGEN`);

  console.log('//////////////////////////////////////////////////////////////');

  console.log(`미션할 대상의 수: ${cnt}`);
  console.log(`포인트: ${My_Point}`);
  console.log(`순위: ${user_rank}`);
  console.log(`총 팁 할당량: ${tip_allowance}`);
  console.log(`잔여 팁 양: ${remaining_allowance}`);
})();

// api 함수 모듈화
async function responseToJson(url) {
  const response = await fetch(url);
  const json_data = await response.json();
  return json_data[0];
}
