# 🎨 Gallery Configuration Guide

File ini berisi konfigurasi gambar untuk komponen HorizontalScroll.

## 📁 Struktur Folder
```
src/config/gallery.ts     # Konfigurasi gambar
public/gallery/           # Folder untuk gambar lokal
```

## 🚀 Cara Upload & Menambah Gambar

### **Metode 1: Gambar dari URL (Paling Mudah)**
1. Cari gambar di Unsplash, Pexels, atau website gambar gratis
2. Copy URL gambar
3. Tambahkan ke `gallery.ts`:
```typescript
{
  id: 17, // ID unik (pastikan berbeda!)
  url: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  title: "Judul Foto",
  description: "Deskripsi foto"
}
```

### **Metode 2: Upload Gambar Lokal**
1. **Siapkan gambar** dengan resolusi tinggi (min 1200px lebar)
2. **Upload ke folder** `public/gallery/`:
   - Drag & drop gambar ke folder `public/gallery/`
   - Atau copy file ke `D:\CODINGAN\fullstack\loggs-web\public\gallery\`
3. **Tambahkan ke config**:
```typescript
{
  id: 17,
  url: "/gallery/nama-foto-anda.jpg",
  title: "Foto Saya",
  description: "Foto yang diupload lokal"
}
```

### **Metode 3: Menggunakan Cloudinary/CDN**
1. Upload gambar ke Cloudinary, ImgBB, atau CDN favorit Anda
2. Dapatkan URL gambar
3. Tambahkan ke config:
```typescript
{
  id: 17,
  url: "https://res.cloudinary.com/your-account/image/upload/gallery/foto.jpg",
  title: "Foto dari Cloud",
  description: "Gambar dari CDN"
}
```

## ⚙️ Konfigurasi Gambar

### **Format Data Lengkap**
```typescript
{
  id: number,           // Wajib: ID unik (1, 2, 3, dst)
  url: string,          // Wajib: URL/path gambar
  title?: string,       // Opsional: Judul gambar
  description?: string  // Opsional: Deskripsi gambar
}
```

### **ID Unik**
- Pastikan setiap gambar punya ID berbeda
- ID bisa loncat (1, 3, 7, 10, dll)
- Jangan gunakan ID yang sudah ada

### **Optimasi Gambar**
- **Unsplash**: Tambahkan `?q=80&w=1200&auto=format`
- **Local**: Kompresi gambar < 500KB per foto
- **Format**: Gunakan JPG/WebP untuk performa terbaik

## 🔄 Cara Update

### **Menambah Gambar**
1. Buka `src/config/gallery.ts`
2. Copy format dari gambar yang ada
3. Ubah `id`, `url`, `title`, dan `description`
4. Save file → otomatis update di website

### **Menghapus Gambar**
1. Hapus object gambar dari array
2. Atau comment dengan `//` di depannya

### **Mengubah Gambar**
1. Edit `url` dengan URL gambar baru
2. Atau ubah `title` dan `description`

## 📸 Tips Upload Gambar

### **Rekomendasi Resolusi**
- Minimum: 1200x800px
- Optimal: 1920x1280px
- Format: JPG, PNG, WebP

### **Kompresi Gambar**
- Online tools: TinyPNG, ImageOptim
- Target size: < 300KB per gambar
- Quality: 80-90%

### **Sumber Gambar Gratis**
- **Unsplash**: unsplash.com
- **Pexels**: pexels.com
- **Pixabay**: pixabay.com
- **Freepik**: freepik.com

### **Naming Convention**
- Gunakan lowercase dan dash: `concert-night-2024.jpg`
- Jangan pakai spasi: `my_concert_photo.jpg`

## 🎯 Preview & Testing

Gambar akan langsung muncul di HorizontalScroll setelah save. Cek:
- Apakah gambar loading dengan benar
- Apakah ukuran dan posisi sesuai
- Apakah animasi berfungsi smooth

## 🚨 Troubleshooting

### **Gambar tidak muncul**
- Cek URL benar dan accessible
- Pastikan format gambar didukung (JPG, PNG, WebP)
- Cek console browser untuk error

### **Gambar blur/pixelated**
- Gunakan resolusi yang lebih tinggi
- Kompresi dengan quality 90%+

### **Website lambat**
- Kompresi gambar ke ukuran < 200KB
- Gunakan format WebP
- Limit jumlah gambar (max 20-25)
