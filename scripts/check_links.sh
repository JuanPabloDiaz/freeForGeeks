#!/bin/bash

EXCLUDE_URLS_FILE=./scripts/exclude_urls.txt # White list of URLs to exclude from the check
LYCHEE_OPTIONS="--verbose --no-progress './**/*.md' './**/*.html' './**/*.rst' --exclude-mail"

while read -r url; do
  LYCHEE_OPTIONS+=" --exclude '$url'"
done < "$EXCLUDE_URLS_FILE"

lychee $LYCHEE_OPTIONS