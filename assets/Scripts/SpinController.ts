// const { ccclass, property } = cc._decorator;
// import ResultController from "./ResultController";
// import CoinController from "./CoinController";

import CoinController from "./CoinController";
import ResultController from "./ResultController";
import { WheelState } from "./GameConfig";

// @ccclass
// export default class SpinManager {
//     private wheelNode: cc.Node;
//     private pointerNode: cc.Node;
//     private inputBlocker: cc.Node;
//     private coinController: CoinController;
//     private resultController: ResultController;

//     private isSpinning: boolean = false;
//     private hasStopped: boolean = false;
//     private finalRotation: number = 0;
//     private initialTweenDuration: number = 3;
//     private randomDelAngle: number = 0;
//     private lastValue: number = 0;
//     private segmentNumber: number = 8;
//     private segLength: number = 0 ;

//     constructor(wheelNode: cc.Node, pointerNode: cc.Node, inputBlocker: cc.Node) {
//         this.wheelNode = wheelNode;
//         this.pointerNode = pointerNode;
//         this.inputBlocker = inputBlocker;
//     }

//     initialize(coinController: CoinController, resultController: ResultController) {
//         this.coinController = coinController;
//         this.resultController = resultController;
//     }

    
    
//     startSpin() {
//         this.isSpinning = true;
//         this.hasStopped = false;
//         this.inputBlocker.active = true;
//         cc.log("I am in StartSpin's Start")
//         this.animatePointer();
//         this.animateWheel();
//     }

    
//     private animatePointer() {
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

//     private animateWheel() {
//         cc.tween(this.wheelNode)
//             .to(this.initialTweenDuration, { rotation: this.finalRotation + 200 * this.initialTweenDuration }, { easing: "cubicIn" })
//             .by(this.initialTweenDuration, { rotation: 360 * this.initialTweenDuration })
//             .call(() => {
//                 this.finalRotation = this.wheelNode.rotation;
//                 this.startDeceleration();
//             })
//             .start();
//     }

//     private startDeceleration() {
//         this.randomDelAngle = Math.random() * 2;

//         cc.tween(this.wheelNode)
//             .to(this.initialTweenDuration, { rotation: this.finalRotation + (360 * this.randomDelAngle) / 2 }, { easing: "cubicOut" })
//             .call(() => {
//                 this.lastValue = this.wheelNode.rotation;
//                 this.hasStopped = true;
//                 this.isSpinning = false;
//                 this.resultController.displayResult(this.lastValue, this.segLength, this.segmentNumber);
//             })
//             .start();
//     }
// }




const { ccclass, property } = cc._decorator;


@ccclass
export default class SpinController extends cc.Component {
    @property(cc.Node) wheelNode: cc.Node = null;
    @property(cc.Node) pointerNode: cc.Node = null;
    @property(cc.Node) inputBlocker: cc.Node = null;

    private coinController: CoinController = null;
    private resultController: ResultController = null;

    // public isSpinning: boolean = false;
    // private hasStopped: boolean = false;
    private finalRotation: number = 0;
    private initialTweenDuration: number = 3;
    private randomDelAngle: number = 0;
    private lastValue: number = 0;
    private segmentNumber: number = 8;
    private segLength: number = 0;

    public currentState: WheelState = WheelState.Idle;

    onLoad() {
    
    }

    initialize(coinController: CoinController, resultController: ResultController) {
        this.coinController = coinController;
        this.resultController = resultController;
    }

    startSpin() {

        if (this.currentState !== WheelState.Idle && this.currentState !== WheelState.Respining) {
            cc.log("Wheel is already spinning or has not stopped properly.");
            return;
        }
        // this.isSpinning = true;
        // this.hasStopped = false;
        this.coinController.deductPlayCost();
        this.inputBlocker.active = true;
        this.changeWheelState(WheelState.Spinning);
        this.animatePointer();
        this.animateWheel();
    }


    private animatePointer() {
        let embedTween1 = cc.tween(this.pointerNode)
            .to(0.2, { rotation: -45 }, { easing: "easeIn" })
            .to(0.1, { rotation: 0 });

        let embedTween = cc.tween(this.pointerNode)
            .to(0.1, { rotation: -45 }, { easing: "easeIn" })
            .to(0.025, { rotation: 0 });

        cc.tween(this.pointerNode)
            .repeat(6, embedTween1)
            .repeat(34, embedTween)
            .to(0.05, { rotation: -45 }, { easing: "easeIn" })
            .repeat(5)
            .to(0.05, { rotation: 0 })
            .start();
    }

    private animateWheel() {
        this.randomDelAngle = Math.random() * (2-4)+4;
        cc.tween(this.wheelNode)
            .to(this.initialTweenDuration, { rotation: this.finalRotation + 200 * this.initialTweenDuration }, { easing: "cubicIn" })

            .by(this.initialTweenDuration, { rotation: ((360 * this.randomDelAngle) * this.initialTweenDuration)/2 })
            .call(() => {
                this.finalRotation = this.wheelNode.rotation;
                this.startDeceleration();
            })
            .start();
    }

    private startDeceleration() {
        cc.tween(this.wheelNode)
            .to(this.initialTweenDuration, { rotation: this.finalRotation + 360 }, { easing: "cubicOut" })
            .call(() => {
                this.lastValue = this.wheelNode.rotation;
                // this.hasStopped = true;
                // this.isSpinning = false;
                this.changeWheelState(WheelState.SpinStop);
                this.resultController.displayResult(this.lastValue, this.segLength, this.segmentNumber);
            })
            .start();
    }



    changeWheelState(newState: WheelState) {
        this.currentState = newState;
        cc.log(`Wheel state changed to: ${WheelState[this.currentState]}`);
    }
}
