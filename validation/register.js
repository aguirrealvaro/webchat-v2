const validator = require('validator')
const isEmpty = require('./is-empty')

const validatorRegisterInput = (data) =>{
    let errors = {}
    
    if(isEmpty(data.username)){
        data.username = ''
    }
    if(isEmpty(data.password)){
        data.password = ''
    }
    if(isEmpty(data.password2)){
        data.password2 = ''
    }

    if(validator.isEmpty(data.username)){
        errors.user = 'Username field is required'
    }

    if(!validator.isLength(data.username, {min: 2, max:15})){
        errors.user = "The username must be at least 2 and at most 15 characters"
    }

    if(!validator.isLength(data.password, {min: 4, max:20})){
        errors.password = "The password must be at least 4 and at most 20 characters"
    }

    if(!validator.equals(data.password, data.password2)){
        errors.password2 = 'Password must match'
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = 'Confirmation password field is required'
    }

    return{
        errors, 
        isValid: isEmpty(errors)
    }
}

module.exports = validatorRegisterInput