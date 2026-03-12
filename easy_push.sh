#!/bin/bash


if [ $# -eq 0 ]; then
    echo "No commit mssage provided. Please provide one."
else
	echo "===================================================================\n\n"
	git add .
	git commit -m "$1"
	git push
	echo "\n==================================================================="
fi

echo "Exiting Script...."
