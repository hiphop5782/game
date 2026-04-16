const countriesData = [
    // 아주 유명한 국가들 (weight가 높아서 자주 출제됨)
    { code: 'kr', name: '대한민국', weight: 50, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Gwanghwamun_and_Bukhansan.jpg/800px-Gwanghwamun_and_Bukhansan.jpg', hintText: '아시아에 있고, 김치와 태권도로 유명해요!' },
    { code: 'us', name: '미국', weight: 40, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Statue_of_Liberty%2C_NY.jpg/800px-Statue_of_Liberty%2C_NY.jpg', hintText: '자유의 여신상이 있는 아주 큰 나라에요!' },
    { code: 'jp', name: '일본', weight: 30, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Fuji_from_Gotemba_02.jpg/800px-Fuji_from_Gotemba_02.jpg', hintText: '초밥이 유명하고, 후지산이 있는 이웃 나라에요.' },
    { code: 'cn', name: '중국', weight: 30, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg', hintText: '판다가 살고, 아주 긴 만리장성이 있어요!' },
    { code: 'fr', name: '프랑스', weight: 30, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg', hintText: '에펠탑이 있고 바게트 빵이 맛있어요!' },
    { code: 'gb', name: '영국', weight: 25, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Elizabeth_Tower_June_2022.jpg/800px-Elizabeth_Tower_June_2022.jpg', hintText: '커다란 시계탑인 빅벤과 빨간색 이층버스가 유명해요.' },
    { code: 'ca', name: '캐나다', weight: 25, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Canadas-wonderland-toronto.jpg/800px-Canadas-wonderland-toronto.jpg', hintText: '단풍잎 모양이 국기에 있고 시럽이 유명해요!' },
    { code: 'au', name: '호주', weight: 25, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/800px-Sydney_Opera_House_-_Dec_2008.jpg', hintText: '캥거루와 코알라가 살고 있는 따뜻한 나라에요!' },
    { code: 'br', name: '브라질', weight: 20, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg/800px-Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg', hintText: '아마존 숲이 있고 축구를 아주 잘해요!' },
    { code: 'it', name: '이탈리아', weight: 20, hintImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/800px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg', hintText: '피자와 파스타가 처음 만들어진 나라에요. 콜로세움이 있어요!' },
    { code: 'es', name: '스페인', weight: 20, hintImage: '', hintText: '투우라는 소 경기가 있고 열정적인 나라에요!' },
    { code: 'de', name: '독일', weight: 20, hintImage: '', hintText: '멋진 성이 많고 자동차를 아주 잘 만드는 나라에요!' },
    { code: 'in', name: '인도', weight: 15, hintImage: '', hintText: '카레가 유명하고 타지마할이라는 예쁜 궁전이 있어요.' },
    { code: 'ru', name: '러시아', weight: 15, hintImage: '', hintText: '세계에서 가장 땅이 넓고 추운 나라에요.' },
    { code: 'za', name: '남아프리카 공화국', weight: 10, hintImage: '', hintText: '아프리카의 제일 아래쪽에 있고 야생동물이 많아요.' },
    { code: 'mx', name: '멕시코', weight: 10, hintImage: '', hintText: '타코를 즐겨먹는 나침반 모양의 국기 나라에요.' },
    { code: 'vn', name: '베트남', weight: 10, hintImage: '', hintText: '쌀국수가 유명하고 예쁜 모자를 많이 써요.' },
    { code: 'th', name: '태국', weight: 10, hintImage: '', hintText: '코끼리가 많고 반짝이는 사원이 예쁜 나라에요.' },
    
    // 덜 유명한 국가들 (weight가 낮음) - 아주 많음!
    { code: 'ar', name: '아르헨티나', weight: 5, hintImage: '', hintText: '남아메리카에 있는 나라에요.' },
    { code: 'eg', name: '이집트', weight: 8, hintImage: '', hintText: '피라미드와 스핑크스가 유명해요.' },
    { code: 'gr', name: '그리스', weight: 5, hintImage: '', hintText: '올림픽이 처음 생긴 나라에요.' },
    { code: 'ch', name: '스위스', weight: 8, hintImage: '', hintText: '알프스 산맥이 있고 치즈가 맛있어요.' },
    { code: 'se', name: '스웨덴', weight: 4, hintImage: '', hintText: '눈이 많이 오고 오로라를 볼 수 있어요.' },
    { code: 'tr', name: '튀르키예', weight: 6, hintImage: '', hintText: '열기구가 하늘에 둥둥 떠다니는 멋진 풍경이 있어요.' },
    { code: 'nl', name: '네덜란드', weight: 6, hintImage: '', hintText: '풍차와 튤립이 예쁜 나라에요.' },
    { code: 'nz', name: '뉴질랜드', weight: 5, hintImage: '', hintText: '키위새가 살고 양이 아주 많아요.' },
    { code: 'pe', name: '페루', weight: 4, hintImage: '', hintText: '구름 위의 도시 마추픽추가 있어요.' },
    { code: 'ph', name: '필리핀', weight: 5, hintImage: '', hintText: '투명하고 맑은 바다가 있는 섬나라에요.' },
    { code: 'id', name: '인도네시아', weight: 4, hintImage: '', hintText: '엄청 많은 섬으로 이뤄진 나라에요.' },
    { code: 'sg', name: '싱가포르', weight: 5, hintImage: '', hintText: '입에서 물을 뿜는 머라이언 동상이 있어요.' },
    { code: 'my', name: '말레이시아', weight: 4, hintImage: '', hintText: '동남아시아에 있어요.' },
    { code: 'sa', name: '사우디아라비아', weight: 3, hintImage: '', hintText: '모래사막이 끝없이 펼쳐진 나라에요.' },
    { code: 'cl', name: '칠레', weight: 3, hintImage: '', hintText: '길쭉하게 생긴 모양의 나라에요.' },
    { code: 'co', name: '콜롬비아', weight: 3, hintImage: '', hintText: '커피가 엄청 향긋해요.' },
    { code: 'fi', name: '핀란드', weight: 5, hintImage: '', hintText: '산타클로스 할아버지의 고향이에요!' },
    { code: 'no', name: '노르웨이', weight: 4, hintImage: '', hintText: '연어가 맛있는 북쪽 나라에요.' },
    { code: 'pt', name: '포르투갈', weight: 4, hintImage: '', hintText: '에그타르트가 아주 맛있어요.' },
    { code: 'be', name: '벨기에', weight: 4, hintImage: '', hintText: '초콜릿과 와플이 달콤해요.' },
    { code: 'pl', name: '폴란드', weight: 3, hintImage: '', hintText: '유럽에 있는 나라에요.' },
    { code: 'at', name: '오스트리아', weight: 4, hintImage: '', hintText: '모차르트 음악가 할아버지가 태어난 나라에요.' },
    { code: 'cz', name: '체코', weight: 3, hintImage: '', hintText: '유럽의 아름다운 성들이 많아요.' },
    { code: 'hu', name: '헝가리', weight: 3, hintImage: '', hintText: '야경이 아주 아름다워요.' },
    { code: 'ro', name: '루마니아', weight: 2, hintImage: '', hintText: '유럽에 있는 나라에요.' },
    { code: 'bg', name: '불가리아', weight: 2, hintImage: '', hintText: '요구르트(요거트)가 유명해요.' },
    // 더 많은 무작위 국가들을 추가 가능합니다. 우리는 충분한 풀을 만들었습니다.
];

// 확률에 따라 국가 뽑기 체계
function getRandomCountry(excludeList = []) {
    let pool = countriesData.filter(c => !excludeList.includes(c.code));
    let totalWeight = pool.reduce((sum, c) => sum + c.weight, 0);
    let rand = Math.random() * totalWeight;
    
    for (let i = 0; i < pool.length; i++) {
        rand -= pool[i].weight;
        if (rand <= 0) return pool[i];
    }
    return pool[pool.length - 1]; // fallback
}

function getMultipleRandomCountries(count) {
    let result = [];
    let exclude = [];
    for(let i=0; i<count; i++) {
        let c = getRandomCountry(exclude);
        result.push(c);
        exclude.push(c.code);
    }
    return result;
}

// 시간 난이도 분류 (맞추기 쉬운 것 우선도 높게)
const clockDifficulties = [
    { type: 'hour', weight: 40, gen: () => { let h = Math.floor(Math.random()*12)+1; return {h, m: 0, str: h + "시 정각", digital: h + ":00"}; } },
    { type: 'half', weight: 30, gen: () => { let h = Math.floor(Math.random()*12)+1; return {h, m: 30, str: h + "시 30분(반)", digital: h + ":30"}; } },
    { type: 'quarter', weight: 15, gen: () => { let h = Math.floor(Math.random()*12)+1; let m = Math.random() > 0.5 ? 15 : 45; return {h, m, str: `${h}시 ${m}분`, digital: `${h}:${m}`}; } },
    { type: 'ten', weight: 10, gen: () => { let h = Math.floor(Math.random()*12)+1; let arr = [10,20,40,50]; let m = arr[Math.floor(Math.random()*arr.length)]; return {h, m, str: `${h}시 ${m}분`, digital: `${h}:${m}`}; } },
    { type: 'hard', weight: 5, gen: () => { let h = Math.floor(Math.random()*12)+1; let m = Math.floor(Math.random()*59)+1; return {h, m, str: `${h}시 ${m}분`, digital: `${h}:${m.toString().padStart(2, '0')}`}; } },
];

function getRandomTime() {
    let totalWeight = clockDifficulties.reduce((sum, d) => sum + d.weight, 0);
    let rand = Math.random() * totalWeight;
    for(let i=0; i<clockDifficulties.length; i++) {
        rand -= clockDifficulties[i].weight;
        if(rand <= 0) return clockDifficulties[i].gen();
    }
    return clockDifficulties[0].gen();
}
