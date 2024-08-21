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
    musictogglerValue : boolean = true;

    @property(cc.Toggle)
    sfxToggler : cc.Toggle = null;
    sfxtogglerValue : boolean = true;
    
    @property(cc.Button)
    ExitPrefab : cc.Button = null;
    
    
    BgSFXstoredValue = cc.sys.localStorage.getItem("BgSFX");
    AudioSFXstoredValue = cc.sys.localStorage.getItem("AudioSFX");


    protected start(): void {

        this.musictogglerValue = this.BgSFXstoredValue === "true";
        if (this.musictogglerValue == false) {
            this.musicToggler.getComponent(cc.Toggle).uncheck();
            cc.log(this.sfxToggler.getComponent(cc.Toggle).isChecked + " is the value of BgSFXtoggler after if");
        } else if (this.musictogglerValue == true) {
            this.musicToggler.getComponent(cc.Toggle).check();
            cc.log(this.musicToggler.getComponent(cc.Toggle).isChecked + " is the value of BgSFXtoggler after if");
        }
    



        this.sfxtogglerValue = this.AudioSFXstoredValue === "true";
        if (this.sfxtogglerValue == false) {
            this.sfxToggler.getComponent(cc.Toggle).uncheck();
            cc.log(this.sfxToggler.getComponent(cc.Toggle).isChecked + " is the value of AudioSFXtoggler after if");
        } else if (this.sfxtogglerValue == true) {
            this.sfxToggler.getComponent(cc.Toggle).check();
            cc.log(this.sfxToggler.getComponent(cc.Toggle).isChecked + " is the value of AudioSFXtoggler after if");
        }
    
    }
    

    
    onClickPlayButton(){
        AudioManager.getInstance().sfxEffect()
        SceneManager.getInstance().loadProgressPrefab(true);    
    }

    onbgMusicToggled(){
        this.musictogglerValue = this.musicToggler.getComponent(cc.Toggle).isChecked
        AudioManager.getInstance().bgSFXtoggle(this.musictogglerValue);
    }

    onSFXToggled(){
        this.sfxtogglerValue = this.sfxToggler.getComponent(cc.Toggle).isChecked
        AudioManager.getInstance().buttonSFXtoggle(this.sfxtogglerValue);  

    }

    onExitClick(){
        SceneManager.getInstance().exitGame();
    }

}
