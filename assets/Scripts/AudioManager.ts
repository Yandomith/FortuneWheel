
const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {
    private static instance : AudioManager =  null;

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
    buttonSFXNode : cc.Node = null;

    BgSFXvalue: Boolean= null;
    AudioSFXvalue: Boolean= null;
    boolBGSFX : Boolean = null;

    @property(cc.Node)
    wheelSFXNode : cc.Node = null;

    protected start(): void {

        if (AudioManager.instance) {
            cc.log('More than one instance of AudioManager found! Destroying this instance.');
            this.node.destroy();
            return;
        }
        AudioManager.instance = this; 
        const hehe = cc.sys.localStorage.getItem("BgSFX") 
        this.boolBGSFX = hehe === "true";

        if(this.boolBGSFX){
            cc.log(this.boolBGSFX+ " this is value of BgSFX in start for loging music ")
            this.bgSFXNode.getComponent(cc.AudioSource).play()
        }else{
            cc.log(this.boolBGSFX+ " this is value of BgSFX in start for loging music in else")
        }
    }

    protected onLoad(): void {

    }


    bgSFXtoggle(musictogglerValue: Boolean){
        this.BgSFXvalue = musictogglerValue  
        this.bgSFXNode.getComponent(cc.AudioSource).play()

        cc.sys.localStorage.setItem("BgSFX",this.BgSFXvalue )

        if (this.BgSFXvalue) {
            cc.log(this.BgSFXvalue)
            this.bgSFXNode.getComponent(cc.AudioSource).resume()
        } else {

                this.bgSFXNode.getComponent(cc.AudioSource).pause()

        }
    }


    buttonSFXtoggle(sfxtogglerValue:Boolean){
        this.AudioSFXvalue = sfxtogglerValue  
        cc.sys.localStorage.setItem("AudioSFX", this.AudioSFXvalue )
        cc.log("sfx is toggled ")  
    }



    sfxEffect(){
        if(this.AudioSFXvalue){
            this.buttonSFXNode.getComponent(cc.AudioSource).play()
        }
    }
    WheelsfxEffect(){
        if(this.AudioSFXvalue){
            this.wheelSFXNode.getComponent(cc.AudioSource).play()
        }
    }


}