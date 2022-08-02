import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, take, exhaustMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { LoadingSpinnerService } from './loading-spinner/loading-spinner.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private loadingService: LoadingSpinnerService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-app-project-9811a-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
                alert('Your recipes have been saved!');
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://recipe-app-project-9811a-default-rtdb.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }), tap(recipes => {
                this.recipeService.setRecipe(recipes);
                this.loadingService.isLoading.next(false);
            })
        );
    }
}
