import Response from './response';

class DbErrorHandler {

  static async handleSignupError(res, error) {
    let response;
    switch (error.name) {
      case ('SequelizeValidationError'):
        response = new Response(res, 422, error.errors[0].message);
        response.sendErrorMessage();
        break;
      case ('SequelizeDatabaseError'):
        if (error.parent.code === '23502') {
          response = new Response(res, 422, `${error.parent.column} is required`);
          response.sendErrorMessage();
        } else {
          response = new Response(res, 500, error.errors[0].message);
          response.sendErrorMessage();
        }
        break;
      case ('SequelizeUniqueConstraintError'):
        response = new Response(res, 400, error.errors[0].message);
        response.sendErrorMessage();
        break;
      default:
        response = new Response(res, 500, error.message || 'Internal server error');
        response.sendErrorMessage();
    }
  }
}

export default DbErrorHandler;