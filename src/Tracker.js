import Storage from './Storage'

class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories(0);
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

        document.getElementById('limit').value = this._calorieLimit
    }

    addMeal(meal) {
        this._meals.push(meal);
        Storage.setMeals(this._meals);   
        Storage.setTotalCalories(this._totalCalories += meal.calories);
        this._displayNewMeal(meal);
        this._render();
    }

    removeMeal(id) {
        const mealToRemove = this._meals.find(meal => meal.id === id);

        if (mealToRemove) {
            Storage.setTotalCalories(this._totalCalories -= mealToRemove.calories);
            this._meals.splice(this._meals.indexOf(mealToRemove), 1);
            Storage.setMeals(this._meals);  
            this._render();
        }
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        Storage.setWorkouts(this._workouts);
        Storage.setTotalCalories(this._totalCalories -= workout.calories);
        this._displayNewWorkout(workout);
        this._render();
    }

    removeWorkout(id) {
        const workoutToRemove = this._workouts.find(workout => workout.id === id);
        
        if (workoutToRemove) {
            Storage.setTotalCalories(this._totalCalories += workoutToRemove.calories);
            this._workouts.splice(this._workouts.indexOf(workoutToRemove), 1);
            Storage.setWorkouts(this._workouts);
            this._render();
        }
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this._render();
    }

    changeLimit(value) {
        this._calorieLimit = value;
        Storage.setCalorieLimit(value);
        this._displayCaloriesLimit();
        this._render();
    }

    
    loadMealsAndWorkouts() {
        this._meals.map(meal => this._displayNewMeal(meal))
        this._workouts.map(workout => this._displayNewWorkout(workout))
    }


    _displayCaloriesTotal() {
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        caloriesConsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        caloriesBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining() {
        const progressEl = document.getElementById('calorie-progress');
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;
        caloriesRemainingEl.innerHTML = remaining;

        if (remaining <= 0) {
            caloriesRemainingEl.parentElement.parentElement.className = ('card bg-danger');
            progressEl.className = 'progress-bar bg-danger'
        } else {
            caloriesRemainingEl.parentElement.parentElement.className = ('card bg-light');
            progressEl.className = 'progress-bar'
        }
    }

    _displayCaloriesProgress() {
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;
    }

    _displayNewMeal(meal) {
        const mealsEl = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);
        mealEl.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`;
        mealsEl.appendChild(mealEl);
    }

    _displayNewWorkout(workout) {
        const workoutsEl = document.getElementById('workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);
        workoutEl.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
                <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                    ${workout.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        `;
        workoutsEl.appendChild(workoutEl);
    }

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

export default CalorieTracker;