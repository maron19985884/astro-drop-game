import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle
  private score = 0
  private scoreText!: Phaser.GameObjects.Text
  private laneIndex = 0 // -2 (left) to 2 (right)
  private obstacleGroup!: Phaser.Physics.Arcade.Group

  constructor() {
    super('GameScene')
  }

  preload(): void {
    // No assets to preload for now
  }

  create(): void {
    const { width, height } = this.scale

    // Basic background
    this.add.rectangle(width / 2, height / 2, width, height, 0x101020)

    // Create player as a simple rectangle placeholder
    this.player = this.add.rectangle(width / 2, height * 0.8, 40, 60, 0x00ff00)
    this.physics.add.existing(this.player)

    // Listen for taps to change direction
    this.input.on('pointerdown', this.handlePointerDown, this)

    // Ensure player is positioned in the center lane initially
    this.updatePlayerPosition()

    // Display score in the top-right corner
    this.scoreText = this.add.text(width - 16, 16, 'Score: 0', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(1, 0)

    // Create obstacle group
    this.obstacleGroup = this.physics.add.group()

    // Increment score every second
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.addScore,
      callbackScope: this
    })

    // Spawn obstacles regularly
    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: this.spawnObstacle,
      callbackScope: this
    })
  }

  private addScore(): void {
    this.score += 10
    this.scoreText.setText(`Score: ${this.score}`)
  }

  private handlePointerDown(pointer: Phaser.Input.Pointer): void {
    const { width } = this.scale
    if (pointer.downX < width / 2) {
      this.laneIndex = Phaser.Math.Clamp(this.laneIndex - 1, -2, 2)
    } else {
      this.laneIndex = Phaser.Math.Clamp(this.laneIndex + 1, -2, 2)
    }
    this.updatePlayerPosition()
  }

  private updatePlayerPosition(): void {
    const { width } = this.scale
    const segmentWidth = width / 5
    const index = this.laneIndex + 2
    const x = segmentWidth * (index + 0.5)
    this.player.setX(x)
  }

  private spawnObstacle(): void {
    const { width, height } = this.scale
    const lane = Phaser.Math.Between(-2, 2)
    const segmentWidth = width / 5
    const index = lane + 2
    const x = segmentWidth * (index + 0.5)

    const obstacle = this.add.rectangle(x, height + 20, 40, 40, 0xff0000)
    this.physics.add.existing(obstacle)
    const body = obstacle.body as Phaser.Physics.Arcade.Body
    body.setVelocityY(-150)
    body.setAllowGravity(false)
    body.setImmovable(true)

    this.obstacleGroup.add(obstacle)
  }

  update(): void {
    this.obstacleGroup.getChildren().forEach((child) => {
      const obj = child as Phaser.GameObjects.Rectangle
      if (obj.y + obj.height / 2 < 0) {
        this.obstacleGroup.remove(obj, true, true)
      }
    })
  }
}
