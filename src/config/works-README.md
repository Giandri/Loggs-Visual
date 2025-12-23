# 🎨 Works Page Configuration

File ini berisi konfigurasi untuk halaman Works yang menggunakan MotionLayer 3D.

## 📁 Struktur File
```
src/config/works.ts         # Konfigurasi works
src/app/works/page.tsx      # Halaman works
```

## ⚙️ Konfigurasi Works

### **Format Data Lengkap**
```typescript
{
  id: number,           // ID unik
  title: string,        // Judul project
  description: string,  // Deskripsi project
  imageUrl: string,     // Path gambar (/gallery/nama.jpg)
  category?: string,    // Kategori (Photography, Studio, dll)
  year?: string        // Tahun project
}
```

## 🚀 Cara Update Works

### **Menambah Project Baru**
1. **Upload gambar** ke folder `public/gallery/`
2. **Edit** `src/config/works.ts`
3. **Tambahkan entry baru**:
```typescript
{
  id: 11, // ID unik
  title: "Project Title",
  description: "Project description",
  imageUrl: "/gallery/new-image.jpg",
  category: "Photography",
  year: "2024"
}
```

### **Mengubah Project**
1. **Edit field** yang ingin diubah (title, description, category, year)
2. **Ganti gambar**: Ubah `imageUrl` ke path gambar baru
3. **Save** → otomatis update di halaman works

### **Menghapus Project**
1. Hapus object dari array `worksItems`
2. Atau comment dengan `//`

## 🎨 Tampilan di Works Page

Setiap project akan ditampilkan sebagai:
- **Gambar penuh** di bagian atas layer
- **Kategori & tahun** di pojok kanan atas
- **Judul project** dengan font besar
- **Deskripsi** di bagian bawah

## 📸 Menggunakan Gambar Gallery

Works page menggunakan gambar dari folder `public/gallery/` yang sama dengan HorizontalScroll. Jadi gambar yang sudah ada bisa digunakan untuk kedua komponen.

## 🔄 Preview

Setelah edit `works.ts`, buka `/works` untuk melihat hasilnya. Setiap project akan muncul sebagai layer 3D yang bisa di-hover dan di-scroll.

## 🎯 **Fitur Modal Interaktif**

Setiap layer di works page sekarang bisa diklik untuk membuka **modal detail lengkap** dengan:

- **Gambar penuh** dengan efek gradient
- **Informasi lengkap** project (judul, deskripsi, kategori, tahun)
- **Animasi smooth** menggunakan Framer Motion
- **Responsive design** untuk mobile dan desktop
- **Backdrop blur** dan efek visual menarik

### **Cara Menggunakan:**
1. **Hover** pada layer → muncul efek "Click to view"
2. **Klik** layer → modal terbuka dengan animasi
3. **Klik backdrop** atau tombol X → modal tertutup

## 💡 Tips

- **ID unik**: Pastikan setiap project punya ID berbeda
- **Gambar**: Gunakan gambar dengan aspect ratio yang bagus
- **Deskripsi**: Jaga agar tetap ringkas (2-3 kalimat)
- **Kategori**: Gunakan kategori yang konsisten
- **Modal**: Setiap project sekarang bisa diklik untuk detail lengkap
