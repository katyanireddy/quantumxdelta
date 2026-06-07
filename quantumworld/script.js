function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-280px";
    overlay.classList.add("hidden");
  } else {
    sidebar.style.left = "0px";
    overlay.classList.remove("hidden");
  }
}

function openAdmin() {

  const password = prompt("Enter Admin Password");

  if (password === "Quantum@2026") {

    localStorage.setItem("adminAuth", "true");

    window.location.href = "admin.html";

  } else {

    alert("Wrong Password ❌");

  }

}