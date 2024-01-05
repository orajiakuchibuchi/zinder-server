import { DepartmentService } from "../service/department.service.mjs";
import { UserService } from "../service/user.service.mjs";

export class DepartmentController {
  userService = new UserService();
  departmentService = new DepartmentService();
  constructor() {}
  create(req, res) {
    try {
      // get the request body
      const body = req.body;
      const validation = this._validateCreate(body);
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      // check if email already exist in db from user service
      const department = this.departmentService.save(body);
      // return a success response in json format
      return res.status(200).json({
        message: "Department created",
        data: department,
      });
    } catch (error) {
      // return an error status message in json format
      return res.status(500).json({
        message: 'Ensure to send an encoded POST request',
        errors: error.message,
      });
    }
  }
  read(req, res) {
    try {
      const parameter = req.query;
      const validation = this._validateRead(parameter);
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      const department = this.departmentService.getBy("code", parameter.code);
      return res.status(200).json({
        message: "Result Completed",
        data: department.pop(),
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Cannot access query parameters',
        errors: error.message,
      });
    }
   
  }
  all(req, res) {
    try {
      const parameter = req.query;
      const validation = this._validateAll(parameter);
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      const departments = this.departmentService.getBy("who", parameter.who);
      return res.status(200).json({
        message: "Result Completed",
        data: departments,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Cannot access query parameter',
        errors: error.message,
      });
    }

  }
  update(req, res) {
    try {
      // set the body data in postman like we did for post to send in the data body
    // set the params ID in postman to get send an ID along.
    // ensure to delete the comment above and implement after line #63
    const body = req.body;
    const parameter = req.query;
    const validation = this._validateUpdate(body);
    if (!parameter.code || parameter.code.length < 1) {
      return res.status(500).json({
        message: "No code found",
        errors: ["No code found"],
      });
    }
    if (!parameter.who || parameter.who.length < 1) {
      return res.status(500).json({
        message: "No [who] found when making this request",
        errors: ["No [who] found when making this request"],
      });
    }
    if (validation.length > 0) {
      let message = ``;
      // Loop and convert all error to string using the inbuilt array forach
      validation.forEach((element) => (message += `${element}\n`));
      // return an error status message in json format
      return res.status(500).json({
        message: message,
        errors: validation,
      });
    }
    const doesExist = this.departmentService.getBy("code", parameter.code);
    if (doesExist.length < 1) {
      return res.status(500).json({
        message: "Unknown Code",
        errors: ["Code Invalid"],
      });
    }
    const updated = this.departmentService.update(parameter.code, body);
    return res.status(200).json({
      message: "Query completed",
      data: updated,
    });
    } catch (error) {
      return res.status(500).json({
        message: "Issues with request",
        errors: error.message,
      });
    }
  }
  delete(req, res) {
    try {
      const parameter = req.query;
    const validation = this._validateDelete(parameter);
    if (validation.length > 0) {
      let message = ``;
      // Loop and convert all error to string using the inbuilt array forach
      validation.forEach((element) => (message += `${element}\n`));
      // return an error status message in json format
      return res.status(500).json({
        message: message,
        errors: validation,
      });
    }
    const doesExist = this.departmentService.getBy("code", parameter.code);
    if (doesExist.length < 1) {
      return res.status(500).json({
        message: "Unknown Code",
        errors: ["Code Invalid"],
      });
    }
    const deleted = this.departmentService.delete(parameter.code);
    return res.status(200).json({
      message: "Query completed",
      data: deleted,
    });
    } catch (error) {
      return res.status(500).json({
        message: "Issues with request",
        errors: error.message,
      });
    }
  }
  _validateCreate(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("Who sent this request");
    }
    if (!body.name) {
      errors.unshift("Name is not found");
    }
    if (body.name && body.name.length < 3) {
      errors.unshift(
        "Name is too short, ensure to make name up to 3 characters"
      );
    }
    if (!body.short_name) {
      errors.unshift("Short Name is not found");
    }

    if (body.short_name && body.short_name.length > 30) {
      errors.unshift(
        "Short is too long, ensure to make short name less than or equals to 30 characters"
      );
    }
    if (!body.code) {
      errors.unshift("Code is not found");
    }
    if (!body.company) {
      errors.unshift("Company is not found");
    }
    return errors;
  }
  _validateRead(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("Who sent this request");
    }
    if (!body.code) {
      errors.unshift("Code is not found");
    }
    return errors;
  }
  _validateUpdate(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("Who sent this request");
    }
    if (!body.code) {
      errors.unshift("Code is not found");
    }
    if (body.name && body.name.length < 3) {
      errors.unshift(
        "Name is too short, ensure to make name up to 3 characters"
      );
    }
    if (body.short_name && body.short_name.length > 30) {
      errors.unshift(
        "Short is too long, ensure to make short name less than or equals to 30 characters"
      );
    }
    return errors;
  }
  _validateDelete(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("Who sent this request");
    }
    if (!body.code) {
      errors.unshift("Code is not found");
    }
    return errors;
  }
  _validateAll(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("Who sent this request");
    }
    return errors;
  }
}
