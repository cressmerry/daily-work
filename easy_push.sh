#!/bin/bash

echo "==================================================================="
echo ""
echo ""
git add .
git commit -m "$1"
git push -u origin main
echo ""
echo ""
echo "==================================================================="

echo "Exiting Script...."
