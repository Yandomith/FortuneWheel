// const { ccclass, property } = cc._decorator;
// import CoinController from "./CoinController";
// import SpinController from "./SpinController";

import CoinController from "./CoinController";
import SpinController from "./SpinController";
import { WheelState } from "./GameConfig";

// @ccclass
// export default class ResultManager {
//     private displayLabel: cc.Label;
//     private messageDisplay: cc.Label;
//     private timerDisplay: cc.Label;
//     private inputBlocker: cc.Node;
//     private prizeLabelParent: cc.Node;
//     private coinController: CoinController;
//     private spinController : SpinController;
//     private prizeLabels: string[] = [];
//     private segmentNumber: number = 8;
//     private randomNumber : number = 0;

//     constructor(displayLabel: cc.Label, messageDisplay: cc.Label, timerDisplay: cc.Label, inputBlocker: cc.Node,prizeLabelParent:cc.Node ) {
//         this.displayLabel = displayLabel;
//         this.messageDisplay = messageDisplay;
//         this.timerDisplay = timerDisplay;
//         this.inputBlocker = inputBlocker;
//         this.prizeLabelParent = prizeLabelParent;
//     }

//     initialize(coinController: CoinController , spinController : SpinController) {
//         this.coinController = coinController;
//         this.spinController = spinController;
//     }

 

//     displayResult(lastValue: number, segLength: number, segmentNumber: number) {

//         for (let i = 0; i < segmentNumber; i++) {
//             this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string);
//             cc.log(this.prizeLabels[i]+" these are the values " )
//         }

//         let result = (lastValue % 360) * -1 + 360;
//         let currentSegment = this.getSegment(result, segLength, segmentNumber)

//         this.displayLabel.string = "You got " + this.prizeLabels[currentSegment];
//         this.updateCoinCount(currentSegment);
//         this.timerDisplay.getComponent(cc.Animation).play();


            
//             this.scheduleNextSpin();


//     }
    

//     private getSegment(result: number, segLength: number, segmentNumber: number): number {
//         segLength = 360 / this.segmentNumber;
//         let startValue = 360 - segLength / 2;
//         let endValue = segLength / 2;

//         if (result >= startValue || result < endValue) {
//             return 0;
//         }

//         for (let i = 1; i < segmentNumber; i++) {
//             startValue = endValue;
//             endValue = startValue + segLength;
//             if (result >= startValue && result < endValue) {
//                 return i;
//             }
//         }

//         return 0;
//     }

//     private updateCoinCount(segment: number) {
//         const segmentLabel = this.prizeLabels[segment];
//         if (segmentLabel === "Respin") {
//             cc.log("You got Respin")
//             this.handleRespin();

//         } else if (segmentLabel === "JackPot") {
//             cc.log("You got JackPot")
//             this.handleJackpot();
//         } else {
//             this.handleRegularPrize(segment);
//         }
//     }

//     private handleRespin() {
//         this.coinController.addCoins(this.coinController.getLastPlayCost());
//         this.spinController.startSpin();
        
//     }

//     private handleJackpot() {
//         const jackpotReward = 50;
//         this.coinController.addCoins(this.coinController.getLastPlayCost()* jackpotReward);
//     }

//     private handleRegularPrize(segment: number) {
//         const prizeValue = Number(this.prizeLabels[segment]);
//         cc.log(this.prizeLabels[segment] + " is prize " )
//         this.coinController.addCoins(prizeValue);
//     }

//     private scheduleNextSpin() {
//         this.prizeLabels = []


//         for (let i = 0; i < this.segmentNumber; i++) {
//             this.randomNumber = Math.floor(Math.random() * (-20-50)+50);

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
//                 this.prizeLabelParent.children[i].getComponent(cc.Label).string = this.randomNumber.toString();
//                 this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string) 
//             }
    

//             cc.log(this.prizeLabels[i]+" these are the values after generating random " )
//         }


//         this.inputBlocker.active = false;
//     }
// }




