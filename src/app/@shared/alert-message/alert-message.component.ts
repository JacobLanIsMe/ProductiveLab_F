import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Output() close = new EventEmitter<void>();
  onClose(){
    this.close.emit();
  }
}
