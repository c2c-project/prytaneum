#!/bin/sh

echo "Removing non-production files"

# specific files to remove
rm public/mockServiceWorker.js

# remove directories
rm -rf src/mock

# remove files via regex
find src -type f -name '*.test.*' -o -name '*.mock.*' -o -name '*.stories.*' -delete