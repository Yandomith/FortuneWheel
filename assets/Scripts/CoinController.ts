// const { ccclass, property } = cc._decorator;
// @ccclass
// export default class CoinManager extends cc.Component{
//     private coinMessage: cc.Node;
//     private increaseBetButton : cc.Button
//     private decreaseBetButton : cc.Button
//     private betPriceDisplay : cc.Label
//     private lastResult: number;
//     private playCost: number = 10;
//     private betMultiplier : number = 1;
//     private minMultiplier: number; // Minimum allowed multiplier
//     private maxMultiplier: number; 

//     constructor(coinMessage: cc.Node , increaseBetButton : cc.Button,decreaseBetButton: cc.Button,betPriceDisplay: cc.Label) {
//         this.coinMessage = coinMessage;
//         this.increaseBetButton = increaseBetButton
//         this.decreaseBetButton = decreaseBetButton
//         this.betPriceDisplay = betPriceDisplay

//         this.lastResult = Number(cc.sys.localStorage.getItem("CoinCount")) || 0;

//         this.increaseBetButton.node.on('click', this.increaseMultiplier, this);
//         this.decreaseBetButton.node.on('click', this.decreaseMultiplier, this);

//     }

//     canSpin(): boolean {
//         cc.log("this is last result in can spin " + this.lastResult)
//         return this.lastResult >= this.playCost * this.betMultiplier;

//     }

//     deductPlayCost() {
//         this.lastResult -= this.playCost;
//         this.updateCoinMessage(`-${this.playCost}`);
//         cc.sys.localStorage.setItem("CoinCount", this.lastResult.toString());
//     }

//     addCoins(amount: number) {
//         this.lastResult += amount;
//         cc.log(this.lastResult+ " hehe this is the last result ")
//         this.updateCoinMessage(`+${amount}`);
//         cc.sys.localStorage.setItem("CoinCount", this.lastResult.toString());
//     }

//     private updateCoinMessage(message: string) {
//         cc.log("I am in Coin Update")
//         this.coinMessage.getComponent(cc.Label).string = message;
//         this.coinMessage.getComponent(cc.Animation).play();
//     }

//     getLastResult() {
//         return this.lastResult;
//     }

//     getLastPlayCost(){
//         return this.playCost;
//     }

//     private updateBetPriceDisplay(){
//         this.betPriceDisplay.string = this.playCost.toString()
//     }


// }






const { ccclass, property } = cc._decorator;

@ccclass
export default class CoinController extends cc.Component {
    @property(cc.Node) coinMessage: cc.Node = null;
    @property(cc.Button) increaseBetButton: cc.Button = null;
    @property(cc.Button) decreaseBetButton: cc.Button = null;
    @property(cc.Label) betPriceDisplay: cc.Label = null;
    @property(cc.Label) betRewardMulitpleDisplay: cc.Label = null;

    private lastResult: number = 0;
    private playCost: number = 1;
    private betValues: number[] = [1, 5, 10, 15,20]; 
    private currentBetIndex: number = 1;

    onLoad() {
        this.lastResult = Number(cc.sys.localStorage.getItem("CoinCount")) || 0;

        this.updateBetPriceDisplay();

        cc.log(this.lastResult )
    }

    canSpin(): boolean {
        return this.lastResult >= this.playCost;
    }

    deductPlayCost() {
        this.lastResult -= this.playCost;
        this.lastResult = Math.max(this.lastResult, 0);
        this.updateCoinMessage(`-${this.playCost}`);
        cc.sys.localStorage.setItem("CoinCount", this.lastResult.toString());
    }

    addCoins(amount: number) {
        this.lastResult += amount;
        this.lastResult = Math.max(this.lastResult, 0);
        this.updateCoinMessage(`${amount}`);
        cc.sys.localStorage.setItem("CoinCount", this.lastResult.toString());
    }

    private updateCoinMessage(message: string) {
        if(message.charAt(0) == "-"){
            this.coinMessage.color   =cc.Color.RED;
            this.coinMessage.getComponent(cc.Label).string = message;
            this.coinMessage.getComponent(cc.Animation).play();
        }
        else{
            this.coinMessage.color   =cc.Color.GREEN;
            this.coinMessage.getComponent(cc.Label).string = "+" +message;
            this.coinMessage.getComponent(cc.Animation).play();        }

    }

    getLastResult() {
        return this.lastResult;
    }

    getLastPlayCost() {
        return this.playCost;
    }

    getcurrentBetIndexCost() {
        return this.currentBetIndex;
    }

    increaseBet() {
        if (this.currentBetIndex -1 < this.betValues.length - 1) {
            this.currentBetIndex++;
            this.playCost = this.betValues[this.currentBetIndex -1];
            this.updateBetPriceDisplay();

            cc.log(this.playCost + "  Hehe you have this bet price " )
        }
    }

    decreaseBet() {
        if (this.currentBetIndex -1 > 0) {
            this.currentBetIndex--;
            this.playCost = this.betValues[this.currentBetIndex -1];
            this.updateBetPriceDisplay();
            cc.log(this.playCost + "  Hehe you have this bet price " )
        }
    }

    private updateBetPriceDisplay() {
        this.betPriceDisplay.string = this.playCost.toString();
        this.betRewardMulitpleDisplay.string = "*" + this.currentBetIndex
    }

    private updateBetMultipleDisplay(){

    }
}
