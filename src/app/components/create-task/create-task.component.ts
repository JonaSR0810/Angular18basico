import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { task } from '../../model/task';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @ViewChild("texto") texto:ElementRef | undefined;

  @Output() taskCreated = new EventEmitter<task>();
  createTask(){
    if(!this.texto) return;
    let title = this.texto?.nativeElement.value.trim();
    if(!title) return;
    let timestamp = Date.now()
    let newNote:task = {id:Math.random()*timestamp,title:title}
    this.taskCreated.emit(newNote)
    this.texto.nativeElement.value=""
    return false
  }
}
