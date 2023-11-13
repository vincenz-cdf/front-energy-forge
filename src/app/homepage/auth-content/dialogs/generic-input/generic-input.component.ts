import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.css']
})
export class GenericInputComponent {

  @Input() title: string = "";
  public output: any;

  constructor(
    private activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) 
  {}

  close() {
    this.activeModal.close(null);
  }

  save() {
    if (this.output != null && this.output != "") {
      this.activeModal.close(this.output);
    } else {
      this.toastr.error('The field cannot be empty.', '')
    }
  }
}
