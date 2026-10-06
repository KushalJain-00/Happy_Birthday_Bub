# Photos Directory

Place your photos here for the gallery!

## How to add photos:
1. Drop your image files (jpg, png, webp) into this folder
2. Open `script.js` and find the `GALLERY_PHOTOS` array near the top
3. Add entries like:
   ```js
   { src: 'photos/your-photo.jpg', caption: 'A lovely memory' }
   ```
4. That's it! The gallery will display them automatically.

## For the heart-shaped photo frame:
- In `index.html`, find the `heart-photo` section on Slide 5
- Replace the placeholder `src` with your photo path:
  ```html
  <img src="photos/your-photo.jpg" alt="My love" class="heart-photo-img" />
  ```
