// import AudioManager from "./AudioManager";
// import { GAME_STATE } from "./GameConfig";
// import MessageTrigger from "./MessageTrigger";
// import SceneManager from "./SceneManager";

// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class WheelSpinner extends cc.Component {
//     @property(cc.Node)
//     buttonNode: cc.Node = null;

//     @property(cc.Label)
//     displayLabel: cc.Label = null;

//     @property(cc.Node)
//     wheelNode: cc.Node = null;

//     @property(cc.Integer)
//     currentRotation: number = 5;

//     @property(cc.Node)
//     pointerNode: cc.Node = null;

//     isSpinning: boolean = false;
//     hasStopped: boolean = false;
//     finalRotation: number = 0;
//     initialTweenDuration: number = 3;
//     randomDelAngle: number = 0;
//     result: number = 0;
//     lastValue: number = 0;

//     segmentNumber: number = 8;
//     segLength: number = 0;

//     @property(cc.Node)
//     prizeLabelParent: cc.Node = null;

//     prizeLabels: string[] = [];
//     prizeCount: number = 0;

//     lastResult: number = Number(cc.sys.localStorage.getItem("CoinCount")) || 0;
//     finalResult: string = null;

//     @property(cc.Node)
//     inputBlocker: cc.Node = null;

//     @property(cc.Label)
//     messageDisplay: cc.Label = null;

//     @property(cc.Label)
//     timerDisplay: cc.Label = null;

//     IamRandom : number = null;

//     playCost : number = 10;
        
//     @property (cc.Node)
//     coinMessage : cc.Node = null;

//     RespinGenerate : number = null;
//     jackpotGenerate: number = null;

//     jackpotReward: number= 50;
//     jackpotWonValue: number = null;

//     @property (cc.Button)
//     increseBetButton : cc.Button = null;

//     @property (cc.Button)
//     decreseBetButton : cc.Button = null;

//     @property (cc.Node)
//     BetPriceNode : cc.Node = null;


//     // gameState = GAME_STATE.Idle

//     protected start(): void {
//         this.inputBlocker.active = false;
//         this.prizeCount = this.prizeLabelParent.children.length;
//         for (let i = 0; i < this.prizeCount; i++) {
//             this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string);
//             cc.log(this.prizeLabels[i]+" these are the values " )
//         }

//         // cc.log("I am printing this from start from GAME_STATE  and Game State is  " + this.gameState )


    
//     }

//     onButtonClick() {
//         // this.gameState = GAME_STATE.Spinning
//         //guard clause
//         // if(this.gameState == GAME_STATE.Spinning)
//         //     return;

        
//         if (this.lastResult < this.playCost) {
//             this.messageDisplay.getComponent(cc.Animation).play();

//         } else {
//             this.lastResult -= this.playCost;
//             this.coinMessage.getComponent(cc.Label).string = "-"+ this.playCost.toString()
//             this.coinMessage.getComponent(cc.Animation).play();

//             cc.sys.localStorage.setItem("CoinCount", this.lastResult.toString());
//             AudioManager.getInstance().playWheelSFX();
//             AudioManager.getInstance().playButtonSFX();

//             if (!this.isSpinning) {
//                 this.startSpin();
//             }
//         }
//     }

//     startSpin() {
//         this.isSpinning = true;
//         this.hasStopped = false;
//         this.inputBlocker.active = true;

//         this.displayLabel.string = "Spinning Please Wait  "

//         this.animatePointer();
//         cc.log(this.wheelNode.rotation + " this is the rotation value before Spin")
//         cc.tween(this.wheelNode)
//             .to(this.initialTweenDuration, { rotation: this.finalRotation + 200 * this.initialTweenDuration }, { easing: "cubicIn" })
//             .by(this.initialTweenDuration, { rotation: 360 * this.initialTweenDuration })
//             .call(() => {
//                 this.finalRotation = this.wheelNode.rotation;
//                 cc.log(this.wheelNode.rotation + " this is the rotation value after Long Spin")
//                 this.startDeceleration();
//             })
//             .start();
//     }

//     animatePointer() {
//         let embedTween1 = cc.tween(this.pointerNode)
//             .to(0.2, { rotation: -45 }, { easing: "easeIn" })
//             .to(0.1, { rotation: 0 });

//         let embedTween = cc.tween(this.pointerNode)
//             .to(0.1, { rotation: -45 }, { easing: "easeIn" })
//             .to(0.025, { rotation: 0 });

//         cc.tween(this.pointerNode)
//             .repeat(6, embedTween1)
//             .repeat(34, embedTween)
//             .to(0.05, { rotation: -45 }, { easing: "easeIn" })
//             .repeat(5)
//             .to(0.05, { rotation: 0 })
//             .start();
//     }

//     startDeceleration() {
//         this.randomDelAngle = Math.random() * 3;

//         cc.tween()
//             .target(this.wheelNode)
//             .to(this.initialTweenDuration, { rotation: this.finalRotation + (360 * this.randomDelAngle) / 2 }, { easing: "cubicOut" })
//             .call(() => {
//                 this.lastValue = this.wheelNode.rotation;
//                 this.hasStopped = true;
//                 this.isSpinning = false;
//                 this.displayResult();
//                 cc.log(this.wheelNode.rotation + " this is the rotation value after Spin")


//             })
//             .start();
//     }

//     displayResult() {

//         this.result = (this.lastValue % 360) * -1 + 360;
//         this.segLength = 360 / this.segmentNumber;
//         let currentSegment = this.getSegment();
        
//         this.displayLabel.string = "You got " + this.prizeLabels[currentSegment];
//         this.updateCoinCount(currentSegment);
//         this.timerDisplay.getComponent(cc.Animation).play();
//         this.scheduleOnce(() => {
            
