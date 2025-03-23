export class BadRequestException extends Error {
   constructor(message = `BadRequestException`) {
      super(message);
      this.statusCode = 400;
   }
}
