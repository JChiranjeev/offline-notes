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
  newBookName: string;
  currentBook: Book;
  newNoteTitle: string;
  newNoteContent: string;
  newNoteInputDiv: Element;

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
  }

  selectBook(book: Book) {
    this.currentBook = book;
    let index = this.user.books.indexOf(book);
    this.bookListItem = document.getElementsByClassName("book-list-item")[index];
    for (let i = 0; i < this.user.books.length; i++) {
      document.getElementsByClassName("book-list-item")[i].classList.remove("active");
    }
    this.bookListItem.classList.add("active");
    console.log(book.bookTitle);
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
}
