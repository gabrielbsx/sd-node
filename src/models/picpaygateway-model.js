'use strict';
const { Model, DataTypes } = require('sequelize');

class PicpayGateway extends Model {
  static init(sequelize) {
    super.init({
        xpicpaytoken: {
          type: DataTypes.STRING(255),
        },
        xsellertoken: {
          type: DataTypes.STRING(255),
        },
    }, {
      sequelize,
      modelName: 'picpay_gateway'
    });
    return this;
  }

  static associate(models) {
    //this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' });
  }
}
  
module.exports = PicpayGateway;