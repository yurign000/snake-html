var game = document.getElementById('Jogo')
var gameScreen = document.getElementsByTagName('canvas')[0]
var resolucao=[],posicao_da_tela
posicao_da_tela = window.screen.orientation.type

window.onload = Centralizar

setInterval(Centralizar,100)

function Centralizar(){
    gameScreen.style.left = 8+'px'
    gameScreen.style.top = 8+'px'
    resolucao = [window.screen.width,window.screen.height]
    if(posicao_da_tela == 'landscape-primary'){
        if(resolucao[0]==1366){
            game.style.left = window.innerWidth/2-450-4+'px'
            game.style.top = window.innerHeight/2-260-4+'px'
        }
        if(resolucao[0]>1366){
               game.style.zoom = '110%'
               game.style.left = window.innerWidth/2-(450*1.1)-4+'px'
               game.style.top = window.innerHeight/2-(260*1.1)-4+'px'
        }
    }
    if(posicao_da_tela == 'portrait-primary'){
        game.style.left = window.innerWidth/2-450-4+'px'
        game.style.top = window.innerHeight/2-260-4+'px'
        game.style.transform = 'rotate(90deg)'
    }
    else{
        game.style.left = window.innerWidth/2-450-4+'px'
        game.style.top = window.innerHeight/2-260-4+'px'
        game.style.transform = 'rotate(0deg)'
    }
}