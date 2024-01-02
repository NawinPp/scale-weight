document.addEventListener("DOMContentLoaded", function () {
    // Function to update values based on data received
    function updateValues(data) {
        // Update kilograms
        //document.getElementById('kilo').innerText = data.esp32Weight.toFixed(2) + ' <sub>Kg</sub>';

        // Update grams
        document.getElementById('gg').innerText = (data.esp32Weight * 1000).toFixed(2) + ' g';

        // Update pounds
        document.getElementById('lbb').innerText = (data.esp32Weight * 2.20462).toFixed(2) + ' lb';

        // Update price (arbitrary exchange rate)
        document.getElementById('thbaht').innerText = (data.esp32Weight * 30).toFixed(2) + ' baht';

        // Update values from external API
        document.getElementById('externalValue').innerText = data.externalValue.toFixed(2);
    }
    


    // Fetch data from both ESP32 API and external API
    function fetchData() {
        // Fetch data from ESP32 API
        const esp32Promise = fetch('/api/getData') // Change the URL to match your ESP32 API endpoint
            .then(response => response.json());

        // Fetch data from external API
        const externalApiPromise = fetch('https://api.render.com/deploy/srv-cm790m6d3nmc73cfo940?key=s1y6YXI6zNI')
            .then(response => response.json());

        // Wait for both promises to resolve
        Promise.all([esp32Promise, externalApiPromise])
            .then(([esp32Data, externalData]) => {
                // Combine data from both sources
                const combinedData = {
                    esp32Weight: esp32Data.weight,
                    externalValue: externalData.someKey, // Replace with the actual key in your external API response
                };

                // Update the values on the page
                updateValues(combinedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch data when the page loads
    fetchData();

    // Periodically fetch data (every 5 seconds in this example)
    setInterval(fetchData, 5000);
});
