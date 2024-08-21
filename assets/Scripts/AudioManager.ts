
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

    SFXvalue: boolean= null;
    
    @property(cc.Node)
    wheelSFXNode : cc.Node = null;

    protected start(): void {

        if (AudioManager.instance) {
            cc.log('More than one instance of AudioManager found! Destroying this instance.');
            this.node.destroy();
            return;
        }
        AudioManager.instance = this; 
        this.bgSFXNode.getComponent(cc.AudioSource).play()
    }

    

    

    bgSFXtoggle(isChecked: Boolean){
        cc.log(isChecked)
        if (isChecked) {
            this.bgSFXNode.getComponent(cc.AudioSource).resume()
        } else {
            this.bgSFXNode.getComponent(cc.AudioSource).pause()
        }
    }


    buttonSFXtoggle(isChecked:boolean){
        this.SFXvalue = isChecked  
        cc.log("sfx is toggled ") 
        cc.log("sfx value in ButtonSFXtoggle "+ this.SFXvalue)    
    }

    protected update(): void {
        cc.sys.localStorage.setItem("hehe", this.SFXvalue )
        cc.log(cc.sys.localStorage.getItem("hehe") +" I am saved in local disk")
    }

    sfxEffect(){
        cc.log("sfx value in sfxEffect "+ this.SFXvalue)   
        if(this.SFXvalue){
            this.buttonSFXNode.getComponent(cc.AudioSource).play()
        }
    }
    WheelsfxEffect(){
        cc.log("sfx value in sfxEffect "+ this.SFXvalue)   
        if(this.SFXvalue){
            this.wheelSFXNode.getComponent(cc.AudioSource).play()
        }
    }


}