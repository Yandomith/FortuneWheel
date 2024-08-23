const {ccclass, property} = cc._decorator;

@ccclass
export default class newShopController extends cc.Component {

    coinCount : number = null;

    onLoad () {
        this.coinCount = Number(cc.sys.localStorage.getItem("CoinCount"))
        cc.log(this.coinCount +" numbers of coins " )
    }

    start () {
       
    }


}
