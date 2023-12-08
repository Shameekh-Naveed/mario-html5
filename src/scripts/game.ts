import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import { insertCoin, myPlayer, onPlayerJoin, usePlayersState } from 'playroomkit'

const DEFAULT_WIDTH = 400
const DEFAULT_HEIGHT = 240

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#6888ff',
  render: {
    pixelArt: true,
    roundPixels: true,
  },
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 650 },
    },
  },
}

const loadFunction = async (config) => {
  await insertCoin()
  const game = new Phaser.Game(config)
  const player = myPlayer()
  console.log(`Hello i am ${player.id}`)
  // const players = usePlayersState('count')
  // console.log(`There are ${players} players in the room`)

  onPlayerJoin((player) => {
    console.log(`${player.id} joined!`)
  })
}

window.addEventListener('load', () => {
  loadFunction(config)
})
