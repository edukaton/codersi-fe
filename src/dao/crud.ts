export class CRUDDao<I, R> {

  constructor(
    protected path: string
  ) {}

  public get(id: string): Promise<R> {
    return fetch(`${this.getUrl(this.path)}/${id}`).then(this.resolve);
  }

  public getAll(): Promise<R> {
    return fetch(this.getUrl(this.path)).then(this.resolve);
  }

  public create(input: I): Promise<R> {
    return fetch(this.getUrl(this.path), {
      method: 'POST',
      // mode: 'cors',
      // tslint:disable:no-any
      body: input as any,
    })
      .then(this.resolve);
  }

  protected getUrl(path: string): string {
    return 'https://blekitna-wrozka.frb.io/api/' + path; // FIXME: don't hardcode
  }

  protected resolve(response: Response): Promise<R> {
    console.log(response);
    return response.status < 400 ? Promise.resolve(response.json()) : Promise.reject('oops');
  }

}
