/*
INTEGRANTE:
Luan Trauczynski Sckreurs 
TURMA: 3ª Série k
*/
// Elementos da página
 const numeroSenha = document.querySelector('.parametro-senha__texto');
 const campoSenha = document.querySelector('#campo-senha');
 const botoesTamanho = document.querySelectorAll('.parametro-senha__botao');
 const botaoGerar = document.querySelector('.botao-gerar');
 const checkboxMaiuscula = document.querySelector('#maiuscula');
 const checkboxMinuscula = document.querySelector('#minuscula');
 const checkboxNumero = document.querySelector('#numero');
 const checkboxSimbolo = document.querySelector('#simbolo');
 const forcaSenha = document.querySelector('.forca');
 const textoEntropia = document.querySelector('.entropia');
 // Conjuntos de caracteres
 const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
 const numeros = '0123456789';
 const simbolos = '!@%*?#&+-.';
 // Configurações iniciais
 let tamanhoSenha = 12;
 numeroSenha.textContent = tamanhoSenha;
 // Eventos
 botoesTamanho[0].addEventListener('click', diminuiTamanho);
 botoesTamanho[1].addEventListener('click', aumentaTamanho);
 botaoGerar.addEventListener('click', geraSenhaSegura);
 // Regerar quando mudar opções
 [checkboxMaiuscula, checkboxMinuscula, checkboxNumero, checkboxSimbolo].forEach(cb => {
     cb.addEventListener('change', geraSenhaSegura);
 });
 function diminuiTamanho() {
     if (tamanhoSenha > 6) {
         tamanhoSenha--;
         numeroSenha.textContent = tamanhoSenha;
         geraSenhaSegura();
     }
 }
 function aumentaTamanho() {
     if (tamanhoSenha < 20) {
         tamanhoSenha++;
         numeroSenha.textContent = tamanhoSenha;
         geraSenhaSegura();
     }
 }
 // Monta o conjunto de caracteres disponíveis
 function getAlfabeto() {
     let alfabeto = '';
     if (checkboxMaiuscula.checked) alfabeto += letrasMaiusculas;
     if (checkboxMinuscula.checked) alfabeto += letrasMinusculas;
     if (checkboxNumero.checked) alfabeto += numeros;
     if (checkboxSimbolo.checked) alfabeto += simbolos;
     // Se nada estiver marcado, usa maiúsculas como padrão
     return alfabeto || letrasMaiusculas;
 }
 function geraSenha() {
     const alfabeto = getAlfabeto();
     let senha = '';
     for (let i = 0; i < tamanhoSenha; i++) {
         const indice = Math.floor(Math.random() * alfabeto.length);
         senha += alfabeto[indice];
     }
     return senha;
 }
 // Evita senhas com sequências óbvias
 function senhaEhValida(senha) {
     return !(
         senha.includes('ABCDE') ||
         senha.includes('abcd') ||
         senha.includes('12345')
     );
 }
 function geraSenhaSegura() {
     let senha;
     do {
         senha = geraSenha();
     } while (!senhaEhValida(senha));
     
     campoSenha.value = senha;
     atualizarForcaSenha();
     atualizarEntropia();
 }
 function atualizarForcaSenha() {
     forcaSenha.classList.remove('fraca', 'media', 'forte');
     if (tamanhoSenha >= 12) {
         forcaSenha.classList.add('forte');
     } else if (tamanhoSenha >= 8) {
         forcaSenha.classList.add('media');
     } else {
         forcaSenha.classList.add('fraca');
     }
 }
 function atualizarEntropia() {
     let tamanhoAlfabeto = 0;
     if (checkboxMaiuscula.checked) tamanhoAlfabeto += 26;
     if (checkboxMinuscula.checked) tamanhoAlfabeto += 26;
     if (checkboxNumero.checked) tamanhoAlfabeto += 10;
     if (checkboxSimbolo.checked) tamanhoAlfabeto += 10;
     
     const entropia = tamanhoSenha * Math.log2(Math.max(tamanhoAlfabeto, 1));
     const tentativas = 2 ** entropia;
     const dias = Math.floor(tentativas / (100e6 * 60 * 60 * 24));
     
     textoEntropia.textContent = 
         `Um computador pode levar até aproximadamente ${dias} dias para descobrir essa senha.`;
 }
 // Gera a primeira senha ao abrir
 geraSenhaSegura();
