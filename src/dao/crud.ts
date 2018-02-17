export class CRUDDao<I, R> {

  constructor(
    protected path: string
  ) {}

  public get(id: string): Promise<R> {
    return fetch(`${this.getUrl(this.path)}/${id}`).then(this.toJson);
  }

  public getAll(): Promise<R> {
    return fetch(this.getUrl(this.path)).then(this.toJson);
  }

  public create(input: I): Promise<R> {
    return fetch(this.getUrl(this.path), {
      method: 'POST',
      // tslint:disable:no-any
      body: input as any,
    })
      .then(this.rejectOnFail)
      .then(this.toJson);
  }

  private getUrl(path: string): string {
    return 'https://jsonplaceholder.typicode.com/' + path;
  }

  private rejectOnFail(response: Response): Promise<Response> {
    return response.status < 400 ? Promise.resolve(response) : Promise.reject('oops');
  }

  private toJson(response: Response): any {
    return response.json();
  }

}
