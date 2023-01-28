import { MatTableDataSource } from '@angular/material/table';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MainService } from '../services/main.service';
import { FindUser } from '../interfaces/user-search';
import { UsersControlService } from '../services/users-control.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  pageIndex = 0;
  pageSize = 5;
  searchTerm = '';
  showFiller = false;
  error = false;
  total = 0;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'roles',
    'status',
    'actions',
  ];
  constructor(
    private fb: FormBuilder,
    private UsersControlService: UsersControlService
  ) {
    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      roles: '',
      statuss: '',
    });
  }
  ngOnInit() {
    this.persistData();
  }
  persistData() {
    const users = {
      search: this.searchTerm,
      sortBy: 'firstName',
      sortDirection: 'asc',
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      includes: ['id', 'email', 'firstName', 'lastName', 'roles', 'locked'],
      excludes: [],
    };
    this.UsersControlService.getUsers(users).subscribe({
      next: ({ data }) => {
        this.dataSource = data.entities;
        this.total = data.total;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  userForm!: FormGroup;
  roles: string[] = ['Admin', 'User', 'Moderator'];
  statuses: string[] = ['active', 'offline'];

  addUser() {
    console.log(this.userForm.value);
  }
  clearForm() {
    this.userForm.reset();
  }
  onSubmit() {
    const id = this.userForm.value.id;
    const status = this.userForm.value.userStatus;
    const firstName = this.userForm.value.firstName;
    const email = this.userForm.value.email;
    const lastName = this.userForm.value.lastName;
    const roles = this.roles;

  }
}
