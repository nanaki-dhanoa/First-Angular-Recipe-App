import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { LoadingSpinnerService } from '../shared/loading-spinner/loading-spinner.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dsService: DataStorageService,
        private recipeService: RecipeService) { }
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
        const recipes = this.recipeService.getRecipes();
        if (recipes === undefined) {
            return this.dsService.fetchRecipes();
        } else {
            return recipes;
        }

    }
}