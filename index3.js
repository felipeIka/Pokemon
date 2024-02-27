const info = [document.querySelector(".info"),
            document.querySelector(".info2")];


const linhas = [
    document.querySelectorAll('.formD1 .barraHP .linha'),
    document.querySelectorAll('.formD1 .barraAtk .linha'),
    document.querySelectorAll('.formD1 .barraDef .linha'),
    document.querySelectorAll('.formD1 .barraSpAtk .linha'),
    document.querySelectorAll('.formD1 .barraSpDef .linha'),
    document.querySelectorAll('.formD1 .barraSpd .linha')
];

const p = [
    document.querySelectorAll('.info3 .nomeP'),
]

const c = [
    document.querySelectorAll('.info3 .nomeC'),
]

const c1 = [
    document.querySelectorAll('.info3 .nomeC1'),
]




const linhas2 =[
document.querySelectorAll('.formD2 .barraHP .linha'),
document.querySelectorAll('.formD2 .barraAtk .linha'),
document.querySelectorAll('.formD2 .barraDef .linha'),
document.querySelectorAll('.formD2 .barraSpAtk .linha'),
document.querySelectorAll('.formD2 .barraSpDef .linha'),
document.querySelectorAll('.formD2 .barraSpd .linha'),
];

let vetorValor = [];
let vetorAtributo = [];
let vetorValor2 = [];
let vetorValor3 = [];

async function fetchData(event){ // FUNCAO ASYNC PARA RETORNAR UMA PROMISE E USAR CERTOS METODOS

    try{
        event.preventDefault();
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const dados = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!dados.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await dados.json(); 
        console.log(data);
        displayPokemon(data,0);
        await getStatus(data);
        limparTodas(linhas);
        allGetColor(vetorValor, linhas);
        vetorValor2 = vetorValor.slice();
        vetorValor = [];
        
        
        
    }
    catch(error){
        
        console.error(error);
        const erro = document.createElement("p");
        erro.classList.add("nome");
        erro.textContent = "Erro, Pokemon inexistente";
        info[0].appendChild(erro);
        info[0].style.display = "flex";
    }
}
async function fetchData2(event){ // FUNCAO ASYNC PARA RETORNAR UMA PROMISE E USAR CERTOS METODOS

    try{
        event.preventDefault();
        const pokemonName = document.getElementById("pokemonName2").value.toLowerCase();
        const dados = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!dados.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await dados.json(); 
        console.log(data);
        displayPokemon(data,1);
        await getStatus(data);
        limparTodas(linhas2);
        allGetColor(vetorValor, linhas2);
        vetorValor3 = vetorValor.slice()
        vetorValor = [];

        
        
        
        
    }
    catch(error){    
        console.error(error);
        const erro = document.createElement("p");
        erro.classList.add("nome");
        erro.textContent = "ERRO PORRA";
        info.appendChild(erro);
        info.style.display = "flex";
    }
}

function displayPokemon(data, valor){
    info[valor].innerHTML = "";
    info[valor].style.display = "flex";


    
   

        const nome = data.name;
        const ida = data.id;
        const weight = data.weight;
        const height = data.height;
        const sprite = data.sprites.front_default;
        const img = data.sprites.other["official-artwork"].front_default;
        

        const infoNome = document.createElement("p");
        const infoId = document.createElement("p");
        const infoWeight = document.createElement("p");
        const infoHeight = document.createElement("p");
        const infoSprit = document.createElement("img");
        const btn1 = document.createElement("btn");
        const infoImg = document.createElement("img");

        

        infoNome.textContent = "Pokemon: " +  capFirstLetter(data.name);
        infoId.textContent = "ID: " + ida;
        infoWeight.textContent = "Peso: " + (weight/10).toFixed(1) + " Kg";
        infoHeight.textContent = "Altura:" + (0.1*height).toFixed(1) + " m";
        infoSprit.src = sprite;
        infoImg.src = img;
        btn1.textContent = "Show Stats";
       
        infoNome.classList.add("nome");
        infoId.classList.add("id");
        infoWeight.classList.add("peso");
        infoHeight.classList.add("altura");
        infoSprit.classList.add("img");
        infoImg.classList.add("imgs");  
        btn1.classList.add("btn");

        

        info[valor].appendChild(infoNome);
        info[valor].appendChild(infoId);
        info[valor].appendChild(infoWeight);
        info[valor].appendChild(infoHeight);
        info[valor].appendChild(infoSprit);
        info[valor].appendChild(btn1);
        
        

        btn1.style.marginLeft = "300PX" 


        if(valor === 0){
            btn1.onclick = show;
            btn1.id = "btn1";
            const titulo1 = document.getElementById("titulo1");
            titulo1.textContent = capFirstLetter(data.name);
            titulo1.appendChild(infoImg);
            
        }
        else if(valor === 1){
            btn1.onclick = show1;
            btn1.id = "btn2";
            const titulo2 = document.getElementById("titulo2");
            titulo2.textContent = capFirstLetter(data.name);
            titulo2.appendChild(infoImg);
        }
        

}

function capFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function getStatus(data) {
    return new Promise((resolve, reject) => {
        try {
            var status = data.stats;

            for (cc = 0; cc < status.length; cc++) {
                const { base_stat: valor, stat: { name: atributo } } = status[cc];

                vetorValor.push(valor);
                vetorAtributo.push(atributo);
            }

            resolve({ vetorValor, vetorAtributo }); 
        } catch (error) {
            reject(error); 
        }
    });
}

function pintar(cc, linhas) {
    linhas[cc].style.background = 'linear-gradient(45deg, purple, red)';
}

function getColor(valor, linhas) {
    const limites = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225];
    const linhasAPintar = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    for (let i = 0; i < limites.length; i++) {
        if (valor <= limites[i]) {
            for (let j = 0; j <= i; j++) {
                pintar(linhasAPintar[j], linhas);
            }
            break;
        }
    }
}

function allGetColor(valoresVetor, linhasVetor) {
    for (let i = 0; i < valoresVetor.length && i < linhasVetor.length; i++) {
        getColor(valoresVetor[i], linhasVetor[i]);
    }
}

function limpar(valores) {
    for (let cc = 0; cc < valores.length; cc++) {
        valores[cc].style.background = 'grey';
    }
}

function limparTodas(linhasVetor) {
    for (let cc = 0; cc < linhasVetor.length; cc++) {
        limpar(linhasVetor[cc]);
    }
}

function show() {
    const stats1 = document.querySelector(".formD1");
    const btn1 = document.getElementById("btn1");

    
    if (!stats1.classList.contains("show")) {
        stats1.classList.add("show");
        btn1.textContent = "Hide";
        
    }
    else{
        stats1.classList.remove("show");
        btn1.textContent = "Show Stats";
    }
}

function show1(){
    const stats2 = document.querySelector(".formD2");
    const btn2 = document.getElementById("btn2");

    
    if (!stats2.classList.contains("show")) {
        stats2.classList.add("show");
        btn2.textContent = "Hide";
        
    }
    else{
        stats2.classList.remove("show");
        btn2.textContent = "Show Stats";
    }
}

function compare(){

    var pk1 = 0;
    var pk2 = 0;
    const info3 = document.querySelector(".info3");
    


    if(vetorValor2.length === 0 || vetorValor3.length === 0){
        event.preventDefault();
        window.alert("Escolha pelo menos 2 Pokemons");
    } else{
    event.preventDefault();
    info3.style.display = "flex";

    for (cc = 0; cc < p[0].length; cc++){
        p[0][cc].textContent = vetorAtributo[cc].toUpperCase().replace("-", " ") + " " + vetorValor2[cc] +  " X " + vetorValor3[cc]
    }
   
   
    for (cc = 0; cc < vetorValor2.length; cc++){

        if(vetorValor2[cc] > vetorValor3[cc]){
            c[0][cc].textContent = "✅";
            c1[0][cc].textContent = "❌";
            pk1 = pk1 + 1;
        }
        else if(vetorValor2[cc] === vetorValor3[cc]){
            c1[0][cc].textContent = "⚖️";
            c[0][cc].textContent = "⚖️";
        } else{
            c1[0][cc].textContent = "✅";
            c[0][cc].textContent = "❌";
            pk2 = pk2 + 1;
        }
    }
    }
        if(info3.childNodes.length > 13){
            info3.removeChild(info3.lastChild);
        }
        const resultado = document.createElement("span");
        resultado.classList.add("nomeP");
        resultado.style.width = "550px";
        resultado.textContent = "O resultado foi: " + pk1 + " X " + pk2;
        console.log(info3.childNodes.length);
        info3.appendChild(resultado);
        
           
}   