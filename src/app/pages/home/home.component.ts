import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { task } from '../../model/task';
import { timestamp } from 'rxjs';
import { CreateTaskComponent } from "../../components/create-task/create-task.component";
import { LocalDBService } from '../../services/local-db.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateTaskComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  db = inject(LocalDBService);

  ngOninit(){
    this.todo = this.db.load()
    this.db.save(this.todo)
  }
  
  todo:task[]=[];

  addTask(newTask:task){
    this.todo.push(newTask)
    this.db.save(this.todo)
  }

  removeTask(id:number|undefined){
    if(!id) return;
    if(!confirm("Está seguro?")) return;
    this.todo=this.todo.filter(e => e.id != id)
    this.db.save(this.todo)
  }

  editTask(task:task){
    task.newTitle=task.title
    task.update=true

  }

  updateTask(task:task){
    task.title =task.newTitle as any
    task.newTitle=undefined
    task.update=undefined
    this.db.save(this.todo)
  }

  
}
