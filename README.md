# Memory Game Project

This project is completed as part of [Udacity](https://www.udacity.com/) Front-End Web Developer Nanodegree Program. The starter project had some HTML and CSS styling to display a static version of the Memory Game project. I needed to convert this project from a static project to an interactive one, based on the project [rubric](https://review.udacity.com/#!/rubrics/591/view). This required modifying the HTML and CSS files, but primarily the JavaScript file. See `js/app.js`.

## Table of Contents

* [Getting Started](#getting-started)
* [Instructions](#instructions)
* [Dependencies](#dependencies)

## Getting Started

1. Download the GithHub zip file or clone the repository.
	* [zip file](https://github.com/torralbapatrick/fend-project-memory-game/archive/master.zip)
	* [git clone](https://github.com/torralbapatrick/fend-project-memory-game)
2. Open index.html file.


_Or you can play the game [here](https://torralbapatrick.github.io/fend-project-memory-game/)._

## Instructions

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

## Dependencies

* [Font Awesome](https://fontawesome.com/)
* [Google Font Coda](https://fonts.google.com/specimen/Coda)
* [Shuffle function](http://stackoverflow.com/a/2450976)