// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SceneManager from "./SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class progressBar extends cc.Component {

    @property(cc.Node)
    progressBarNode : cc.Node = null;
    
    progressBar : cc.ProgressBar = null;
       
    isfromMenu : boolean = true;

    protected start(): void {

        cc.log("hehe")
        cc.log("this is from start " + this.isfromMenu)
        this.playLoader(this.isfromMenu)

    }

    playLoader(isfromMenu:Boolean){
        this.progressBar= this.progressBarNode.getComponent(cc.ProgressBar)
        cc.log("isfromMenu is " + isfromMenu)
        if (this.progressBar.progress == 1 ){

            

        }else{
            cc.tween(this.progressBar)
                    .to(0.5, { progress: .5  },{easing:"easeInOut"})
                    .to(1, { progress: 1  },{easing:"easeOut"})
                    .call(() =>{
                        if (this.isfromMenu) {
                            SceneManager.getInstance().loadGamePrefab();
                        }else{
                            SceneManager.getInstance().loadLobbyPrefab();
                        }

                        
                    })
                    .start()
        }   
    }
    public setIsfromMenu(value:boolean){
        this.isfromMenu=value
        cc.log("this is setisfromMenu" + this.isfromMenu)
    }
    
}   
