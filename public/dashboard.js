// Fetch data from JSON file
fetch('/data')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('data-table-body');
        const rowDataMap = new Map();

        data.forEach((item, index) => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);
            
            const emailCell = document.createElement('td');
            emailCell.textContent = item.email;
            row.appendChild(emailCell);
            
            const messageCell = document.createElement('td');
            messageCell.textContent = item.message;
            row.appendChild(messageCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = item.date;
            row.appendChild(dateCell);
            
            rowDataMap.set(row, index); // Map the row to its index

            row.addEventListener('click', () => {
                const indexToDelete = rowDataMap.get(row);

                // Create the request body with the item index
                const requestBody = { index: indexToDelete };

                // Send a POST request to /delete
                fetch('/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                })
                .then(response => response.json())
                .then(responseData => {
                    if (responseData.message === 'Mesajul a fost primit') {
                        // Remove the row from the table
                        tableBody.removeChild(row);
                        rowDataMap.delete(row); // Remove the row from the map

                        // Update indices in the map
                        rowDataMap.forEach((value, key) => {
                            if (value > indexToDelete) {
                                rowDataMap.set(key, value - 1);
                            }
                        });
                    } else {
                        console.log('Error deleting row:', responseData.message);
                    }
                })
                .catch(error => {
                    console.log('Error deleting row:', error);
                });
            });

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
