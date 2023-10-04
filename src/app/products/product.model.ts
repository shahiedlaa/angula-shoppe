export class product {
  constructor(
    public name: string,
    public description: string,
    public specification: { color: string, maxLoad: number, careInfo: string },
    public price: number,
    public imagePath: string[],
    public warrranty: number,
  ) { }
}
