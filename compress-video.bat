@echo off
echo ========================================
echo Video Compression Tool for GitHub
echo ========================================
echo.

REM Check if FFmpeg is installed
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo FFmpeg is not installed or not in PATH.
    echo.
    echo Please install FFmpeg from: https://ffmpeg.org/download.html
    echo Or use online tools like: https://www.onlinevideoconverter.com/
    echo.
    pause
    exit /b 1
)

echo FFmpeg found! Starting compression...
echo.

REM Check if source video exists
if not exist "lezim-performance.MP4" (
    echo Error: lezim-performance.MP4 not found!
    echo Please ensure the video file is in the same directory.
    pause
    exit /b 1
)

echo Compressing video to reduce file size for GitHub...
echo This may take several minutes depending on video length...
echo.

REM Compress video with good quality and smaller size
ffmpeg -i "lezim-performance.MP4" -vf "scale=1280:720" -c:v libx264 -crf 28 -c:a aac -b:a 128k "lezim-performance-compressed.mp4"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Compression completed successfully!
    echo ========================================
    echo.
    echo Original file: lezim-performance.MP4
    echo Compressed file: lezim-performance-compressed.mp4
    echo.
    echo Next steps:
    echo 1. Check the compressed file size
    echo 2. If under 25MB, rename it to replace the original
    echo 3. Commit the compressed version to GitHub
    echo.
    echo Note: The .gitignore file will prevent large files from being committed.
) else (
    echo.
    echo Error: Compression failed!
    echo Please check the error messages above.
)

pause 