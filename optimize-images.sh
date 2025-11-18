#!/bin/bash

# Simple image optimization script
# This script optimizes PNG images in the public directory

echo "Optimizing images in public directory..."

# Check if optipng is available (optional optimization)
if command -v optipng &> /dev/null; then
    echo "Using optipng to optimize PNG files..."
    find public -name "*.png" -exec optipng -o2 {} \;
else
    echo "optipng not found. Skipping PNG optimization."
    echo "To install optipng: sudo apt-get install optipng (Ubuntu/Debian) or brew install optipng (macOS)"
fi

# Check if jpegoptim is available (optional optimization)
if command -v jpegoptim &> /dev/null; then
    echo "Using jpegoptim to optimize JPEG files..."
    find public -name "*.jpg" -o -name "*.jpeg" -exec jpegoptim --max=85 {} \;
else
    echo "jpegoptim not found. Skipping JPEG optimization."
    echo "To install jpegoptim: sudo apt-get install jpegoptim (Ubuntu/Debian) or brew install jpegoptim (macOS)"
fi

echo "Image optimization complete!"
echo "Note: This script requires optipng and jpegoptim to be installed for actual optimization."
echo "Current image sizes:"
du -h public/*.png public/*.jpg public/*.jpeg 2>/dev/null || echo "No images found to display sizes for."
