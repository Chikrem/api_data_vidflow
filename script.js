const containerVideos = document.querySelector(".videos__container")

let videos = []
const busca = "https://gist.githubusercontent.com/Chikrem/01a65dff253b52e235306ab21f3e9733/raw/beac85fdfc9dcf010b24e543f9ab83416eb2a594/videos.json";

buscarEMostrarVideos();

async function buscarEMostrarVideos() {
    const res = await fetch(busca);
    const data = await res.json();
    videos = data.videos; // Access the videos property
    console.log(videos);

    try {
        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error('Vídeo não tem categoria');
            }

            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
        });
    } catch (error) {
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`;
    } finally {
        console.log('Tentativa de carregar vídeos finalizada.');
    }
}


// buscarEMostrarVideos();


const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

// function filtrarPesquisa(){
//     const videos = document.querySelectorAll(".videos__item"); // Seleciona objetos do tipo video

//     if(barraDePesquisa.value != ""){
//         for(let video of videos){
//             let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
//             let valorFiltro = barraDePesquisa.value.toLowerCase();

//             if(!titulo.includes(valorFiltro)){
//                 video.style.display = "none";
//             } else {
//                 video.style.display = "block";
//             }

//         }
//     }
// }

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();
  
    videos.forEach((video) => {
      const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
  
      video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
  }



  const botaoCategoria = document.querySelectorAll(".superior__item");

  botaoCategoria.forEach((botao) => {
      let nomeCategoria = botao.getAttribute("name");
      botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
  })
  

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    let valorFiltro = filtro.toLowerCase();
        
    videos.forEach((video) => {
        const titulo = video.querySelector(".categoria").textContent.toLowerCase();   
        video.style.display = valorFiltro ? !categoria.includes(valorFiltro) && valorFiltro != 'tudo' ? 'block' : 'none' : 'block';
    });
    
}