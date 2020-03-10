import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { DoctorModel } from 'src/app/models/doctorModel';
import { DoctorService } from 'src/app/services/doctor.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { PatientService } from 'src/app/services/patient.service';
import { AppreciateModel } from 'src/app/models/appreciateModel';
import { CommentModel } from 'src/app/models/commentModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {
  // this is the most sophisticated component in this project. Basically it has all the information about the doctor that we are interested in. You can navigate to this component in two ways: 1) when you click on the doctor component ( kind of like a label) in the unitInfo component 2) when you click on the doctor component in the search component.

  message: DoctorModel;
  labourDays: string[];
  isLogged: boolean;
  avgMark: number;
  markCount: number;
  comments: CommentModel[] = [];

  constructor(
    private transfer: TransferService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router
  ) {}

  async ngOnInit() {
    // 1) when this component is loaded it immediately loads data that is transferred from the doctor component (type: DoctorModel) 2) then it searches for additional info such as working days, comments, appreciation and so on. It makes a request to the backend server for this purpose.

    if (localStorage.getItem('token')) this.isLogged = true;
    // getting data about the doctor that we want to comment
    await this.transfer.currentDoctor.subscribe((res: DoctorModel) => (this.message = res));
    // as soon as we got doctor id we can now search for additional info
    await this.doctorService.findDoctorInfo(this.message.id).subscribe((res: ResponseModel) => {
      this.labourDays = res.msg.days;
      this.avgMark = res.msg.marks.avgMark;
      this.markCount = res.msg.marks.markCount;
      this.comments = res.msg.docComments;
    });
  }

  // this method is used for appreciation
  appreciate(mark) {
    // firstly we check whether the user is logged since only logged users are able to leave a comment
    if (this.isLogged) {
      const appreciation: AppreciateModel = {
        mark,
        doctor_id: this.message.id
      };
      return this.patientService
        .appreciateDoctor(appreciation)
        .subscribe((res: ResponseModel) => alert('appreciated'));
    }
    // if the user was not logged in we will notify him
    alert('you need to logIn if you want to appreciate the doctor');
  }

  addComment(commentForm) {
    // we need to check whether our form is valid or not (can not be empty)
    if (commentForm.invalid) return alert('the comment field can not be empty');
    const reqBody = {
      doctor_id: this.message.id,
      comment: commentForm.value.comment
    };
    this.patientService.addComment(reqBody).subscribe((res: ResponseModel) => {
      // refreshing current component is needed here, so that all the comments could be loaded again
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['doctorInfo']));
    });
  }

  deleteComment(comment: CommentModel) {
    this.patientService.delComment(comment).subscribe((res: ResponseModel) => {
      // refreshing current component so that all the comments could be loaded again
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['doctorInfo']));
    });
  }

  updateComment(comment: CommentModel) {
    this.patientService.updateComment(comment).subscribe((res: ResponseModel) => {
      // refreshing current component so that all the comments could be loaded again
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['doctorInfo']));
    });
  }
}
