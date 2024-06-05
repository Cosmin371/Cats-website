// Fetch data from JSON file
fetch('/data')
.then(response => response.json())
.then(data => {
    const tableBody = document.getElementById('data-table-body');
    
    data.forEach(item => {
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
        
        tableBody.appendChild(row);
    });
})
.catch(error => {
    console.log('Error fetching data:', error);
});