import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todos: { text: string, isEditing: boolean }[] = []
  newTodo: string = '';

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos) {
      this.todos = JSON.parse(savedTodos)
    }
  }

  addTodo() {
    if(this.newTodo.trim()) {
      this.todos.push({ text: this.newTodo.trim(), isEditing: false });
      this.newTodo = '';
      this.saveToLocalStorage();
    } else {
      alert('O campo não pode ficar em branco!')
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveToLocalStorage();
  }

  editTodo(index: number) {
    this.todos[index].isEditing = true;
  }

  saveTodo(index: number, editedText: string) {
    if(editedText.trim()) {
      this.todos[index].text = editedText;
      this.todos[index].isEditing = false;
      this.saveToLocalStorage();
    }
  }

  cancelEdit(index: number) {
    this.todos[index].isEditing = false
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
