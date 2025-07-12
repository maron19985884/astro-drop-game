import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle
  private score = 0
  private scoreText!: Phaser.GameObjects.Text

  constructor() {
    super('GameScene')
  }

  preload(): void {
    // No assets to preload for now
  }

  create(): void {
    const { width, height } = this.scale

    // Create player as a simple rectangle placeholder
    this.player = this.add.rectangle(width / 2, height * 0.8, 40, 60, 0x00ff00)
    this.physics.add.existing(this.player)

    // Display score in the top-right corner
    this.scoreText = this.add.text(width - 16, 16, 'Score: 0', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(1, 0)

    // Increment score every second
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.addScore,
      callbackScope: this
    })
  }

  private addScore(): void {
    this.score += 10
    this.scoreText.setText(`Score: ${this.score}`)
  }

  update(): void {
    // Game logic will be added later
  }
}
