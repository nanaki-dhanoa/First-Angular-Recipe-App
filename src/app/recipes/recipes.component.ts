import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }
  ngOnInit() {
    this.route.data.subscribe();
  }


}
