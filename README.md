# NutriPlanPro

NutriPlanPro is a web application designed to provide personalized diet recommendations based on individual user data such as height, weight, age, gender, physical activity level, and goals (e.g., weight gain, weight loss, or weight maintenance). The application utilizes the KD Tree algorithm to generate tailored recommendations for users. Additionally, NutriPlanPro offers visualization of macronutrient intake through graphs, the ability to save diet plans, a blog section for nutritional awareness, and a discussion forum where users can ask questions and receive responses from professionals in the field.

## Features

- **Personalized Diet Recommendations:** Input user data such as height, weight, age, gender, physical activity level, and goals to receive customized diet recommendations.
  
- **KD Tree Algorithm:** Utilizes the KD Tree algorithm to efficiently generate personalized diet plans based on user data.

- **Macro Nutrient Visualization:** Visualize macronutrient intake through interactive graphs for better understanding and tracking of dietary habits.

- **Save Diet Plans:** Users can save their personalized diet plans for future reference and tracking of progress.

- **Blog Section:** A dedicated section providing articles and information on nutrition for user awareness and education.

- **Discussion Forum:** An interactive forum where users can ask questions related to nutrition and receive responses from professionals in the field.

## Technologies Used

- **MERN Stack:** MongoDB, Express.js, React.js, Node.js for the web application development.
  
- **Python (Flask):** Utilized for the recommendation model using the KD Tree algorithm.

## Installation

To run NutriPlanPro locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/DhruvItaliya/NutriPlanPro
```

2. Install dependencies for the frontend (React.js) and start server:

```
cd frontend
npm install
npm run dev
```

3. Install dependencies for the backend (Node.js & Express.js) and start server :

```
cd backend
npm install
npm run dev
```

4. Install dependencies for the flask and start server :


```
cd flask_server
pip install Flask
pip install Flask-Cors
python app.py
```

5. Access the application via `http://localhost:5173` in your web browser.

Note: You have to setup mongodb and .env file from your own.
