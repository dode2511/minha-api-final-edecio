
import bcrypt from 'bcrypt'
import { ADM } from '../models/Adm.js';



function validaSenha(senha) {

    const mensa = []
  
    // .length: retorna o tamanho da string (da senha)
    if (senha.length < 8) {
      mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
    }
  
    // contadores
    let pequenas = 0
    let grandes = 0
    let numeros = 0
    let simbolos = 0
  
    // senha = "abc123"
    // letra = "a"
  
    // percorre as letras da variável senha
    for (const letra of senha) {
      // expressão regular
      if ((/[a-z]/).test(letra)) {
        pequenas++
      }
      else if ((/[A-Z]/).test(letra)) {
        grandes++
      }
      else if ((/[0-9]/).test(letra)) {
        numeros++
      } else {
        simbolos++
      }
    }
  
    if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
      mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
    }
  
    return mensa
  }
  
  export const admIndex = async (req, res) => {
  
    try {
      const adm = await ADM.findAll();
      res.status(200).json(adm)
    } catch (error) {
      res.status(400).send(error)
    }
  }
  
  export const admCreate = async (req, res) => {
    const { nome, email, senha } = req.body
  
   
    if (!nome || !email || !senha ) {
      res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
      return
    }
  
    const mensaValidacao = validaSenha(senha)
    if (mensaValidacao.length >= 1) {
      res.status(400).json({ id: 0, msg: mensaValidacao })
      return
    }
  
    try {
      const adm = await ADM.create({
        nome, email, senha
      });
      res.status(201).json(adm)
    } catch (error) {
      res.status(400).send(error)
    }
  }






export const ADMLogin = async (req, res) => {

    const { email, senha } = req.body
  
    try {
      const adm = await ADM.findOne({ where: { email } });
  
      if (adm == null) {
        res.status(400).json({ erro: 'Login ou senha incorreto' })
        return
      }
  
 
      if (bcrypt.compareSync(senha, adm.senha)) {
   
        res.status(200).json({ id: adm.id, nome: adm.nome })
      }
      else {
        res.status(401).json({ erro: 'Login ou senha incorreto' })
        return
      }
    } catch (error) {
      res.status(400).send(error)
    }
  }