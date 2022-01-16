const navbar = document.getElementById("navbar");

function toggleMenu() {
    navbar.classList.toggle("w3-show")
}

function showModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "block";
}

function hideModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "none";
}