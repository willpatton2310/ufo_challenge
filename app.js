// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  if(data.length === 0)
  {
    let row = tbody.append("tr");
    let cell = row.append("td");
    cell.text("No records found for these filter parameters");
    return;
  }
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = [
  {
    id: "datetime",
    value: "xxxx",
    goodToGo: false,
  },
  {
    id: "city",
    value: "xxxx",
    goodToGo: false,
  },
  {
    id: "state",
    value: "xxxx",
    goodToGo: false,
  },
  {
    id: "country",
    value: "xxxx",
    goodToGo: false,
  },
  {
    id: "shape",
    value: "xxxx",
    goodToGo: false,
  },
];

// 3. Use this function to update the filters.
function updateFilters() {
  // 4a. Save the element that was changed as a variable.
  var filter = d3.select(this).node();
  // 4b. Save the value that was changed as a variable.
  var filterValue = filter.value;
  // 4c. Save the id of the filter that was changed as a variable.
  var filterId = filter.id;
  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  //console.log(filterValue);
  var result = filters.find((item) => item.id === filterId);
  if (result.value === filterValue) {
    result.goodToGo = false;
  } else {
    result.value = filterValue;
    if(result.value !== "")
      result.goodToGo = true;
    else
      result.goodToGo = false;
  }
  //console.log(filters);
  // 6. Call function to apply all filters and rebuild the table
  filterTable();
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
  // 8. Set the filtered data to the tableData.
  var data = [];
  var count = 0;
  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  tableData.forEach((dataRow) => {
    count=0;
    var array = Object.values(dataRow);
    //console.log(dataRow);
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].goodToGo) {
        if (array[i] === filters[i].value) {
           count++;
        }
      }
      else{
        count++;
      }
    }
    if(count==5){
      data.push(dataRow);
    }
  });
  // 10. Finally, rebuild the table using the filtered data
  buildTable(data);
}

// 2. Attach an event to listen for changes to each filter
const datetime = document.getElementById("datetime");
datetime.addEventListener("change", updateFilters);

const city = document.getElementById("city");
city.addEventListener("change", updateFilters);

const state = document.getElementById("state");
state.addEventListener("change", updateFilters);

const country = document.getElementById("country");
country.addEventListener("change", updateFilters);

const shape = document.getElementById("shape");
shape.addEventListener("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
