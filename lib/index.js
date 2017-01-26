const readPkgUp = require('read-pkg-up');
const lodash = require('lodash');
const Context = require('./Context');

module.exports = Context.runLocally(readPkgUp, lodash);

// sobre escopo: criar um objeto pra exportar (api) e outro private q teria todo o contexto necessario injetado
// desta forma da pra programar tudo em funcional, injetar num objeto (verificar se eh necessario esse controle de estado),
// e entao exportar apenas um objeto mto simples apenas com os metodos publicos encapsulando as funcoes
// analisar como fica essa complexidade e tirar aprendizados disso
