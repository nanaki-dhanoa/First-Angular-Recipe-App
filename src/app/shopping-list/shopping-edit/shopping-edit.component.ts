import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) Ingform: NgForm;
  editIngSub: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this. editIngSub = this.slService.whichIngredientEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.Ingform.form.setValue({
          name: this.slService.getIngredient(index).name,
          amount: this.slService.getIngredient(index).amount
        })
      }
    );
  }

  onAddItem() {
    if (this.editMode) {
      this.slService.editIngredient(this.editedItemIndex, this.Ingform.value);
      this.editMode = false;
    } else {
      this.slService.addIngredient(this.Ingform.value);
    }
    this.Ingform.reset();
  }

  onClear() {
    this.Ingform.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editIngSub.unsubscribe();
  }

}
