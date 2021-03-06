import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Usercontroller } from 'src/app/controllers/usercontroller/usercontroller';
import { User } from 'src/app/models/user/user';
import { Book } from 'src/app/models/book/book';
import { Note } from 'src/app/models/note/note';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public model = {
    editorData: ""
  };
  public Editor = ClassicEditor;
  user: User;
  bookListItem: Element;
  noteListItem: Element;
  newBookName: string;
  currentBook: Book;
  currentNote: Note;
  noteTitle: string;
  newNoteInputDiv: Element;
  notesListDiv: Element;
  discardDisabled: boolean = true;
  saveDisabled: boolean = true;
  titleChanged: boolean = false;
  contentChanged: boolean = false;
  deleteDisabled: boolean = true;
  newNote: boolean = true;
  currentNoteIndex: number;
  noteTimestamp: Date;

  constructor(private router: Router, private location: Location, private userController: Usercontroller) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("username") == null) {
      this.location.replaceState("/");
      this.router.navigate(["login"]);
    } else {
      this.user = this.userController.getUser(sessionStorage.getItem("username"));
      console.log("The Username is: " + this.user.username);
    }
    this.newNoteInputDiv = document.getElementsByClassName("new-note-input")[0];
    this.newNoteInputDiv.setAttribute("hidden", null);
    this.currentBook = this.user.books[0];
    this.notesListDiv = document.getElementsByClassName("notes-list")[0];
    this.notesListDiv.setAttribute("hidden", null);
  }

  createNewBook() {
    console.log("New Book Name: " + this.newBookName);
    this.user.books.push({ bookTitle: this.newBookName, notes: new Array<Note>() });
    this.userController.saveUser(this.user.username, this.user);
    for (let i = 0; i < this.user.books.length; i++) {
      document.getElementsByClassName("book-list-item")[i].classList.remove("active");
    }
  }

  createNewNote() {
    this.newNote = true;
    this.currentNote = new Note();
    console.log("New Note");
    this.newNoteInputDiv.removeAttribute("hidden");
    this.noteTitle = "";
    this.model.editorData = "";
    for (let i = 0; i < this.currentBook.notes.length; i++) {
      document.getElementsByClassName("note-list-item")[i].classList.remove("active");
    }
  }

  openBook(book: Book) {
    this.notesListDiv.removeAttribute("hidden");
    this.currentBook = book;
    let index = this.user.books.indexOf(book);
    for (let i = 0; i < this.user.books.length; i++) {
      document.getElementsByClassName("book-list-item")[i].classList.remove("active");
    }
    this.bookListItem = document.getElementsByClassName("book-list-item")[index];
    this.bookListItem.classList.add("active");
    console.log(book.bookTitle);
  }

  openNote(note: Note) {
    this.newNote = false;
    this.currentNote = note;
    this.noteTimestamp = note.timestamp;
    this.currentNoteIndex = this.currentBook.notes.indexOf(note);
    for (let i = 0; i < this.currentBook.notes.length; i++) {
      document.getElementsByClassName("note-list-item")[i].classList.remove("active");
    }
    this.noteListItem = document.getElementsByClassName("note-list-item")[this.currentNoteIndex];
    this.noteListItem.classList.add("active");
    this.model.editorData = note.noteContent;
    this.noteTitle = note.noteTitle;
    this.newNoteInputDiv.removeAttribute("hidden");
  }

  saveNote() {
    this.currentNote = {
      noteTitle: this.noteTitle,
      noteContent: this.model.editorData,
      timestamp: new Date()
    }
    if(this.newNote) {
      this.currentBook.notes.push(this.currentNote);
    } else {
      this.currentBook.notes[this.currentNoteIndex] = this.currentNote;
    }
    this.userController.saveUser(this.user.username, this.user);
    this.saveDisabled = true;
    this.discardDisabled = true;
  }

  discardNote() {
    this.noteTitle = "";
    this.model.editorData = "";
    this.newNoteInputDiv.setAttribute("hidden", null);
  }

  deleteNote() {
    this.currentBook.notes.splice(this.currentNoteIndex,1);
    this.userController.saveUser(this.user.username, this.user);
    this.noteTitle = "";
    this.model.editorData = "";
    this.newNoteInputDiv.setAttribute("hidden",null);
  }

  onContentChange({ editor }: ChangeEvent) {
    if(this.newNote) {
      this.deleteDisabled = true;
    } else {
      this.deleteDisabled = false;
    }
    if (editor.getData().length > 0) {
      this.contentChanged = true;
    } else {
      this.contentChanged = false;
    }
    if (this.contentChanged) {
      this.saveDisabled = false;
      this.discardDisabled = false;
    } else {
      this.saveDisabled = true;
      this.discardDisabled = true;
    }
  }
}
