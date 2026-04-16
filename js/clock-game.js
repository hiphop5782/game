const clockGame = {
    totalQuestions: 0,
    correctAnswers: 0,
    currentTimeObj: null,

    init() {
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.updateScore();
        this.startNextQuestion();
    },

    updateScore() {
        document.getElementById('clock-total').textContent = this.totalQuestions;
        document.getElementById('clock-score').textContent = this.correctAnswers;
    },

    startNextQuestion() {
        document.getElementById('btn-next-clock').classList.add('hidden');
        document.getElementById('clock-feedback').textContent = '';
        document.getElementById('clock-feedback').className = 'feedback-text';

        // 시간 뽑기
        this.currentTimeObj = getRandomTime();
        
        // 시계 바늘 맞추기
        const hourHand = document.getElementById('hour-hand');
        const minHand = document.getElementById('min-hand');
        
        // 12시간제 각도 계산
        // 분침: 1분에 6도
        // 시침: 1시간에 30도 + 1분에 0.5도
        const minAngle = this.currentTimeObj.m * 6;
        const hourAngle = (this.currentTimeObj.h % 12) * 30 + (this.currentTimeObj.m * 0.5);
        
        hourHand.style.transform = `rotate(${hourAngle}deg)`;
        minHand.style.transform = `rotate(${minAngle}deg)`;

        // 보기 만들기 (오답 3개 + 정답 1개)
        let options = [this.currentTimeObj];
        while(options.length < 4) {
            let fakeTime = getRandomTime();
            // 중복 방지
            if (!options.some(t => t.digital === fakeTime.digital)) {
                options.push(fakeTime);
            }
        }
        
        // 무작위 섞기
        options.sort(() => Math.random() - 0.5);

        const optionsContainer = document.getElementById('clock-options');
        optionsContainer.innerHTML = '';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            // 표시 형식을 "3:00" 같은 цифровой(digital) 형태로 할지, "3시 정각" 형태로 할지
            // 요구사항: "아날로그 시계를 보고 시간을 4지선다중에서 맞추기"
            btn.textContent = opt.str; 
            btn.onclick = () => this.checkAnswer(btn, opt);
            optionsContainer.appendChild(btn);
        });
    },

    checkAnswer(btn, clickedTime) {
        if (!document.getElementById('btn-next-clock').classList.contains('hidden')) return;

        const feedback = document.getElementById('clock-feedback');

        if (clickedTime.digital === this.currentTimeObj.digital) {
            btn.classList.add('correct');
            feedback.textContent = '딩동댕! 정확해요! ⏰';
            feedback.className = 'feedback-text success';
            this.correctAnswers++;
        } else {
            btn.classList.add('wrong');
            feedback.textContent = `아쉬워요! 정답은 '${this.currentTimeObj.str}' 이었어요!`;
            feedback.className = 'feedback-text error';
            
            // 정답 표시
            const buttons = document.querySelectorAll('#clock-options .btn-option');
            buttons.forEach(b => {
                if (b.textContent === this.currentTimeObj.str) {
                    b.classList.add('correct');
                }
            });
        }
        
        this.totalQuestions++;
        this.updateScore();
        this.revealAnswers();
    },

    revealAnswers() {
        const buttons = document.querySelectorAll('#clock-options .btn-option');
        buttons.forEach(btn => {
            btn.style.pointerEvents = 'none'; // 클릭 방지
        });
        document.getElementById('btn-next-clock').classList.remove('hidden');
    },

    nextQuestion() {
        this.startNextQuestion();
    }
};
