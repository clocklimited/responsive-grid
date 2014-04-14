# Responsive Grid [![Build Status](https://travis-ci.org/clocklimited/responsive-grid.svg?branch=master)](https://travis-ci.org/clocklimited/responsive-grid)

A Stylus grid system. Fully responsive, modifiers available with full browser support.

You can find a full working example in the _example_ directory.

## Installing

### NPM

Responsive Grid is on NPM.

```
npm install responsive-grid
```

### Javascript API

Below is an example of how to utilise responsive-grid and stylus.

```
var stylus = require('stylus')
  , responsiveGrid = require('responsive-grid');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(responsiveGrid());
}

stylus.middleware({
    src: __dirname
  , compile: compile
})
```

### Stylus API

To gain access the responsive-grid mixins, simply add:

```
@import 'responsive-grid'
```

## Usage

Responsive Grid provides 5 mixins for use. These mixins can be used straight away without any modification to the settings.

### `grid-base()`

This will set up the block `.grid` class and the element `.grid__item` class.

---

### `grid-widths($namespace, $columns)`

This will set up width classes based on the `$columns` you include.

#### Examples

* `grid-widths('', 1 3 6)` will set up a whole class, thirds classes, and sixths classes.
* `grid-widths('desk', 1 2 3)` will set up a `.{$namespace}` class each of the width classes.

---

### `grid-widths-ie7($namespace, $columns)`

This will set up the same classes as above, however, will use expressions for the width. This is to provide support for IE7 and below.

---

### `grid-modifier($namespace, $gutter)`

This will set up the modifier `.{$namespace}grid` class and `.grid__item` children elements which modify the gutter length.

#### Examples

* `grid-modified('em', 1em)` will set up a `.{$namespace}grid` class that will provided 1em gutter between each `.grid__item`.
* `grid-modified('percent', 10%)` will set up a `.{$namespace}grid` class that will provided 10% gutter between each `.grid__item`.
* `grid-modified('pixel', 20px)` will set up a `.{$namespace}grid` class that will provided 20px gutter between each `.grid__item`.

---

### `grid-reversed()`

This will set up modifier `.{$namespace}grid` class that, when applied, will visual reverse the DOM order of the `.grid__item`'s.

---

## Settings
Below lists the settings available to the grid system (bold denotes a required variable):

Variable name           | Type    | Default | Description
----------------------- | ------- | ------- | -----------
$grid--html-compressed  | boolean | false   | If HTML is compressed, the whitespace hack used will be redundant.
$grid--gutter           | unit    | 20px    | Can be any the following unit types: **em**, **%**, **px**
$grid--count-names      | array   | one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen | Forms the first half of the class name of the grid widths
$grid--fraction-names   | boolean | whole half third quarter fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth | Forms the second half of the class name of the grid widths

_N.B. Any settings should be included prior to your grid usage._
