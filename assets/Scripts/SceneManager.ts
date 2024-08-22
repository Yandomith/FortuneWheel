// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameController from "./GameController";
import progressBar from "./progressBar";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneManager extends cc.Component {
    private static instance : SceneManager =  null;

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
    lobbyPrefab : cc.Prefab = null;
    @property(cc.Prefab)
    progressPrefab : cc.Prefab = null ;

    @property(cc.Prefab)
    gamePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    DoublegamePrefab: cc.Prefab = null;






    private lobbyInstance :cc.Node = null;
    private progressInstance : cc.Node = null;
    private gameInstance : cc.Node = null;
    



    

    protected start(): void {

        
        if (SceneManager.instance) {
            cc.log('More than one instance of SceneManager found! Destroying this instance.');
            this.node.destroy();
            return;
        }
        SceneManager.instance = this; 


        this.lobbyInstance = cc.instantiate(this.lobbyPrefab)
        this.node.addChild(this.lobbyInstance)
    
        // this.gameInstance = cc.instantiate(this.gamePrefab)
        // this.node.addChild(this.gameInstance)
    }

    loadProgressPrefab(isfromMenu : boolean){
        cc.log("more hehe")
        this.progressInstance = cc.instantiate(this.progressPrefab)
        this.progressInstance.getComponent(progressBar).setIsfromMenu(isfromMenu)
        this.node.addChild(this.progressInstance)
        this.gameInstance.destroy(); 
        this.lobbyInstance.destroy();
    }

    loadGamePrefab(){
        this.gameInstance = cc.instantiate(this.gamePrefab)
        this.node.addChild(this.gameInstance)
        this.progressInstance.destroy(); 
    }
    
    loadLobbyPrefab(){
        this.lobbyInstance = cc.instantiate(this.lobbyPrefab)
        this.node.addChild(this.lobbyInstance)
        this.progressInstance.destroy();   
    }

    exitGame(){
        cc.game.end();
        cc.log("Game ended ")
    }

    


}
