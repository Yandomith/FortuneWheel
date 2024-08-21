// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";
import SceneManager from "./SceneManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Button)
    closeButton:cc.Button = null;

 
    onClickCloseButton(){
        AudioManager.getInstance().sfxEffect();  
        SceneManager.getInstance().loadProgressPrefab(false)  
    }

}
