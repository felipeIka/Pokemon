const info = [document.querySelector(".info"),
            document.querySelector(".info2")];
// this array will storage my divs info for create new elements e display some informations
const linhas = [
    document.querySelectorAll('.formD1 .barraHP .linha'),
    document.querySelectorAll('.formD1 .barraAtk .linha'),
    document.querySelectorAll('.formD1 .barraDef .linha'),
    document.querySelectorAll('.formD1 .barraSpAtk .linha'),
    document.querySelectorAll('.formD1 .barraSpDef .linha'),
    document.querySelectorAll('.formD1 .barraSpd .linha')
];
const linhas2 =[
    document.querySelectorAll('.formD2 .barraHP .linha'),
    document.querySelectorAll('.formD2 .barraAtk .linha'),
    document.querySelectorAll('.formD2 .barraDef .linha'),
    document.querySelectorAll('.formD2 .barraSpAtk .linha'),
    document.querySelectorAll('.formD2 .barraSpDef .linha'),
    document.querySelectorAll('.formD2 .barraSpd .linha'),
];
// Strorage all lines for non ordered list, for will paint to show the pokemon status

let vetorValor = []; // Array for storage the value of hp,attack,def etc for each pokemon
let vetorAtributo = []; // Array for storage the name of each atributte, for example hp attack etc
let vetorValor2 = []; // this array is used in the middle of one especific function for save the
// valeus of vetorValor before this becomes 0 again. Basically this array storage the value 
// of last pokemon choosed in the form of right side
let vetorValor3 = [];// this array is used in the middle of one especific function for save the
// valeus of vetorValor before this becomes 0 again. Basically this array storage the value 
// of last pokemon choosed in the form of left side
// With those array we can compare the lasts pokemons chosed
const p = [
    document.querySelectorAll('.info3 .nomeP'),
] // array "P", that contains all html "span" elements called "p"
// the only index represent six "span" elements
const c = [
    document.querySelectorAll('.info3 .nomeC'),
]
// array "C", that contains all html "span" elements called "c"
// the only index represent six "span" elements
// the Cs array represent the stats of win or lose of specific attribute compared
// this is used in the final function to change html text content, using the emojis to represent 
// the result. This represents span elements from left side
// Array "C1" is the same but on the right side. 
const c1 = [
    document.querySelectorAll('.info3 .nomeC1'),
]
// The "P", "C1" "C" will be used in "compare" function
async function fetchData(event){ // function assync for catch the data of pokemons

    try{
        event.preventDefault(); // prevents the web page from updating
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        // here we create the Pokemonname that will catch the name typped in textbox "pokemonName",
        // after the string will become lowercase to be pass to external URL
        const dados = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        // Here const dados storage the intere informations provides be the Api with url
        // thw await is used for expect catch all necessary informations 
        // the const pokemon name is passed for url with ${} to be searched
        if(!dados.ok){
            throw new Error("Could not fetch resource");
        } // This is a conditional verification to check if the data is storage sucesseful 
       
        const data = await dados.json(); // here is a important step from data transformations 
        // for json files to be read and extract especific informations
        
        console.log(data); // only to show all objects, functions in the json file

        displayPokemon(data,0); // function Called and passed two parameters 
        // data is json file with all informations and 0 for the acess for the
        // array of "INFO" that have 2 index, 0 and 1
        // THis function will show the pokemon infos Name, id, weight, sprite 

        await getStatus(data); // The await is used because the getStatus return a promise
        // and for to avoid possible erros, wait is necessary due the next functions calls
        // getStatus basically fill the "vetorValor" and "VetorAtributo" with informations 
        // about attack, hp speed etc and your values. In this function is used the destructured of 
        // objects of data

        limparTodas(linhas); // this function basically is a function to clean the visual effects
        // of each bar filled of the graphic with the pokemon status 
        // the parameter passsed is the array "Linhas", that contains six arrays, represents
        // hp, attack, speed etc

        allGetColor(vetorValor, linhas);
        // this function used two parameters, "vetorValor" who is the value of each atribute 
        // that is one array with 6 positions, and the "linhas" is array with 6 position filled
        // by one array with 15 positions, who represetns each line to be painted

        vetorValor2 = vetorValor.slice(); // this is the step commented before, to storage
        // the values of vetorValor for future comparison with other pokemon
        
        vetorValor = []; // this resets the array for future interaction     
    }
    catch(error){
        console.error(error);
        const erro = document.createElement("p");
        erro.classList.add("nome");
        erro.textContent = "Erro, Pokemon inexistente";
        info[0].appendChild(erro);
        info[0].style.display = "flex";
        // basically create a P for show error in the div where was it to show the pokemon status
        // the main possible error is not catch the data in the correct way
        // info[0] is the first array that represent the right side display
    }
}
async function fetchData2(event){ // does the same as the other function does, changing the side of 
    // screen e passed the "infoarray" diferent 

    try{
        event.preventDefault();
        const pokemonName = document.getElementById("pokemonName2").value.toLowerCase();
        const dados = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!dados.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await dados.json(); 
        console.log(data);
        displayPokemon(data,1); // array of "INFO" that have 2 index, 0 and 1
        await getStatus(data);
        limparTodas(linhas2);
        allGetColor(vetorValor, linhas2);
        vetorValor3 = vetorValor.slice() // this is the step commented before, to storage
        // the values of vetorValor for future comparison with other pokemon
        // now is possible to compare pokemon vs pokemon
        vetorValor = [];
    }
    catch(error){    
        console.error(error);
        const erro = document.createElement("p");
        erro.classList.add("nome");
        erro.textContent = "Erro, Pokemon inexistente";
        info[1].appendChild(erro);
        info[1].style.display = "flex";
    }
}

