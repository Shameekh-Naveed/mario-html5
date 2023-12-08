import { Power, Large } from './index'
import Player from '../objects/player'
import { myPlayer, setState } from 'playroomkit'

const defaultOptions = {
  /**
   * 最大移动速度
   */
  maxVx: 200,
  /**
   * 移动时的加速度
   */
  ax: 250,
  /**
   * 当速度小于指定值时停止移动
   */
  stopSpeed: 30,
}

/**
 * 移动能力
 */
export class Move implements Power {
  private options = defaultOptions

  constructor(player: Player, options = {}) {
    this.options = { ...defaultOptions, ...options }
    player.body.setMaxVelocityX(this.options.maxVx)
  }

  public update(time: number, delta: number, player: Player, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    const { ax, stopSpeed } = this.options
    const velocity = player.body.velocity
    const animSuffix = player.animSuffix
    // 移动
    if (cursors.left.isDown) {
      player.setFlipX(true)
      player.body.setAccelerationX(-ax - (velocity.x > 0 ? velocity.x * 2 : 0))
    } else if (cursors.right.isDown) {
      player.setFlipX(false)
      player.body.setAccelerationX(ax + (velocity.x < 0 ? -velocity.x * 2 : 0))
    } else {
      if (Math.abs(velocity.x) < stopSpeed) {
        player.body.setVelocityX(0).setAcceleration(0, 0)
      } else {
        // 速度在10以上时会有一个减速的效果
        player.body.setAccelerationX((velocity.x < 0 ? 1 : -1) * ax)
      }
    }

    // 动画
    if (player.body.blocked.down) {
      if (cursors.down.isDown && player.powers.has(Large)) {
        player.anims.play('bend' + animSuffix, true)
        player.body.setVelocityX(0).setAcceleration(0, 0)
      } else {
        if ((cursors.left.isDown && velocity.x > 0) || (cursors.right.isDown && velocity.x < 0)) {
          player.anims.play('turn' + animSuffix, true)
        } else {
          player.anims.play((Math.abs(velocity.x) >= 10 ? 'run' : 'stand') + animSuffix, true)
        }
      }
    }
    if (player.id === myPlayer().id) {
      player.playroomPlayer.setState('VelocityX', velocity.x)
      player.playroomPlayer.setState('VelocityY', velocity.y)
      player.playroomPlayer.setState('AccelerationX', player.body.acceleration.x)
      player.playroomPlayer.setState('FlipX', player.flipX)
      player.playroomPlayer.setState('anim', player.anims.currentAnim.key)
      player.playroomPlayer.setState('x', player.x)
      player.playroomPlayer.setState('y', player.y)
    } else {
      const vx = player.playroomPlayer.getState('VelocityX')
      const vy = player.playroomPlayer.getState('VelocityY')
      const ax = player.playroomPlayer.getState('AccelerationX')
      const flipX = player.playroomPlayer.getState('FlipX')
      const anim = player.playroomPlayer.getState('anim')

      if (vx !== null && vx !== undefined && !Number.isNaN(vx)) player.body.setVelocityX(vx)
      if (vy !== null && vy !== undefined && !Number.isNaN(vy)) player.body.setVelocityY(vy)
      if (ax !== null && ax !== undefined && !Number.isNaN(ax)) player.body.setAccelerationX(ax)
      if (flipX !== null && flipX !== undefined) player.setFlipX(flipX)
      if (anim !== null && anim !== undefined) player.anims.play(anim, true)
    }
  }
}
