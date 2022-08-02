import {Recipe} from './recipe.model'
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    recipeChange = new Subject<boolean>(); 
    private recipes: Recipe[];
 
    constructor(private slServices: ShoppingListService) {};

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Ratatouille', 
    //         'Ratatouille is a rustic southern French vegetable stew made with eggplant, bell peppers, zucchini, summer squash, onions, and tomatoes.', 
    //         'https://tse3.mm.bing.net/th/id/OIP.oPy2tElrMozcXfFMBbmYFwHaE8?pid=ImgDet&rs=1',
    //         [new Ingredient('Eggplant', 1, 'kg'),
    //         new Ingredient('Bell peppers', 1, 'kg'),
    //         new Ingredient('Zucchini', 5, 'units'),
    //         new Ingredient('Onions', 4, 'units'),
    //         new Ingredient('Tomatoes', 0.5, 'kg'),
    //         new Ingredient('Summer Squash', 2, 'units')
    //         ]
    //     ),
    
    //     new Recipe(
    //         'Warm Okra, Tomato and Bacon Salad',
    //         'This warm salad can be served as a main dish; just pair with crusty bread.', 
    //         'https://www.washingtonpost.com/resizer/HtjnxemQKS0KnbDtLvTdlhkXo6c=/arc-anglerfish-washpost-prod-washpost/public/BGNXJ4GWZQI6ZPQXFBQWJF2MKQ.jpg',
    //         [new Ingredient('Okra', 1, 'kg'),
    //         new Ingredient('Tomato', 2, 'kg'),
    //         new Ingredient('Bacon', 0.5, 'kg'),
    //         new Ingredient('Wallnuts', 1, 'handful')
    //         ]
    //     ),
    
    //     new Recipe(
    //         'Grilled Corn With Peanut Sauce',
    //         'The sauce, anchored by peanut butter, coconut milk and chiles, takes grilled ears of corn to the next level.',
    //         'https://www.washingtonpost.com/resizer/F9Vkv8au_Kq21jXEAB8pudX5jCo=/arc-anglerfish-washpost-prod-washpost/public/I3TYU4HA6MI6ZLTENMR6KFK3MI.jpg',
    //         [new Ingredient('Corn', 1, 'bob'),
    //         new Ingredient('Coconut Milk', 100, 'ml'),
    //         new Ingredient('Butter', 500, 'gm'),
    //         new Ingredient('Peanuts', 1, 'handful'),
    //         new Ingredient('Red Chilli', 4, 'units')
    //         ]
    //     )
    // ];

    getRecipes() {
        if (this.recipes === undefined) {
            return undefined
        } else {
            return this.recipes.slice();
        }
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slServices.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChange.next(true);
    }

    updateRecipe(index:number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChange.next(true);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipeChange.next(true);
    }

    setRecipe(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChange.next(true);
    }
}
    