import { ISpeciality } from "./ISpecialities";
export interface IMessage{
  status:string,
  message:string
  speciality?:ISpeciality
}
