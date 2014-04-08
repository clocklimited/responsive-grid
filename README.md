[![Build Status](https://travis-ci.org/clocklimited/ResponsiveGrid.svg?branch=master)](https://travis-ci.org/clocklimited/ResponsiveGrid)

# ResponsiveGrid

A Stylus grid system. Fully responsive, modifiers available with full browser support.

You can find a full working example in the _example_ directory.

## Settings
Below lists the settings available to the grid system (bold denotes a required variable):

Variable name           | Type    | Default | Description
----------------------- | ------- | ------- | -----------
$grid--html-compressed  | boolean | false   | If HTML is compressed, the whitespace hack used will be redundant.
$grid--gutter           | unit    | 20px    | Can be any the following unit types: **em**, **%**, **px**

## Usage
Making sure that `grid-base.styl` is available to your grid-calling Stylus file, you can use any of the following:
* `grid-base()`
* `grid-widths()` - e.g. `grid-widths('', 1 2 3)` sets up width modifiers such as `.one-half`
* `grid-modifier()` - e.g. `grid-modifier('ten-pixel', 10px)` sets up modified-gutter grids
* `grid-reversed()` - e.g. sets up a modified reversed grid (RTL)

_N.B. Any settings should be included prior to your grid usage._

## Extra settings
The below can be overriden should you wish to add more than sixteenths to your grid:
* $grid--count-names
* $grid--fraction-names
