# VS Code

So let's look at the basic page in VS code.

Is anyone using VS Code now?
I asked a year ago and got some blank looks.

You'll be pleased to hear I won't be live editing.
There's not enough time. And it terrifies me.


## PREVIEW 0
This is the basic structure of the HTML page used to preview a report.

We have `<main>` element as a container.
Within that, there are `<article>` elements for each page or slide.

The HTML `<head>` also contains the usual meta tags and the stylesheet will be inlined.

Anything within the `<head>` and `<main>` tags will be exported to another HTML file which can be sent to other people.

It really doesn't matter what content we use or how we create as long as it results in HTML or CSS inside the `<head>` or `<main>` tags.

Anything outside those tags will not be exported.
We can use scripts or additional styling to provide further functionality for the preview.


## PREVIEW 1
I've now added all the content and applied some basic styles in the `<head>`

You'll see some SVG images and inlined base64 bitmaps.

[VIEW - page through]

Now you'll notice a disk icon at the top.
Clicking this exports the document we're viewing.

[CODE]

The icon is just a link outside the main content
which is placed in a fixed location

It uses the HTML `download` attribute and sets a filename.

This forces the browser to download a file rather than render it.
It's typically used for images or PDFs, but it can be anything.

The `href` normally links to a URL.
But we can also embed a data URI. That can contain HTML code for our exported report.

So that's the basis of this whole project.

1. We can add a JavaScript event handler which intercepts a click on the icon.
1. It extracts all the content within the `<head>` and `<main>` tags using `innerHTML`.
1. It then puts that code into the link's `href` attribute as a data URI.

I'm also parsing the HTML string using regular expressions.
That removes comments, whitespace and any `<script>` tags we have lying around.

[VIEW]

We can now click this icon to download a version of this page.
The HTML is minified and doesn't contain JavaScript.
It can be opened in any browser without a server.

Unfortunately, this downloading functionality isn't supported in Edge or IE
but the document you download can be viewed in those browsers.


## PREVIEW 2
It doesn't look particularly impressive so let's pimp it up.

I don't have time to go through this in detail, but all the code is on GitHub.

[CODE]

I've added some more styling.
to make it look pretty and have a responsive layout

There are some background images defined with base64 data URIs
These are heavily compressed 300x200 JPEGs.
They're stretched full-screen then blurred using a CSS filter to ensure they look reasonable.

[VIEW - resize]

CSS grid is used to size each slide to the screen
But they will expand in height if more content is required.

I've added a slide counter which is used for page numbering in the footer.
That page numbering works even if a slide doesn't have a footer.

There are scroll-snap properties which makes each slide snap to the viewport as it moves closer to the edge.
That's only supported in Firefox only but other browsers are coming.

Next, we can make any HTML tag editable by simply adding a `contenteditable` attribute.

[VIEW - edit page 8]

That's often good enough.

I soon discovered users were pasting crap from Word.
That adds all sorts of HTML vomit.
I solved that by adding a simple markdown editor but your users may not be so ... *challenging!*

Finally, it's possible you'll want to remove some pages.

[VIEW - add/remove pages]

To do that, I've styled an after pseudo element on each slide.
There's a click event handler which toggles a class named "removed".
That shows or dims the slide.

Any slide with that class is then removed from the HTML using regular expressions when the document is downloaded.


[VIEW - do download]


## PREVIEW 3
This document doesn't print well yet, so lets add some printer CSS.

[CODE]

We'll:

1. set a comfortable font size
1. ensure the text is black on a white background
1. adjust some margins and padding
1. and remove unnecessary content such as backgrounds and footers.

Next, it pains me to say this, but browsers can't handle printing CSS Grid or Flexbox.
It's not really necessary here so we can make all pages into standard blocks.

CSS does allow you to set page breaks at certain points.
We don't need that but we do want it to avoid splitting slides, tables and images where it can.

  `break-inside` is the latest CSS standard
  you also need the older `page-break-inside` property for Firefox and IE

Do you remember that chart with the dark background?

It's not ideal for printing
but we can fix that with a filter which inverts the colours, and adjusts the hue and brightness.

We can now use the print preview.

[VIEW]

Now I've not done much here but the document prints quite nicely.

[VIEW bitmap chart]

And you can see that dark chart is now inverted on white paper.

We're even doing our bit for the environment
because more than one slide will fit on each page when there's room.

But fewer people will need to print it anyway
because the HTML view is better and more usable than a PDF
