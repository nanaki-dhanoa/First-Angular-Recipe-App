import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[];
  recipeSub: Subscription;
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSub = this.recipeService.recipeChange.subscribe(
      (state: boolean) => {
        this.recipes = this.recipeService.getRecipes();
      } 
    )
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}