//             this.randomValue();
//             this.inputBlocker.active = false;
//         }, 2.5);
        

//     }

//     getSegment(): number {
//         let startValue = 360 - this.segLength / 2;
//         let endValue = this.segLength / 2;

//         if (this.result >= startValue || this.result < endValue) {
//             return 0;
//         }

//         for (let i = 1; i < this.segmentNumber; i++) {
//             startValue = endValue;
//             endValue = startValue + this.segLength;
//             if (this.result >= startValue && this.result < endValue) {
//                 return i;
//             }
//         }

//         return 0; 
//     }

//     updateCoinCount(segment: number) {
//         const segmentLabel = this.prizeLabelParent.children[segment].getComponent(cc.Label).string

//         if(segmentLabel == "Respin"){
//             cc.log("you got Respin")
//             this.lastResult += this.playCost;
//             cc.sys.localStorage.setItem("CoinCount", this.lastResult.toString());
//             this.coinMessage.getComponent(cc.Label).string = "+"+ this.playCost.toString()
//             this.coinMessage.getComponent(cc.Animation).play();

//             this.startSpin()

//         }
//         else if(segmentLabel == "JackPot"){
//             cc.log("you got jackpot")
//             this.jackpotWonValue = this.playCost*this.jackpotReward;
//             this.lastResult += this.jackpotWonValue
//             cc.sys.localStorage.setItem("CoinCount", this.lastResult.toString());
//             this.coinMessage.getComponent(cc.Label).string = "+"+ this.jackpotWonValue.toString()
//             this.coinMessage.getComponent(cc.Animation).play();
//         }
//         else{
            
//             const prizeValue = Number(this.prizeLabels[segment]);
//             const newCoinCount = this.lastResult + prizeValue;

//             this.lastResult = Math.max(newCoinCount, 0);
//             this.finalResult = this.lastResult.toString();
//             cc.log("you got" + prizeValue)

//             cc.sys.localStorage.setItem("CoinCount", this.finalResult);

//             this.coinMessage.getComponent(cc.Label).string = "+"+ prizeValue.toString()
//             this.coinMessage.getComponent(cc.Animation).play();

//         }

//     }


//     randomValue(){
//         this.prizeLabels = []

//         cc.log(this.prizeCount)

//         for (let i = 0; i < this.prizeCount; i++) {
//             this.IamRandom = Math.floor(Math.random() * (-20-50)+50);

//             let randomJackPot = Math.floor(Math.random()*10);
//             let randomRespin = Math.floor(Math.random()*5);

//             if (randomJackPot == 2) {
//                 this.prizeLabelParent.children[i].getComponent(cc.Label).string= "JackPot"
//                 this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string)
//             }

//             else if (randomRespin == 2) {
//                 this.prizeLabelParent.children[i].getComponent(cc.Label).string= "Respin"
//                 this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string)
//             }
//             else{
//                 this.prizeLabelParent.children[i].getComponent(cc.Label).string = this.IamRandom.toString();
//                 this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string) 
//             }
    

//             cc.log(this.prizeLabels[i]+" these are the values after generating random " )
//         }



//         // this.jackpotGenerator()
//         // this.RespinGenerator()
       


        
//     }
    
//     // increaseBet(){
//     //     this.playCost = this.playCost + 10

//     // }
    
//     // decreaseBet(){

//     // }

//     // betMultiplier(){
//     //     const betPrice = [10,50,100,150 ]


        
//     // }


    
// }




const { ccclass, property } = cc._decorator;
import SpinController from "./SpinController";
import CoinController from "./CoinController";
import ResultController from "./ResultController";
import AudioManager from "./AudioManager";
import { WheelState } from "./GameConfig";

@ccclass
export default class WheelSpinner extends cc.Component {
    @property(cc.Node) buttonNode: cc.Node = null;
    @property(cc.Label) displayLabel: cc.Label = null;
    @property(cc.Node) wheelNode: cc.Node = null;
    @property(cc.Node) pointerNode: cc.Node = null;
    @property(cc.Node) inputBlocker: cc.Node = null;
    @property(cc.Label) messageDisplay: cc.Label = null;
    @property(cc.Node) coinMessage: cc.Node = null;
    @property(cc.Node) prizeLabelParent: cc.Node = null;
    @property(cc.Button) increaseBetButton: cc.Button = null;
    @property(cc.Button) decreaseBetButton: cc.Button = null;
    @property(cc.Label) betPriceDisplay: cc.Label = null;

    @property(SpinController) SpinController: SpinController = null;
    @property(CoinController) coinController: CoinController = null;
    @property(ResultController) resultController: ResultController = null;

    protected start(): void {
        cc.log("I am in WheelSpinner's Start");
        if (this.SpinController && this.coinController && this.resultController) {
            this.SpinController.initialize(this.coinController, this.resultController);
            this.resultController.initialize(this.coinController, this.SpinController);

        } else {
            cc.log("Managers not assigned in the editor.");
        }

    }

    onButtonClick() {
        if (this.SpinController.currentState != WheelState.Idle) {
            cc.log("Wheel is already spinning or has not stopped properly.");
            return;
        }
        
        if (this.coinController && this.coinController.canSpin()) {
            AudioManager.getInstance().playButtonSFX();
            this.SpinController.startSpin();
            cc.log("You clicked Button to Spin")
        } else {
            this.messageDisplay.getComponent(cc.Animation)?.play();
        }
    }

    onclickIncreaseBet() {
        this.coinController?.increaseBet();
    }

    onclickDecreaseBet() {
        this.coinController?.decreaseBet();
    }
}