function displayPokemon(data, valor){ // This function is called in the FetchData functions
    // the parameters passed is "data" (that is the json file) and "valor" (that is the number of 
    // "info array, left or right side of screen, 0 and 1")
    // "info" is the Div empty, that is will manipulated for create new Paragraphs to show especific
    // informations
    info[valor].innerHTML = "";
    // this cleans the div 
    info[valor].style.display = "flex";
    // this show the div changing the style display none to flex

        const nome = data.name;
        const ida = data.id;
        const weight = data.weight;
        const height = data.height;
        const sprite = data.sprites.front_default;
        const img = data.sprites.other["official-artwork"].front_default;
        // This is a step for variable creation 
        // here the parameter "DATA", that is json file, is possible to acess all methods, objects and
        // atributes 
        // here is created name, id, weight, height, sprite and one img file


        const infoNome = document.createElement("p");
        const infoId = document.createElement("p");
        const infoWeight = document.createElement("p");
        const infoHeight = document.createElement("p");
        const infoSprit = document.createElement("img");
        const btn1 = document.createElement("btn");
        const infoImg = document.createElement("img");
        // In this step is created all visual elements for the div "info", all Paragraphs and
        // one button to show the graphs in the screen and the img for the pokemon chosed

        

        infoNome.textContent = "Pokemon: " +  capFirstLetter(data.name);
        infoId.textContent = "ID: " + ida;
        infoWeight.textContent = "Peso: " + (weight/10).toFixed(1) + " Kg";
        infoHeight.textContent = "Altura:" + (0.1*height).toFixed(1) + " m";
        infoSprit.src = sprite;
        infoImg.src = img;
        btn1.textContent = "Show Stats";
       // Here is changed all text content of my new visual elements 
       // the text, the formatting and src for images 
       // the text content they come from the first step when are created the variables
       // with especific datas

        infoNome.classList.add("nome");
        infoId.classList.add("id");
        infoWeight.classList.add("peso");
        infoHeight.classList.add("altura");
        infoSprit.classList.add("img");
        infoImg.classList.add("imgs");  
        btn1.classList.add("btn");
        // here the elements receveid the css class with formatting and other visual effects

        

        info[valor].appendChild(infoNome);
        info[valor].appendChild(infoId);
        info[valor].appendChild(infoWeight);
        info[valor].appendChild(infoHeight);
        info[valor].appendChild(infoSprit);
        info[valor].appendChild(btn1);
        // in this step basicaly the elements will be seted in the Div info[], according 
        // to the past value with "valor" , 0 for left , 1 for right side
        
        btn1.style.marginLeft = "300PX" 
        // small alteration to display the button in right side of the div


        
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
        // the last pass is check if the value is 0(left side), 1(rightsided)
        // the button is receive the "show" function
        // the id becomes btn1 that is used for one specific step in "show" function LINE 325
        // the const "titulo" is the visual element of graphs div where is show the
        // name of pokemon and will append the IMG of.

}
function getStatus(data) { // this function is fill the "vetorValor" and "vetorAtributo" with
// data of attack, hp, speed and your values
// the return with promise is used for avoid erros in assyn function
// the paramaters is data, that is the json file with all informations 
    return new Promise((resolve, reject) => { // try and catch methods
        try {
            var status = data.stats; // he is created a new variable that stores one big array 
            // of informations, and for acess especific that i need, is used the destructered method

            for (cc = 0; cc < status.length; cc++) {
                const { base_stat: valor, stat: { name: atributo } } = status[cc];
                // Here is used the destructered method. to acesss the "base_stat", that is 
                // array that contains six values, each one for especific atribute, hp, speed atk etc
                // the values of is storage in "valor" variable
                // still on this object exists the object "stats", that contains the "name" of each
                // atribute. That will be storage in variable "atributo".
                // All this process is made in for loop, to acess each atribute of status 
                // the first is 50 value and HP atribute and so on.

                vetorValor.push(valor); 
                vetorAtributo.push(atributo);
                // in the final of each loop the values is storage in this arrays
                //VetorValor and VetorAtributo, that is will used in the other functions
            }
            resolve({ vetorValor, vetorAtributo }); // return my arrays filled by new datas
        } catch (error) {
            reject(error); 
        }
    });
}
function pintar(cc, linhas) { // now exists 3 functions related to graphic visual effects to be painted
    linhas[cc].style.background = 'linear-gradient(45deg, purple, red)';
    // this first function acepts two parameters. "cc" that is a counter, and the "linhas" is the 
    // array with lines, that contains 15 lines each one. that function is used in a loop of 
    // getColor Function
}

