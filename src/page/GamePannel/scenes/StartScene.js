import { Phaser } from '../../../type/index.d.ts'
export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
    this.option = {
      keyNum: 0, //用于识别人物或物件的唯一id
      resultObject: {
        'egg3.png': '那些年你最爱的插卡游戏，\n如今还能与我大战三百回合吗？',
        'egg14.png': '小时候你抢着要点我，现在\n你有多久没见过我啦？',
        'egg19.png': '恭喜发财，红包拿来~',
        'egg0.png': '随着我这个老古董一起消失的\n是你抖腿的童年啊～',
        'television.png': '我一直在变，不变的是守在\n我跟前看春晚的一家人。',
        'article26.png': '无论身在何方，一声铃响\n总有家人守在电话旁。',
        'article30.png': '那些年我守护过热水的温度，\n也希望能替你守护家的温暖。',
        'article28.png': '还记得那些年你趴在我面前\n听的宝贝磁带么？',
        'article29.png': '童年的幸福总是来得很轻易，\n比如围着小太阳吃烤红薯。',
        'sofatable3.png': '在外姿势拼演技，在家姿势\n比实力'
      },
      selectResultObject: ['television.png'],
      resultObjectKey: ['egg3.png', 'egg14.png', 'egg19.png', 'egg0.png', 'television.png', 'article26.png', 'article30.png', 'article28.png', 'article29.png', 'sofatable3.png'],
      fourContentPos: [
        {
          left: 325,
          top: 90
        }, {
          left: 580,
          top: 90,
        }, {
          left: 325,
          top: 250
        }, {
          left: 580,
          top: 250
        }
      ],
    }
  }

  init() {
    this.gameWidthHf = this.game.config.width / 2;
    this.gameHeightHf = this.game.config.height / 2;
    this.gameWidth = this.game.config.width;
    this.gameHeight = this.game.config.height;

    this.judgePhone();
    // this.bindEvent();
    this.bindScaleEvent();
  }

  create() {
    if (this.editGroup) return;
    //编辑页
    this.createEditPage();
    // this.showEditTab();
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  update() {
    // this.editGroup && this.game.world.bringToTop(this.editGroup);
    // this.editTabWrapGroup && this.game.world.bringToTop(this.editTabWrapGroup);
    // this.editTabWrap && this.game.world.bringToTop(this.editTabWrap);
    // this.resultBottom && this.game.world.bringToTop(this.resultBottom);
    // this.selectWrap && this.game.world.moveDown(this.selectWrap);
    // this.mobilityGroup && this.game.world.moveDown(this.mobilityGroup);
    // this.bottomObjectGroup && this.game.world.moveDown(this.bottomObjectGroup);
    // this.dealScrollObject();
  }

  bindScaleEvent() {
    this.isOnTarget = false;    //判断是否按了当前选中元素的缩放按钮
    this.onScaleTarget = null;      //选中元素
    this.objectscaleRate = null;        //通过滑动位置计算出得缩放倍数
    this.onScaleTargetValue = null;     //选中元素当前的缩放倍数

    this.input.on('pointermove', this.moveCompass, this)
    this.input.on('pointerup', this.removeCompass, this)
  }

  moveCompass(pointer, currentlyOver) {
    if (!this.isOnTarget) return;
    const currentMoveX = pointer.x;
    const currentMoveY = pointer.y;

    if (!this.objectscaleRate) {
      this.objectscaleRate = currentMoveX / currentMoveY;
      return;
    }
    const currentRate = currentMoveX / currentMoveY;
    //元素的缩放要以上一次缩放后的倍数被基础进行缩放
    let scaleRate = currentRate / this.objectscaleRate - 1 + this.onScaleTargetValue;
    scaleRate = scaleRate <= 0.25 ? 0.25 : scaleRate >= 2 ? 2 : scaleRate;
    this.onScaleTarget.scale.set(scaleRate);

    const dashLine = this.selectWrap.bitmapDatas; //edit----
    const onScaleTarget = this.onScaleTarget;
    const scaleBtn = this.selectWrap.getChildAt(1);

    const offsetNum = 10,
      width = onScaleTarget.width,
      height = onScaleTarget.height,
      offsetX = -width / 2,
      offsetY = -height / 2,
      boxWidth = width + 2 * offsetNum,
      boxHeight = height + 2 * offsetNum;
    //元素需要缩放，编辑框只缩放尺寸，不缩放按钮和虚线实际大小，因此每次缩放都要重新绘制虚线框
    dashLine.clear(0, 0, this.selectWrap.width, this.selectWrap.height);
    dashLine.resize(width + 2 * offsetNum, height + 2 * offsetNum)
    this.selectWrap.x = onScaleTarget.x + offsetX - offsetNum;
    this.selectWrap.y = onScaleTarget.y + offsetY - offsetNum;
    scaleBtn.x = this.selectWrap.width - 30;

    dashLine.ctx.shadowColor = '#a93e26';
    dashLine.ctx.shadowBlur = 20;
    dashLine.ctx.shadowOffsetX = 0;
    dashLine.ctx.shadowOffsetY = 0;
    dashLine.ctx.beginPath();
    dashLine.ctx.lineWidth = 6;
    dashLine.ctx.strokeStyle = 'white';
    dashLine.ctx.setLineDash([12, 12]);
    dashLine.ctx.moveTo(0, 0);
    dashLine.ctx.lineTo(boxWidth, 0);
    dashLine.ctx.lineTo(boxWidth, boxHeight);
    dashLine.ctx.lineTo(0, boxHeight);
    dashLine.ctx.lineTo(0, 0);
    dashLine.ctx.stroke();
    dashLine.ctx.closePath();
  }

  removeCompass() {
    this.isOnTarget = false;
    this.onScaleTarget = null;
    this.objectscaleRate = null;
    this.onScaleTargetValue = null;
  }

  bindEvent() {
    const _this = this;
    // $('.J_popup.over .btn_iknow').click(() => {
    //   $('.J_popup').removeClass('over').hide();
    // })
    // $('.J_popup.over .close').click(() => {
    //   $('.J_popup').removeClass('over').hide();
    // })
    // $('.J_finish .replay').click(() => {
    //   this.game.renderer.resize(750, this.gameHeight);
    //   $('.J_finish').hide();
    //   $('.J_finish .result').css({ opacity: 0 });
    //   $('.J_finish .btm').css({ opacity: 0 });
    //   $('.J_finish .load').show();
    //   _this.resultBottom.visible = false;
    //   _this.editGroup.visible = true;
    // })
  }

  // judge phone type
  judgePhone() {
    // iPhone X、iPhone XS
    this.isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
    // iPhone XS Max
    this.isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
    // iPhone XR
    this.isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;

    this.isIPhoneXX = (this.isIPhoneX || this.isIPhoneXSMax || this.isIPhoneXR);
  }

  // 1
  createEditPage() {
    this.mobilityGroup = this.add.group();    //用于存放游戏中的物件
    this.createWall();      //创建墙
    // this.createTableSofa('sofatable1.png');     //创建沙发
    // this.createTelevision('television1.png');   //创建电视机
    this.createEditWrap();          //创建编辑面板
  }

  showEditTab() {
    const tabHeight = this.isIPhoneXX ? 117 : 80;
    this.add.tween(this.editTabWrap).to({ y: this.gameHeight - tabHeight }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.add.tween(this.editContent).to({ y: this.gameHeight - 350 - tabHeight }, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
  }

  // 创建墙纸1.1
  createWall() {
    this.wall = this.add.image(0, 0, 'wall1.png').setOrigin(0);
    this.wall.setName('wall')
    this.wall.setInteractive()
    this.wall.on('pointerdown', this.deleteCurrentWrap, this)
    this.mobilityGroup.add(this.wall);
  }

  // 创建沙发
  createTableSofa(spriteName) {
    const tableSofa = this.add.sprite(this.gameWidthHf, this.gameHeightHf + 20, 'tableSofa', spriteName);

    tableSofa.anchor.set(0.5, 0.5);
    tableSofa.name = 'tableSofa';
    tableSofa.keyNum = this.option.keyNum++;

    this.bindObjectSelected(tableSofa);
    this.tableSofa = tableSofa;
    this.mobilityGroup.add(tableSofa);
  }

  bindObjectSelected(target) {
    target.inputEnabled = true;
    target.input.enableDrag(false, true);
    //绘制编辑框
    target.events.onDragStart.add(this.objectSelected, this);
    target.events.onDragUpdate.add(this.objectDragUpdate, this);
  }

  // 创建电视机
  createTelevision(spriteName) {
    const televisionTop = this.isIPhoneXX ? 317 : 280;
    const television = this.add.sprite(this.gameWidthHf, this.gameHeight - televisionTop, 'television', spriteName);
    television.setOrigin(0.5);
    television.name = 'television';
    television.keyNum = this.option.keyNum++;

    this.bindObjectSelected(television);
    this.television = television;
    this.mobilityGroup.add(television);
  }
  clickTableSofa() {
    this.deleteCurrentWrap();
    this.mobilityGroup.bringToTop(this.tableSofa);
  }

  // 取消选中状态
  deleteCurrentWrap() {
    console.log(2222)
    this.selectWrap && this.selectWrap.destroy();
    this.selectWrap = null;
  }

  // 物品选中状态处理
  objectSelected(e, p) {
    if (e.name == 'wall' || e.name == this.selectedObject) return;
    //如果点击的元素是当前选中元素，则不进行任何操作
    if (this.selectWrap && e.keyNum == this.selectWrap.keyNum) return;
    //去掉当前选中元素状态
    this.deleteCurrentWrap();

    const offsetNum = 10,
      width = e.width,
      height = e.height,
      offsetX = -width / 2,
      offsetY = -height / 2,
      boxWidth = width + 2 * offsetNum,
      boxHeight = height + 2 * offsetNum;

    const dashLine = this.add.bitmapData(width + 2 * offsetNum, height + 2 * offsetNum);
    const wrap = this.add.image(e.x + offsetX - offsetNum, e.y + offsetY - offsetNum, dashLine)
    wrap.name = 'wrap';
    wrap.keyNum = e.keyNum;

    //绘制虚线
    dashLine.ctx.shadowColor = '#a93e26';
    dashLine.ctx.shadowBlur = 20;
    dashLine.ctx.beginPath();
    dashLine.ctx.lineWidth = 6;
    dashLine.ctx.strokeStyle = 'white';
    dashLine.ctx.setLineDash([12, 12]);
    dashLine.ctx.moveTo(0, 0);
    dashLine.ctx.lineTo(boxWidth, 0);
    dashLine.ctx.lineTo(boxWidth, boxHeight);
    dashLine.ctx.lineTo(0, boxHeight);
    dashLine.ctx.lineTo(0, 0);
    dashLine.ctx.stroke();
    dashLine.ctx.closePath();
    wrap.bitmapDatas = dashLine;

    //删除按钮
    const close = this.add.sprite(- 27, -23, 'objects', 'close.png');
    close.inputEnabled = true;
    close.events.onInputDown.add(this.deleteObject, this, null, e, e._frame.name);
    wrap.addChild(close);
    //放大按钮
    const scale = this.add.sprite(boxWidth - 27, -23, 'objects', 'scale.png');
    scale.inputEnabled = true;
    scale.events.onInputDown.add(function (ev, pt) {
      //判断用户是否要缩放元素
      this.isOnTarget = true;
      this.onScaleTarget = e;
      this.onScaleTargetValue = e.scale.x;
    }, this);

    wrap.addChild(scale);
    this.selectWrap = wrap;
  }
  deleteObject(e, p, target, key) {
    if (target.key == 'television') {
      this.television = null;
      this.tvGroup.getByName('selected').destroy();
    } else if (target.key == 'tableSofa') {
      this.tableSofa = null;
      this.tbSofaGroup.getByName('selected').destroy();
    }
    target.destroy();

    this.deleteCurrentWrap();
    this.removeDeleteObject(key);
  }
  // 创建编辑面板-1.2
  createEditWrap() {
    this.editGroup = this.add.group();
    this.createFurnitureContent();       //创建tab内容
    this.createEditTab();           //创建tab标题
    // this.createFinishBtn();         //创建完成按钮
    // this.editGroup.setActive(true);
  }
  createFinishBtn() {
    const finishBtnTop = this.isIPhoneXX ? this.gameHeight - 779 : this.gameHeight - 742;
    const finishBtn = this.game.add.sprite(this.gameWidth - 155, finishBtnTop, 'objects', 'finish.png');

    finishBtn.inputEnabled = true;
    finishBtn.input.enableDrag();
    finishBtn.input.allowHorizontalDrag = false;
    finishBtn.input.allowVerticalDrag = true;
    finishBtn.input.dragDistanceThreshold = 10;
    finishBtn.events.onDragUpdate.add(this.isDragFinish, this);
    finishBtn.events.onInputUp.add(this.finishPuzzle, this);

    this.finishBtnTop = finishBtnTop + 150;
    this.finishBtn = finishBtn;
    this.editGroup.add(finishBtn);
  }
  isDragFinish(e) {
    this.isDraggingFinishBtn = true;

    if (e.y <= 0) {
      e.y = 0;
    } else if (e.y >= this.finishBtnTop) {
      e.y = this.finishBtnTop;
    }
  }
  finishPuzzle() {
    if (this.isDraggingFinishBtn) {
      this.isDraggingFinishBtn = false;
      return;
    }
    //显示结果页
    // $('.J_finish').show();
    //删除编辑框
    this.deleteCurrentWrap();
    //隐藏选择元素面板
    this.editGroup.visible = false;
    //创建底部结果二维码等
    this.createResultBottom();
    //隐藏选择元素面板和创建底部结果二维码需要时间，需要间隔一段时候后再生成长图
    setTimeout(() => {
      this.uploadImage();
    }, 100);
  }
  uploadImage() {
    const dataUrl = this.game.canvas.toDataURL('image/jpeg', 0.7);
    //todo 可以在此将图片上传到服务器再更新到结果页
    this.showResult(dataUrl);
  }
  showResult(src) {
    //   $('.J_finish .result').attr('src', src).css({ opacity: 1 });
    //   $('.J_finish .btm').css({ opacity: 1 });
    //   $('.J_finish .load').hide();
  }
  createResultBottom() {
    const newyearHeight = this.isIPhoneXX ? 160 : 105;
    const extendHeight = newyearHeight + 80;

    this.game.renderer.resize(750, this.gameHeight + 285 - extendHeight);

    //创建底部结果
    const resultBottom = this.game.add.sprite(0, this.gameHeight - extendHeight, 'resultBottom');
    let result = this.selectResultObject.length == 0 ? this.resultObjectKey[Math.floor(Math.random() * this.resultObjectKey.length)] : this.selectResultObject[Math.floor(Math.random() * this.selectResultObject.length)];
    result = result.replace('png', 'png');
    result = result.replace(/television[1234]{1}/, 'television');
    const wd = this.resultObject[result];
    const resultObject = this.game.add.sprite(17, 18, 'resultObject', result);
    const wdText = this.game.add.text(359, 83, wd, { font: '24px', fill: '#754b44', align: 'left' });
    wdText.anchor.set(0.5);

    resultBottom.addChild(resultObject);
    resultBottom.addChild(wdText);
    this.resultBottom = resultBottom;
  }

  // 创建底部tab功能1.2.2
  createEditTab() {
    this.editTabWrapContainer = this.add.container(0, this.gameHeight - 100);
    const editTabWrapGroup = this.add.group(),
      editTabWrap = this.add.sprite(0, 0, 'objects', 'wrap.png').setOrigin(0),
      furniture = this.add.sprite(40, 15, 'objects', 'furniture.png').setOrigin(0),
      post = this.add.sprite(545, 15, 'objects', 'post.png').setOrigin(0),
      object = this.add.sprite(224, 15, 'objects', 'object.png').setOrigin(0),
      egg = this.add.sprite(380, 15, 'objects', 'egg.png').setOrigin(0),
      arrowWrap = this.add.sprite(684.5, 47.5, 'objects', 'arrow.png').setOrigin(0.5),
      selected = this.add.sprite(0, -21, 'objects', 'selected.png').setOrigin(0);
    this.editTabWrapContainer.add([editTabWrap, selected, furniture, post, object, egg, arrowWrap])

    arrowWrap.name = 'arrowWrap';
    selected.name = 'tabSelected';
    furniture.name = 'furniture';
    post.name = 'post';
    object.name = 'object';
    egg.name = 'egg';

    editTabWrapGroup.addMultiple([selected, furniture, post, object, egg, arrowWrap]);
    editTabWrapGroup.getChildren().forEach((v, k) => {
      v.setInteractive()
      v.on('pointerdown', () => this.handleEditTabClick(v), null);
    })

    this.editTabWrap = editTabWrap;
    this.editArrow = arrowWrap;
    this.editTabWrapGroup = editTabWrapGroup;
    this.editTabWrapContainer.setDepth(10);
  }

  // 底部tab点击事件1.2.2.1--------
  handleEditTabClick(e) {
    const target = e.name || '';
    console.log(target, '---target---')
    let selectedLeft = 0;
    if (target == '' || target == 'tabSelected') {
      return;
    }
    if (target == 'arrowWrap') {
      this.dealEditContent();
      return;
    }
    switch (target) {
      case 'furniture':
        this.furnitureContent.setVisible(true);
        this.postContent && (this.postContent.setVisible(false));
        this.articleContent && (this.articleContent.setVisible(false));
        this.eggContent && (this.eggContent.setVisible(false));
        selectedLeft = 0;
        break;
      case 'post':
        this.furnitureContent.setVisible(false);
        if (this.postContent) {
          this.postContent.setVisible(true)
        } else {
          this.createPostContent();
        }
        this.articleContent && (this.articleContent.setVisible(false));
        this.eggContent && (this.eggContent.setVisible(false));
        selectedLeft = 485;
        break;
      case 'object':
        this.furnitureContent.setVisible(false);
        this.furnitureContent.disableInteractive();
        this.postContent && (this.postContent.setVisible(false));
        if (this.articleContent) {
          this.articleContent.setVisible(true)
        } else {
          this.createArticleContent();
        }
        this.eggContent && (this.eggContent.setVisible(false));
        selectedLeft = 165;
        break;
      case 'egg':
        this.furnitureContent.setVisible(false);
        this.postContent && (this.postContent.setVisible(false));
        this.articleContent && (this.articleContent.setVisible(false));
        if (this.eggContent) {
          this.eggContent.setVisible(true)
        } else {
          this.createEggContent();
        }
        selectedLeft = 323;
        break;
    }
    this.editTabWrapGroup.getMatching('name', 'tabSelected')[0].x = selectedLeft;
    this.showEditContent();
  }

  // 处理底部tab框的显示与隐藏1.2.2.1.1
  dealEditContent() {
    if (this.furnitureContent.visible) {
      this.hideEditContent();
      return;
    }
    this.showEditContent();
  }

  // 显示tab框
  showEditContent() {
    this.furnitureContent.setVisible(true);
    this.tweens.add({
      targets: this.editArrow,
      angle: 0,
      repeat: 0,
      duration: 100,
      ease: 'Power1',
      onComplete: function () {
        console.log('editArrow-show-complete')
      }
    })
  }

  // 隐藏tab框
  hideEditContent() {
    this.furnitureContent.setVisible(false);
    this.tweens.add({
      targets: this.editArrow,
      angle: 180,
      repeat: 0,
      duration: 100,
      ease: 'Power1',
      onComplete: function () {
        console.log('editArrow-hide-complete')
      }
    })
  }
  // 创建家具1.2.1.1
  createFurnitureContent() {
    this.furnitureContent = this.add.container(0, this.gameHeight - 350);
    let whitePannel = this.add.graphics();
    //tab内容背景
    whitePannel.fillStyle(0xffffff, 1)
    whitePannel.fillRect(0, 0, this.gameWidth, 350);
    this.editGroup.add(whitePannel);
    // const leftTab = this.add.graphics();
    // const leftTabGroup = this.add.group();
    this.furnitureContent.add([whitePannel]);
    // leftTab.fillStyle(0xfff7e0, 1);
    // leftTab.fillRect(0, 0, 155, 350);
    // // leftTabGroup.add(leftTab)
    // this.furnitureContent.add([leftTab])

    // this.selected = this.add.graphics();
    // this.selected.fillStyle(0xffffff, 1);
    // this.selected.fillRect(0, 0, 155, 70);
    // this.selected.name = 'selected';

    // leftTabGroup.addMultiple([this.selected])
    // this.furnitureContent.add([this.selected])
    // this.createLeftBarSpan1(3, leftTabGroup, ['电视', '桌子&沙发', '墙面&地板']);

    //右侧内容
    const
      // tvSpriteSheet = ['television1.png', 'television2.png', 'television3.png', 'television4.png'],
      // tableSofaSheet = ['sofatable1.png', 'sofatable2.png', 'sofatable3.png', 'sofatable4.png'],
      walls = ['wall1.png', 'wall2.png', 'wall3.png', 'wall4.png'];
    const
      // tvGroup = this.add.group(),
      // tbSofaGroup = this.add.group(),
      wallGroup = this.add.group();
    // this.createFourContent('television', tvSpriteSheet, tvGroup, 143);
    // this.createFourContent('tableSofa', tableSofaSheet, tbSofaGroup, 158);
    this.createFourContent('wall', walls, wallGroup, 169);
    // tvGroup.setActive(true)
    // tvGroup.getChildren().forEach((v, k) => {
    //   v.on('pointerdown', () => this.changeFurnitureDetail(v, /television(\d)\.png/, tvGroup, 'television', 1), null);
    // })
    // tbSofaGroup.setActive(true)
    // tbSofaGroup.getChildren().forEach((v, k) => {
    //   v.on('pointerdown', () => this.changeFurnitureDetail(v, /sofatable(\d)\.png/, tbSofaGroup, 'tableSofa', 1), null);
    // })
    wallGroup.setActive(true)
    wallGroup.getChildren().forEach((v, k) => {
      v.on('pointerdown', () => this.changeFurnitureDetail(v, /wall(\d)\.png/, wallGroup, 'wall', null), null);
    })
    // tvGroup.setVisible(false)
    // tbSofaGroup.setVisible(false)
    wallGroup.setVisible(true)

    // leftTabGroup.getChildren().forEach((v, k) => {
    //   v.setInteractive()
    //   v.on('pointerdown', () => this.switchFurniture(v), null);
    // })

    // this.furnitureLeftTab = leftTabGroup;
    // this.tvGroup = tvGroup;
    // this.tbSofaGroup = tbSofaGroup;
    this.wallGroup = wallGroup;
  }
  createEggContent() {
    const eggContent = this.add.group(this.editContent);
    const eggSpriteSheet = {
      number: 26,
      info: [
        { name: 'egg1', spriteSheetName: 'egg', number: 11, startNum: 0 },
        { name: 'egg2', spriteSheetName: 'egg', number: 15, startNum: 11 },
      ]
    };

    const specialSize = {
      'egg0.png': 0.25,
      'egg1.png': 0.3,
      'egg2.png': 0.3,
      'egg4.png': 0.7,
      'egg5.png': 0.7,
      'egg6.png': 0.7,
      'egg7.png': 0.4,
      'egg8.png': 0.35,
      'egg9.png': 0.4,
      'egg10.png': 0.4,
      'egg11.png': 0.4,
      'egg12.png': 0.3,
      'egg13.png': 0.7,
      'egg16.png': 0.55,
      'egg17.png': 0.55,
      'egg18.png': 0.6,
      'egg19.png': 0.6,
      'egg20.png': 0.4,
    };

    this.createEditListDetail(eggSpriteSheet, 0.5, eggContent, 123, 145, 48, 50, 60, 50, 0, 750, specialSize, 4);
    this.addScrollHandler(eggContent);
    this.eggContent = eggContent;
  }
  // 创建article
  createArticleContent() {
    this.articleContent = this.add.container(0, this.gameHeight - 350);

    let whitePannel = this.add.graphics();
    whitePannel.fillStyle(0xffffff, 1)
    whitePannel.fillRect(0, 0, this.gameWidth, 350);
    this.editGroup.add(whitePannel);

    this.articleContent.add([whitePannel]);
    this.articleGroup = this.add.group()
    let aniArr = ['cat1', 'cat2']
    const pos = this.option.fourContentPos;
    aniArr.map((sprite, index) => {
      const { left, top } = pos[index]
      const item = this.add.sprite(left, top, sprite)
      item.setOrigin(0.5);
      item.setInteractive();
      item.setScale(0.4);
      item.setName(sprite)
      this.articleGroup.add(item);
      this.articleContent.add([item]);
      this.mobilityGroup.add(item);
    })

    return;


    const articleContent = this.add.group(this.editContent);
    const articleSpriteSheet = {
      number: 46,
      info: [
        { name: 'article1', spriteSheetName: 'article', number: 11, startNum: 0 },
        { name: 'article2', spriteSheetName: 'article', number: 15, startNum: 11 },
        { name: 'article3', spriteSheetName: 'article', number: 11, startNum: 26 },
        { name: 'article4', spriteSheetName: 'article', number: 9, startNum: 37 },
      ]
    };
    const specialSize = {
      'article1.png': 0.35,
      'article2.png': 0.35,
      'article3.png': 0.33,
      'article8.png': 0.35,
      'article12.png': 0.6,
      'article13.png': 0.5,
      'article14.png': 0.5,
      'article16.png': 0.5,
      'article19.png': 0.5,
      'article21.png': 0.5,
      'article22.png': 0.5,
      'article23.png': 0.5,
      'article24.png': 0.3,
      'article25.png': 0.3,
      'article26.png': 0.5,
      'article27.png': 0.3,
      'article28.png': 0.3,
      'article29.png': 0.3,
      'article30.png': 0.5,
      'article31.png': 0.45,
      'article32.png': 0.5,
      'article33.png': 0.5,
      'article35.png': 0.3,
      'article36.png': 0.5,
      'article38.png': 0.25,
      'article39.png': 0.25,
      'article40.png': 0.4,
      'article41.png': 0.4,
      'article42.png': 0.45,
      'article43.png': 0.4,
      'article44.png': 0.5,
      'article45.png': 0.5
    }

    this.createEditListDetail(articleSpriteSheet, 0.4, articleContent, 123, 145, 48, 80, 60, 53, 0, 750, specialSize, 4);
    this.addScrollHandler(articleContent);
    this.articleContent = articleContent;
  }


  createPostContent() {
    const postContent = this.game.add.group(this.editContent);

    //左侧背景
    const leftTab = this.game.add.graphics(0, 0);
    const leftTabGroup = this.game.add.group(leftTab)
    leftTab.beginFill(0xfff7e0);
    leftTab.drawRect(0, 0, 155, 350);

    //左侧选中背景
    const selected = this.game.add.graphics(0, 0);
    selected.beginFill(0xffffff);
    selected.drawRect(0, 0, 155, 70);
    selected.name = 'selected';

    //左侧文字
    const text = this.game.add.text(155 / 2, 23, "站姿\n坐姿\n瘫姿\n不可描述", { font: "24px", fill: "#a55344", align: "center" });
    text.lineSpacing = 35;
    text.anchor.set(0.5, 0);

    //左侧文字区域
    this.createLeftBarSpan(4, leftTabGroup);

    //左侧切换事件
    leftTabGroup.setAll('inputEnabled', true);
    leftTabGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.switchPost, this);

    //右侧sprite合集
    const standSpriteSheet = {
      number: 12,
      info: [
        { name: 'stand', spriteSheetName: 'stand', number: 8, startNum: 0 },
        { name: 'stand2', spriteSheetName: 'stand', number: 4, startNum: 8 }
      ]
    };
    const sitSpriteSheet = { name: 'sit', spriteSheetName: 'sit', number: 12 };
    const stallSpriteSheet = { name: 'stall', spriteSheetName: 'stall', number: 13 };
    const indescribeSpriteSheet = { name: 'indescribe', spriteSheetName: 'indescribe', number: 12 };

    // 右侧合集
    const standGroup = this.game.add.group();
    const sitGroup = this.game.add.group();
    const stallGroup = this.game.add.group();
    const indescribeGroup = this.game.add.group();

    //右侧生成
    const stallSpecialSize = {
      'stall0.png': 0.35,
      'stall9.png': 0.35,
      'stall12.png': 0.8
    };
    const standSpecialSize = {
      'stand8.png': 0.6,
      'stand9.png': 0.6,
      'stand10.png': 0.6,
      'stand11.png': 0.6,
    }
    this.createEditListDetail(standSpriteSheet, 0.37, standGroup, 105, 220, 25, 20, 40, 17, 160, 590, standSpecialSize, 4);
    this.createEditListDetail(sitSpriteSheet, 0.42, sitGroup, 105, 220, 25, 20, 40, 17, 160, 590, null, 4);
    this.createEditListDetail(stallSpriteSheet, 0.4, stallGroup, 170, 194, 25, 15, 33, 30, 160, 590, stallSpecialSize, 3);
    this.createEditListDetail(indescribeSpriteSheet, 0.4, indescribeGroup, 105, 220, 25, 20, 40, 17, 160, 590, null, 4);

    //右侧添加滑动事件
    this.addScrollHandler(standGroup);
    this.addScrollHandler(sitGroup);
    this.addScrollHandler(stallGroup);
    this.addScrollHandler(indescribeGroup);

    leftTabGroup.addMultiple([selected, text]);
    postContent.addMultiple([leftTab, sitGroup, standGroup, stallGroup, indescribeGroup])

    this.postContent = postContent;
    this.postLeftTab = leftTabGroup;
    this.sitGroup = sitGroup;
    this.standGroup = standGroup;
    this.stallGroup = stallGroup;
    this.indescribeGroup = indescribeGroup;

    this.standGroup.visible = true;
    this.sitGroup.visible = false;
    this.stallGroup.visible = false;
    this.indescribeGroup.visible = false;
  }

  // ======
  switchPost(e) {
    const item = e.name || '';
    if (!item) return;

    let selectedTop = 0;

    switch (item) {
      case 'text0':
        selectedTop = 0;
        this.stallGroup.setVisible(true);
        this.sitGroup.setVisible(false);
        this.stallGroup.setVisible(false)
        this.indescribeGroup.setVisible(false)
        break;
      case 'text1':
        selectedTop = 70;
        this.stallGroup.setVisible(false);
        this.sitGroup.setVisible(true);
        this.stallGroup.setVisible(false)
        this.indescribeGroup.setVisible(false)
        break;
      case 'text2':
        selectedTop = 140;
        this.stallGroup.setVisible(false);
        this.sitGroup.setVisible(false);
        this.stallGroup.setVisible(true)
        this.indescribeGroup.setVisible(false)
        break;
      case 'text3':
        selectedTop = 210;
        this.stallGroup.setVisible(false);
        this.sitGroup.setVisible(false);
        this.stallGroup.setVisible(false)
        this.indescribeGroup.setVisible(true)
    }
    this.postLeftTab.getMatching('name', 'selected')[0].y = selectedTop;
  }


  /**
   * 
   * @param {*} spriteSheet  spriteSheet雪碧图信息
   * @param {*} scaleRate    图像显示的缩放
   * @param {*} group        新建图像存放的组
   * @param {*} spriteWidth  图像显示区域尺寸的宽度
   * @param {*} spriteHeight 图像显示区域尺寸的高度
   * @param {*} verticalW     图像显示区域的横向间距
   * @param {*} horizentalH   图像显示区域的纵向间距
   * @param {*} startX        整块图像区域的x偏移量
   * @param {*} startY        整块图像区域的y偏移量
   * @param {*} groupleft     左侧tab的宽度
   * @param {*} groupWidth    整块区域的宽度
   * @param {*} specialSize   特殊元素的缩放尺寸，由于元素的尺寸缩放标准不一，因此需要设置特殊元素的缩放尺寸
   * @param {*} verticalNum   列项数量
   */
  createEditListDetail(spriteSheet, scaleRate, group, spriteWidth, spriteHeight, verticalW, horizentalH, startX, startY, groupleft, groupWidth, specialSize, verticalNum) {
    let { name, spriteSheetName, number } = spriteSheet;
    const hv = number % verticalNum == 0 ? number : number + (verticalNum - number % verticalNum);
    const box = this.add.graphics(groupleft, 0, group);
    box.fillStyle(0xffffff, 0.5);
    box.fillRect(0, 0, groupWidth, startY + (spriteHeight + horizentalH) * parseInt(hv / verticalNum) + horizentalH);
    box.name = 'box';

    //由于元素的体积过大，部分元素集不能都合并成一张雪碧图，因此需要区分合并成一张和多张都情况
    if (spriteSheet.info) {
      let i = 0;
      spriteSheet.info.map((item, index) => {
        let { name, spriteSheetName, number } = item;
        for (let j = 0; j < number; j++) {
          createOne(i, name, spriteSheetName);
          i++;
        }
      })
    } else {
      for (let i = 0; i < number; i++) {
        createOne(i, name, spriteSheetName)
      }
    }

    function createOne(i, name, spriteSheetName) {
      const x = startX + (spriteWidth + verticalW) * (i % verticalNum) + spriteWidth / 2,
        y = startY + (spriteHeight + horizentalH) * parseInt(i / verticalNum) + spriteHeight / 2;
      const item = this.add.sprite(x, y, name, `${spriteSheetName}${i}.png`);

      let realScaleRate = scaleRate;

      if (spriteWidth / item.width >= 1.19) {
        realScaleRate = 1;
      }
      if (specialSize && specialSize[`${spriteSheetName}${i}.png`]) {
        realScaleRate = specialSize[`${spriteSheetName}${i}.png`];
      }
      item.anchor.set(0.5);
      item.scale.set(realScaleRate);
      item.inputEnabled = true;
      box.addChild(item);

      const wrapData = {
        minX: x - spriteWidth / 2,
        maxX: x + spriteWidth / 2,
        minY: y - spriteHeight / 2,
        maxY: y + spriteHeight / 2
      }

      if (box.wrapData) {
        box.wrapData.push(wrapData);
      } else {
        box.wrapData = [wrapData];
      }
    }

  }

  addScrollHandler(target) {
    let isDrag = false; //判断是否滑动的标识
    let startY, endY, startTime, endTime;
    const box = target.getByName('box');
    box.inputEnabled = true;
    box.input.enableDrag();
    box.input.allowHorizontalDrag = false;  //禁止横向滑动
    box.input.allowVerticalDrag = true;     //允许纵向滑动
    box.ignoreChildInput = true;            //忽略子元素事件
    box.input.dragDistanceThreshold = 10;       //滑动阈值
    //允许滑动到底部的最高值
    const maxBoxY = -(box.height - 350);
    //给父元素添加物理引擎
    this.game.physics.arcade.enable(box);

    box.events.onDragUpdate.add(function () {
      //滑到顶部，禁止继续往下滑
      if (box.y > 100) {
        box.y = 100;
      } else if (box.y < maxBoxY - 100) {
        //滑到底部，禁止继续往上滑
        box.y = maxBoxY - 100;
      }
      endY = arguments[3];
      endTime = +new Date();
    }, this);
    box.events.onDragStart.add(function () {
      console.log('start')
      isDrag = true;
      startY = arguments[3];
      startTime = +new Date();
      if (this.currentScrollBox) {
        //如果当前有其他正在滑动的元素，取消滑动
        this.currentScrollBox.body.velocity.y = 0;
        this.currentScrollBox = null;
      }

    }, this);
    box.events.onDragStop.add(function () {
      console.log('stop')
      isDrag = false;
      //指定可以点击滑动的区域
      box.hitArea = new Phaser.Rectangle(0, -box.y, box.width, box.height + box.y);
      //向下滑动到极限，给极限到最值位置动画
      if (box.y > 0) {
        box.hitArea = new Phaser.Rectangle(0, 0, box.width, box.height);
        this.game.add.tween(box).to({ y: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 0);
        return;
      }
      //向上滑动到极限，给极限到最值位置动画
      if (box.y < maxBoxY) {
        box.hitArea = new Phaser.Rectangle(0, -maxBoxY, box.width, box.height - maxBoxY);
        this.game.add.tween(box).to({ y: maxBoxY }, 100, Phaser.Easing.Linear.None, true, 0, 0);
        return;
      }
      //模拟滑动停止父元素仍滑动到停止的惯性
      //根据用户的滑动距离和滑动事件计算元素的惯性滑动速度
      const velocity = (Math.abs(Math.abs(endY) - Math.abs(startY)) / (endTime - startTime)) * 40;
      //scrollFlag标识父元素是向上滑动还是向下滑动
      if (endY > startY) {// 向下
        box.body.velocity.y = velocity;
        box.scrollFlag = 'down';
      } else if (endY < startY) { //向上
        box.body.velocity.y = -velocity;
        box.scrollFlag = 'up';
      }
      this.currentScrollBox = box;
    }, this);
    box.events.onInputUp.add(function (e, p) {
      console.log('up')
      if (isDrag) return;

      const curX = p.position.x - e.previousPosition.x;
      const curY = p.position.y - e.previousPosition.y;
      //根据点击区域，判断用户点击的是哪个元素
      const idx = e.wrapData.findIndex((val, index, arr) => {
        return curX >= val.minX && curX <= val.maxX && curY >= val.minY && curY <= val.maxY;
      })
      if (idx == -1) return;
      const children = e.children[idx];
      //添加新元素到画面
      this.addNewMobilityObject(children.key, children._frame.name);
    }, this);
  }

  addNewMobilityObject(key, name) {
    const resultObject = ['egg3.png', 'egg14.png', 'egg19.png', 'egg0.png', 'article26.png', 'article30.png', 'article28.png', 'article29.png'];

    if (resultObject.indexOf(name) !== -1) {
      this.selectResultObject.push(name);
    }

    //默认新元素的位置在屏幕居中位置取随机值
    const randomPos = 30 * Math.random();
    const posX = Math.random() > 0.5 ? this.gameWidthHf + randomPos : this.gameWidthHf - randomPos;
    const posY = Math.random() > 0.5 ? this.gameHeightHf + randomPos : this.gameHeightHf - randomPos;
    const newOne = this.add.sprite(posX, posY, key, name);

    newOne.setOrigin(0.5);
    newOne.keyNum = this.option.keyNum++;

    this.mobilityGroup.add(newOne);
    //绑定选中元素
    this.bindObjectSelected(newOne);
    //让新建元素成为当前选中元素
    this.objectSelected(newOne);
  }

  // 移动位置
  objectDragUpdate(target) {
    if (!this.selectWrap) return;
    const width = target.width;
    const height = target.height;
    const offsetX = -width / 2;
    const offsetY = -height / 2;
    const offsetNum = 10;

    this.selectWrap.x = target.x + offsetX - offsetNum
    this.selectWrap.y = target.y + offsetY - offsetNum
  }

  // 创建左边tab
  createLeftBarSpan(num, group) {
    for (let i = 0; i < num; i++) {
      const item = this.add.graphics();
      item.fillStyle(0x000000, 0.5);
      item.fillRect(0, 70 * i, 155, 70);
      item.alpha = 1;
      item.name = `text${i}`;
      item.setDepth(999);
      group.add(item);
      this.furnitureContent.add([item])
    }
  }

  // 创建左边tab1
  createLeftBarSpan1(num, group, textArr) {
    for (let i = 0; i < num; i++) {
      const textStyle = { font: "24px", fill: "#a55344", align: "center", lineSpacing: 35 };
      const text = this.add.text(155 / 2, 70 * i + 23, textArr[i], textStyle).setOrigin(0.5, 0);
      text.name = `text${i}`;
      group.add(text);
      this.furnitureContent.add([text])
    }
  }

  // 底部tab物品点击事件处理
  changeFurnitureDetail(e, reg, group, element, type) {
    const mobilityGroup = this.mobilityGroup;
    const target = e.frame;
    console.log(target, '---target---')
    if (!target || target.name == 'selected') return;
    const num = target.name.match(reg)[1],
      { left, top } = this.option.fourContentPos[num - 1];
    let selected = group.getMatching('name', 'selected')[0];
    if (!selected) {
      selected = this.add.sprite(left, top, 'objects', 'ctSelected.png');
      selected.setOrigin(0.5);
      selected.setName('selected');
      group.add(selected);
      this.furnitureContent.add([selected])
      this.mobilityGroup.add(selected)
    }

    selected.x = left;
    selected.y = top;

    if (type !== 1) {
      mobilityGroup.getMatching('name', element) && mobilityGroup.getMatching('name', element).length > 0 && mobilityGroup.getMatching('name', element)[0].setTexture(target.name);
      return;
    }

    if (target.name == 'sofatable3.png') {
      this.option.selectResultObject.push(target.name);
    } else if (/sofatable/.test(target.name)) {
      this.removeDeleteObject('sofatable3.png');
    }
    if (mobilityGroup.getMatching('name', element) && mobilityGroup.getMatching('name', element).length > 0) {
      mobilityGroup.getMatching('name', element)[0].frameName = target.name;
      mobilityGroup.getMatching('name', element)[0].keyNum = this.option.keyNum++;
    } else {
      if (element == 'television') {
        this.createTelevision(target.name);
        this.option.selectResultObject.push(target.name);
      } else {
        this.createTableSofa(target.name);
      }
    }
    this.objectSelected(mobilityGroup.getMatching('name', element)[0]);
  }

  // 删除
  removeDeleteObject(name) {
    name = name.replace(/television[1234]{1}/, 'television');
    const idx = this.option.selectResultObject.indexOf(name);

    if (idx == -1) return;
    this.option.selectResultObject.splice(idx, 1);
  }

  // 点击左边tab
  // switchFurniture(e) {
  //   const item = e.name || '';
  //   if (!item) return;
  //   let selectedTop = 0;
  //   switch (item) {
  //     case 'text0':
  //       selectedTop = 0;
  //       this.tvGroup.setVisible(true)
  //       this.tbSofaGroup.setVisible(false)
  //       this.wallGroup.setVisible(false)
  //       break;
  //     case 'text1':
  //       selectedTop = 70;
  //       this.tvGroup.setVisible(false)
  //       this.tbSofaGroup.setVisible(true)
  //       this.wallGroup.setVisible(false)
  //       break;
  //     case 'text2':
  //       selectedTop = 140;
  //       this.tvGroup.setVisible(false)
  //       this.tbSofaGroup.setVisible(false)
  //       this.wallGroup.setVisible(true)
  //       break;
  //   }
  //   this.furnitureLeftTab.getMatching('name', 'selected')[0].y = selectedTop;
  // }

  // 创建家具内容
  createFourContent(spriteName, spriteSheet, groupWrap, width) {
    const pos = this.option.fourContentPos;
    spriteSheet.map((sprite, index) => {
      const { left, top } = pos[index];
      const item = spriteName ? this.add.sprite(left, top, spriteName, sprite) : this.add.sprite(left, top, sprite);
      item.setOrigin(0.5);
      item.setInteractive();
      item.setScale(width / item.width);
      item.setName(sprite || '')
      groupWrap.add(item);
      this.furnitureContent.add([item]);
      this.mobilityGroup.add(item);
    })

    const selectedItem = this.add.sprite(pos[0].left, pos[0].top, 'objects', 'ctSelected.png');
    selectedItem.setOrigin(0.5);
    selectedItem.setName('selected')
    groupWrap.add(selectedItem);
    this.furnitureContent.add([selectedItem])
    this.mobilityGroup.add(selectedItem)
  }

  dealScrollObject() {
    if (this.currentScrollBox && this.currentScrollBox.body.velocity.y !== 0) {
      const currentScrollBox = this.currentScrollBox,
        height = currentScrollBox.height,
        width = currentScrollBox.width;

      const maxBoxY = -(height - 350);
      if (currentScrollBox.y > 0) {
        currentScrollBox.hitArea = new Phaser.Rectangle(0, 0, width, height);
        this.game.add.tween(currentScrollBox).to({ y: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 0);
        currentScrollBox.body.velocity.y = 0;
        return;
      }
      if (currentScrollBox.y < maxBoxY) {
        currentScrollBox.hitArea = new Phaser.Rectangle(0, -maxBoxY, width, height - maxBoxY);
        this.game.add.tween(currentScrollBox).to({ y: maxBoxY }, 100, Phaser.Easing.Linear.None, true, 0, 0);
        currentScrollBox.body.velocity.y = 0;
        return;
      }
      currentScrollBox.hitArea = new Phaser.Rectangle(0, -currentScrollBox.y, width, height + currentScrollBox.y);
      if (currentScrollBox.scrollFlag == 'up') {
        currentScrollBox.body.velocity.y += 1.5;
        if (currentScrollBox.body.velocity.y >= 0) {
          currentScrollBox.body.velocity.y = 0;
        }
      } else if (currentScrollBox.scrollFlag == 'down') {
        currentScrollBox.body.velocity.y -= 1.5;
        if (currentScrollBox.body.velocity.y <= 0) {
          currentScrollBox.body.velocity.y = 0;
        }
      }
    }
  }

}
