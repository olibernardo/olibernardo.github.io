let baseFinal = 0;
let espelhado =  ""; //depois de passar pela função fica na ordem certa
let convertido = ""; 
let letradoHEXA = "ABCDEF"; //letra que vai ser selecionada como algarismo (quando base>10)

function filtro (event,base) //filtrar coisas que podem dar erro na conversão
{
  let tecla = event.which || event.keycode;
  let algarismoMaximo;
  
  switch(base) //A partir da base, define o maior número que pode ser escrito nos campos
  {
    case 2:
      algarismoMaximo = 1;
      break;
    
    case 8:
      algarismoMaximo = 7;
      break;
      
    default: //Caso nenhuma das opções de case entre, usa esse
      algarismoMaximo = 9;
      break;
  }
  if ((tecla < 48 || tecla > (48+algarismoMaximo)) && (tecla < 96 || tecla > (96+algarismoMaximo)) && (tecla < 37 || tecla > 40) && tecla != 8 && tecla != 9 && tecla != 46)
  {
    if(base != 16 || (tecla < 65 || tecla > 70))
      return false;
  }
}

function gerenciadora (baseOrigem,campo) //função que vai chamar as outras
{
  //alert("ENTROU PORRAAAAAAAAAAAA AAHHH OOOOHHH HOOHOHOHOOOHOHOHOHOHOHOHOHOODJBDKNFJNS395325Ç.SD.~Ç");
  campo.value = campo.value.toUpperCase();
  let valorOrigem = campo.value;
  baseOrigem = parseInt(baseOrigem);
  if (valorOrigem === "" || valorOrigem === undefined) 
  {
    base2.value = "";
    base8.value = "";
    base10.value = "";
    base16.value = "";
  }
  else
  {
    switch (baseOrigem)
    {
      case 2:
        baseFinal=10;
        passarpDecimal(valorOrigem, baseOrigem);
        baseFinal=8;
        passarpDecimal(valorOrigem, baseOrigem);
        baseFinal=16;
        passarpDecimal(valorOrigem, baseOrigem);
        break;
      case 8: 
          baseFinal=10;
        passarpDecimal(valorOrigem, baseOrigem);
        baseFinal=2;
        passarpDecimal(valorOrigem, baseOrigem);
        baseFinal=16;
        passarpDecimal(valorOrigem, baseOrigem);
        break;
      case 10:
        baseFinal=2;
        decimalpraoutra(valorOrigem, baseOrigem);
        baseFinal=8;
        decimalpraoutra(valorOrigem, baseOrigem);
        baseFinal=16;
        decimalpraoutra(valorOrigem, baseOrigem);
        break;
      case 16:
        baseFinal=10;
        passarpDecimal(valorOrigem, baseOrigem);
        baseFinal=8;
        passarpDecimal(valorOrigem, baseOrigem);
        baseFinal=2;
        passarpDecimal(valorOrigem, baseOrigem);
        break;
    }
  }
}

function passarpDecimal(numeroInicial, baseOrigem) //PASSA PRA DECIMAL
  {
    let numeroDecimal = 0; //vai armazenar o número decimal 
    numeroInicial = String(numeroInicial); //tranforma em string pra trabalhar com cada algarismo
    let tamanho = numeroInicial.length; //pega o tamanho pra usar como referência pra limitar o for e pegar o índice
    
    for (let i = (tamanho-1); i>=0; i--) //então né... 
      {
        let quebra = numeroInicial[i];
        if (isNaN(quebra))
          {
            quebra = quebra.toUpperCase();
            quebra = letradoHEXA.split(quebra);
            quebra = parseInt(quebra[0].length) + 10;
          }
        numeroDecimal += quebra*(baseOrigem**((tamanho-1)-i)); //não sei que entidade entrou no meu corpo no momento, mas funciona.   
      }
    if (baseFinal == 10)
      {
        let campoResultado = document.getElementById("base" + baseFinal);
        campoResultado.value = numeroDecimal;
      }
         else 
        {
          decimalpraoutra(numeroDecimal); //manda pro outro bloco caso a base final seja diferente de 10
        }
  }
    
    function decimalpraoutra(numeroIn) 
    {
      numeroOrigem = parseInt(numeroIn)//recebe como número pra poder executar as divisões
      //REINICIALIZAÇÃO DE VARIÁVEIS RESULTADO
      convertido = "";
      espelhado = "";
      
      
      while (numeroOrigem/baseFinal !== 0) //conversão
        { 
         let algarismo = numeroOrigem%baseFinal;
      		if (algarismo > 9) //substituir algaarismos caso seja hexadecimal 
      		  { 
      		    algarismo = letradoHEXA[algarismo - 10]; //escolhe qual o elemento da string vai ser pego 
      		  }
      		  
      		convertido += String(algarismo); //transforma em string pra poder só ir adicionando os restos das divisões
      		numeroOrigem = numeroOrigem/baseFinal; //atualiza o número
      		numeroOrigem = parseInt(numeroOrigem); //tranforma em número de novo pra poder dividir 
      	}
      
      
      espelho(convertido);
      let campoResultado = document.getElementById("base" + baseFinal);
      campoResultado.value = espelhado;
    }
  
  	function espelho(num) //espelhar
  		{
  			num = String(num) //transforma em string pra poder ir adicinando os algarismos
  			let tamanho = num.length; //pega o tamanho do string
  			for (let i = (tamanho-1); i >= 0 ; i--) //for regressivo pra usando o tamanho do string 
  				{
  					espelhado += num[i]; //usa o i pra atualiza a posição do elemento que vai ser invertido
  				}
      }
