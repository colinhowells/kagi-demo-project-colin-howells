# Demo Project for Kagi

## Task 1 - HTML Recipes

![Recipe Widget](img/html-recipes.jpg)

_Note: task brief has been reworded for clarity_

A recipe widget has:

- a recipe title
- a list of ingredients
- a checkbox for each ingredient
- a non-JS toggle to allow the user to show or hide ingredients in the list beyond the 10th, but only if there are more than 10 ingredients
- that toggle has different copy ('Show More'/'Show Less') depending on whether the list is expanded or not

Two instances of the same recipe widget are desired; the only difference is how long its list is:

- one instance has the full list of 21 ingredients (so the user sees an option to show the full list, or hide ingredients beyond the 10th)
- one instance has a shorter list of only 10 items (so the user is not shown an option to show the full list)

<!-- - Make a recipe widget as shown in the image.
- Clicking 'Show More' should expand the content of the widget. When expanded, the text should change to 'Show Less'.
- Clicking 'Show Less' should collapse the content.
- 'Show More' should only be visible if Ingredients exceed 10.
- There is no need to add, edit, or delete Ingredients for this widget, the idea is to make 'Show More/Show Less' functionality _without_ javascript.
- Make 2 examples: one with checkboxes (as shown in the image), and another with just text.
- For that second, text-only example, there should be 15 lines (or more) of text. 10 lines of text should be visible when collapsed, and when expanded another 5 should show up.
- No JavaScript at all for this one. -->

## Task 2 - JavaScript Optimization

You are at the court for a traffic ticket, and there are 4 other people with you.

You are told that everyone’s hearing is in alphabetical order, and it takes 30 minutes for each hearing.

All of the judges are free now and can see one person at a time. How long will it take for your hearing to end?

Your inputs are:

- Your name (as a string)
- The number of judges (an integer)
- The names of four other people separated by space (as a string)

Example:

```js
court('Jules', 3, 'Adam Betty Frank Mike');
// => 60m

court('Zane', 1, 'Mark Hank Ana Vivian');
// => 150m
```

Write the fastest JavaScript routine (include a simple benchmark) that you possibly can. Submit when you can not get it any faster and explain your optimization journey.
