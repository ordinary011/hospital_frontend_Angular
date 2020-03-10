import { UnitModel } from './unitModel';
import { DoctorModel } from './doctorModel';
import { VerifiedTokenModel } from './verifiedToken';
import { MarksModel } from './marksModel';
import { CommentModel } from './commentModel';

export interface ResponseModel {
  success: boolean;
  msg: {
    units?: UnitModel[];
    doctors?: DoctorModel[];
    token?: string;
    verifiedToken?: VerifiedTokenModel;
    days?: string[];
    marks?: MarksModel;
    docComments?: CommentModel[];
  };
}
