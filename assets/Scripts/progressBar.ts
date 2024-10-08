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

        this.progressBar= this.progressBarNode.getComponent(cc.ProgressBar)
       
        if (this.progressBar.progress == 1 ){


        }else{
            cc.tween(this.progressBar)
                    .to(0.5, { progress: .5  },{easing:"easeInOut"})
                    .to(1, { progress: 1  },{easing:"easeOut"})
                    .start()
        }   
    }
    

    
}   
