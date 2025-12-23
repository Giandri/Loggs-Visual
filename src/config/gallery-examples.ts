// 🎯 CONTOH PRAKTIS - Cara Upload Gambar untuk HorizontalScroll
// Copy-paste contoh ini ke gallery.ts untuk testing

import { GalleryImage } from './gallery';

// ================================
// CONTOH 1: Gambar dari Unsplash
// ================================
export const unsplashExamples: GalleryImage[] = [
  {
    id: 101,
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format",
    title: "Concert Photography",
    description: "Live music photography session"
  },
  {
    id: 102,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format",
    title: "Festival Crowd",
    description: "Music festival atmosphere"
  }
];

// ================================
// CONTOH 2: Gambar Lokal (Upload ke public/gallery/)
// ================================
export const localExamples: GalleryImage[] = [
  {
    id: 201,
    url: "/gallery/my-concert-photo.jpg", // Upload file ini ke public/gallery/
    title: "My Concert Photo",
    description: "Foto yang saya ambil di concert lokal"
  },
  {
    id: 202,
    url: "/gallery/band-session-2024.png", // Upload file ini ke public/gallery/
    title: "Band Session 2024",
    description: "Session recording dengan band favorit"
  }
];

// ================================
// CONTOH 3: Dari Cloudinary
// ================================
export const cloudinaryExamples: GalleryImage[] = [
  {
    id: 301,
    url: "https://res.cloudinary.com/demo/image/upload/v1234567890/gallery/live-performance.jpg",
    title: "Live Performance",
    description: "Uploaded to Cloudinary CDN"
  }
];

// ================================
// CONTOH 4: Dari ImgBB (Free Image Hosting)
// ================================
export const imgbbExamples: GalleryImage[] = [
  {
    id: 401,
    url: "https://i.ibb.co/example-image.jpg",
    title: "ImgBB Hosted Image",
    description: "Free image hosting service"
  }
];

// ================================
// CARA PAKAI:
// 1. Copy array yang ingin digunakan
// 2. Paste ke gallery.ts menggantikan galleryImages
// 3. Sesuaikan ID agar unik (tidak bentrok)
// 4. Ganti URL dengan gambar Anda sendiri
// ================================

// CONTOH PENGGUNAAN GABUNGAN:
export const combinedExample: GalleryImage[] = [
  // Unsplash images
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format",
    title: "Concert Photography",
  },

  // Local images (upload ke public/gallery/)
  {
    id: 2,
    url: "/gallery/my-local-photo.jpg",
    title: "Local Upload",
  },

  // CDN images
  {
    id: 3,
    url: "https://res.cloudinary.com/your-account/image/upload/gallery/photo.jpg",
    title: "CDN Image",
  },
];
