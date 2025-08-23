# Video Background Setup for GitHub

## Issue
The `lezim-performance.MP4` file is over 25MB, which exceeds GitHub's file size limit.

## Solutions

### Option 1: Compress the Video (Recommended)
1. **Install FFmpeg** (if not already installed):
   - Windows: Download from https://ffmpeg.org/download.html
   - Or use online tools like https://www.onlinevideoconverter.com/

2. **Compress the video** using FFmpeg:
   ```bash
   ffmpeg -i lezim-performance.MP4 -vf "scale=1280:720" -c:v libx264 -crf 28 -c:a aac -b:a 128k lezim-performance-compressed.mp4
   ```

3. **Replace the large file** with the compressed version:
   - Delete `lezim-performance.MP4`
   - Rename `lezim-performance-compressed.mp4` to `lezim-performance.MP4`
   - Update the HTML source to use the new file

### Option 2: Use a Smaller Video
- Find or create a shorter Lezim performance video (under 25MB)
- Consider using a 10-15 second loop instead of the full video

### Option 3: Use Only Images (Current Fallback)
The current implementation includes a fallback to the `ganpati.jpg` image when the video fails to load.

## Current Implementation
- Video background with fallback image
- Semi-transparent overlay for text legibility
- Graceful degradation when video fails
- Mobile-optimized with different overlay opacity levels

## File Size Recommendations
- **GitHub**: Keep files under 25MB
- **Web Performance**: Aim for videos under 10MB for faster loading
- **Mobile**: Consider even smaller files for mobile users

## Testing
1. Test with the current large video file locally
2. Test the fallback image when video is removed
3. Test with compressed video once available
4. Verify text readability on all screen sizes 