export interface CommentModel {
  id: number;
  patient_id: number;
  doctor_id: number;
  comment: string;
  Patient: {
    id:number,
    lastName:string
    name:string,
}
}
