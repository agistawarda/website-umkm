"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Milk Coffee", kategori: "Susu", harga: 15000, stok: 12, unggulan: true },
  { nama: "Coffee Latte", kategori: "Latte", harga: 18000, stok: 4, unggulan: false },
  { nama: "Palm Sugar Coffee", kategori: "Aren", harga: 20000, stok: 0, unggulan: false },
  { nama: "Mocha Latte", kategori: "Latte", harga: 22000, stok: 8, unggulan: false },
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
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

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia++;
    }

    const badgeUnggulan = produk.unggulan 
      ? '<span class="badge-unggulan">⭐ Favorit</span>'
      : "";

    markup += `
      <article class="js-product-card">
        <div class="product-header">
          <h3>${produk.nama}</h3>
          ${badgeUnggulan}
        </div>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
