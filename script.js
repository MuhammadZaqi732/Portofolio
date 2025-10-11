// Tombol copy email
document.querySelector(".copy-email").addEventListener("click", (e) => {
  e.preventDefault();
  navigator.clipboard.writeText("yourname@gmail.com");
  alert("Email copied!");
});

// Tombol View Collection
function viewCollection(project) {
  if (project === "tokopedia") {
    window.open("https://drive.google.com/your-tokopedia-folder", "_blank");
  } else if (project === "poster") {
    window.open("https://drive.google.com/your-design-folder", "_blank");
  }
}
