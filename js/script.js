const promoButton = document.querySelector("#promoButton");

if (promoButton) {
  promoButton.addEventListener("click", () => {
    promoButton.textContent = "Beli 2 Kopi, Gratis 1!";
    console.log("Promo Ruang Kopi berhasil ditampilkan.");
  });
}

const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const menuTerbuka = navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", menuTerbuka);
    menuToggle.textContent = menuTerbuka ? "✕" : "☰";
  });
}