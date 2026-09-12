const promoButton = document.querySelector("#promoButton");

promoButton.addEventListener("click", () => {
  promoButton.textContent = "Beli 2 Kopi, Gratis 1!";
  console.log("Promo Ruang Kopi berhasil ditampilkan.");
});