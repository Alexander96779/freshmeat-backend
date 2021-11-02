class Response {
    constructor(res, code, message, data = {}) {
        this.res = res;
        this.code = code;
        this.message = message;
        this.data = data;
      }

    sendErrorMessage() {
        this.res.status(this.code).json({
          status: this.code,
          error: this.message,
        });
      }

    sendSuccessResponse() {
        this.res.status(this.code).json({
          status: this.code,
          message: this.message,
          data: this.data,
        });
      }
}

export default Response;