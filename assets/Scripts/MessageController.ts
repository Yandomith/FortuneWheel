const { ccclass, property } = cc._decorator;

@ccclass
export default class MessageController extends cc.Component {
    private static instance: MessageController = null;

    public static getInstance(): MessageController {
        if (!MessageController.instance) {
            MessageController.instance = cc.find('MessageController')?.getComponent(MessageController);
            if (!MessageController.instance) {
                const newMessageController = new cc.Node('MessageController');
                MessageController.instance = newMessageController.addComponent(MessageController);
                cc.director.getScene().addChild(newMessageController);
            }
        }
        return MessageController.instance;
    }

    protected start(): void {
        if (MessageController.instance) {
            cc.log('More than one instance of MessageController found! Destroying this instance.');
            this.node.destroy();
            return;
        }
        MessageController.instance = this;
    }
    




}