// projectJS.js
// Function to dynamically create meal input fields
function createMealInputs() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];

    let mealInputsHTML = '';

    days.forEach(day => {
    mealInputsHTML += `<div class="day-meals"><h3>${day}</h3>`;
    meals.forEach(meal => {
        const inputId = `${day.toLowerCase()}${meal}`;
        mealInputsHTML += `<label for="${inputId}">${meal}:</label><input type="text" id="${inputId}">`;
    });
    mealInputsHTML += `</div>`;
    });

    document.getElementById('mealInputs').innerHTML = mealInputsHTML;
}
  createMealInputs();

// Function to generate meal plan
function generateMealPlan() {
    // Validation
    const emailInput = document.getElementById('email').value;
    if (!validateEmail(emailInput)) {
        alert('Please enter a valid email address.');
        return;
    }

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

    // Create HTML content
    let htmlContent = `<html>\n<head>\n<title>Your Meal Plan</title>\n</head>\n<body>\n`;
    htmlContent += `<h1>Your Meal Plan</h1>`;
    htmlContent += `<p>Name: ${name}</p>`;
    htmlContent += `<p>Email: ${emailInput}</p>`;
    htmlContent += `<p>Weekly Goal: ${goal}</p>`;
    
    htmlContent += `<h2>Meal Plan for the Week</h2>`;
    for (const day in mealPlan) {
        htmlContent += `<h3>${day}</h3>`;
        htmlContent += `<ul>`;
        for (const meal in mealPlan[day]) {
            htmlContent += `<li><strong>${meal}:</strong> ${mealPlan[day][meal]}</li>`;
        }
        htmlContent += `</ul>`;
    }

    htmlContent += `</body>\n</html>`;

    // Open a new window 
    const flyWindow = window.open('about:blank', 'myPop', 'width=600,height=400,left=200,top=200');
    flyWindow.document.write(htmlContent);
}

// validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
