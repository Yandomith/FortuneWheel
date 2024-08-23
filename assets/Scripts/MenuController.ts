import AudioManager from "./AudioManager";
import SceneManager from "./SceneManager";

const{ccclass, property} =cc._decorator;
@ccclass 
export default class MenuController extends cc.Component{
    @property(cc.Button)
    playButton : cc.Button = null;

    @property(cc.Toggle)
    musicToggler : cc.Toggle = null;
    musictogglerValue : boolean = true;

    @property(cc.Toggle)
    sfxToggler : cc.Toggle = null;
    sfxtogglerValue : boolean = true;
    
    @property(cc.Button)
    ExitButton : cc.Button = null;


    @property(cc.Button)
    openShop : cc.Button = null;

    @property(cc.Node)
    shop : cc.Node = null
    
    BgSFXstoredValue = cc.sys.localStorage.getItem("BgSFX");
    AudioSFXstoredValue = cc.sys.localStorage.getItem("AudioSFX");

    getCoin = Number(cc.sys.localStorage.getItem("CoinCount") ) 


    protected start(): void {

        this.shop.active = false;



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
    onClickShopOpen(){
        
        this.shop.active = true;
        this.shop.scale = 0
        cc.tween(this.shop)
            .to(.1, {scale : 1})
            .start()
    }

    onbgMusicToggled(){
        this.musictogglerValue = this.musicToggler.getComponent(cc.Toggle).isChecked
        AudioManager.getInstance().bgSFXtoggle(this.musictogglerValue);
    }

    onSFXToggled(){
        this.sfxtogglerValue = this.sfxToggler.getComponent(cc.Toggle).isChecked
        AudioManager.getInstance().buttonSFXtoggle(this.sfxtogglerValue);  

    }

    onClickPlay(){
        if (this.getCoin <= 0) {
            cc.log("POOR fking Boy ")
        } else {
            SceneManager.getInstance().loadGame()
        }
        
    }
    
    onExitClick(){
        SceneManager.getInstance().exitGame();
    }



}