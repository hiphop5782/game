const fs = require('fs');

const baselineCountries = [
    { code: 'kr', name: '대한민국', weight: 50, hintImage: './images/hint_kr.png', hintText: '우리나라, 한국! 김치와 태권도로 엄청 유명해요!' },
    { code: 'us', name: '미국', weight: 40, hintImage: './images/hint_us.png', hintText: '거대한 자유의 여신상이 횃불을 들고 서 있는 아주 큰 나라에요!' },
    { code: 'jp', name: '일본', weight: 35, hintImage: './images/hint_jp.png', hintText: '초밥이 제일 유명하고, 커다란 화산인 후지산이 있는 이웃 나라에요.' },
    { code: 'cn', name: '중국', weight: 35, hintImage: './images/hint_cn.png', hintText: '귀여운 판다가 살고, 우주에서도 보인다는 아주 긴 만리장성이 있어요!' },
    { code: 'fr', name: '프랑스', weight: 35, hintImage: './images/hint_fr.png', hintText: '높이 솟은 에펠탑이 있고, 맛있는 바게트 빵의 고향이에요!' },
    { code: 'gb', name: '영국', weight: 30, hintImage: './images/hint_gb.png', hintText: '커다란 시계탑인 빅벤과 예쁜 빨간색 이층버스가 거리를 달려요.' },
    { code: 'ca', name: '캐나다', weight: 20, hintImage: './images/hint_ca.png', hintText: '빨간 단풍잎 모양이 국기에 쏙 들어있고 달콤한 메이플 시럽이 유명해요!' },
    { code: 'au', name: '호주', weight: 20, hintImage: './images/hint_au.png', hintText: '주머니가 있는 캥거루와 잠자는 코알라가 살고 있는 따뜻한 나라에요!' },
    { code: 'br', name: '브라질', weight: 15, hintImage: './images/hint_br.png', hintText: '거대한 아마존 숲이 있고 세계에서 축구를 가장 잘하는 아름다운 곳이에요!' },
    { code: 'it', name: '이탈리아', weight: 15, hintImage: './images/hint_it.png', hintText: '우리가 좋아하는 피자와 파스타가 처음 만들어진 나라에요. 콜로세움이라는 둥근 건물이 있어요!' },
    { code: 'es', name: '스페인', weight: 15, hintImage: './images/hint_es.png', hintText: '조각 천처럼 예쁜 건물들과 열정적인 투우 경기가 유명한 나라에요!' },
    { code: 'de', name: '독일', weight: 15, hintImage: './images/hint_de.png', hintText: '동화 속에 나오는 멋진 성이 아주 많고 튼튼한 자동차를 잘 만드는 나라에요!' },
    { code: 'in', name: '인도', weight: 10, hintImage: './images/hint_in.png', hintText: '카레가 아주 유명하고 타지마할이라는 하얗고 예쁜 궁전이 있어요.' },
    { code: 'ru', name: '러시아', weight: 10, hintImage: './images/hint_ru.png', hintText: '세계에서 가장 땅이 넓고, 눈꽃처럼 추운 나라에요.' },
    { code: 'za', name: '남아프리카 공화국', weight: 5, hintImage: './images/hint_za.png', hintText: '아프리카 대륙의 제일 아래쪽에 있고 야생동물들이 자유롭게 뛰어놀아요.' },
    { code: 'mx', name: '멕시코', weight: 5, hintImage: './images/hint_mx.png', hintText: '옥수수로 만든 과자 타코를 즐겨먹는 선인장이 많은 나라에요.' },
    { code: 'vn', name: '베트남', weight: 8, hintImage: './images/hint_vn.png', hintText: '뜨끈한 쌀국수가 맛있고 뾰족하고 예쁜 모자를 많이 써요.' },
    { code: 'th', name: '태국', weight: 8, hintImage: './images/hint_th.png', hintText: '코끼리가 많고 황금빛으로 반짝이는 사원이 예쁜 나라에요.' },
];

