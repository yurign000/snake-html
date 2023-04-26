var gameScreen = document.getElementsByTagName('canvas')[0] //Tela jogável
gameScreen.width = 500, gameScreen.height = 500 //Resolução da tela
var jogar = false

//Definir elementos e texturas
var player = gameScreen.getContext('2d')
var onixSprite = new Image(); onixSprite.src = 'Sprite.png'
var appleSprite = new Image(); appleSprite.src = 'Apple.png'
var appleX=appleY=0
var x=40,y=0

//Variáveis para movimentos da cobra
var runRight=runLeft=runTop=runBottom=false
var speed = 20;
var canMove = true

var generateNewApple = true

//DESENHAR SNAKE ÍNICIAL
onixSprite.onload = function(){
    UpdateSnake(40,0)
    UpdateSnake(20,0)
    UpdateSnake(0,0)
}
var playerSize = [[x,y],[x-20,y],[x-40,y]]
generateApple()

function MoveButtons(buttonPressed){
    if(canMove==true && buttonPressed=='right' && runLeft==false){
        runRight=true;runLeft=runTop=runBottom=canMove=false
    }
    else if(canMove==true && buttonPressed=='left' && runRight==false){
        runLeft=true;runRight=runTop=runBottom=canMove=false
    }
    else if(canMove==true && buttonPressed=='bottom' && runTop==false){
        runBottom=true;runLeft=runRight=runTop=canMove=false
    }
    else if(canMove==true && buttonPressed=='top' && runBottom==false){
        runTop=true;runLeft=runRight=runBottom=canMove=false
    }
}

function StartGame(){
    jogar=true
    runRight=true
    canMove=false
    document.getElementById('Start').onclick = false
    document.getElementById('Start').parentNode.removeChild(document.getElementById('Start'))
}

//FPS
setInterval(function(){

    if(jogar==false){return}

    //Verificar se uma nova maça deve ser gerada
    if(generateNewApple == true){generateApple()}

    //Verificar tecla pressionada
    window.onkeydown = function(keyPressed){
        if(canMove==true && (keyPressed.key=='d' || keyPressed=='D') && runLeft==false){
            runRight=true;runLeft=runTop=runBottom=canMove=false
        }
        else if(canMove==true && (keyPressed.key=='a' || keyPressed=='A') && runRight==false){
            runLeft=true;runRight=runTop=runBottom=canMove=false
        }
        else if(canMove==true && (keyPressed.key=='s' || keyPressed=='S') && runTop==false){
            runBottom=true;runLeft=runRight=runTop=canMove=false
        }
        else if(canMove==true && (keyPressed.key=='w' || keyPressed=='W') && runBottom==false){
            runTop=true;runLeft=runRight=runBottom=canMove=false
        }
    }

    //Verificar direção de movimento
    switch(true){
        case runRight: MoveOnix(speed,0);break
        case runLeft: MoveOnix(-speed,0);break
        case runBottom: MoveOnix(0,speed);break
        case runTop: MoveOnix(0,-speed)
    }
    
},100)

//DESENHAR PERSONAGEM
function UpdateSnake(x,y){
    player.beginPath()
    player.drawImage(onixSprite,x,y,20,20)
}

//AUMENTAR TAMANHO DO PERSONAGEM
function EatApple(){
    if(x==appleX && y==appleY){
        generateNewApple = true
        playerSize[playerSize.length] = [appleX,appleY]
    }
}

//GERAR NOVA MAÇA
function generateApple(){
    let canPutApple = false
    generateNewApple = false
    //Loop até encontrar uma posição vazia para colocar a maçã
    while(canPutApple == false){
        appleX = Math.round(Math.random()*480), appleX -= appleX%20
        appleY = Math.round(Math.random()*480), appleY -= appleY%20
        for(var i = 0; i<playerSize.length;i++){
            //Verificar se na posição gerada já possui uma parte da cobra
            if(playerSize[i][0]==appleX && playerSize[i][1]==appleY){break}

            //Caso a posição gerada não seja igual a posição de nenhuma parte da cobra, sair do loop
            else if(i+1==playerSize.length){canPutApple=true}
        }
    }
    //Desenhar nova maça na tela
    player.beginPath()
    appleSprite.onload = function(){
        player.drawImage(appleSprite,appleX,appleY,20,20)
    }
    player.drawImage(appleSprite,appleX,appleY,20,20)
}

//MOVER PERSONAGEM
function MoveOnix(x,y){

    //Apagar ultima parte da cobra a cada movimento
    player.clearRect(playerSize[playerSize.length-1][0],playerSize[playerSize.length-1][1],20,20)

    this.x+=x //Mover na horizontal
    this.y+=y //Mover na vertical 

    //Verificar se chegou ao limite da tela
    switch(this.y){
        case 500:this.y=0;break
        case -20:this.y=480
    }
    switch(this.x){
        case 500:this.x=0;break
        case -20:this.x=480
    }

    //Mover a posição de todas as partes da cobra para a posição da parte seguinte
    for(var i = playerSize.length-1;i>0;i--){
        playerSize[i] = playerSize[i-1]
    }
    //Mover a cabeça da cobra
    playerSize[0] = [this.x,this.y]

    /** */

    //Desenhar nova posição do player
    for(var i = 0; i<playerSize.length;i++){
        UpdateSnake(playerSize[i][0],playerSize[i][1])
    }

    //Derrota
    for(var i = 1; i<playerSize.length;i++){
        if(playerSize[0][0]==playerSize[i][0] && playerSize[0][1]==playerSize[i][1]){
            console.log(playerSize[i][0]+'-'+playerSize[i][1])
            GameOver(0)}
    }
    
    //Verificar se comeu a maça
    EatApple()

    //Vitória
    if(playerSize.length==576){GameOver(1)}

    canMove=true    
}

function GameOver(resultado){
    if(resultado == 0){window.location.reload()}//Derrota, nada feito ainda
    if(resultado == 1){window.location.reload()}//Vitória, nada feito ainda
}