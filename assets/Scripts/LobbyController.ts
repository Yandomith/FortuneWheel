// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import SceneManager from "./SceneManager";
import AudioManager from "./AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LobbyController extends cc.Component {

    @property (cc.Button)
    playButton : cc.Button = null;

    @property(cc.Toggle)
    musicToggler : cc.Toggle = null;
    musictogglerValue : boolean = null;

    @property(cc.Toggle)
    sfxToggler : cc.Toggle = null;
    sfxtogglerValue : boolean = null;

    
    onClickPlayButton(){
        AudioManager.getInstance().sfxEffect()
        SceneManager.getInstance().loadProgressPrefab(true);    
    }

    onbgMusicToggled(){
        cc.log("BG music toggler Pressed ")
        this.musictogglerValue = this.musicToggler.getComponent(cc.Toggle).isChecked
        cc.log(this.musictogglerValue + "this is hehe")
        AudioManager.getInstance().bgSFXtoggle(this.musictogglerValue);
    }

    onSFXToggled(){
        this.sfxtogglerValue = this.sfxToggler.getComponent(cc.Toggle).isChecked
        AudioManager.getInstance().buttonSFXtoggle(this.sfxtogglerValue);  

    }

}
