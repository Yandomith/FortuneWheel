const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneManager extends cc.Component {
    private static instance: SceneManager = null;

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = cc.find('SceneManager')?.getComponent(SceneManager);
            if (!SceneManager.instance) {
                const newSceneManager = new cc.Node('SceneManager');
                SceneManager.instance = newSceneManager.addComponent(SceneManager);
                cc.director.getScene().addChild(newSceneManager);
            }
        }
        return SceneManager.instance;
    }

    @property(cc.Prefab)
    menuPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    gamePrefab: cc.Prefab = null;

    private currentPrefabInstance: cc.Node = null;

    protected onLoad() {
        this.currentPrefabInstance = null;
        this.loadMenu();
    }

    protected start(): void {
        if (SceneManager.instance) {
            cc.log('More than one instance of SceneManager found! Destroying this instance.');
            this.node.destroy();
            return;
        }
        SceneManager.instance = this;
    }


    loadMenu() {
        cc.log("Instancing Menu")
        this.loadPrefab(this.menuPrefab);
    }

    loadGame() {
        this.loadLoading(this.gamePrefab);
    }

    loadLoading(nextPrefab: cc.Prefab) {
        this.loadPrefab(this.loadingPrefab);

        cc.log("I am loading from SceneManager");
        this.scheduleOnce(() => {
            this.loadPrefab(nextPrefab);
        }, 1);
    }

    loadPrefab(prefab: cc.Prefab) {
        if (this.currentPrefabInstance) {
            this.currentPrefabInstance.destroy();
        }

        this.currentPrefabInstance = cc.instantiate(prefab);
        this.node.addChild(this.currentPrefabInstance);
    }
    
    onGameBackButtonClick() {
        this.loadLoading(this.menuPrefab); 
    }

    exitGame(){
        cc.game.end();
    }
}
