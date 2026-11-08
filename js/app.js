"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Milk Coffee", kategori: "Susu", harga: 15000, stok: 12, unggulan: true },
  { nama: "Coffee Latte", kategori: "Latte", harga: 18000, stok: 4, unggulan: false },
  { nama: "Palm Sugar Coffee", kategori: "Aren", harga: 20000, stok: 0, unggulan: false },
  { nama: "Mocha Latte", kategori: "Latte", harga: 22000, stok: 8, unggulan: false },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Susu":
      return "Kopi Susu";
    case "Latte":
      return "Kopi Latte";
    case "Aren":
      return "Kopi Gula Aren";
    default:
      return "Produk Ruang Kopi";
  }
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const badgeUnggulan = produk.unggulan
    ? '<span class="badge-unggulan">⭐ Favorit</span>'
    : "";

  const kategori = labelKategori(produk.kategori);
  const labelAksi = produk.stok > 0
    ? "Siap dipesan"
    : "Hubungi admin";

  return `
    <article class="js-product-card">
      <div class="product-header">
        <h3>${produk.nama}</h3>
        ${badgeUnggulan}
      </div>
      <p>${kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
      <p>${labelAksi}</p>
    </article>
  `;
}

produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);
