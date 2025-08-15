// Register user
async function registerUser() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert("Error registering user: " + error.message);
  }
}

// Login user
async function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    alert(data.message || "Login failed");
  } catch (error) {
    alert("Error logging in: " + error.message);
  }
}

// Logout user
async function logoutUser() {
  try {
    const response = await fetch("/logout", { method: "POST" });
    const data = await response.json();
    alert(data.message || "Logged out successfully");
  } catch (error) {
    alert("Error logging out: " + error.message);
  }
}