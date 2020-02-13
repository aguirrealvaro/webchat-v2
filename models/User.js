const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const Message = require('./Message')
const Relation = require('./Relation')

const User = sequelize.define('users',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		username: Sequelize.TEXT,
		password: Sequelize.TEXT,
        created_at: Sequelize.TIME
	},
	{
		timestamps: false
	}
);

/*asociations User with Message*/
User.hasMany(Message, {
    foreignKey: 'origin',
    sourceKey: 'id'
})

Message.belongsTo(User, {
	as: 'infoOrigin',
    foreignKey: 'origin',
    sourceKey: 'id'
})

User.hasMany(Message, {
    foreignKey: 'destiny',
    sourceKey: 'id'
})

Message.belongsTo(User, {
	as: 'infoDestiny',
    foreignKey: 'destiny',
    sourceKey: 'id'
})

/*asociations Users with Relation*/
User.hasMany(Relation, {
	foreignKey: 'origin',
	sourceKey: 'id'
})

Relation.belongsTo(User, {
	as: 'infoOrigin',
	foreignKey: 'origin',
	sourceKey: 'id'
})

User.hasMany(Relation, {
	foreignKey: 'destiny',
	sourceKey: 'id'
})

Relation.belongsTo(User, {
	as: 'infoDestiny',
	foreignKey: 'destiny',
	sourceKey: 'id'
})

/*asociations Relation with Message*/

Relation.belongsTo(Message, {
	as: 'infoLastMessage',
	foreignKey: 'lastmessage',
	sourceKey: 'id'
})


module.exports = User;