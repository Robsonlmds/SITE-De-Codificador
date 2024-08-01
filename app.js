let listOfQuotedFrases = [];


alert('Olá! Eu sou github.com/Robsonlmds.🩻\n' +
    'Se precisar de ajuda ou informações, estou aqui para ajudar!');

alert('⚠️ Atalhos de Uso:\n\n' +
    '➡️ Enter -> Criptografa\n' +
    '🗑️ Delete -> Deletar frases citadas');

// ADD EVENT LISTENERS WHEN THE DOM IS LOADED
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

// COPY 
function copiarTexto() {
    const lista = document.getElementById('lista-de-frases-criptografadas');

    if (lista.children.length > 0) {
        const ultimaFrase = lista.children[lista.children.length - 1].textContent; // TAKE LAST PHARSE
        const tempInput = document.createElement('textarea'); // MAKE TEMP
        tempInput.value = ultimaFrase;
        document.body.appendChild(tempInput); // ADD AN BODY OF DOC'S
        tempInput.select();
        document.execCommand('copy'); // COPY
        document.body.removeChild(tempInput); // REMOVE TEMP
        // alert('Última frase foi copiada!');
    } else {
        alert('Não há frases para copiar.');
    }
}

//ENCRYPT - ALGORITHM AES

function criptografar__btn() {
    let frasesInput = document.querySelector('input').value;
    if (frasesInput.trim() !== "") {
        let fraseCriptografada = encrypt(frasesInput); // ENCRYPT TEXT INPUT
        listOfQuotedFrases.push(fraseCriptografada); // ADD PHARSE TO THE LIST
        lista__de__frases__criptografadas(); // UPDATE THE LIST
        document.querySelector('input').value = ""; // CLEAR INPUT
        console.log(listOfQuotedFrases);
    }
}

//DECRYPT

function descriptografar__btn() {
    let frasesInput = document.querySelector('input').value;
    if (frasesInput.trim() !== "") {
        let fraseDescriptografada = decrypt(frasesInput); // DECRYPT THE TEXT
        exibirTextoNaTela('.container__lista__descriptografadas', 'Sua mensagem descriptografada é: ' + fraseDescriptografada);
        document.querySelector('input').value = ""; // CLEAR THE INPUT
        console.log('Frase descriptografada:', fraseDescriptografada);
    }
}

// FUNCTION TO UPDATE THE LIST TO DISPLAYED ON THE SCREEN

function lista__de__frases__criptografadas() {
    let lista = document.getElementById('lista-de-frases-criptografadas');
    lista.innerHTML = "";
    listOfQuotedFrases.forEach(frase => {
        let li = document.createElement('li');
        li.textContent = frase;
        lista.appendChild(li);
    });
}

// FUNCTION TO CLEAR THE LIST

function limpar__frases__citadas() {
    listOfQuotedFrases = [];
    lista__de__frases__criptografadas();
}

// FUNCTION TO DISPLAY TEXT ON THE SCREEN IN A SPECIFIC ELEMENT 

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// FUNCTION TO ENCRYPT USING (AES-256-CBC) WITH CRYPTOJS

function encrypt(text) {
    const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // KEY OF 32 bytes
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // IV OF 16 bytes
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// FUNCTION TO DECRYPT USING (AES-256-CBC) WITH CRYPTOJS

function decrypt(text) {
    const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // KEY OF 32 BYTES
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // IV de 16 BYTES - INITIALIZATION VECTOR
    const decrypted = CryptoJS.AES.decrypt(text, key, {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
''