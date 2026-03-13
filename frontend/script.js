const API_BASE_URL = "http://localhost:5000/api";  

// Function to show only the selected section
function showPage(pageId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => section.classList.add("hidden")); // Hide all sections
    document.getElementById(pageId).classList.remove("hidden"); // Show selected section
}

// Register User
document.getElementById("registerForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        alert(data.message || "Registration failed");
    } catch (error) {
        console.error("Error:", error);
    }
});

// Login User
document.getElementById("loginForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login Successful!");
            localStorage.setItem("token", data.token); // Save token
        } else {
            alert("Login Failed: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Register Donor
document.getElementById("donorForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        return;
    }

    const donorData = {
        name: document.getElementById("donorName").value,
        blood_type: document.getElementById("donorBloodType").value,
        location: document.getElementById("donorLocation").value,
        phone: document.getElementById("donorPhone").value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/donors/register_donor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(donorData)
        });

        const data = await response.json();
        alert(data.message || "Error registering donor");
    } catch (error) {
        console.error("Error:", error);
    }
});

// Fetch Donors List
document.getElementById("getDonors")?.addEventListener("click", async function() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/donors/donors`, {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}`
            }
        });

        const donors = await response.json();

        if (response.ok) {
            const donorsList = document.getElementById("donorsList");
            donorsList.innerHTML = "";

            if (donors.length === 0) {
                donorsList.innerHTML = "<p>No donors available.</p>";
                return;
            }

            donors.forEach(donor => {
                const li = document.createElement("li");
                li.textContent = `${donor.name} - ${donor.location} - Phone: ${donor.phone}`;
                donorsList.appendChild(li);
            });
        } else {
            alert("Error fetching donors: " + donors.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
