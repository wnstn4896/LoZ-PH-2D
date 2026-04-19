export class BossBattleScene extends Phaser.Scene {
    constructor() {
        super('BossBattleScene');
        this.cursors;

        this.facing = 'right'; // 플레이어 캐릭터 방향
    }

    create() {
        // 배경 설정
        const { width, height } = this.cameras.main;
        this.background = this.add.sprite(width / 2, height / 2, 'ocean0');
        this.background.setDisplaySize(width, height);

        // 배경 애니메이션 프레임 처리
        const bgFrames = [];
        for (let i = 0; i <= 15; i++)
            bgFrames.push({ key: 'ocean' + i });

        this.anims.create({
            key: 'background',
            frames: bgFrames,
            frameRate: 12,
            repeat: -1
        });
        this.background.anims.play('background');

        this.floor = this.add.sprite(640, 360, 'floor');

        this.physics.world.setBounds(390, 100, 510, 500); // 월드 경계 설정
        // 현재 X 좌표만 처리됨. (X 시작 위치, Y 시작 위치, X 크기, Y 크기)

        // 캐릭터 애니메이션 프레임 처리
        const walkXFrames = [];
        const backwardFrames = [];
        const forwardFrames = [];
        for (let i =1; i<=10; i++){
            walkXFrames.push({ key: 'link_walkX' + i});
            backwardFrames.push({ key: 'link_backward' + i});
            forwardFrames.push({ key: 'link_forward' + i});
        }
        
        this.anims.create({
            key: 'walkX',
            frames: walkXFrames,
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'backward',
            frames: backwardFrames,
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'forward',
            frames: forwardFrames,
            frameRate: 16,
            repeat: -1
        });

        // 플레이어 캐릭터 생성
        this.player = this.physics.add.sprite(500, 360, 'link_walkX1');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(1);
        this.player.setFlipX(true);

        // 키보드 입력 인식 처리
        this.cursors = this.input.keyboard.createCursorKeys();

        this.bgm = this.sound.add('FinalBossTheme', { loop: true });
        this.bgm.setVolume(0.7).play();
    }

    update() {
        const speed = 150;

        let vx = 0;
        let vy = 0;

        let anim = null;

        if (this.cursors.up.isDown) {
            vy = -speed;
            anim = 'forward';
            this.facing = 'up';

        } else if (this.cursors.down.isDown) {
            vy = speed;
            anim = 'backward';
            this.facing = 'down';

        } else if (this.cursors.left.isDown) {
            vx = -speed;
            anim = 'walkX';
            this.player.setFlipX(false);
            this.facing = 'left';

        } else if (this.cursors.right.isDown) {
            vx = speed;
            anim = 'walkX';
            this.player.setFlipX(true);
            this.facing = 'right';
        }
        this.player.setVelocity(vx, vy);

        if (anim){
            this.player.anims.play(anim, true);
        } else {
            this.player.setVelocity(0);
            this.player.anims.stop();

            switch (this.facing) {
                case 'left':
                case 'right':
                    this.player.setTexture('link_walkX1');
                    break;
                case 'down':
                    this.player.setTexture('link_backward1');
                    break;
                case 'up':
                    this.player.setTexture('link_forward1');
                    break;
            }
        }
    }
}