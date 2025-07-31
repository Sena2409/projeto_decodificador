function criptografarTexto(texto) {
  const mapaVogais = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
  };
  
  let textoCriptografado = "";

  for (let letra of texto.toLowerCase()) {
    if (mapaVogais.hasOwnProperty(letra)) {
      textoCriptografado += mapaVogais[letra];
    } else {
      textoCriptografado += letra;
    }
  }

  return textoCriptografado;
}

function descriptografarTexto(textoCriptografado) {

  const mapaReverso = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
  };

  const chaves = Object.keys(mapaReverso).sort((a, b) => b.length - a.length);

  let textoDescriptografado = textoCriptografado;

  for (let codigo of chaves) {
    const vogal = mapaReverso[codigo];
    const regex = new RegExp(codigo, 'g');
    textoDescriptografado = textoDescriptografado.replace(regex, vogal);
  }

  return textoDescriptografado;
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function esconder(el){
    document.getElementById(el).style.display = "none";
}

function mostrar(el){
    document.getElementById(el).style.display = "block";
}

const botao_criptografar = document.querySelector("#criptografar");
botao_criptografar.addEventListener("click", function(e) {
    e.preventDefault();
    const inputElement = document.querySelector("#texto-original");
    const value = inputElement.value;
    const textoCriptografado = criptografarTexto(value);
    exibirTextoNaTela('#resultado', textoCriptografado);
    mostrar('btn_copiar');
    mostrar('resultado');
    inputElement.value = "";
});

const botao_descriptografar = document.querySelector("#descriptografar");
botao_descriptografar.addEventListener("click", function(e) {
    e.preventDefault();
    const inputElement = document.querySelector("#texto-original");
    const value = inputElement.value;
    const textoDescriptografado = descriptografarTexto(value);
    exibirTextoNaTela('#resultado', textoDescriptografado);
    mostrar('btn_copiar');
    mostrar('resultado');
    inputElement.value = "";
});

document.getElementById('btn_copiar').addEventListener('click', clipboardCopy);
async function clipboardCopy() {
    let text = document.querySelector("#resultado").value;
    await navigator.clipboard.writeText(text);

    // Aqui você pode adicionar a lógica para apagar o texto após copiar, caso necessário
    document.querySelector("#resultado").value = '';
    document.querySelector("#resultado").style.height = 'auto'; // Reseta a altura
}

// Adicionar o ajuste automático de altura ao textarea
document.getElementById('resultado').addEventListener('input', function() {
    this.style.height = 'auto'; // Reseta a altura para calcular corretamente
    this.style.height = (this.scrollHeight) + 'px'; // Define a nova altura conforme os conteúdos
});