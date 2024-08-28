// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MessageController from "./MessageController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    public OnclickReset(){
        cc.sys.localStorage.setItem("CoinCount" , 20)
        
    }
}
