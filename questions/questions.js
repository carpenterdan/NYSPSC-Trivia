var questions;
var hardQuestions;

function SetUpQuestions() {
	var questionList = { "questions": [
		{"question": "What does ESCO stand for?", "answer": "Energy Supply Company", "other1": "Eggs Scrambled and Cooked", "other2": "Environmental Supply Corporation", "other3": "Extraterrestrial Space Communications", "correct": "", "used": "","category": "misc"},
		{"question": "What supplies are recommended during a power outage?", "answer": "All are correct", "other1": "Battery-powered radios", "other2": "Flashlight", "other3": "Water", "correct": "", "used": "", "category": "elec"},
		{"question": "How much water does an average NY'er use per day?", "answer": "50 gallons", "other1": "25 gallons", "other2": "75 gallons", "other3": "100 gallons", "correct": "", "used": "", "category": "water"},
		{"question": "What utility service does the NYS Public Service Commission regulate?", "answer": "All are correct", "other1": "Gas", "other2": "Electric", "other3": "Water", "correct": "", "used": "", "category": "misc"},
		{"question": "Compact fluorescent bulbs reduce electricity use by:","answer":"75%","other1":"10%","other2":"15%","other3":"50%","correct":"","used":"", "category": "elec"},
		{"question": "Which of the following is most energy-efficient?","answer":"LED bulb","other1":"Incandescent bulb","other2":"Compact Fluorescent bulb","other3":"All are equally efficient","correct":"","used":"", "category": "elec"},
		{"question": "What does LED stand for?","answer":"Light Emitting Diode","other1":"Like Energy Dividers","other2":"Low Energy Demand","other3":"None are correct","correct":"","used":"", "category": "elec"},
		{"question": "Natural gas is mainly transported by:","answer":"Pipelines","other1":"Cars","other2":"Trains","other3":"Planes","correct":"","used":"", "category": "gas"},
		{"question": "What is the average amount of energy that can be saved by turning the thermostat down 10 degrees at night?","answer":"10%","other1":"3%","other2":"5%","other3":"12%","correct":"","used":"", "category": "elec"},
		{"question": "What country is the leading producer in natural gas?","answer":"United States","other1":"Canada","other2":"China","other3":"Texas","correct":"","used":"", "category": "misc"},
		{"question": "What uses the most energy in the average home?","answer":"Heating and Cooling","other1":"Lighting","other2":"Water Heater","other3":"Watching TV","correct":"","used":"", "category": "misc"},
		{"question": "Which of the following uses the most water?","answer":"Taking a bath/shower","other1":"Washing the car","other2":"A load of laundry","other3":"The dishwasher","correct":"","used":"", "category": "water"},
		{"question": "Electricity is measured in:","answer":"Kilowatt hours","other1":"Kilowatt days","other2":"Megawatt seconds","other3":"Therm hours","correct":"","used":"", "category": "elec"},
		{"question": "What does kWh stand for?","answer":"Kilowatt hours","other1":"Keep Watts Home","other2":"Keeps Well Heated","other3":"None are correct","correct":"","used":"", "category": "elec"},
		{"question": "What does the PSC stand for in NYSPSC?","answer":"Public Service Commission","other1":"Periodic Sample Count","other2":"Primary Supply Center","other3":"Program Support Center","correct":"","used":"", "category": "misc"},
		{"question": "PSC's Office of Telecommunications oversees what type of companies?","answer":"Telecommunications and cable","other1":"Waste management and insurance","other2":"Water and Sewer","other3":"None are correct","correct":"","used":"", "category": "phone"},
		{"question": "Telephone service can be provided by which of the following?","answer":"All are correct","other1":"Broadband","other2":"Landline","other3":"Wireless/Mobile","correct":"","used":"", "category": "phone"}
		]
	};
	questions = questionList.questions;
	
	var hardQuestionList = { "hardQuestions": [
		{"question": "Water Question1","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "water"},
		{"question": "Water Question2","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "water"},
		{"question": "Elec Question3","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "elec"},
		{"question": "Elec Question4","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "elec"},
		{"question": "Gas Question5","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "gas"},
		{"question": "Gas Question6","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "gas"},
		{"question": "Phone Question7","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "phone"},
		{"question": "Phone Question8","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "phone"},
		{"question": "Water Question9","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "water"},
		{"question": "Elec Question10","answer":"Correct","other1":"Wrong","other2":"Wrong 2","other3":"Wrong 3","correct":"","used":"", "category": "elec"}		
		]
	};
	hardQuestions = hardQuestionList.hardQuestions;
}

