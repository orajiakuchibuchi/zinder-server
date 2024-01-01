export class AuthController {
    register(req, res) {
        const body = req.body;
        const validation = this._validateRegister(body);
        if (validation.length > 0) {
            return res.status(500).json({
                message: 'oops sth went wrong',
                errors: validation
            })
        }
      
            return res.status(200).json({
                message: 'email found ' + body.email
               
            })
          
    }

    _validateRegister(body){
        let errors = [];
        if(!body.email){
            errors.unshift('Email is not found');
        }
        if(!body.firstName){
            errors.unshift('firstName is not found');
        }
        if(!body.lastName){
            errors.unshift('lastName is not found');
        }
        if(!body.phone){
            errors.unshift('Phome is not found');
        }
    }
}