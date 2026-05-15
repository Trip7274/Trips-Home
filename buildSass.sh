#!/bin/sh

if ! sass --version > /dev/null; then
	if [ ! -f SassDir ]; then
	    mkdir "SassDir"
	fi
    echo "Downloading SassDir..."

    if ! curl -sL 'https://github.com/sass/dart-sass/releases/download/1.99.0/dart-sass-1.99.0-linux-x64.tar.gz' > SassDir/dart-sass.tar.gz; then
        echo "Error while downloading Sass! Code: $?"
        exit
    fi
    echo "Sass downloaded! ($?) Extracting..."

    # Extraction

	if [ ! -f SassDir/dart-sass ]; then
	    mkdir "SassDir/dart-sass"
	fi

    if ! tar -C 'SassDir/dart-sass' -xzf 'SassDir/dart-sass.tar.gz'; then
        echo "Error while extracting Sass! Code: $?"
        exit
    fi

    rm SassDir/dart-sass.tar.gz
    echo "Sass extracted! ($?)"
    export PATH="SassDir/dart-sass/dart-sass:$PATH"
fi

SolutionDir=$(dirname "$(realpath "$0")")
echo "Detected SolutionDir is: $SolutionDir"
echo "Compiling Sass..."

sass "$SolutionDir/CSS/SCSS:$SolutionDir/CSS/Styles" --update