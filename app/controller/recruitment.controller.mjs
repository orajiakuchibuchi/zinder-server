import { DepartmentService } from "../service/department.service.mjs";

class JobPosition {
  departmentService;
  constructor(_departmentService) {
    this.departmentService = _departmentService;
  }
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
      return res.status(200).json({
        message: "Good request",
        data: req.body,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Issues with your request",
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
      
      return res.status(200).json({
        message: "Result Completed",
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot access query parameters",
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
      
      return res.status(200).json({
        message: "Result Completed",
        data: [],
      });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot access query parameter",
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
      const doesExist = [];
      if (doesExist.length < 1) {
        return res.status(500).json({
          message: "Unknown Code",
          errors: ["Code Invalid"],
        });
      }
      
      return res.status(200).json({
        message: "Query completed",
        data: {},
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
      const doesExist = [];
      if (doesExist.length < 1) {
        return res.status(500).json({
          message: "Unknown Code",
          errors: ["Code Invalid"],
        });
      }
      
      return res.status(200).json({
        message: "Query completed",
        data: {},
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
    if (!body.code) {
      errors.unshift("Code is not found");
    }
    if (!body.company) {
      errors.unshift("Company is not found");
    }
    if (!body.title) {
      errors.unshift("Title is not found");
    }
    if (!body.department_id) {
      errors.unshift("Department Code is not found");
    }
    if (!body.description) {
      errors.unshift("Description is not found");
    }
    if (!body.responsibility) {
      errors.unshift("Responsibility is not found");
    }
    if (!body.pay_type) {
      errors.unshift("Pay type is not found");
    }
    if (!body.job_type) {
      errors.unshift("Job type is not found");
    }
    if (!body.base_earning) {
      errors.unshift("Base/Min earning is not found");
    }
    if (!body.max_earning) {
      errors.unshift("Max earning is not found");
    }
    if (!body.required_documents || body.required_documents.length < 1) {
      errors.unshift("Required Document is not found");
    }
    if (body.responsibility && body.responsibility.length < 30) {
      errors.unshift(
        "Responsibility is too short, ensure to make Responsibility up to 30 characters"
      );
    }
    if (body.title && body.title < 2) {
      errors.unshift(
        "Title is too short, ensure to make title up to 2 characters"
      );
    }
    if (body.description && body.description.length < 30) {
      errors.unshift(
        "Description is too short, ensure to make Description up to 30 characters"
      );
    }
    if (
      body.department_id &&
      !this.departmentService.findBy("code", body.department_id)
    ) {
      errors.unshift("Department Code is unknown");
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
    if (body.responsibility && body.responsibility.length < 30) {
      errors.unshift(
        "Responsibility is too short, ensure to make Responsibility up to 30 characters"
      );
    }
    if (body.title && body.name.title < 2) {
      errors.unshift(
        "Title is too short, ensure to make title up to 2 characters"
      );
    }
    if (body.description && body.description.length < 30) {
      errors.unshift(
        "Description is too short, ensure to make Description up to 30 characters"
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

class JobOpening {
  departmentService;
  constructor(departmentService) {
    this.departmentService = departmentService;
  }
  create(req, res) {
    // get the request body
    const body = req.body;
  }
  read(req, res) {}
  update(req, res) {}
  delete(req, res) {}
  all(req, res) {}
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

class JobApplicaton {
  departmentService;
  constructor(departmentService) {
    this.departmentService = departmentService;
  }
  create(req, res) {
    // get the request body
    const body = req.body;
  }
  read(req, res) {}
  update(req, res) {}
  delete(req, res) {}
  all(req, res) {}
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

export class RecruitmentController {
  departmentService = new DepartmentService();
  constructor() {}
  opening = new JobOpening(this.departmentService);
  position = new JobPosition(this.departmentService);
  application = new JobApplicaton(this.departmentService);
}
