"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Milk Coffee", kategori: "Kopi", harga: 15000, stok: 12, unggulan: true },
  { nama: "Coffee Latte", kategori: "Kopi", harga: 18000, stok: 4, unggulan: false },
  { nama: "Palm Sugar Coffee", kategori: "Kopi", harga: 20000, stok: 0, unggulan: false },
  { nama: "Mocha Latte", kategori: "Kopi", harga: 22000, stok: 8, unggulan: false },
  { nama: "Paket Minum", kategori: "Bundling", harga: 75000, stok: 12, unggulan: false },
  { nama: "Paket Seduh", kategori: "Bundling", harga: 83000, stok: 5, unggulan: false },
];

  const produkGrid = document.querySelector("#produk-dinamis");
  const produkRingkasan = document.querySelector("#produk-ringkasan");
  const tombolFilter = document.querySelectorAll("[data-filter]");
  const produkUnggulanEl = document.querySelector("#produk-unggulan");

  function formatRupiah(nilai) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(nilai);
  }

  function statusStok(stok) {
    if (stok <= 0) {
      return { label: "Habis", className: "empty" };
    }

    if (stok <= 5) {
      return { label: "Stok terbatas", className: "warning" };
    }

    return { label: "Tersedia", className: "" };
  }

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  function buatElemenProduk(produk) {
    const card = document.createElement("article");
    card.classList.add("product-card", "js-product-card");

    const header = document.createElement("div");
    header.classList.add("product-header");

    const title = document.createElement("h3");
    title.textContent = produk.nama;
    header.append(title);

    if (produk.unggulan) {
      const badge = document.createElement("span");
      badge.classList.add("badge-unggulan");
      badge.textContent = "⭐ Favorit";
      header.append(badge);
    }

    const category = document.createElement("p");
    category.classList.add("category-note");
    category.textContent = produk.kategori;

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = formatRupiah(produk.harga);

    const stock = document.createElement("span");
    const status = statusStok(produk.stok);
    stock.classList.add("stock-badge");
    if (status.className) {
      stock.classList.add(status.className);
    }
    stock.textContent = status.label;

    const aksi = document.createElement("p");
    aksi.textContent = produk.stok > 0 ? "Beli Sekarang" : "Stok Habis";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Sembunyikan";
    removeButton.classList.add("ghost-button");

    removeButton.addEventListener("click", () => {
      card.remove();

      const sisa = produkGrid.querySelectorAll(".product-card").length;
      const tersedia = produkGrid.querySelectorAll(".stock-badge:not(.empty)").length;

      produkRingkasan.textContent = sisa === 0
        ? "Semua kartu disembunyikan sementara. Klik tombol filter untuk menampilkannya lagi."
        : `${tersedia} produk tersedia dari ${produkGrid.dataset.total} data.`;
    });


    card.append(header, category, price, stock, aksi, removeButton);
    return card;
  }

  function buatEmptyState(kategori) {
    const empty = document.createElement("p");
    empty.classList.add("empty-state");
    empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
    return empty;
  }

  function renderProduk(kategoriAktif = "Semua") {
    if (!produkGrid || !produkRingkasan) {
      console.warn("Target render produk tidak ditemukan.");
      return;
    }

    const produkTampil = kategoriAktif === "Semua"
      ? produkUmkm
      : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

    const produkTersedia = produkTampil.filter((produk) => produk.stok > 0);

    if (produkRingkasan) {
      produkRingkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
    }

    produkGrid.replaceChildren();

    if (produkTampil.length === 0) {
      produkGrid.append(buatEmptyState(kategoriAktif));
      produkRingkasan.textContent = "0 produk ditemukan.";
      return;
    }

    produkTampil.forEach((produk) => {
      produkGrid.append(buatElemenProduk(produk));
    });

    produkGrid.dataset.total = produkTampil.length;
    produkRingkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkTampil.length} data.`;

    console.table(produkTampil);
  }

  tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", (event) => {
      const tombolAktif = event.currentTarget;
      const kategori = tombolAktif.dataset.filter;

      tombolFilter.forEach((item) => item.classList.remove("is-active"));
      tombolAktif.classList.add("is-active");

      renderProduk(kategori);
    });
  });

  renderProduk();