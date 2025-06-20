let currentPage = 1;

async function getData(page, isRecursiveCall = false) {
    // Use fetch to retrieve data over the network from an API endpoint
    const url = `http://localhost:9000/api/socks/${page}/10`;
    const socks = await fetch(url).then(res => res.json());

    if(socks.length === 0 && !isRecursiveCall){
        alert("No more socks, going back to beginning...")
        currentPage = 1
        getData(currentPage, true)
    }

    updateHTML(socks);  // Update HTML after data is fetched
}

function updateHTML(socks) {
    // Create a table element
    let table = document.getElementById('dataTable');
    table.innerHTML = ''; // Clear existing table content

    // Create a table header row
    let headerRow = document.createElement('tr');
    let headers = ['Color', 'Size', 'Pattern', 'Material', 'Condition', 'For Foot']; 
    headers.forEach(header => {
        let th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows for each sock
    socks.forEach(sock => {
        let row = document.createElement('tr');
        let colorCell = document.createElement('td');
        colorCell.innerText = sock.sockDetails.color;
        row.appendChild(colorCell);

        let sizeCell = document.createElement('td');
        sizeCell.innerText = sock.sockDetails.size;
        row.appendChild(sizeCell);

        let patternCell = document.createElement('td');
        patternCell.innerText = sock.sockDetails.pattern;
        row.appendChild(patternCell);

        let materialCell = document.createElement('td');
        materialCell.innerText = sock.sockDetails.material;
        row.appendChild(materialCell);

        let conditionCell = document.createElement('td');
        conditionCell.innerText = sock.sockDetails.condition;
        row.appendChild(conditionCell);

        let forFootCell = document.createElement('td');
        forFootCell.innerText = sock.sockDetails.forFoot;
        row.appendChild(forFootCell);

        // Append the row to the table
        table.appendChild(row);
    });
}

document.getElementById('loadSocksButton').addEventListener('click', () => {
    currentPage++; // Increment the page number for the next fetch
    getData(currentPage);
});

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    getData(currentPage);
  });