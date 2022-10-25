const {body} = require('express-validator');

exports.registerValidator = [
  body('email', 'Не верный формат почты').isEmail(),
  body('password', 'Пароль должен содержать не менее 5 символов').isLength({min: 5}),
];
