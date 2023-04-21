class Storage {
    static getCalorieLimit(defaultValue = 2000) {
        let calorieLimit;

        if (localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultValue

        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }

        return calorieLimit;
    }

    static setCalorieLimit(value) {
        localStorage.setItem('calorieLimit', value);
    }

    static getTotalCalories(defaultValue = 0) {
        let totalCalories;

        if (localStorage.getItem('totalCalories') === null){
            totalCalories = defaultValue;

        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        }

        return totalCalories;
    }

    static setTotalCalories(value) {
        localStorage.setItem('totalCalories', value)
    }

    static getMeals() {
        let meals;

        if (localStorage.getItem('meals') === null) {
            meals = []

        } else {
            meals = JSON.parse(localStorage.getItem('meals'))
            
        }

        return meals;
    }

    static setMeals(value) {
        localStorage.setItem('meals', JSON.stringify(value))
    }

    static getWorkouts() {
        let workouts;

        if (localStorage.getItem('workouts') === null) {
            workouts = [];

        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'))
        }

        return workouts
    }

    static setWorkouts(value) {
        localStorage.setItem('workouts', JSON.stringify(value))
    }

    static clearAll() {
        localStorage.removeItem('totalCalories')
        localStorage.removeItem('meals')
        localStorage.removeItem('workouts')
    }
}

export default Storage