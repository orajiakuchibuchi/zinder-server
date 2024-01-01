import { AuthService } from "../service/auth.service.mjs";
import { UserService } from "../service/user.service.mjs";

export class AuthController {
    // instance of user service
    userService = new UserService();
    authService = new AuthService();

    constructor(){}

    // handler for public POST admin registration
    register(req, res){
        // get the request body
        const body = req.body;
        // Validate body
        const validation = this._validateRegister(body);
        if(validation.length > 0){
            let message = ``;
            // Loop and convert all error to string using the inbuilt array forach
            validation.forEach(element => message+=`${element}\n`);
            // return an error status message in json format
            return res.status(500).json({
                message: message,
                errors: validation
            })
        }
        // check if email already exist in db from user service
        if(this.userService.doesEmailExist(body.email)){
            return res.status(500).json({
                message: 'Email already registered',
                errors: ['Email already registered']
            })
        }
        // save new record using the auth saveAdmin service
        const newAdmin = this.authService.saveAdmin(body);
        // return a success response in json format
        return res.status(200).json({
            message: 'Admin account created',
            data: newAdmin
        })
    }
    // handler for public GET admin request
    getAdmins(req, res){
        const parameter = req.query;
        if(!parameter.role){
            return res.status(500).json({
                message: 'Opps missing parameter',
                errors: ['No role parameter/query attached']
            }) 
        }
        const admins = this.userService.getByRole(parameter.role);
        return res.status(200).json({
            message: `Query request completed. Found ${admins.length} results`,
            data: admins
        })
    }
    // handler for public PATCH admin request
    updateAdmin(req, res){
        // set the body data in postman like we did for post to send in the data body
        // set the params ID in postman to get send an ID along.
        // ensure to delete the comment above and implement after line #63
        const body = req.body;
        const parameter = req.query;
        
    }
    // handler for public DELETE admin request
    deleteAdmin(req, res){
        
    }
    _validateRegister(body){
        let errors = [];
        if(!body.who){
            errors.unshift('Who sent this request');
        }
        if(!body.password){
            errors.unshift('Password is not found');
        }
        if(body.password && body.password.length < 6){
            errors.unshift('Password must be up to 6');
        }
        if(body.password && body.password.toLowerCase() == 'password'){
            errors.unshift('Password is vulnerble/too common');
        }
        if(!body.role){
            errors.unshift('Role is not found');
        }
        if(!body.code){
            errors.unshift('Code is not found');
        }
        if(!body.email){
            errors.unshift('Email is not found');
        }
        if(!body.firstName){
            errors.unshift('Firstname is not found');
        }
        if(!body.lastName){
            errors.unshift('Lastname is not found');
        }
        if(!body.phone){
            errors.unshift('Phone is not found');
        }
        if(!body.country){
            errors.unshift('Country is not found');
        }
        if(body.phone && body.phone.length < 10){
            errors.unshift('Phone must be up to 10');
        }
        return errors;
    }
    _validateUpdateAdmin(req, res){

    }
}
