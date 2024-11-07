const PIN = "2024";  // Set your desired PIN here

function login() {
    
    const inputPin = document.getElementById('pin').value;
    if (inputPin === PIN) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('billing').style.display = 'block';    
    } else {
        alert('Incorrect PIN. Please try again.');
    }  
}



function addItem() {
    const item = document.getElementById('item').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const total = quantity * price;

    const tableBody = document.getElementById('billingTableBody');
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).innerText = item;
    newRow.insertCell(1).innerText = quantity;
    newRow.insertCell(2).innerText = price.toFixed(2);
    newRow.insertCell(3).innerText = total.toFixed(2);

    // Create delete button
    const deleteCell = newRow.insertCell(4);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function() {
        deleteItem(newRow, total);
    };
    deleteCell.appendChild(deleteButton);

    updateTotalAmount(total);
}

function deleteItem(row, total) {
    const tableBody = document.getElementById('billingTableBody');
    tableBody.removeChild(row);
    updateTotalAmount(-total);
}

function updateTotalAmount(amount) {
    const totalAmountElem = document.getElementById('totalAmount');
    const currentTotal = parseFloat(totalAmountElem.innerText);
    const newTotal = currentTotal + amount;
    totalAmountElem.innerText = newTotal.toFixed(2);
}


function generateInvoice() {
    const tableBody = document.getElementById('billingTableBody').innerHTML;
    const totalAmount = document.getElementById('totalAmount').innerText;

    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(`
        <html>
        <head>
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                table, th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
                h2, h3 {
                    margin-top: 0;
                }

                button {
                    background-color: white;
                    color: black;
                    border-radius: 5px;
                    justify-content: center;
            
                }

                p {
                    font-family: Courier New;
                    color: black;
                }

                script {
                    font-family: Courier New;
                }

            </style>
        </head>
        <body>
            <h1>DABAA Inc. </h1>
            <h2>Invoice</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableBody}
                     <p>This invoice is generated on </p>
                        <p id="demo"></p>

                        <script>
                        const d = new Date();
                        this
                        document.getElementById("demo").innerHTML = d;
                        </script>
                </tbody>
            </table>
            <h3>Total Amount: ৳${totalAmount}</h3>
            <button onclick="window.print()">Print Invoice</button>
        </body>
        </html>
    `);
    invoiceWindow.document.close();
}
