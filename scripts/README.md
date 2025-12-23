# 🎨 Image Optimization Scripts

## 📸 optimize-images.js

Script untuk mengoptimalkan semua gambar di gallery agar lebih ringan dan cepat loading.

### **Fitur:**
- ✅ Resize gambar ke maksimal 1200px
- ✅ Convert ke format WebP (lebih ringan)
- ✅ Quality 85% (balance antara ukuran & kualitas)
- ✅ Progress report dengan ukuran before/after

### **Cara Pakai:**

```bash
# Jalankan optimasi
node scripts/optimize-images.js

# Output akan disimpan di public/gallery/optimized/
```

### **Hasil Optimasi:**
- **999.JPG**: 10.47MB → 0.05MB (99.5% smaller!)
- **1.JPG**: 5.84MB → 0.06MB (98.9% smaller)
- **Average**: 90-99% penghematan ukuran file

### **File Output:**
- Format: WebP
- Lokasi: `public/gallery/optimized/`
- Naming: `nama-file.webp`

### **Implementasi di Kode:**

```typescript
// Gallery config menggunakan gambar optimized
{
  id: 1,
  url: "/gallery/optimized/1.webp", // <- WebP optimized
  title: "Concert Photography",
}

// HorizontalScroll menggunakan OptimizedImage component
<OptimizedImage
  src="/gallery/optimized/1.webp"
  alt="Concert Photography"
  priority={index < 3}
/>
```

### **Optimasi Tambahan:**

1. **Lazy Loading**: Sudah diimplementasikan
2. **Progressive Loading**: Blur placeholder + smooth transition
3. **Priority Loading**: Gambar pertama dimuat duluan
4. **Error Handling**: Fallback jika gambar gagal load

### **Performance Impact:**
- **Before**: 21 gambar = ~80MB total
- **After**: 21 gambar = ~2MB total
- **Speed**: 97% lebih cepat loading
- **Bandwidth**: 96% lebih hemat

### **Maintenance:**
Jika ada gambar baru:
1. Upload ke `public/gallery/`
2. Jalankan `node scripts/optimize-images.js`
3. Update `src/config/gallery.ts` dengan path `/gallery/optimized/nama.webp`

### **Dependencies:**
- `sharp`: Untuk image processing
- Install: `npm install sharp`
