## Styles

### General Rules

##### Flexbox first.

- Approach each layout thinking "What would Flexbox do?"
- Prefer using flexible boxes to determine layout instead of redline `px`.

##### REM first.

- Prefer using `rem` over `px`.
- Font size is okay using `px` from redlines.

##### Use Backup Background Colors.

- When using background-image for large, above-the-fold content, also set a
  background-color that closely matches the image.

This provides a softer introduction to larger images that may not arrive until
after the page has started loading.

##### Put mixins at the top, media queries at the bottom.

Order summary:
1. mixins
1. self properties
1. media queries
1. nested classes/ids/elements

- Declare mixins at the top of the CSS sections. This keeps the mixin from
  accidentally overwriting other styles and give a better at-a-glance
  understanding when reviewing CSS classes.
- Declare media queries at the bottom or end of the CSS property but before
  nested classes. Since they are more specific, they will override existing
  properties no matter the order. For readability, lets standardize on keeping
  them last.

```scss
/* BAD */
.class {
  @media (max-width: $screenSmMax) {
    margin-top: $navLogoTopPaddingSm;
  }
  display: flex;
  align-items: center;
  @mixin my-mixin;

  .nestedClass {
  ...
  }
}

/* GOOD */
.class {
  @mixin my-mixin;
  display: flex;
  align-items: center;

  @media (max-width: $screenSmMax) {
    margin-top: $navLogoTopPaddingSm;
  }

  .nestedClass {
  ...
  }
}
```

##### Approach each interface as "fluid"/aspect-ratio-driven by default.

- *Aspect Ratio should be a first-class citizen.*
- Height is dynamically determined by width.
- Condense the layout for different widths according to aspect-ratio
  "shrinking" with *ONE* mobile/desktop breakpoint at iPad portrait width (<=
  768px).
- If you're using a lot of media queries, you probably didn't do this right.

Flexible aspect-ratio-driven images:  

```scss
.wrapper {
  position: relative;
}

.image {
  background-image: url(image.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  padding-bottom: calc(($height / $width) * 100)%;
}
```

```html
<div class="wrapper">
  <div class="image" />
</div>
```

Use a container `<div>` to wrap an image and set the image height dynamically
according to its aspect ratio. Currently developing the `fluid-image` mixin
and/or a `<FluidImage name="image" />` component to accomplish this easily.

##### Use static image mixins where not "fluid."

Preferably defined in `src/styles/images.css` if there are no special CSS styling needs.

```scss
@mixin image image_file_name, width, height;
@mixin image-url images/image_file_name.png, width, height;
```

##### Use Tachyons before inline styles.

This keeps the entire document size down to a minimum and increases render
performance.

Tachyons are atomic CSS micro-classes, also known as "functional" or
"immutable" CSS classes. They are optional but may make composing components
that only require basic CSS styles easier.

[This style reference sheet][4] can be used to search for specific properties.


### Processing/Compilation

CSS styles are processed by:

1. Webpack `css-loader` which converts class names imported in JS into [CSS Modules][1]
1. [PostCSS][2] plugins as specified in the `config/postcss.js`.

### SASS-like Markup

Instead of using SASS directly, this project uses the PostCSS presets defined
by [PreCSS][3]. This allows easy pluggability and customization that the
project can easily pull in or drop out when needed. It also provides the
SASS-like markup familiar to most front-end devs.


[1]: https://github.com/css-modules/css-modules
[2]: https://github.com/postcss/postcss
[3]: https://github.com/jonathantneal/precss
[4]: http://tachyons.io/docs/table-of-styles/
