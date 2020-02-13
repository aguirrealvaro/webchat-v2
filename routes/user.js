const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Relation = require('../models/Relation');
const validatorRegisterInput = require('../validation/register');
const validatorLoginInput = require('../validation/login');
const auth = require('./verifyToken');

router.post('/register', async (req, res) => {
	const { username, password } = req.body;

	const { errors, isValid } = validatorRegisterInput(req.body);
	if (!isValid) return res.status(400).json({ errors });

	const user = await User.findOne({ where: { username } });
	if (user) {
		errors.user = 'User has alredy exists'
		return res.status(400).json({ errors });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const newUser = await User.create(
			{
				username,
				password: hashedPassword
			},
			{
				fields: [ 'username', 'password' ]
			}
		);

		//Create a both relations with all the remaining users
		const users = await User.findAll();
		const usersFilter = users.filter((user) => user.id !== newUser.id);
		const relationsOrigin = usersFilter.map((user) => {
			return {
				origin: newUser.id,
				destiny: user.id
			};
		});
		const relationsDestiny = usersFilter.map((user) => {
			return {
				origin: user.id,
				destiny: newUser.id
			};
		});
		await Relation.bulkCreate(relationsOrigin, { fields: [ 'origin', 'destiny' ] });
		await Relation.bulkCreate(relationsDestiny, { fields: [ 'origin', 'destiny' ] });
		res.status(200).json({ newUser });
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	const { errors, isValid } = validatorLoginInput(req.body);
	if (!isValid) return res.status(400).json({ errors });

	const user = await User.findOne({ where: { username } });
	if (!user) {
		errors.user = 'User does not exists'
		return res.status(400).json({ errors });
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		errors.password = 'Invalid password'
		return res.status(400).json({ errors });
	}

	const payload = {
		id: user.id,
		username
	};
	const token = await jwt.sign(payload, process.env.TOKEN_SECRET);
	res.status(200).header('auth-token', token).json({
		success: true,
		token,
		user: {
			id: user.id,
			username: user.username
		}
	});
});

router.get('/all', async (req, res) => {
	const users = await User.findAll();
	res.send(users);
});

router.get('/current', auth, async(req, res)=>{
	res.json({current: req.user})
})

module.exports = router;
