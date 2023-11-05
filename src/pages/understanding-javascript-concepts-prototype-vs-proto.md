---
layout: '../layouts/MarkdownLayout.astro'
title: "Understanding JavaScript Concepts: prototype vs __proto__"
description: "Navigating the JavaScript Enigma: Unpacking the Mystery of __proto__ versus Prototype. Delving into this intricate topic may seem daunting, but it's essential to establish a strong foundation in your coding journey. Discover the intricacies and distinctions within this captivating debate."
tags: [JavaScript, prototype, fundamentals, objects, inheritance, proto]
image: /images/posts/damian-zaleski-RYyr-k3Ysqg-unsplash.jpg
date: 2023-11-05T10:58:20.380Z
author: bartick
robots: index, follow
meta:
    - name: og:type
      content: website
    - name: og:site_name
      content: Bartick's Blog
    - name: og:locale
      content: en_US
    - name: og:locale:alternate
      content: es_ES
    - name: twitter:card
      content: summary_large_image
    - name: twitter:site
      content: '@@BartickM'
    - name: twitter:creator
      content: '@@BartickM'
    - name: twitter:title
      content: "Understanding JavaScript Concepts: prototype vs __proto__"
    - name: twitter:description
      content: "Navigating the JavaScript Enigma: Unpacking the Mystery of __proto__ versus Prototype. Delving into this intricate topic may seem daunting, but it's essential to establish a strong foundation in your coding journey. Discover the intricacies and distinctions within this captivating debate."
---

# Understanding JavaScript Concepts: `prototype` vs. `__proto__`

When embarking on your JavaScript journey, you may have encountered the terms `prototype` and `__proto__`. These terms may appear somewhat interchangeable at first glance, leading to some confusion for newcomers. However, they serve distinct purposes in JavaScript. In this article, we will delve into the differences between these two concepts and explore how they interrelate.

## What is a Prototype?

In JavaScript, a **prototype** is an object that is inherently associated with every function and object by default. It is essentially a property attached to a function or object that enables you to augment new properties and methods to that function or object. Furthermore, it plays a pivotal role in implementing inheritance in JavaScript.

### A Closer Look at Prototypes

In a JavaScript context, prototypes serve as blueprints or templates. They define the shared characteristics and behaviors that can be inherited by multiple objects or instances. By attaching properties and methods to a prototype, you create a sort of common knowledge base that can be efficiently shared among objects of the same type.

Consider the following example:

```javascript
function Animal(name) {
  this.name = name;
}

// Adding a method to the Animal prototype
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound.`);
}

const cat = new Animal('Whiskers');
const dog = new Animal('Fido');

cat.speak(); // Output: "Whiskers makes a sound."
dog.speak(); // Output: "Fido makes a sound."
```

In this example, we've defined an `Animal` constructor function and added a `speak` method to its prototype. As a result, any instance created from the `Animal` constructor can access and utilize this `speak` method. It illustrates how prototypes facilitate code reusability and object-oriented features in JavaScript.

## What is `__proto__`?

`__proto__`, on the other hand, is a property specifically used to access the prototype of an object. It is attached to every object in JavaScript and serves as a getter and setter for the object's prototype. It provides a means to modify the prototype of an existing object, allowing you to change its characteristics dynamically.

### A Closer Look at `__proto__`

The `__proto__` property enables you to traverse the prototype chain, moving from an object to its prototype and, if necessary, to its prototype's prototype, and so on. This mechanism is instrumental in achieving inheritance and sharing properties and methods among objects.

```javascript
function Vehicle(make) {
  this.make = make;
}

const car = new Vehicle('Toyota');

// Modifying the prototype dynamically using __proto__
const customFeatures = { color: 'blue', year: 2023 };
car.__proto__ = customFeatures;

console.log(car.color); // Output: "blue"
console.log(car.year);  // Output: 2023
```

In this example, we've created a `Vehicle` object and then used `__proto__` to augment it with custom features, such as color and year. This flexibility to modify an object's prototype dynamically allows for robust object manipulation and adaptability.

## How Are They Related or Different?

To summarize, the key distinctions between `prototype` and `__proto__` are as follows:

- **Prototype**:
  - It is a property attached to a function or object.
  - It is used to define shared properties and methods for objects created from that function or constructor.
  - It plays a central role in enabling inheritance and code reusability.
  
- **`__proto__`**:
  - It is a property attached to every object in JavaScript.
  - It is used to access and modify the prototype of an object.
  - It facilitates dynamic changes to an object's characteristics by allowing you to manipulate its prototype chain.

These differences underscore their complementary roles in JavaScript's object-oriented programming paradigm.

## Example

Let's explore a practical example that highlights the distinction between `prototype` and `__proto__`.

```javascript
function Square(side) {
  this.side = side;
}

const shape = {};

const square = new Square(5);

shape.__proto__ = square;

shape.area = function() {
  return this.side * this.side;
}

console.log(shape.__proto__ === Square.prototype); // Output: true
console.log(shape.area()); // Output: 25
```

In this example, we define a `Square` constructor function and create an empty `shape` object. By assigning `shape.__proto__` to the `square` object, we effectively set the `shape` object's prototype to be the same as that of `square`. Then, we add an `area` method to the `shape` object. The `console.log` statements illustrate the relationship between `shape.__proto__` and `Square.prototype`, both of which are true, and we calculate the area of the square.

Understanding the distinction between `prototype` and `__proto__` is crucial for mastering JavaScript's object-oriented capabilities and enhancing your ability to design and manipulate objects effectively. These concepts are fundamental to writing efficient and maintainable code in JavaScript.