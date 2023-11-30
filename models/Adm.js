import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'

import { sequelize } from '../databases/conecta.js';

export const ADM = sequelize.define('adm', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false,
   
  },

}, {
  paranoid: true,
  timestamps: false,
});

ADM.beforeCreate(adm => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(adm.senha, salt)
  adm.senha = hash  
});