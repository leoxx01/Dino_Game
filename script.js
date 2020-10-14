const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const points = document.querySelector('span')

let isJumping = false;
let isGameOver = false;
let position = 0;
let score = 0 ;

const  handleKeyUp = (event) => {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

const  jump = () => {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

const  createCactus = () =>  {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;
  

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
        score += 1
        points.textContent = score
        
           
        
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = `<div id="center"><h1 class="game-over">Fim de jogo</h1><br><h2 class="game-over">Seu Recorde foi de ${score} ponto</h2><br><button class="newGame" onclick="newGame()">Jogar novamente</button><div>`
      window.open('https://www.youtube.com/watch?v=AB0b0qBNnGw', '_blank');
      
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

const newGame = () =>{
    window.location.href = "./index.html";
    console.log("que")
}

createCactus();

document.addEventListener('keyup', handleKeyUp);