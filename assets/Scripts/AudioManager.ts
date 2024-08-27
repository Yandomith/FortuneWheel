const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {
    private static instance: AudioManager = null;

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = cc.find('AudioManager')?.getComponent(AudioManager);
            if (!AudioManager.instance) {
                const newAudioManager = new cc.Node('AudioManager');
                AudioManager.instance = newAudioManager.addComponent(AudioManager);
                cc.director.getScene().addChild(newAudioManager);
            }
        }
        return AudioManager.instance;
    }

    @property(cc.Node)
    bgSFXNode: cc.Node = null;

    @property(cc.Node)
    buttonSFXNode: cc.Node = null;

    @property(cc.Node)
    wheelSFXNode: cc.Node = null;

    @property(cc.Node)
    coinCollect: cc.Node = null;

    private bgSFXEnabled: boolean = null;
    private audioSFXEnabled: boolean = null;

    protected onLoad(): void {
        if (AudioManager.instance) {
            cc.log('More than one instance of AudioManager found! Destroying this instance.');
            this.node.destroy();
            return;
        }

        AudioManager.instance = this;

        this.bgSFXEnabled = cc.sys.localStorage.getItem("BgSFX") === "true";
        this.audioSFXEnabled = cc.sys.localStorage.getItem("AudioSFX") === "true";

        if (this.bgSFXEnabled) {
            this.playBgSFX();
        }
    }

    private playBgSFX(): void {
        const bgAudioSource = this.bgSFXNode.getComponent(cc.AudioSource);

        if (!bgAudioSource.isPlaying) {
            bgAudioSource.play();
        }
    }

    public bgSFXtoggle(enabled: boolean): void {
        this.bgSFXEnabled = enabled;
        cc.sys.localStorage.setItem("BgSFX", String(this.bgSFXEnabled));

        const bgAudioSource = this.bgSFXNode.getComponent(cc.AudioSource);
        if (this.bgSFXEnabled) {
            if (!bgAudioSource.isPlaying) {
                bgAudioSource.play();
            } else {
                bgAudioSource.resume();
            }
        } else {
            bgAudioSource.pause();
        }
    }

    public buttonSFXtoggle(enabled: boolean): void {
        this.audioSFXEnabled = enabled;
        cc.sys.localStorage.setItem("AudioSFX", String(this.audioSFXEnabled));
        cc.log("SFX toggled: " + this.audioSFXEnabled);
    }

    public playButtonSFX(): void {
        if (this.audioSFXEnabled) {
            this.buttonSFXNode.getComponent(cc.AudioSource).play();
        }
    }

    public playWheelSFX(): void {
        if (this.audioSFXEnabled) {
            this.wheelSFXNode.getComponent(cc.AudioSource).play();
        }
    }

    public playCoinCollectSFX(): void {
        if (this.audioSFXEnabled) {
            this.coinCollect.getComponent(cc.AudioSource).play();
        }
    }
}
