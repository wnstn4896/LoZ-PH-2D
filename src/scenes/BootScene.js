export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        const basePath = window.location.pathname.replace(/\/[^\/]*$/, '');
        const img = `${basePath}/assets/images`;
        const sound = `${basePath}/assets/sounds`;

        this.load.image('floor', `${img}/floor.png`);

        // 애니메이션 프레임 정의
        for (let i = 0; i <= 15; i++)
            this.load.image('ocean' + i, `${img}/ocean` + i + '.png');
        for (let i = 1; i<= 10; i++){
            this.load.image('link_walkX' + i, `${img}/link_walkX` + i + '.png');
            this.load.image('link_backward' + i, `${img}/link_backward` + i + '.png');
            this.load.image('link_forward' + i, `${img}/link_forward` + i + '.png');
        }

        // 사운드 로드
        this.load.audio('FinalBossTheme', [`${sound}/FinalBossTheme.mp3`]);

        // 효과음

    }

    create() {
        // 타이틀 화면 이동
        this.scene.start('BossBattleScene');
    }
}
