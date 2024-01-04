//your JS code here. If required.
// script.js

// Function to create a Promise that resolves after a random time between min and max seconds
function createRandomPromise(min, max) {
  const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime * 1000);
  });
}

// Function to update the table with the resolved values
function updateTable(promisesResults) {
  const outputTable = document.getElementById('output');

  // Remove the loading row
  outputTable.innerHTML = '';

  // Populate the table with the required values
  promisesResults.forEach((result, index) => {
    const row = outputTable.insertRow(index);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.textContent = `Promise ${index + 1}`;
    cell2.textContent = result.toFixed(3); // Display time with 3 decimal places
  });

  // Calculate and display the total time taken
  const totalTime = promisesResults.reduce((sum, time) => sum + time, 0);
  const totalRow = outputTable.insertRow(promisesResults.length);
  const totalCell1 = totalRow.insertCell(0);
  const totalCell2 = totalRow.insertCell(1);
  totalCell1.textContent = 'Total';
  totalCell2.textContent = totalTime.toFixed(3);
}

// Create an array of three Promises
const promises = [
  createRandomPromise(1, 3),
  createRandomPromise(1, 3),
  createRandomPromise(1, 3)
];

// Add a loading row to the table
const outputTable = document.getElementById('output');
const loadingRow = outputTable.insertRow(0);
const loadingCell = loadingRow.insertCell(0);
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
  .then(results => {
    // Update the table with the resolved values
    updateTable(results);
  })
  .catch(error => console.error('Error:', error));

