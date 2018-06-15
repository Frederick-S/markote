# Markote - Save markdown notes to OneNote (WIP)
[![Build Status](https://travis-ci.org/Frederick-S/markote.svg?branch=master)](https://travis-ci.org/Frederick-S/markote) [![Build status](https://ci.appveyor.com/api/projects/status/w6f5wr4vn4lublch/branch/master?svg=true)](https://ci.appveyor.com/project/Frederick-S/markote/branch/master) [![codecov](https://codecov.io/gh/Frederick-S/markote/branch/master/graph/badge.svg)](https://codecov.io/gh/Frederick-S/markote) [![Maintainability](https://api.codeclimate.com/v1/badges/8ae219fa1feff5627c2e/maintainability)](https://codeclimate.com/github/Frederick-S/markote/maintainability) [![codebeat badge](https://codebeat.co/badges/44e3e0d4-9f45-4828-b840-7b3d03214a53)](https://codebeat.co/projects/github-com-frederick-s-markote-master)

## Supported markdown syntax
* Heading
* Bold
* Italic
* Strikethrough
* Quoting code
* Quoting text
* List
* Link
* Image
* Table

## Known issues
* The left borders of blockquotes are removed

## Development
Markote depends on [CairoSVG](https://cairosvg.org/), which also depends on [Cairo](https://cairographics.org/), so please install [Cairo](https://cairographics.org/download/) first. For Windows users, you can also download standalone [Cairo dlls](https://github.com/preshing/cairo-windows/releases) and add its path to `PATH` environment variable.

## License
[MIT](LICENSE)
