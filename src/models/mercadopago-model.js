'use strict';
const { Model, DataTypes } = require('sequelize');

class MercadoPagoGateway extends Model {
  static init(sequelize) {
    super.init({
        public_key: {
          type: DataTypes.STRING(255),
        },
        access_token: {
          type: DataTypes.STRING(255),
        },
    }, {
      sequelize,
      modelName: 'mercadopago_gateway'
    });
    return this;
  }

  static associate(models) {
    //this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' });
  }
}
  
module.exports = MercadoPagoGateway;