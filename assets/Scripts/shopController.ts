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


    onClickShopClose(){
        cc.tween(this.node)
            .to(.1, {scale : 0})
            .call(()=>{
                this.node.active =false;
            })
            .start()
       
    }
    onClick(event :cc.Event , data: string){
        
    }
    
    onClickbuy5(){
        cc.log( " bought 5 ");

    }
    onClickbuy15(){
        cc.log( " bought 15 ");
    }
    
    onClickbuy30(){
        cc.log( " bought 30 ");
    }
    



}