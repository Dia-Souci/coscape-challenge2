const inputElement = document.getElementById('numberIn');
const buttonValidation = document.getElementById('validate')

    // Add event listener for the "input" event
    buttonValidation.addEventListener('click', function(event) {
      // Retrieve the value of the input field after each change
      const inputValue = inputElement.value;
      console.log('Input value:', inputValue);
      readStaticFile(inputValue);
    });

function readStaticFile(inputValue) {
    let int = +inputValue
    let file =''
    if((!int)||(int>45)||(int<1)){
         file = './data/walmart_simple.xlsx';
    }else{
         file = './data/walmart_simple_store_N_'+inputValue+'.xlsx';
    }
    
    const reader = new FileReader();

    reader.onload = function(event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      
      // Assuming the first sheet in the workbook contains the data
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet to JSON format
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Display the JSON data
      //document.getElementById('output').innerHTML = JSON.stringify(jsonData);
      console.log(jsonData)
      const labels = jsonData[0]; 
      console.log(labels)// Assuming the first column contains labels
        const values = jsonData.slice(1).map(row => row[0]); // Assuming the second column contains values

        // Create a Chart.js chart
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: [1,2,3,4,5,6,7,8,9,10,11,12],
            datasets: [{
              label: '2010',
              data: values,
              borderColor: 'rgb(75, 192, 192)',
              fill: false
            },
            {
                label: '2011',
                data: jsonData.slice(1).map(row => row[1]),
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            },
            {
                label: '2012',
                data: jsonData.slice(1).map(row => row[2]),
                borderColor: 'rgb(54, 162, 235)',
                fill: false
            }
        ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
    };

    // Fetch the file content using fetch API
    fetch(file)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const data = new Uint8Array(buffer);
        reader.readAsBinaryString(new Blob([data]));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Call the function to read the static file
  

 