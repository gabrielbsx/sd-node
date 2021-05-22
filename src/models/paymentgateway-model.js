'use strict';
const { Model, DataTypes } = require('sequelize');

class PaymentGateway extends Model {
  static init(sequelize) {
    super.init({
        name: DataTypes.STRING(100),
        key: DataTypes.STRING(255),
        token: DataTypes.STRING(255),
    }, {
      sequelize,
      modelName: 'payment_gateway'
    });
    return this;
  }

  static associate(models) {
    //this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' });
  }
}
  
module.exports = PaymentGateway;