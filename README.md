# Website Performance Optimization project
*Project #4 of the Udacity Front End Developer Nanodegree*

This project required optimizing the critical rendering path in order to achieve:  

1. A PageSpeed Insights score of at least 90 on index.html
2. At least 60 fps scrolling and resizing pizza images on pizza.html

## The Site

The website is hosted on Github pages:
[https://ahahn15.github.io/Performance-Optimization/](https://ahahn15.github.io/Performance-Optimization/)

## The Build

The project uses Grunt tasks to minify CSS, HTML, images, and JS files.

###Install Grunt

`npm install -g grunt`


###Run Grunt
- `grunt`  
The default Grunt command runs the uglify, imagemin, htmlmin, and cssmin tasks. Details are below.

- `grunt uglify`  
Minifies all JavaScript files in src/ and saves to dist/.
More [here](https://github.com/gruntjs/grunt-contrib-uglify)

- `grunt imagemin`  
Compresses all .png and .jpg images in src/ and saves to dist/.
More [here](https://github.com/gruntjs/grunt-contrib-imagemin)

- `grunt htmlmin`  
Minifies all html files in src/ and saves to dist/. Removes comments and collapses whitespace.
More [here](https://github.com/gruntjs/grunt-contrib-htmlmin)

- `grunt cssmin`  
Minifies all CSS files in src/ and saves to dist/.
More [here](https://github.com/gruntjs/grunt-contrib-cssmin)

###Publish changes
The GitHub Pages site is configured to be built from the gh-pages branch, so in order to see changes applied, the dist directory should be pushed to that branch:

`git subtree push --prefix dist origin gh-pages`


## Optimizations
###Part 1: PageSpeed Insights score of > 90 for index.html

####CSS

Remove blocking CSS by inlining the relatively small number of styles into the head of the document.

Add the HTML media="print" attribute to the external style sheet link for print styles.

####JS

Add the HTML async attribute to all script tags.

####Images

Resize images to 100px in width to match the size in the view. Use the Grunt task to compress. 

###Part 2: 60 frames per second on pizza page

Replace more complex and less performant querySelectorAll methods with getElementsByClassName and getElementById. Optimize loops by extracting redundant calculations.

#### Before:
```
  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
```
#### After:
```
var top = document.body.scrollTop;
  var constArray = [];
  for (i = 0; i < 5; i++) {
    constArray.push(Math.sin((top / 1250) + i));
  }

  var items = document.getElementsByClassName('mover');
  for (var i = 0; i < items.length; i++) {
    var phase = constArray[i % 5];
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

Eliminate unnecessary logic that causes repetitive reads and writes to the DOM layout. Cache DOM elements that are reused.

#### Before:
```
  function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }

  function determineDx (elem, size) {
    var oldWidth = elem.offsetWidth;
    var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldSize = oldWidth / windowWidth;

    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var newSize = sizeSwitcher(size);
    var dx = (newSize - oldSize) * windowWidth;

    return dx;
  }
```
#### After:
```
  function changePizzaSizes(size) {

    var newwidth = 0;

    switch(size) {
      case "1":
      newwidth = 25;
      break;
      case "2":
      newwidth = 33;
      break;
      case "3":
      newwidth = 50;
      break;
      default:
      console.log("bug in sizeSwitcher");
    }

    var pizzas = document.getElementsByClassName('randomPizzaContainer');
    for (var i = 0; i < pizzas.length; i++) {
      pizzas[i].style.width = newwidth + "%";
    }
  }
```


## Final Results
###Part 1: PageSpeed Insights score of > 90 for index.html

####Before:
Mobile: 27/100      Desktop 29/100

####After:
Mobile: 92/100      Desktop 95/100

###Part 2: 60 frames per second on pizza page (~10 ms)

####Before:
Average scripting time to generate last 10 frames: 30.921000000000106ms  
Time to resize pizzas: 89.32999999999993ms

####After:

Average scripting time to generate last 10 frames: 0.335999999998603ms  
Time to resize pizzas: 0.34500000000116415ms