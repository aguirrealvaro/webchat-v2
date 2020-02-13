const validator = require('validator')
const isEmpty = require('./is-empty')

const validatorLoginInput = (data) =>{
    let errors = {}
    
    if(isEmpty(data.username)){
        data.username = ''
    }
    if(isEmpty(data.password)){
        data.password = ''
    }

    if(validator.isEmpty(data.username)){
        errors.email = 'Username field is required'
    }

    if(!validator.isLength(data.password, {min: 4, max:20})){
        errors.password = "The password must be at least 4 and at most 20 characters"
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    return{
        errors, 
        isValid: isEmpty(errors)
    }
}

module.exports = validatorLoginInput