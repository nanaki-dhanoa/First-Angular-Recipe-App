import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  whichIngredientEdit = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5, 'pieces'),
    new Ingredient('Tomatoes', 10, 'pieces'),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  editIngredient(index: number, edits: Ingredient) {
    // this.ingredients[index].name = edits.name;
    // this.ingredients[index].amount = edits.amount;
    this.ingredients[index] = edits;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  private mergeIngredients() {

  }
}
