const{ccclass, property} = cc._decorator;
@ccclass
export default class DisplayResult  extends cc.Component{
    

    
    result: number = 0;
    lastValue: number = 0;

    segmentNumber: number = 8;
    segLength: number = 0;
    @property(cc.Label)
    displayLabel: cc.Label = null;

    

    displayResult() {

        this.result = (this.lastValue % 360) * -1 + 360;
        this.segLength = 360 / this.segmentNumber;
        let currentSegment = this.getSegment();
        
        this.displayLabel.string = "You got " + this.prizeLabels[currentSegment];   
        this.updateCoinCount(currentSegment);

        this.timerDisplay.getComponent(cc.Animation).play();
        this.scheduleOnce(() => {
            
            this.randomValue();
            this.inputBlocker.active = false;
        }, 2.5);
    }

    getSegment(): number {
        let startValue = 360 - this.segLength / 2;
        let endValue = this.segLength / 2;

        if (this.result >= startValue || this.result < endValue) {
            return 0;
        }

        for (let i = 1; i < this.segmentNumber; i++) {
            startValue = endValue;
            endValue = startValue + this.segLength;
            if (this.result >= startValue && this.result < endValue) {
                return i;
            }
        }

        return 0; 
    }

}