
function createMealInputs() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];

    let mealInputsHTML = '';

    days.forEach(day => {
        mealInputsHTML += `<div class="day-meals"><h3>${day}</h3>`;
        meals.forEach(meal => {
            const inputId = `${day.toLowerCase()}${meal}`;
            mealInputsHTML += `
                <label for="${inputId}">${meal}:</label>
                <input type="text" id="${inputId}">
            `;
        });
        mealInputsHTML += `</div>`;
    });

    document.getElementById('mealInputs').innerHTML = mealInputsHTML;
}

createMealInputs();

// generate meal plan
function generateMealPlan() {

    const emailInput = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const goal = document.getElementById('goal').value;

    // Capture meal inputs
    const mealPlan = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];

    days.forEach(day => {
        mealPlan[day] = {};
        meals.forEach(meal => {
            const inputId = `${day.toLowerCase()}${meal}`;
            mealPlan[day][meal] = document.getElementById(inputId).value;
        });
    });
}

// clear the meal planner
function clearMealPlan() {
    document.getElementById('mealPlanForm').reset();
}

// print the meal planner
function printMealPlan() {
    window.print();
}

// download the meal planner
function downloadMealPlan() {
    const content = document.documentElement.outerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'meal_plan.html';
    a.click();

    window.URL.revokeObjectURL(url);
}
