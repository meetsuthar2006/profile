# 📁 Portfolio Images

Drop your images into the correct subfolder below, then update `index.html` with the local path.

---

## Folder Structure

```
assets/
└── images/
    ├── profile/          ← Your profile / avatar photo
    ├── education/        ← School, college, certification logos
    ├── projects/         ← Project screenshots or thumbnails
    └── misc/             ← Any other images (awards, logos, etc.)
```

---

## 🎓 Education — what to put where

| File name (suggested)         | Folder              | Used in                        |
|-------------------------------|---------------------|--------------------------------|
| `university-logo.png`         | `education/`        | B.Tech card — institute logo   |
| `school-logo.png`             | `education/`        | 12th card — school logo        |
| `coursera-logo.png`           | `education/`        | ML Specialization cert card    |
| `deeplearningai-logo.png`     | `education/`        | ML Specialization cert card    |

## 🖼️ Projects — what to put where

| File name (suggested)         | Folder              | Used in                        |
|-------------------------------|---------------------|--------------------------------|
| `house-price.jpg`             | `projects/`         | Project 01 thumbnail           |
| `sentiment-analysis.jpg`      | `projects/`         | Project 02 thumbnail           |
| `stock-predictor.jpg`         | `projects/`         | Project 03 thumbnail           |
| `rag-qa.jpg`                  | `projects/`         | Project 04 thumbnail           |

## 👤 Profile

| File name (suggested)         | Folder              | Used in                        |
|-------------------------------|---------------------|--------------------------------|
| `meet.jpg` or `meet.png`      | `profile/`          | Hero section profile photo     |

---

## How to use in HTML

Once you drop a file in, reference it like this:

```html
<!-- Profile photo -->
<img src="assets/images/profile/meet.jpg" alt="Meet Suthar" />

<!-- University logo -->
<img src="assets/images/education/university-logo.png" alt="University" />

<!-- Project thumbnail -->
<img src="assets/images/projects/house-price.jpg" alt="House Price Prediction" />
```

---

## Tips

- **Format:** Use `.jpg` for photos, `.png` for logos (transparent background)
- **Size:** Keep project thumbnails under 500 KB. Compress at [squoosh.app](https://squoosh.app)
- **Profile photo:** Square crop works best (e.g. 600×600 px)
- **Logos:** PNG with transparent background looks cleanest on dark theme
