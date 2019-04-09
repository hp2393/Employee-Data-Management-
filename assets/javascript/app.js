/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyDjD4HFpcN7wvD9s4Jxvk_3rH9zf66TEjU",
  authDomain: "employee-timesheet-830b8.firebaseapp.com",
  databaseURL: "https://employee-timesheet-830b8.firebaseio.com",
  projectId: "employee-timesheet-830b8",
  storageBucket: "employee-timesheet-830b8.appspot.com",
  messagingSenderId: "607271234868"
};
  
firebase.initializeApp(config);
  
// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Initial Values
var person = {
  name: "",
  role: "",
  startDate: 0,
  monthlyRate: 0,
}

var employees = [];

// --------------------------------------------------------------

// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref("/employeeData").on("child_added", function(snapshot) {
 
  var employee = snapshot.val();
  console.log(employee);

  printTable( employee );

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});
  
// --------------------------------------------------------------
  
// Whenever a user clicks the submit-bid button
$("#add-button").on("click", function(event) {
  event.preventDefault();
  
  // Get the input values
  var newName = $("#employee-name-input").val().trim();
  var newRole = $("#role-input").val().trim();
  var newStartDate = $("#start-date-input").val().trim();
  var newMonthlyRate = $("#monthly-rate-input").val().trim();

  // Save the new price in Firebase
  database.ref("/employeeData").push({
    name: newName,
    role: newRole,
    startDate: newStartDate,
    monthlyRate: newMonthlyRate,
  });

});

// --------------------------------------------------------------

function printTable( employee) {
  function convertingDates () {
    var currentFormat = "MM/DD/YYYY";
    var convertedDate = moment(employee.startDate, currentFormat);

    return (convertedDate.diff(moment(), "months") * -1);
  }

  var difference = convertingDates();
  console.log(difference);    

  var b = $("<tr>");

    $(b).append("<td>" + employee.name + "</td>");
    $(b).append("<td>" + employee.role + "</td>");
    $(b).append("<td>" + employee.startDate + "</td>");
    $(b).append("<td>" + employee.monthlyRate + "</td>");
    $(b).append("<td>" + (parseInt(employee.monthlyRate) * difference) + "</td>");
  
  $("#table-employee").append(b);

}
  