import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentModel } from 'src/app/models/commentModel';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseModel } from 'src/app/models/responseModel';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() commentInput:CommentModel;
  @Output() commentToDelete = new EventEmitter();
  @Output() commentToUpdate = new EventEmitter();

  isUpdate:boolean;
  isPatientComment:boolean;

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit() {
    // when this component is loaded we want to make sure that the user is logged in. Only logged in user can add comments. Logged user can edit and delete the comments that have been written by the user.For this purpose we subscribe to the patientDetails subject that contains details about the patient
    this.auth.patientVerify().subscribe((res:ResponseModel) => {
      if(res.msg.verifiedToken.id == this.commentInput.patient_id) this.isPatientComment = true
    })
  }

  delComment(){
    if (confirm('are you sure you want to delete this task?')) {
      this.commentToDelete.emit(this.commentInput);
    }
  }

  // this method is just a toggle. it is needed for updateForm to appear and to disappear
  updateComment(){
    this.isUpdate = !this.isUpdate
  }

  // this method is used for updating the comment
  update(updateForm){
    // verifying the input (can not be empty)
    if(updateForm.invalid) return alert('please write your updated comment')

    // changing value of the input comment to the one that comes from the updateForm
    this.commentInput.comment = updateForm.value.updatedComment;

    // sending the updated inputComment to the father
    this.commentToUpdate.emit(this.commentInput)

    this.isUpdate = !this.isUpdate
  }

}

