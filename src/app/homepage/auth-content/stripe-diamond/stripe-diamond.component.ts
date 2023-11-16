import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';

@Component({
  selector: 'app-stripe-diamond',
  templateUrl: './stripe-diamond.component.html',
  styleUrls: ['./stripe-diamond.component.css']
})
export class StripeDiamondComponent {

  uiPaths = UIPATHS;

  constructor(
    private activeModal: NgbActiveModal
  ) 
  {}

  public close() {
    this.activeModal.close();
  }
  

}
