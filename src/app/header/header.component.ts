import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() fontSelected = new EventEmitter<string>();
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dsService: DataStorageService,
    private authService: AuthService){}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user) => {
        this.isAuthenticated = !user ? false : true;
        // this.isAuthenticated = !!user;
      }
    );
  }
  fonts: string[] = [
    'Arial',
    'Times New Roman',
    'Fanatsy',
    'Georgia',
    'Cursive'
  ]
  onFontSelection(font: string) {
    this.fontSelected.emit(font);
  }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe(
      (response) => {
        alert('Recipes fetched successfully!')
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