const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultController extends cc.Component {
    @property(cc.Label) displayLabel: cc.Label = null;
    @property(cc.Label) messageDisplay: cc.Label = null;
    @property(cc.Node) timerDisplay: cc.Node = null;
    @property(cc.Node) inputBlocker: cc.Node = null;
    @property(cc.Node) prizeLabelParent: cc.Node = null;

    private coinController: CoinController = null;
    private spinController: SpinController = null;
    private prizeLabels: string[] = [];
    private segmentNumber: number = 8;
    private randomNumber: number = 0;

    onLoad() {

    }

    initialize(coinController: CoinController, spinController: SpinController) {
        this.coinController = coinController;
        this.spinController = spinController;
    }



    displayResult(lastValue: number, segLength: number, segmentNumber: number) {

        this.spinController.changeWheelState(WheelState.Reward);

        

        for (let i = 0; i < segmentNumber; i++) {
            this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string);
            cc.log(this.prizeLabels[i]+" these are the values " )
        }


        let result = (lastValue % 360) * -1 + 360;
        let currentSegment = this.getSegment(result, segLength, segmentNumber);
        this.updateCoinCount(currentSegment);

        if(this.prizeLabels[currentSegment].charAt(0) == "-"){

            this.displayLabel.string = "You lost " + this.prizeLabels[currentSegment];
        }
        else{
            this.displayLabel.string = "You got " + this.prizeLabels[currentSegment];
        }
        cc.log(this.displayLabel.string)


        if(this.prizeLabels[currentSegment] == "Respin"){
            this.spinController.changeWheelState(WheelState.Respining);
            return;
        }
        this.timerDisplay.active = true;
        this.scheduleOnce(() => {

            this.scheduleNextSpin();
        }, 2.5)



        

    }

    private getSegment(result: number, segLength: number, segmentNumber: number): number {
        segLength = 360 / segmentNumber;
        let startValue = 360 - segLength / 2;
        let endValue = segLength / 2;

        if (result >= startValue || result < endValue) {
            return 0;
        }

        for (let i = 1; i < segmentNumber; i++) {
            startValue = endValue;
            endValue = startValue + segLength;
            if (result >= startValue && result < endValue) {
                return i;
            }
        }

        return 0;
    }

    private updateCoinCount(segment: number) {
        const segmentLabel = this.prizeLabels[segment];
        if (segmentLabel === "Respin") {
            this.handleRespin();
        } else if (segmentLabel === "JackPot") {
            this.handleJackpot();
        } else {
            this.handleRegularPrize(segment);
        }
    }

    private handleRespin() {
        this.coinController.addCoins(this.coinController.getLastPlayCost());
        this.spinController.changeWheelState(WheelState.Respining);
        this.spinController.startSpin();
    }

    private handleJackpot() {
        const jackpotReward = 100;
        this.coinController.addCoins(jackpotReward * this.coinController.getcurrentBetIndexCost());
    }

    private handleRegularPrize(segment: number) {
        const prizeValue = Number(this.prizeLabels[segment])* this.coinController.getcurrentBetIndexCost();
        this.coinController.addCoins(prizeValue);
    }

    private scheduleNextSpin() {
        cc.log("Error here 1")
        
        cc.log("Error here 2")
        this.prizeLabels = [];
        cc.log("Error here 3")
        for (let i = 0; i < this.segmentNumber; i++) {
            this.randomNumber = Math.floor(Math.random() * (-20-10)+10);
            
            let randomJackPot = Math.floor(Math.random()*20);
            let randomRespin = Math.floor(Math.random()*10);
            
            if (randomJackPot == 2) {
                this.prizeLabelParent.children[i].getComponent(cc.Label).string = "JackPot"
                this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string)
                }
            
            else if (randomRespin == 2) {
                this.prizeLabelParent.children[i].getComponent(cc.Label).string= "Respin"
                this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string)
                    
                    }
            else{
                this.prizeLabelParent.children[i].getComponent(cc.Label).string = this.randomNumber.toString();
                this.prizeLabels.push(this.prizeLabelParent.children[i].getComponent(cc.Label).string) 
                }
                cc.log(this.prizeLabels[i]+" these are the values after generating random " )
            }
       this.inputBlocker.active = false;  
       this.timerDisplay.active = false;    
       this.spinController.changeWheelState(WheelState.Idle);
       this.displayLabel.string = "You can Spin Again ";

     

    }
}