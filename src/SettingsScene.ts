import Phaser from 'phaser'
import {
  getBgmEnabled,
  setBgmEnabled,
  getSeEnabled,
  setSeEnabled
} from './utils/storage'

export default class SettingsScene extends Phaser.Scene {
  private bgmButton!: Phaser.GameObjects.Text
  private seButton!: Phaser.GameObjects.Text

  constructor() {
    super('SettingsScene')
  }

  create(): void {
    const { width, height } = this.scale

    // simple background
    this.add.rectangle(width / 2, height / 2, width, height, 0x202040)

    this.bgmButton = this.add
      .text(width / 2, height * 0.4, '', {
        fontSize: '32px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: { x: 10, y: 5 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })

    this.seButton = this.add
      .text(width / 2, height * 0.55, '', {
        fontSize: '32px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: { x: 10, y: 5 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })

    this.updateLabels()

    this.bgmButton.on('pointerdown', () => {
      const enabled = !getBgmEnabled()
      setBgmEnabled(enabled)
      this.updateLabels()
    })

    this.seButton.on('pointerdown', () => {
      const enabled = !getSeEnabled()
      setSeEnabled(enabled)
      this.updateLabels()
    })
  }

  private updateLabels(): void {
    this.bgmButton.setText(`BGM: ${getBgmEnabled() ? 'ON' : 'OFF'}`)
    this.seButton.setText(`SE: ${getSeEnabled() ? 'ON' : 'OFF'}`)
  }
}
