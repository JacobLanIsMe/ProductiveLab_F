import { Component } from '@angular/core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-thaw-ovum',
  templateUrl: './thaw-ovum.component.html',
  styleUrls: ['./thaw-ovum.component.css']
})
export class ThawOvumComponent {
  

  faListCheck = faListCheck;
  isOpenThawOvumForm = false;
}
