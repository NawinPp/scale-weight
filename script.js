document.addEventListener("DOMContentLoaded", function () {
    // Function to update values based on data received from ESP32
    function updateValues(data) {
        // Update kilograms
        document.getElementById('kilo').innerText = data.kg.toFixed(2) + ' <sub>Kg</sub>';

        // Update grams
        document.getElementById('gg').innerText = data.grams.toFixed(2) + ' g';

        // Update pounds
        document.getElementById('lbb').innerText = data.pounds.toFixed(2) + ' lb';

        // Update price
        document.getElementById('thbath').innerText = data.price.toFixed(2) + ' bath';
    }

    // Fetch data from ESP32 every 2 seconds
    function fetchData() {
        fetch('/api/getData') // Change the URL to match your ESP32 API endpoint
            .then(response => response.json())
            .then(data => {
                updateValues(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch data when the page loads
    fetchData();

    // Periodically fetch data (every 2 seconds in this example)
    setInterval(fetchData, 2000);
});
