export class OptionalEntity {
  id : number
  optionalType: string
  optionalColumn : string
  value : string

  constructor(optionalType : string = "") {
    this.optionalType =optionalType
  }
}
