import AudioManager from "./AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopController extends cc.Component {

    @property(cc.Button)
    closeShop : cc.Button = null;

    @property(cc.Node)
    ShopInventory : cc.Node = null;


    @property(cc.Button)
    buy5Button : cc.Node= null;

    @property(cc.Button)
    buy15Button : cc.Node= null;

    @property(cc.Button)
    buy30Button : cc.Node= null;

    @property(cc.Node)
    coinStat : cc.Node= null ;

    buyPack :number = null;

    previousCoinValue: number = Number(cc.sys.localStorage.getItem("CoinCount")) || 0;

    onClickShopClose(){
        cc.tween(this.node)
            .to(.1, {scale : 0})
            .call(()=>{
                this.node.active =false;
            })
            .start()
       
    }
    onClickShop(event :cc.Event , data: string){
        cc.log("I am " + data)
        this.buyPack = Number(data)
        this.previousCoinValue =this.previousCoinValue + this.buyPack
        cc.sys.localStorage.setItem("CoinCount", this.previousCoinValue);   
        AudioManager.getInstance().playCoinCollectSFX();    
    }
}