function getColor(valor, linhas) { // This function receives two paramets "valor" that represents
// the value of one especific atribute, like Speed 50, and depends on the value of this atribute
// the line of graphs will be painted
// Already the value "linhas" represents the one especific index of my global vector "linhasVetor", that
// contains six index of each represents 15 lines of especific atribute of my graph, like HP 15 lines.
// Ps: the lines is the html element used to create visual effect
// this values is passed by my function allGetColor

    const limites = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225];
    // Here is defined the array of values with difference of 15 of each one
    // if the value is 15, one line is painted
    // if 30 two line painted and so goes on
    const linhasAPintar = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    // here this array represents the linhe that will be painted
    // is used 14 to zero, because the line above are 0 and the bottom line is 14
    // and the graph is painted for bottom-up

    for (let i = 0; i < limites.length; i++) { // here is created a loop to paint the lines
        if (valor <= limites[i]) { // if the value passed is less than first index of 
    // my "limites" arrys, that is 15 in this case, the for loop will be done
            for (let j = 0; j <= i; j++) { // in this loop is called the "pintar" function and 
            // the parameters passed is "linhasAPintar[j]", in the first case is 14, second 13 and it goes on
            // this is my counter of "pintar" function represented by "cc"
            // "linhas" is the same passed in the start of getColor functions, that contains one index 
            // of my array "linhasVetor", but in this case this one index contains 15lines
            // if the value is 150 the loop will be done 10 times and called the function "pintar" 10x
                pintar(linhasAPintar[j], linhas);
            }
            break;
        }
    }
}

function allGetColor(valoresVetor, linhasVetor) { // this is function that calls the function GetColor
// here is passed the array "valoresVetor" that contains six positions of each atribute 
// [50,60,40,30,40,40], and "linhasVetor" that contains six index filled each one by one array
// with 15lines
// here the for loop is used to acesss to pass the value of "valoresVeotor[0]"
// and "linhasvetor[0]", that is the first array with 15 lines to my function
// getColor
// in this away i can painted my six coluns of lines of each atribute to create my visual graphs
    for (let i = 0; i < valoresVetor.length && i < linhasVetor.length; i++) {
        getColor(valoresVetor[i], linhasVetor[i]);
    } // the .length of the two arrays are 6, because that the conidtion is true
}

function limpar(valores) { // this function take each line of a array and
    // change the color to make visual effect, remove all colors for lines. 
    // in this casa exist 15lines in the index[0] of linhas vetor, passed in the function
    // "limpartodas"
    for (let cc = 0; cc < valores.length; cc++) {
        valores[cc].style.background = 'grey';
    }
}

function limparTodas(linhasVetor) { // this function call the function "limpar" in loop 
// the "linhasVetor" is the parameter, that contains my global lines array, with six index, 
// and each one contains 15 lines 
    for (let cc = 0; cc < linhasVetor.length; cc++) {
        limpar(linhasVetor[cc]);
    }
    // with this for loop the passed the index[0] of linhas vetor, that contains 15 lines
    // to the function pintar and it goes on in loop 
    // the parameter"linhsvetor[cc]" is the parameters "vetor"
}

