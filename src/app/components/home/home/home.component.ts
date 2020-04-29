import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Usercontroller } from 'src/app/controllers/usercontroller/usercontroller';
import { User } from 'src/app/models/user/user';
import { Book } from 'src/app/models/book/book';
import { Note } from 'src/app/models/note/note';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  bookListItem: Element;
  noteListItem: Element;
  newBookName: string;
  currentBook: Book;
  noteTitle: string;
  noteContent: string;
  newNoteInputDiv: Element;
  notesListDiv: Element;
  discardDisabled: boolean = true;
  saveDisabled: boolean = true;
  titleChanged: boolean = false;
  contentChanged: boolean = false;

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
    this.newNoteInputDiv.setAttribute("hidden",null);
    this.currentBook = this.user.books[0];
    this.notesListDiv = document.getElementsByClassName("notes-list")[0];
    this.notesListDiv.setAttribute("hidden",null);
  }

  selectBook(book: Book) {
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
    let index = this.currentBook.notes.indexOf(note);
    for (let i = 0; i < this.currentBook.notes.length; i++) {
      document.getElementsByClassName("note-list-item")[i].classList.remove("active");
    }
    this.noteListItem = document.getElementsByClassName("note-list-item")[index];
    this.noteListItem.classList.add("active");
    this.noteContent = note.noteContent;
    this.noteTitle = note.noteTitle;
    this.newNoteInputDiv.removeAttribute("hidden");
  }

  createNewBook() {
    console.log("New Book Name: " + this.newBookName);
    this.user.books.push({bookTitle: this.newBookName, notes: new Array<Note>()});
    this.userController.saveUser(this.user.username, this.user);
  }
  
  createNewNote() {
    console.log("New Note");
    this.newNoteInputDiv.removeAttribute("hidden");
  }

  saveNote() {
    this.currentBook.notes.push({
      noteTitle: this.noteTitle,
      noteContent: this.noteContent 
    });
    this.userController.saveUser(this.user.username, this.user);
    this.noteTitle = "";
    this.noteContent = "";
  }

  discardNote() {
    this.noteTitle = "";
    this.noteContent = "";
    this.newNoteInputDiv.setAttribute("hidden",null);
  }

  onContentChange(content : string) {
    if(content.length > 0) {
      this.contentChanged = true;
    } else {
      this.contentChanged = false;
    }
    if(this.contentChanged && this.titleChanged) {
      this.saveDisabled = false;
      this.discardDisabled = false;
    } else {
      this.saveDisabled = true;
      this.discardDisabled = true;
    }
  }

  onTitleChange(title : string) {
    if(title.length > 0) {
      this.titleChanged = true;
    } else {
      this.titleChanged = false;
    }
    if(this.contentChanged && this.titleChanged) {
      this.saveDisabled = false;
      this.discardDisabled = false;
    } else {
      this.saveDisabled = true;
      this.discardDisabled = true;
    }
  }
}
