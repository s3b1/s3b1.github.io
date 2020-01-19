#!/bin/bash

if pgrep -x "Atom" >/dev/null
then
    echo "Atom is already running"
    echo "index.html will be opened"
    open -a "Google Chrome" index.html
else
    echo "Atom is not running"
    echo "launching Atom"
    atom .
    echo "index.html will be opened"
    open -a "Google Chrome" index.html
fi
