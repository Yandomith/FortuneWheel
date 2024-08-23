import AudioManager from "./AudioManager";
import SceneManager from "./SceneManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class wheelSpinner extends cc.Component {
    @property(cc.Node)
    buttonNode: cc.Node = null;
    @property(cc.Label)
    displayLabel: cc.Label = null;

    @property(cc.Node)
    wheelNode: cc.Node = null;

    @property(cc.Integer)
    currentRotation: number = 5;

    @property(cc.Node)
    pointerNode: cc.Node = null;

    isSpinning : boolean = false;
    shouldSpin : boolean= false;
    isAccelerating: boolean = false;
    isDecelerating: boolean = false;
    finalRotation :number = 0;
    initialTweenDuration : number= 3
    hasSpun: boolean = false;
    newDefaultRotation: number = 0;
    randomDelAngle: number= 0 ;
    result : number = 0 ;
    lastValue: number = 0;

    segmentNumber : number = 8 ;
    startValue : number = 0;
    endValue: number = 0;
    seglength : number = 0;

    @property(cc.Node)
    prizeLabelParent :cc.Node = null;

    prizeLabels : string[] = null;
    prizeCount : number = null;

    lastResult: number = Number(cc.sys.localStorage.getItem("CoinCount"));
    finalResult : string = null;

    @property(cc.Node)
    inputBlocker: cc.Node = null;


    protected start(): void {
        this.inputBlocker.active= false
        this.prizeCount=  this.prizeLabelParent.children.length;
        cc.log("this have "+ this.prizeCount);

        this.prizeLabels = [ ]

       for (let i = 0; i < this.prizeCount; i++) {
            
            this.prizeLabels.push( this.prizeLabelParent.children[i].getComponent(cc.Label).string);
            cc.log("Values are  "+ this.prizeLabels[i])
       }
        
    }


    onButtonClick(){

        cc.log("Button Clicked")
        AudioManager.getInstance().WheelsfxEffect();
        AudioManager.getInstance().sfxEffect();  

        if (!this.isSpinning) {
            this.isSpinning = true;
            this.inputBlocker.active= true
            let embedTween1 = cc.tween(this.pointerNode)
            .to(.2, { rotation: -45  },{easing:"easeIn"})
                .to(.1, { rotation: 0  })

            let embedTween = cc.tween(this.pointerNode)
            .to(.1, { rotation: -45  },{easing:"easeIn"})
                .to(.025, { rotation: 0  })

            cc.tween(this.pointerNode)
                .to(.2, { rotation: -45  },{easing:"easeIn"})
                .repeat(6,embedTween1)
                .repeat(34,embedTween)
                .to(.05, { rotation: -45  },{easing:"easeIn"})
                .repeat(5)
                .to(.05, { rotation: 0  })
                .start();


            cc.tween(this.wheelNode)
            .to(this.initialTweenDuration, {rotation: this.finalRotation + 200* (this.initialTweenDuration)}, {
                   easing: "cubicIn"
                })
            .by(this.initialTweenDuration, {rotation:( 360* this.initialTweenDuration)})  
          
            .call(() => {
                    this.finalRotation = this.wheelNode.rotation,
                    cc.log(this.wheelNode.rotation + "this is final rotation after Acceleration ");
                    
                    this.isAccelerating = false;
                    this.shouldSpin = false;
                    this.isSpinning= false;
                    this.startDeceleration();
                    
                    
            })
        .start();
        }
    }
   
    startDeceleration(){
        cc.log("Starting Decelaration");
        this.randomDelAngle = Math.random()*3;
        cc.log(this.randomDelAngle + "random value")
        cc.tween()
            .target(this.wheelNode)
            .to(this.initialTweenDuration, {rotation: (this.finalRotation) + ( 360 * this.randomDelAngle) /2
            }, {
                easing: "cubicOut"
            })
            .call(() => {
                this.lastValue = this.wheelNode.rotation
                this.isDecelerating = false;
                this.isSpinning = false;
                cc.log(this.wheelNode.rotation + "this is final rotation after startDeceleration  ");
                this.hasSpun = true;
                cc.log("final rotation is " + this.finalRotation)
                cc.log(" Result")
                this.displayResult();
            })
            .start();
            

    }

    displayResult()
    {
        this.inputBlocker.active= false
        cc.log("hehe")
        this.result = (this.lastValue % 360)* -1 + 360;
        this.seglength = 360/this.segmentNumber;

        this.startValue = 360-(this.seglength/2) ;
        this.endValue = this.seglength / 2 ;
        cc.log(this.result)
        if (this.result >= this.startValue && this.result < this.endValue) {
            cc.log(this.prizeLabels[0] + "is 1 when ")
            this.displayLabel.string = this.prizeLabels[0];
            return;
        } 

        for (let i = 1; i < this.segmentNumber; i++) {
            this.startValue = this.endValue  ;
            cc.log(this.startValue)
            this.endValue= this.startValue+ this.seglength;
            cc.log(this.endValue)
                if (this.result >= this.startValue && this.result < this.endValue){
                    cc.log(this.prizeLabels[i])
                    this.displayLabel.string = this.prizeLabels[i];
                    this.lastResult = this.lastResult + Number(this.prizeLabels[i])
                    break;
                }
        }

        this.finalResult = this.lastResult.toString()
        cc.sys.localStorage.setItem("CoinCount", this.finalResult )
       
    }
    
}
