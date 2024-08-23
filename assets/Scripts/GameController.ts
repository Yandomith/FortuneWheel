import AudioManager from "./AudioManager";
import SceneManager from "./SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Button)
    closeButton:cc.Button = null;

 
    onClickCloseButton(){
        AudioManager.getInstance().sfxEffect();  
        SceneManager.getInstance().onGameBackButtonClick()
    }

}
