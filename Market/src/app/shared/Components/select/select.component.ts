import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Output() selectedValue = new EventEmitter();

  constructor(){}

  detectChanges(event : any){
    this.selectedValue.emit(event);
  }
}
