import AudioManager from "./AudioManager";
import SceneManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuController extends cc.Component {
    @property(cc.Button)
    playButton: cc.Button = null;

    @property(cc.Toggle)
    musicToggler: cc.Toggle = null;

    @property(cc.Toggle)
    sfxToggler: cc.Toggle = null;

    @property(cc.Button)
    exitButton: cc.Button = null;

    @property(cc.Button)
    openShopButton: cc.Button = null;

    @property(cc.Node)
    shop: cc.Node = null;

    bgSFXStoredValue: boolean 
    audioSFXStoredValue: boolean 


    protected onLoad(): void {
        this.shop.active = false;
        this.initializeToggles();

    }

    public initializeToggles(): void {
        this.bgSFXStoredValue = cc.sys.localStorage.getItem("BgSFX") === "true";
        this.audioSFXStoredValue = cc.sys.localStorage.getItem("AudioSFX") === "true";
        this.musicToggler.isChecked = this.bgSFXStoredValue;
        this.sfxToggler.isChecked = this.audioSFXStoredValue;
        
    }

    public onClickShopOpen(): void {
        this.shop.active = true;
        this.shop.scale = 0;
        cc.tween(this.shop)
            .to(0.1, { scale: 1 })
            .start();
    }

    public onBgMusicToggled(): void {
        const isMusicEnabled = this.musicToggler.isChecked;
        AudioManager.getInstance().bgSFXtoggle(isMusicEnabled);
        cc.sys.localStorage.setItem("BgSFX", String(isMusicEnabled));
    }
    
    public onSFXToggled(): void {
        const isSFXEnabled = this.sfxToggler.isChecked;
        AudioManager.getInstance().buttonSFXtoggle(isSFXEnabled);
        cc.sys.localStorage.setItem("AudioSFX", String(isSFXEnabled));
    }
    

    public onClickPlay(): void {
        SceneManager.getInstance().loadGame();
    }

    public onExitClick(): void {
        SceneManager.getInstance().exitGame();
    }

    protected onDestroy(): void {
        this.saveAudioSettings();
    }

    private saveAudioSettings(): void {
        const isMusicEnabled = this.musicToggler.isChecked;
        const isSFXEnabled = this.sfxToggler.isChecked;

        cc.sys.localStorage.setItem("BgSFX", String(isMusicEnabled));
        cc.sys.localStorage.setItem("AudioSFX", String(isSFXEnabled));
    }
}