const newPrompts = [
    { code: 'ar', name: '아르헨티나', weight: 10, prompt: 'argentina,tango,steak', hintText: '축구를 아주 잘하고 탱고라는 멋진 춤을 추는 나라에요.' },
    { code: 'eg', name: '이집트', weight: 10, prompt: 'egypt,pyramid,camel', hintText: '세모난 거대한 피라미드와 사막을 걷는 낙타가 많아요.' },
    { code: 'tr', name: '튀르키예', weight: 10, prompt: 'turkey,cappadocia,balloon', hintText: '수많은 열기구가 하늘을 날고 쫄깃한 아이스크림이 유명해요.' },
    { code: 'gr', name: '그리스', weight: 10, prompt: 'greece,santorini,temple', hintText: '하얀 집들과 파란 지붕이 바다와 어우러진 신화 속 나라에요.' },
    { code: 'ch', name: '스위스', weight: 15, prompt: 'switzerland,alps,cheese', hintText: '구멍 뚫린 치즈와 만년설이 덮인 높은 산으로 유명해요.' },
    { code: 'se', name: '스웨덴', weight: 5, prompt: 'sweden,dalahorse,snow', hintText: '안전한 자동차와 조립해서 쓰는 가구를 만드는 북쪽 나라에요.' },
    { code: 'nl', name: '네덜란드', weight: 10, prompt: 'netherlands,windmill,tulip', hintText: '예쁜 튤립 꽃밭과 빙글빙글 돌아가는 풍차가 있어요.' },
    { code: 'sg', name: '싱가포르', weight: 5, prompt: 'singapore,merlion', hintText: '사자 얼굴에 물고기 몸을 한 신기한 머라이언 동상이 있어요.' },
    { code: 'id', name: '인도네시아', weight: 5, prompt: 'indonesia,bali,beach', hintText: '수많은 섬으로 이루어진 더운 나라이고 코모도 왕도마뱀이 살아요.' },
    { code: 'ph', name: '필리핀', weight: 8, prompt: 'philippines,mango,beach', hintText: '달콤한 바나나와 망고, 예쁜 바다가 있는 열대 나라에요.' },
    { code: 'my', name: '말레이시아', weight: 5, prompt: 'malaysia,twintowers', hintText: '아주 높은 쌍둥이 타워와 밀림에 오랑우탄이 살아요.' },
    { code: 'ae', name: '아랍에미리트', weight: 5, prompt: 'dubai,burjkhalifa', hintText: '구름 위로 솟아오른 세계에서 가장 높은 빌딩이 있어요.' },
    { code: 'sa', name: '사우디아라비아', weight: 5, prompt: 'saudiarabia,desert,camel', hintText: '뜨거운 사막 밑에 새까만 석유가 아주 많이 묻혀있어요.' },
    { code: 'nz', name: '뉴질랜드', weight: 8, prompt: 'newzealand,kiwibird,sheep', hintText: '복슬복슬한 양과 날지 못하는 귀여운 키위새가 살아요.' },
    { code: 'pt', name: '포르투갈', weight: 5, prompt: 'portugal,lisbon,tram', hintText: '유럽 끝에 있는 나라이고 귀여운 노란색 트램이 언덕을 오르내려요.' },
    { code: 'pl', name: '폴란드', weight: 3, prompt: 'poland,warsaw,pierogi', hintText: '만두를 많이 먹고, 쇼팽이라는 유명한 피아니스트의 고향이에요.' },
    { code: 'ie', name: '아일랜드', weight: 3, prompt: 'ireland,clover,green', hintText: '초록색 옷을 입은 요정과 네잎클로버가 행운을 가져다줘요.' },
    { code: 'no', name: '노르웨이', weight: 3, prompt: 'norway,fjord,viking', hintText: '기다란 배를 탄 바이킹의 나라이고 맛있는 연어가 많이 잡혀요.' },
    { code: 'dk', name: '덴마크', weight: 3, prompt: 'denmark,copenhagen,mermaid', hintText: '우리가 좋아하는 네모난 레고 블록이 처음 만들어진 곳이에요!' },
    { code: 'fi', name: '핀란드', weight: 3, prompt: 'finland,santa,reindeer', hintText: '빨간 옷을 입은 산타클로스 할아버지의 진짜 고향이랍니다.' },
    { code: 'cz', name: '체코', weight: 3, prompt: 'czech,prague,castle', hintText: '주황색 지붕들의 도시와 신기하게 움직이는 천문 시계가 있어요.' },
    { code: 'at', name: '오스트리아', weight: 3, prompt: 'austria,vienna,mozart', hintText: '모차르트 같은 훌륭한 음악가들이 태어난 왈츠의 나라에요.' },
    { code: 'be', name: '벨기에', weight: 3, prompt: 'belgium,waffle,chocolate', hintText: '달콤한 와플과 네모난 초콜릿, 스머프가 아주 유명해요!' },
    { code: 'hu', name: '헝가리', weight: 3, prompt: 'hungary,budapest,bridge', hintText: '따뜻한 온천이 많고 강을 따라 보이는 야경이 최고로 예뻐요.' },
    { code: 'ro', name: '루마니아', weight: 3, prompt: 'romania,castle,dracula', hintText: '뾰족한 송곳니를 가진 드라큘라 백작 전설이 내려오는 곳이에요.' },
    { code: 'ua', name: '우크라이나', weight: 5, prompt: 'ukraine,sunflower,field', hintText: '해바라기가 아주 많이 피는 노랗고 파란 국기를 가졌어요.' },
    { code: 'cl', name: '칠레', weight: 3, prompt: 'chile,moai,easterisland', hintText: '세계에서 제일 길쭉한 모양의 나라고, 모아이 석상이 있어요.' },
    { code: 'pe', name: '페루', weight: 3, prompt: 'peru,machupicchu,llama', hintText: '침을 뱉는 라마가 살고, 산 꼭대기에 잉카 문명의 도시가 있어요.' },
    { code: 'co', name: '콜롬비아', weight: 3, prompt: 'colombia,coffee,farm', hintText: '따뜻하고 커피콩이 아주 맛있기로 유명한 나라에요.' },
    { code: 'cu', name: '쿠바', weight: 3, prompt: 'cuba,havana,oldcar', hintText: '알록달록 예쁜 올드카 자동차들이 거리를 굴러다니는 섬나라에요.' },
    { code: 'jm', name: '자메이카', weight: 2, prompt: 'jamaica,beach,reggae', hintText: '세계에서 달리기 기록이 제일 빠른 우사인 볼트의 고향이에요.' },
    { code: 'cr', name: '코스타리카', weight: 1, prompt: 'costarica,toucan,jungle', hintText: '부리가 아주 큰 투칸 새와 개구리들이 사는 멋진 자연의 나라에요.' },
    { code: 'pa', name: '파나마', weight: 1, prompt: 'panama,canal,ship', hintText: '거대한 바다와 바다를 잇는 좁은 물길, 파나마 운하가 있어요.' },
    { code: 'ng', name: '나이지리아', weight: 2, prompt: 'nigeria,africa,drum', hintText: '아프리카에서 사람들이 가장 많이 살고 있는 큰 나라에요.' },
    { code: 'ke', name: '케냐', weight: 2, prompt: 'kenya,safari,cheetah', hintText: '빠른 치타와 얼룩말들이 끝없이 뛰어다니는 사바나 초원이 있어요.' },
    { code: 'ma', name: '모로코', weight: 2, prompt: 'morocco,desert,market', hintText: '알리바바와 40인의 도둑에 나올 것 같은 예쁜 동화 속 시장이 있어요.' },
    { code: 'dz', name: '알제리', weight: 1, prompt: 'algeria,desert,sand', hintText: '아프리카에서 제일 큰 영토를 가졌고 귀가 큰 사막여우가 살아요.' },
    { code: 'fj', name: '피지', weight: 1, prompt: 'fiji,island,beach', hintText: '바다가 맑아서 산호초가 다 보이는 작고 예쁜 섬들의 모임이에요.' },
    { code: 'mn', name: '몽골', weight: 2, prompt: 'mongolia,yurt,horse', hintText: '드넓은 초원 위에서 말을 타고 하얀 천막 집(게르)에서 살아요.' },
    { code: 'np', name: '네팔', weight: 2, prompt: 'nepal,everest,mountain', hintText: '지구에서 제일 높은 에베레스트 산이 있는 나라이에요.' },
    { code: 'pk', name: '파키스탄', weight: 2, prompt: 'pakistan,rickshaw,mosque', hintText: '화려하게 꾸민 버스와 툭툭(삼륜차)이 길거리를 달려요.' },
    { code: 'bd', name: '방글라데시', weight: 1, prompt: 'bangladesh,tiger,jungle', hintText: '비가 아주 많이 오고 멋진 줄무늬의 벵골 호랑이가 살아요.' },
    { code: 'lk', name: '스리랑카', weight: 1, prompt: 'srilanka,tea,plantation', hintText: '따뜻한 인도양의 눈물이라 불리며 맛있는 홍차가 자라나요.' },
    { code: 'kh', name: '캄보디아', weight: 2, prompt: 'cambodia,angkorwat,temple', hintText: '밀림 속에 코끼리 모양을 조각한 거대한 앙코르와트 사원이 있어요.' },
    { code: 'uz', name: '우즈베키스탄', weight: 2, prompt: 'uzbekistan,mosque,blue', hintText: '파란 타일로 장식된 옛날 건물들이 반짝이는 실크로드의 중심지에요.' },
    { code: 'kz', name: '카자흐스탄', weight: 2, prompt: 'kazakhstan,astana,steppe', hintText: '세계에서 가장 큰 내륙국이며 우리가 아는 사과의 진짜 고향이에요.' },
    { code: 'ir', name: '이란', weight: 2, prompt: 'iran,carpet,bazaar', hintText: '알라딘에 나오는 날아다니는 마법 양탄자를 아주 잘 만드는 곳이에요.' },
    { code: 'iq', name: '이라크', weight: 1, prompt: 'iraq,dates,palm', hintText: '달고 맛있는 대추야자 열매가 열리고 메소포타미아 문명이 있었어요.' },
    { code: 'jo', name: '요르단', weight: 1, prompt: 'jordan,petra,canyon', hintText: '붉은 바위산을 깎아서 만든 멋진 고대 도시 페트라가 숨겨져 있어요.' },
    { code: 'is', name: '아이슬란드', weight: 2, prompt: 'iceland,aurora,glacier', hintText: '밤하늘 춤추는 오로라와 뜨거운 화산, 귀여운 퍼핀 새가 있어요.' },
    { code: 'tw', name: '대만', weight: 5, prompt: 'taiwan,bubbletea,taipei', hintText: '펄이 가득 든 달콤한 밀크티 버블티가 처음 만들어진 나라에요!' },
    { code: 'hk', name: '홍콩', weight: 4, prompt: 'hongkong,dimsum,city', hintText: '밤에 빨갛고 불빛이 예쁜 간판이 많고 딤섬이라는 만두를 먹어요.' },
    { code: 'kp', name: '북한', weight: 5, prompt: 'northkorea,mountpaektu', hintText: '휴전선을 넘어 바로 위에 붙어있는 나라이고 평양냉면이 유명해요.' },
    { code: 've', name: '베네수엘라', weight: 2, prompt: 'venezuela,angelfalls,waterfall', hintText: '세계에서 제일 놓은 곳에서 물이 쏟아지는 엔젤 폭포가 있어요.' },
    { code: 'gh', name: '가나', weight: 2, prompt: 'ghana,cocoa,chocolate', hintText: '초콜릿을 만드는 카카오 열매가 아주아주 많이 열리는 나라에요.' },
    { code: 'ci', name: '코트디부아르', weight: 1, prompt: 'ivorycoast,elephant,africa', hintText: '코끼리의 하얀 어금니상아라는 뜻을 가진 아프리카의 나라에요.' },
    { code: 'tz', name: '탄자니아', weight: 2, prompt: 'tanzania,kilimanjaro,safari', hintText: '아프리카에서 제일 높은 거대한 킬리만자로 산이 솟아있어요.' },
    { code: 'ug', name: '우간다', weight: 1, prompt: 'uganda,gorilla,mountain', hintText: '거대하고 다정하며 덩치가 큰 마운틴 고릴라가 정글에 살아요.' },
    { code: 'ht', name: '아이티', weight: 1, prompt: 'haiti,caribbean,beach', hintText: '카리브해 바다에 있는 아주 아름다운 노란 햇빛의 섬나라에요.' },
    { code: 'qa', name: '카타르', weight: 3, prompt: 'qatar,doha,desert', hintText: '얼마 전 월드컵 대회가 열렸던 사막위의 부자 나라에요.' },
    { code: 'kw', name: '쿠웨이트', weight: 1, prompt: 'kuwait,watertowers,city', hintText: '거대한 버섯모양의 예쁜 물탱크 세 개가 우뚝 서있는 곳이에요.' },
    { code: 'bh', name: '바레인', weight: 1, prompt: 'bahrain,treeoflife,desert', hintText: '사막 한가운데 신기하게 혼자 자라난 생명의 나무가 있어요.' },
    { code: 'om', name: '오만', weight: 1, prompt: 'oman,muscat,fort', hintText: '향기로운 유향 나무가 있고 아라비안 나이트의 무대 중 하나에요.' },
    { code: 'ye', name: '예멘', weight: 1, prompt: 'yemen,sanaa,mudhouses', hintText: '과자로 만든 집처럼 생긴 흙집들이 모여있는 신기한 나라에요.' },
    { code: 'af', name: '아프가니스탄', weight: 1, prompt: 'afghanistan,kites,mountain', hintText: '하늘 높이 연날리기를 좋아하고 아주 높고 뾰족한 산들이 많아요.' },
    { code: 'ge', name: '조지아', weight: 1, prompt: 'georgia,khachapuri,caucasus', hintText: '배 모양 빵 가운데에 계란 노른자가 톡 얹어진 하차푸리를 먹어요.' },
    { code: 'am', name: '아르메니아', weight: 1, prompt: 'armenia,ararat,monastery', hintText: '노아의 방주가 멈췄다는 전설 깊은 커다란 산맥 곁의 나라에요.' },
    { code: 'az', name: '아제르바이잔', weight: 1, prompt: 'azerbaijan,baku,fire', hintText: '땅에서 천연가스가 나와서 꺼지지 않는 불꽃 사원이 붉게 타올라요.' },
    { code: 'uy', name: '우루과이', weight: 2, prompt: 'uruguay,mate,tea', hintText: '둥근 박에 빨대를 꽂아서 먹는 씁쓸한 마테차를 아주 즐겨마셔요.' },
    { code: 'py', name: '파라과이', weight: 1, prompt: 'paraguay,asuncion,river', hintText: '아메리카 대륙 한가운데 국기가 앞뒤 모습이 다른 신기한 나라에요.' },
    { code: 'bo', name: '볼리비아', weight: 2, prompt: 'bolivia,uyuni,saltflat', hintText: '끝이 보이지 않는 커다란 하얀 소금사막 우유니가 예쁜 곳이에요.' },
    { code: 'ec', name: '에콰도르', weight: 1, prompt: 'ecuador,galapagos,tortoise', hintText: '적도가 지나가고, 갈라파고스의 커다란 코끼리 거북이가 살아요.' },
    { code: 'hn', name: '온두라스', weight: 1, prompt: 'honduras,macaw,mayan', hintText: '마야 문명의 유적이 있고 아주 크고 화려한 깃털의 앵무새가 많아요.' },
    { code: 'sv', name: '엘살바도르', weight: 1, prompt: 'elsalvador,pupusa,food', hintText: '치즈와 고기가 들어간 푸푸사라는 맛있는 길거리 호떡을 먹어요.' },
    { code: 'ni', name: '니카라과', weight: 1, prompt: 'nicaragua,lake,volcano', hintText: '중앙아메리카에서 가장 큰 호수에 무서운 상어가 사는 나라에요.' },
    { code: 'pw', name: '팔라우', weight: 1, prompt: 'palau,jellyfish,lake', hintText: '가시에 찔리지 않는 젤리피시(해파리)들과 같이 수영해요.' },
    { code: 'fm', name: '미크로네시아', weight: 1, prompt: 'micronesia,island,ocean', hintText: '징검다리처럼 흩어진 산호섬과 물 위에 세워진 신기한 돌 유적이 있어요.' },
    { code: 'mh', name: '마셜 제도', weight: 1, prompt: 'marshallislands,beach,palm', hintText: '나무 막대기로 파도를 그려 지도를 만든 섬이에요.' },
    { code: 'vu', name: '바누아투', weight: 1, prompt: 'vanuatu,bungee,volcano', hintText: '발목에 덩굴을 묶어 뛰어내리는 서서 뛰는 번지점프의 원조 나라에요.' },
    { code: 'to', name: '통가', weight: 1, prompt: 'tonga,whale,island', hintText: '거대한 혹등고래 떼가 헤엄치러 오는 아주 따뜻하고 멋진 왕국이에요.' },
    { code: 'ws', name: '사모아', weight: 1, prompt: 'samoa,tattoo,polynesia', hintText: '얼굴을 제외한 몸에 화려한 무늬를 새기고 빙글빙글 불춤을 추어요.' },
    { code: 'aq', name: '남극', weight: 1, prompt: 'antarctica,penguin,ice', hintText: '펭귄과 바다표범이 얼음 위를 뛰노는 지구 가장 아래쪽의 추운 곳이에요.' }
];

