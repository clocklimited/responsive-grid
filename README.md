# Responsive Grid [![Build Status](https://travis-ci.org/clocklimited/responsive-grid.svg?branch=master)](https://travis-ci.org/clocklimited/responsive-grid)

A Stylus Plugin that provides a simple grid system. It's fully responsive, with modifiers available that provide full browser support.

* [Installation](#installation)
* [Usage](#usage)
* [Settings](#settings)

## Installation

### NPM

Responsive Grid is on NPM.

```
npm install -g responsive-grid stylus
```

### Executable

Below is an example of how to utilise responsive-grid and stylus.

```
stylus -w -u responsive-grid stylus/index.styl -o css/
```

For more information on the many ways you can use Stylus plugins, please refer to [this guide](https://gist.github.com/timjgleeson/10641220).

### Stylus API

To gain access the responsive-grid mixins, simply add:

```
@import 'responsive-grid'
```

## Usage

Responsive Grid provides 5 mixins for use. These mixins can be used straight away without any modification to the settings.

Full working examples of all the mixins below can be found in [this codepen](http://codepen.io/timjgleeson/full/KfBsc).

### `grid-base()`

This will set up the block `.grid` class and the element `.grid__item` class.

---

### `grid-widths($namespace, $columns)`

This will set up width classes based on the `$columns` you include.

#### Examples

* `grid-widths('', 1 3 6)` will set up a whole class, thirds classes, and sixths classes.
* `grid-widths('desk', 1 2 3)` will set up a `.{$namespace}` class each of the width classes.

---

### `grid-pull($namespace, $columns)`

This will set up pull classes based on the `$columns` you include.

#### Examples

* `grid-pull('', 1 3 6)` will set up `.pull-{width}` classes that move the `.grid__item` with a whole class, thirds classes, and sixths classes.
* `grid-pull('desk', 1 2 3)` will set up a `.{$namespace}pull-{width}` class each of the pull classes.

---

### `grid-push($namespace, $columns)`

This will set up push classes based on the `$columns` you include.

#### Examples

* `grid-push('', 1 3 6)` will set up `.push-{width}` classes that move the `.grid__item` with a whole class, thirds classes, and sixths classes.
* `grid-push('desk', 1 2 3)` will set up a `.{$namespace}push-{width}` class each of the push classes.

---

### `grid-gutter-modifier($namespace, $gutter)`

This will set up the gutter modifier `.grid--{$namespace}` class and `.grid__item` children elements which modify the gutter width.

#### Examples

* `grid-gutter-modifier('em', 1em)` will set up a `.grid--{$namespace}` class that will provided 1em gutter between each `.grid__item`.
* `grid-gutter-modifier('percent', 10%)` will set up a `.grid--{$namespace}` class that will provided 10% gutter between each `.grid__item`.
* `grid-gutter-modifier('pixel', 20px)` will set up a `.grid--{$namespace}` class that will provided 20px gutter between each `.grid__item`.

---

### `grid-reverse($namespace)`

This will set up modifier `.grid--reverse` class that, when applied, will visual reverse the DOM order of the `.grid__item`'s. Providing a `$namespace` is optional.

---

## Settings
Below lists the settings available to the grid system (bold denotes a required variable):

Variable name           | Type    | Default | Description
----------------------- | ------- | ------- | -----------
$grid--html-compressed  | boolean | false   | If HTML is compressed, the whitespace hack used will be redundant.
$grid--gutter           | unit    | 20px    | Can be any the following unit types: **em**, **%**, **px**
$grid--count-names      | array   | one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen | Forms the first half of the class name of the grid widths
$grid--fraction-names   | array | whole half third quarter fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth | Forms the second half of the class name of the grid widths
$grid--width-expression | boolean | false   | Changes the width in the grid widths to use expressions. Set to true for IE7 and below.
