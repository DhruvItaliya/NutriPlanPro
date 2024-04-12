from flask import Flask,jsonify, request
from flask_cors import CORS 
import pandas as pd 
import numpy as np 
import joblib 
df=pd.read_csv('newbase_11_04.csv') 
# del df[df.columns[0],df.columns[2],df.columns[7],df.columns[8],df.columns[9],df.columns[10]] 
columns_to_drop = [df.columns[0], df.columns[7], df.columns[8], df.columns[9]]
df.drop(columns=columns_to_drop, inplace=True)
df=np.array(df) 
model=joblib.load('woTree.pkl') 

app = Flask(__name__) 
CORS(app,supports_credentials=True)
# CORS(app)

@app.route("/")
def index():
        return "Hello, World!"

def cal_nutrient(data): 
   bmi=float(data['weight'])*10**4/float(data['height'])**2 
   if data['gender']=='male': 
      bmr=88.362 + 13.397*float(data['weight']) + 4.799*float(data['height'])-5.677*float(data['age']) 
   else: 
      bmr=447.593 + 9.247*float(data['weight']) + 3.098*float(data['height']) - 4.330*float(data['age']) 
    
   phyFactor=[ 1.2 , 1.375 , 1.55 , 1.725 , 1.9 ] 
   tdee=bmr*phyFactor[int(data['phyAct'])] 
   return [round(bmi,2), round(bmr,2),round(tdee,2)] 
 
@app.route('/submit',methods=["POST"]) 
def submit(): 
   if request.method=="POST": 
      data=request.get_json()
      calvalues=cal_nutrient(data) 
      cal=calvalues[2] 
      if data['goal']=="Loss Weight": 
         cal-=500.0 
      elif data['goal']=="Gain Weight": 
         cal+=850.0 
      calvalues[2]=cal
      cal/=int(data['meals_per_day']) 
      query_vec=[cal,0.2*cal,0.5*cal,0.3*cal] 
      dist, ind=model.query([query_vec],k=10) 
      meals=df[ind[0]] 
      print(meals)
      return jsonify({
            "success":True,
            "data": data,
            "calvalues": calvalues,
            "meals": meals.tolist(),  # Convert to list if meals is not a simple data structure
            "mealsperday": int(data['meals_per_day']),
            "goal": data['goal']
        })

   
   return jsonify({
            # "data": request.form,
            "success":False,
        })
 
if __name__ == '__main__': 
   app.run(debug=True) 