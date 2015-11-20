## Javascript reactive monads

The "index.js" file in this repository is the ES6 version of the file available from Node Package Manager (NPM) by entering "npm install reactive-monads". The Babel transpiler created the NPM version.

The online application at [http://transcendent.ninja](http://transcendent.ninja) demonstrates the use of these monads. The code for that site is available at [https://github.com/dschalk/javascript-monads](https://github.com/dschalk/javascript-monads). The package was named when I used [mobservable](https://github.com/mweststrate/mobservable) to automatically update the DOM. Now, contrary to Facebook's recommendations, I make liberal use of "forceUpdate" to control updates. This works well in my apps, giving me exact control over when the DOM updates. I don't use React's state or props objects, and I certainly don't use any type of Flux archetecture, but I have found React to be quite useful when used in this manner.  