function show() { // This function is called in the end of the function "displayPokemon"
    // basically this is called to atribute this function to the button created "btn1"

    const stats1 = document.querySelector(".formD1");  
    // Acess the formD1 element to add or remove class to make animation of css effects
    const btn1 = document.getElementById("btn1");
    // here i creat the button to change your class and your functions
    // this is the moment when the definition of ID in previous comment occurs, to acess
    // in the left or right side. LINE 209 "DISPLAYPOKEMON"
    
    if (!stats1.classList.contains("show")) {
        // if the formD1 have not the class show, that is the class
        // with visual effects of transition, this class will be added to 
        stats1.classList.add("show");
        btn1.textContent = "Hide";
        // when the class is added, the formD1 will make a transition and show
        // the graphs with status of each atribute
        // the button will change the content from "showStats" to "hide"
        
    }
    else{
        stats1.classList.remove("show");
        btn1.textContent = "Show Stats";
        // in this casa is for hide de graphs 
        //With this the "show" class is removed and the textcontent change
    }
}
function show1(){ // this function make the same in the right side
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
    // The main difference is the id of the button, in this case btn2, because is right side of screen
}
function compare(){
    // this function is the button action below the screen
    var pk1 = 0; // this variable storage the score of atributes won for the pokemon of left side
    var pk2 = 0; // this variable storage the score of atributes won for the pokemon of right Side
    const info3 = document.querySelector(".info3");
    // this is the const to acess my info3 div in html, to manipulate and change the 
    // html effects and css properties
    


    if(vetorValor2.length === 0 || vetorValor3.length === 0){
        event.preventDefault();
        window.alert("Escolha pelo menos 2 Pokemons");
    // This function check if the my arrays of "vetorValor2 or 3" are null
    // this means that no one pokemon was chosed, and for this, is impossible to show a comparison
    // display alert with message error
    } else{
    event.preventDefault();
    info3.style.display = "flex";
    // the first step is change the css property, from none to flex, to show the 
    // div and your paragraphs show the status compared

    for (cc = 0; cc < p[0].length; cc++){
        p[0][cc].textContent = vetorAtributo[cc].toUpperCase().replace("-", " ") + " " + vetorValor2[cc] +  " X " + vetorValor3[cc]
    // here change the textcontent to; that string storage in the "vetorAtributo", that contains hp, speed, etc
    // use the uppercase all string and replace the "-" for a blank space
    // and the value storage in the vetorValor2 or 3[cc], that contains for example 50
    // this means the pokemon of left side, hp is 50 
    // and this compare with the vetorValor3(pokemon of right side);
    }
    // basically acesse the array "P", that contains all html "span" elements called "p"
    // each one is the paragraf that will receive a text comparasion like that: (power 50 x 60)
    // that array contains only one index, but this index contains Six elements
    // Because is used p[0][cc], to acesss the elements
   
   
    for (cc = 0; cc < vetorValor2.length; cc++){
    // this is function is used for change the content of "elements" before and after the 
    // span element that contains the text comparison, like this: Y Power 50 x 50 Y
    // in this function the "Y"s will be changed according to the result
    // if the left pokemon has the powerfull stats in comparison
    // the left "Y" will changed to a emote to represent a win
    // if the right pokemon has the powerfull stats in comparison
    // the right "Y" will changed to a emote to represent a win
    // On the other hand the pokemon with lower stat will receive a emote that 
    // represent a lose
    // In draw case both gains the same emoji
        if(vetorValor2[cc] > vetorValor3[cc]){
            c[0][cc].textContent = "✅"; // C[0] represent the left "y"
            c1[0][cc].textContent = "❌"; //c1[0] represent the right "y"
            pk1 = pk1 + 1;
    // the acess in this array is the same with "P" array
    // array with one index, but in this, has 6 positions
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
    // PK1 E PK2 are both the score of atributes won by each pokemon
    // this is used in the final paragraph to show the result of the match
    // PS: every time this function is called the values become 0 to a new comparison
    }


    // this last function is for avoid the infinity additional paragraphs

        if(info3.childNodes.length > 13){
            info3.removeChild(info3.lastChild);
        }// the div info3 has 12 chillNodes (elementslist)
        // the 13 child is the paragraphs with the result comparison
        // the text is "The result is 4atributes won x 2atributes won"
        // if exists 14 remove the last

        // here is created a new "span" element that represents the final
        //message of the comparison 
        const resultado = document.createElement("span");
        resultado.classList.add("nomeP"); // add css class
        resultado.style.width = "550px"; // change the width for fill the div
        resultado.textContent = "O resultado foi: " + pk1 + " X " + pk2;
        // here is used the pk1 and pk2 variable to show the attributes won 
        // by each pokemon
        info3.appendChild(resultado); // this append the new element "span" to the info3 div
         
}   
function capFirstLetter(string){ // TO uppercase the first letter of String
    return string.charAt(0).toUpperCase() + string.slice(1);
}
