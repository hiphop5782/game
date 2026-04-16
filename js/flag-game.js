const flagGame = {
    totalQuestions: 0,
    correctAnswers: 0,
    currentCountry: null,
    wrongAttempts: 0,

    init() {
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.updateScore();
        this.startNextQuestion();
    },

    updateScore() {
        document.getElementById('flag-total').textContent = this.totalQuestions;
        document.getElementById('flag-score').textContent = this.correctAnswers;
    },

    startNextQuestion() {
        this.wrongAttempts = 0;
        // 숨기기 처리
        document.getElementById('hint-section').classList.add('hidden');
        document.getElementById('btn-next-flag').classList.add('hidden');
        document.getElementById('flag-feedback').textContent = '';
        document.getElementById('flag-feedback').className = 'feedback-text';

        // 데이터 가져오기
        let countries = getMultipleRandomCountries(4);
        
        // 정답은 0~3 무작위! 그런데 weight 기반이니 countries[0]을 그냥 정답으로 하고 섞으면 됨
        // 실제로 getMultipleRandomCountries는 weight를 반영해 뽑은 4개
        // 4개 중 첫번째를 정답으로 두면 편하지만 한 번 더 섞습니다.
        this.currentCountry = countries[Math.floor(Math.random() * 4)];
        
        // 국기 화면 업데이트
        document.getElementById('flag-display').className = `fi fi-${this.currentCountry.code}`;
        
        // 힌트 버튼 가시성 (힌트가 있는 경우만 보여주기)
        if (this.currentCountry.hintImage || this.currentCountry.hintText) {
            document.getElementById('btn-hint').classList.remove('hidden');
        } else {
            document.getElementById('btn-hint').classList.add('hidden');
        }
        
        // 보기 생성
        const optionsContainer = document.getElementById('flag-options');
        optionsContainer.innerHTML = '';
        
        countries.forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.textContent = c.name;
            btn.onclick = () => this.checkAnswer(btn, c);
            optionsContainer.appendChild(btn);
        });
    },

    showHint() {
        const hintSec = document.getElementById('hint-section');
        const hintImg = document.getElementById('hint-image');
        const hintText = document.getElementById('hint-text');
        
        hintSec.classList.remove('hidden');
        if (this.currentCountry.hintImage) {
            hintImg.src = this.currentCountry.hintImage;
            hintImg.style.display = 'inline-block';
        } else {
            hintImg.style.display = 'none';
        }
        
        hintText.textContent = this.currentCountry.hintText || '힌트가 없어요! 잘 생각해 보세요.';
        // 힌트 버튼 숨기기
        document.getElementById('btn-hint').classList.add('hidden');
    },

    checkAnswer(btn, clickedCountry) {
        // 이미 넥스트 버튼이 나와있으면(정답 공개 상태면) 무시
        if (!document.getElementById('btn-next-flag').classList.contains('hidden')) return;

        const feedback = document.getElementById('flag-feedback');

        if (clickedCountry.code === this.currentCountry.code) {
            // 정답!
            btn.classList.add('correct');
            feedback.textContent = '정답이에요! 참 잘했어요 🥳';
            feedback.className = 'feedback-text success';
            this.correctAnswers++;
            this.totalQuestions++;
            this.updateScore();
            this.revealAnswers();
        } else {
            // 오답!
            btn.classList.add('wrong');
            this.wrongAttempts++;
            
            if (this.wrongAttempts >= 2) {
                // 두 번 틀리면 정답 공개하고 다음으로
                feedback.textContent = `아쉬워요! 정답은 '${this.currentCountry.name}' 이랍니다!`;
                feedback.className = 'feedback-text error';
                this.totalQuestions++;
                this.updateScore();
                this.revealAnswers();
            } else {
                // 한 번 더 기회!
                feedback.textContent = '앗, 다시 한 번 잘 생각해 볼까요? 🤔';
                feedback.className = 'feedback-text error';
            }
        }
    },

    revealAnswers() {
        const buttons = document.querySelectorAll('#flag-options .btn-option');
        buttons.forEach(btn => {
            if (btn.textContent === this.currentCountry.name) {
                btn.classList.add('correct');
            }
            btn.style.pointerEvents = 'none'; // 클릭 방지
        });
        
        document.getElementById('btn-next-flag').classList.remove('hidden');
        document.getElementById('btn-hint').classList.add('hidden'); // 힌트 버튼도 가리기
    },

    nextQuestion() {
        this.startNextQuestion();
    }
};
