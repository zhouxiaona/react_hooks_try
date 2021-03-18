import { Phaser } from '../../../type/index.d.ts'
import popup from './img/sprite.popup.png'
import startBg from './img/startBg.png'
import startBtn from './img/startBtn.png'
import startTitle from './img/startTitle.png'
import startTV from './img/startTV.png'
import startFamily from './img/startFamily.png'
import startTVLight from './img/startTVLight.png'
import tvfamily from './img/tvfamily.png'
import wall1 from './img/wall1.png'
import wall2 from './img/wall2.png'
import wall3 from './img/wall3.png'
import wall4 from './img/wall4.png'
import white from './img/white.png'
import orange from './img/orange.png'
import resultObject1 from './img/resultObject1.png'
import upload_loading from './img/upload_loading.gif'

import tvshow from './img/tvshow.png'
import objects from './img/objects.png'
import television from './img/television.png'
import tableSofa from './img/tableSofa.png'
import wall from './img/wall.png'
import sit from './img/sit.png'
import stand from './img/stand.png'
import stand2 from './img/stand2.png'
import stall from './img/stall.png'
import indescribe from './img/indescribe.png'
import article1 from './img/article1.png'
import article2 from './img/article2.png'
import article3 from './img/article3.png'
import article4 from './img/article4.png'
import egg1 from './img/egg1.png'
import egg2 from './img/egg2.png'
import resultObject from './img/resultObject.png'

import cat1 from './img/cat1.png'
import cat2 from './img/cat2.png'
import object1 from './img/object1.png'
import object2 from './img/object2.png'

let tvshowJson = require('./json/tvshow.json');
let objectsJson = require('./json/objects.json');
let televisionJson = require('./json/television.json');
let tableSofaJson = require('./json/tableSofa.json');
let wallJson = require('./json/wall.json');
let sitJson = require('./json/sit.json');
let standJson = require('./json/stand.json');
let standJson2 = require('./json/stand2.json');
let stallJson = require('./json/stall.json');
let indescribeJson = require('./json/indescribe.json');
let articleJson1 = require('./json/article1.json');
let articleJson2 = require('./json/article2.json');
let articleJson3 = require('./json/article3.json');
let articleJson4 = require('./json/article4.json');
let eggJson1 = require('./json/egg1.json');
let eggJson2 = require('./json/egg2.json');
let resultObjectJson = require('./json/resultObject.json');

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
    this.option = {}
  }

  init() {
    this.progressText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, '0%', {
      fontSize: 60 * this.game.config.width / 750,
      fill: '#FFEC13',
      fontWeight: 'bold',
    }).setOrigin(0.5);
  }

  preload() {
    this.load.crossOrigin = 'anonymous'; // 设置跨域
    this.load.image('popup', popup)
    this.load.image('startBg', startBg)
    this.load.image('startBtn', 'https://imgs.xrspy.com/game/startBtn.png')
    this.load.image('startTitle', startTitle)
    this.load.image('startTV', startTV)
    this.load.image('startFamily', startFamily)
    this.load.image('startTVLight', 'https://imgs.xrspy.com/game/startTVLight.png')
    this.load.image('tvfamily', 'https://imgs.xrspy.com/game/tvfamily.png')
    this.load.image('wall1.png', wall1)
    this.load.image('wall2.png', wall2)
    this.load.image('wall3.png', wall3)
    this.load.image('wall4.png', 'https://imgs.xrspy.com/game/wall4.png')
    this.load.image('white', 'https://imgs.xrspy.com/game/white.png')
    this.load.image('orange', 'https://imgs.xrspy.com/game/orange.png')
    this.load.image('resultBottom', "https://img30.360buyimg.com/cms/jfs/t1/8466/13/12879/22390/5c3c451cE591c483e/00627c32d7a9d7b8.jpg")
    this.load.image('resultObject1', 'https://imgs.xrspy.com/game/resultObject1.png')
    this.load.image('upload_loading', upload_loading)

    this.load.image('cat1', 'https://imgs.xrspy.com/game/cat1.png')
    this.load.image('cat2', 'https://imgs.xrspy.com/game/cat2.png')
    this.load.image('object1', 'https://imgs.xrspy.com/game/object1.png')
    this.load.image('object2', 'https://imgs.xrspy.com/game/object2.png')

    this.load.atlas('tvshow', tvshow, tvshowJson)
    this.load.atlas('objects', 'https://imgs.xrspy.com/game/objects.png', objectsJson)
    this.load.atlas('television', television, televisionJson);
    this.load.atlas('tableSofa', tableSofa, tableSofaJson);
    this.load.atlas('wall', 'https://imgs.xrspy.com/game/wall.png', wallJson);
    this.load.atlas('sit', sit, sitJson);
    this.load.atlas('stand', stand, standJson);
    this.load.atlas('stand2', 'https://imgs.xrspy.com/game/stand2.png', standJson2);
    this.load.atlas('stall', stall, stallJson);
    this.load.atlas('indescribe', indescribe, indescribeJson);
    this.load.atlas('article1', article1, articleJson1);
    this.load.atlas('article2', article2, articleJson2);
    this.load.atlas('article3', article3, articleJson3);
    this.load.atlas('article4', article4, articleJson4);
    this.load.atlas('egg1', egg1, eggJson1);
    this.load.atlas('egg2', egg2, eggJson2);
    this.load.atlas('resultObject', 'https://imgs.xrspy.com/game/resultObject.png', resultObjectJson);

    this.load.on('progress', (progress) => {
      progress = parseInt(progress.toFixed(2) * 100)
      this.progressText.setText(`${progress}%`);
    })
  }
  create() {
    this.scene.start('StartScene')
  }
}
