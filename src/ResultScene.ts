import Phaser from 'phaser'

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene')
  }

  create(data: { score: number }): void {
    const { width, height } = this.scale

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x101020)

    // High score handling
    const stored = localStorage.getItem('highScore')
    let highScore = stored ? parseInt(stored, 10) : 0

    if (data.score > highScore) {
      highScore = data.score
      localStorage.setItem('highScore', String(highScore))
    }

    // Score texts
    this.add
      .text(width / 2, height * 0.3, `Score: ${data.score}`, {
        fontSize: '32px',
        color: '#ffffff'
      })
      .setOrigin(0.5)
    this.add
      .text(width / 2, height * 0.4, `High Score: ${highScore}`, {
        fontSize: '24px',
        color: '#ffffff'
      })
      .setOrigin(0.5)

    // Retry button
    const retryButton = this.add
      .text(width / 2, height * 0.6, 'リトライ', {
        fontSize: '24px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: { x: 10, y: 5 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    retryButton.on('pointerdown', () => {
      this.scene.start('GameScene')
    })

    // Placeholder buttons
    this.add
      .text(width / 2, height * 0.7, 'メニュー (未実装)', {
        fontSize: '20px',
        color: '#bbbbbb'
      })
      .setOrigin(0.5)
    this.add
      .text(width / 2, height * 0.77, '設定 (未実装)', {
        fontSize: '20px',
        color: '#bbbbbb'
      })
      .setOrigin(0.5)
  }
}
