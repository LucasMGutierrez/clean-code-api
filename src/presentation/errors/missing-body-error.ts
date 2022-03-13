export class MissingBodyError extends Error {
  constructor() {
    super('Missing body at HttpRequest');
    this.name = 'MissingBodyError';
  }
}
