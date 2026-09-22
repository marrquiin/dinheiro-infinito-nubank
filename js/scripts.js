// =========================================================
// 1) LISTA DE FOTOS DO SLIDESHOW
//    -> Troque os nomes abaixo pelos arquivos reais que você
//       vai colocar dentro da pasta "fotos/".
//    -> Pode ter quantas fotos quiser, só ir adicionando na lista.
// =========================================================
const fotos = [
    'img/foto1.jpg',
    'img/foto2.jpg',
    //'img/foto3.jpg',
    'img/foto4.jpg',
    'img/foto5.png'
];

const slideshow = document.getElementById('slideshow');

// cria uma div de slide pra cada foto
fotos.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'slide';
    div.style.backgroundImage = `url('${src}')`;
    if (i === 0) div.classList.add('ativo');
    slideshow.appendChild(div);
});

const slides = document.querySelectorAll('.slide');
let atual = 0;

function proximoSlide() {
    slides[atual].classList.remove('ativo');
    atual = (atual + 1) % slides.length;
    slides[atual].classList.add('ativo');
}

// troca de foto a cada 3.5 segundos
setInterval(proximoSlide, 3500);

// =========================================================
// 2) FRASES DE ZOEIRA ROTATIVAS (opcional)
//    -> Edite ou adicione quantas frases quiser.
// =========================================================
const frases = [
    "Estava com tempo e queria ver se ainda sei programar, então fiz esse insulto pra você. Ms um ano de vida e você ainda não aprendeu a SER UMA PESSOA PRESENTE... melhore!",
    "Fé que você vai trabalhar no atacadão do Cordeiro! 🙏🙏🙏",
    "Você é a mocreia mais legal que já conheci, obrigado!",
    "Parabéns! DIVONICA! MONA! BABILONICA! 🥳",
    "Pensa num cabra que tem tempo livre pra fazer essa merda toda!",
    "Se ganhar na loteria, não esquece de mim, hein!",
    "Já agradeceu por me ter como amigo?",
    "Políticas publicas trabalha com o que?",
    "Nem te convido para comemorar, porque sei que você não vai!",
    "Aparentemente ainda sei programar!",
    "Não tenho mais insultos, tenha um dia abençoado",
    "Ainda sinto falta da Camila",
];

let fraseAtual = 0;
const elFrase = document.getElementById('frase-zoeira');

setInterval(() => {
    fraseAtual = (fraseAtual + 1) % frases.length;
    elFrase.style.opacity = 0;
    setTimeout(() => {
        elFrase.textContent = frases[fraseAtual];
        elFrase.style.opacity = 1;
    }, 400);
}, 5000);
elFrase.style.transition = 'opacity 0.4s ease';

// =========================================================
// 3) TELA DE ENTRADA -> LIBERA O SITE E A MÚSICA
//    (os navegadores bloqueiam áudio automático, por isso
//    o clique é necessário)
// =========================================================
const telaEntrada = document.getElementById('tela-entrada');
const site = document.getElementById('site');
const musica = document.getElementById('musica-fundo');
const btnEntrar = document.getElementById('btn-entrar');
const btnMusica = document.getElementById('btn-musica');

btnEntrar.addEventListener('click', () => {
    telaEntrada.style.display = 'none';
    site.style.display = 'block';
    musica.volume = 0.7;
    musica.play().catch(() => {
        // se o navegador ainda bloquear, o botão de música manual resolve
        console.log('Autoplay bloqueado, use o botão de música.');
    });
    iniciarConfete();
});

btnMusica.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        btnMusica.textContent = '🔊';
    } else {
        musica.pause();
        btnMusica.textContent = '🔇';
    }
});

// =========================================================
// 4) CONFETE CAINDO (efeito bem "zoeira de festa")
// =========================================================
const canvas = document.getElementById('canvas-confete');
const ctx = canvas.getContext('2d');
let confetes = [];

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

const coresConfete = ['#ff2fb0', '#f5ff2e', '#29e0ff', '#7b2ff7', '#ffffff', '#000000'];

function criarConfetes(qtd) {
    for (let i = 0; i < qtd; i++) {
        confetes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            tamanho: Math.random() * 8 + 4,
            cor: coresConfete[Math.floor(Math.random() * coresConfete.length)],
            velY: Math.random() * 2 + 1,
            velX: Math.random() * 2 - 1,
            rotacao: Math.random() * 360,
            velRot: Math.random() * 4 - 2
        });
    }
}

function animarConfete() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetes.forEach(c => {
        c.y += c.velY;
        c.x += c.velX;
        c.rotacao += c.velRot;

        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotacao * Math.PI) / 180);
        ctx.fillStyle = c.cor;
        ctx.fillRect(-c.tamanho / 2, -c.tamanho / 2, c.tamanho, c.tamanho * 0.6);
        ctx.restore();
    });
    requestAnimationFrame(animarConfete);
}

function iniciarConfete() {
    criarConfetes(120);
    animarConfete();
}
