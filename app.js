let listaDeFrasesCitadas = [];


alert('Olá! Eu sou github.com/Robsonlmds.🩻\n' +
    'Se precisar de ajuda ou informações, estou aqui para ajudar!!');

alert('⚠️ Atalhos de Uso:\n\n' +
    '➡️ Enter -> Criptografa\n' +
    '🗑️ Delete -> Deletar frases citadas');

document.addEventListener('DOMContentLoaded', (event) => {
    let inputKey = document.querySelector('input');
    inputKey.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            criptografar__btn();
        }
    });

    inputKey.addEventListener('keydown', (event) => {
        if (event.key === 'Delete') {
            event.preventDefault();
            limpar__frases__citadas();
        }
    });
});

function copiarTexto() {
    const lista = document.getElementById('lista-de-frases-criptografadas');

    if (lista.children.length > 0) {
        const ultimaFrase = lista.children[lista.children.length - 1].textContent;
        const tempInput = document.createElement('textarea');
        tempInput.value = ultimaFrase;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Última frase foi copiada!');
    } else {
        alert('Não há frases para copiar.');
    }
}

function criptografar__btn() {
    let frasesInput = document.querySelector('input').value;
    if (frasesInput.trim() !== "") {
        let fraseCriptografada = criptografar(frasesInput, 3); // Usando deslocamento de 3  
        listaDeFrasesCitadas.push(fraseCriptografada);
        lista__de__frases__criptografadas();
        document.querySelector('input').value = "";
        console.log(listaDeFrasesCitadas);
    }
}

function criptografar(texto, deslocamento) {
    return texto.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt(0);
            let base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + deslocamento) % 26) + base);
        }
        return char;
    }).join('');
}

function descriptografar(texto, deslocamento) {
    return criptografar(texto, -deslocamento);
}

function descriptografar__btn() {
    let frasesInput = document.querySelector('input').value;
    if (frasesInput.trim() !== "") {
        let fraseDescriptografada = descriptografar(frasesInput, 3); // Usando deslocamento de 3
        exibirTextoNaTela('.container__lista__descriptografadas', 'Sua mensagem descriptografada é: ' + fraseDescriptografada);
        document.querySelector('input').value = "";
        console.log('Frase descriptografada:', fraseDescriptografada);
    }
}

function lista__de__frases__criptografadas() {
    let lista = document.getElementById('lista-de-frases-criptografadas');
    lista.innerHTML = "";
    listaDeFrasesCitadas.forEach(frase => {
        let li = document.createElement('li');
        li.textContent = frase;
        lista.appendChild(li);
    });
}

function limpar__frases__citadas() {
    listaDeFrasesCitadas = [];
    lista__de__frases__criptografadas();
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}