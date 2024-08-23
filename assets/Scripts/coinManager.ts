
const {ccclass, property} = cc._decorator;

@ccclass
export default class coinManager extends cc.Component {

    protected update(): void {
        this.node.getComponent(cc.Label).string= cc.sys.localStorage.getItem("CoinCount")
    }

}