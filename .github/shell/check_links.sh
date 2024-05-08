#!/bin/bash

EXCLUDE_URLS_FILE=../white_list/exclude_urls.txt
LYCHEE_OPTIONS="--verbose --no-progress './**/*.md' './**/*.html' './**/*.rst' --exclude-mail"

while read -r url; do
  LYCHEE_OPTIONS+=" --exclude '$url'"
done < "$EXCLUDE_URLS_FILE"

lychee $LYCHEE_OPTIONS