const allCountries = baselineCountries.concat(newPrompts.map(c => ({
    code: c.code,
    name: c.name,
    weight: c.weight,
    hintImage: `./images/hint_${c.code}.png`,
    hintText: c.hintText
})));

// Generate Powershell Download Script utilizing loremflickr with error catching and sleep to not spam.
let psScript = "$ErrorActionPreference = 'Stop'\n\n";
for (const c of newPrompts) {
    if (c.code === 'ar') continue; // we already have ar partially downloaded maybe, wait no let's just redownload to be safe
    // using loremflickr format: https://loremflickr.com/400/300/tags,tags2/all
    let url = `https://loremflickr.com/400/300/${c.prompt}/all`;
    psScript += `Write-Host "Downloading ${c.name}..."\n`;
    psScript += `Invoke-WebRequest -Uri "${url}" -OutFile "d:\\antigravity\\images\\hint_${c.code}.png" -UseBasicParsing\n`;
    psScript += `Start-Sleep -Milliseconds 100\n`;
}
fs.writeFileSync('d:/antigravity/download_lorem.ps1', psScript);

// Generate JavaScript content string
const allCountriesStr = JSON.stringify(allCountries, null, 4).replace(/"([^"]+)":/g, '$1:');
// Create a separate js file so we can view it and then do replace via standard powershell text replace.
const jsReplace = `
const fs = require('fs');
const html = fs.readFileSync('d:/antigravity/index.html', 'utf8');
const newHtml = html.replace(/const countriesData = \\[[\\s\\S]*?\\];/, \`const countriesData = \${allCountriesStr};\`);
fs.writeFileSync('d:/antigravity/index.html', newHtml);
`;
fs.writeFileSync('d:/antigravity/replace_html.js', jsReplace);
