const app = {
    views: ['home-view', 'flag-view', 'clock-view'],
    
    startGame(type) {
        if (type === 'flag') {
            this.showView('flag-view');
            flagGame.init();
        } else if (type === 'clock') {
            this.showView('clock-view');
            clockGame.init();
        }
    },
    
    goHome() {
        this.showView('home-view');
    },
    
    showView(viewId) {
        this.views.forEach(id => {
            document.getElementById(id).classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
    }
};
