
const {ccclass, property} = cc._decorator;

@ccclass
export default class coinManager extends cc.Component {
    @property(cc.Label)
    coindisplay :cc.Label = null;

    coinCount : string = null;
    numCoinCount : number = null ;  

    
    protected start(): void {
        this.coinCount = this.coindisplay.getComponent(cc.Label).string

        this.numCoinCount= Number(this.coinCount)

        cc.sys.localStorage.setItem("CoinCount", this.numCoinCount)

    }

}