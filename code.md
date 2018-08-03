# VS Code

So let's look at the basic page in VS code.

Is anyone using VS Code now?
I asked a year ago and got some blank looks.

You'll be pleased to hear I won't be live editing.
There's not enough time. And it terrifies me.


## PREVIEW 0
This is the basic structure of the HTML page used to preview a report.

We have `<main>` element for all the content.
It contains `<article>` elements for each page or slide.

The HTML `<head>` also has the usual meta tags and an inlined stylesheet.

Anything within the `<head>` and `<main>` will be exported to a static HTML file which can be sent to other people.

It doesn't matter what content we use
or how we create it on the server or client
as long as it results in HTML or CSS inside these containers.

Anything outside of them isn't exported.
So we can add scripts and other styles to help with the preview.


## PREVIEW 1
I've added all the content and applied some basic styles in the `<head>`

There are some SVG images and inlined base64 bitmaps.

[VIEW - page through]

Now you'll notice a disk icon at the top.
Clicking this will export the document we're looking at into a static HTML file.

[CODE]

The icon is just a link outside the main content

It sets the HTML `download` attribute with a filename.

This forces the browser to download a file rather than render it.
You typically use it for images or PDFs, but it can be anything.

The `href` normally points at URL.
But we can also embed a data URI. And it's that which will contain the HTML for our exported report.

So that's the basis of this whole project.
One line of code stretched into a 20 minute presentation!

OK, so it's not quite one line.

1. We need a JavaScript event handler to intercept a click on this icon.
1. The handler extracts all the content within the `<head>` and `<main>` tags using `innerHTML`.
1. It then puts that code into the link's `href` attribute as a data URI.

I'm also passing the HTML string through some regular expressions.
to remove comments, whitespace and any `<script>` tags that are lying around.

[VIEW - click and download]

We can now click this icon to download a version of this page.

The HTML is minified and doesn't contain JavaScript.
It can be opened in any browser without a server.

Unfortunately, this downloading functionality isn't supported in Edge or IE
but the document you export can be viewed in those browsers.


## PREVIEW 2
It doesn't look particularly impressive so let's pimp it up.

I don't have time to go through this in detail, but all the code is on GitHub.

[CODE]

I've added some more styling.
to make it look pretty and give it a responsive layout

There are some background images defined with base64 data URIs
These are small JPEGs which are stretched full-screen
then blurred with a CSS filter to ensure they look OK.

CSS grid is used to size each slide to the screen
But each slide can expand in height if we need a long table or whatever.

I've added a slide counter which is used for page numbering in the footer.

And there are scroll-snap properties
which snaps slides to the viewport as they move closer to the edge.
That's only supported in Firefox but other browsers are coming.

Next, we can make any HTML tag editable by simply adding a `contenteditable` attribute.

So let's see what we've got.

[VIEW - resize , scroll , edit page 8 ]

This editing is often good enough.

I soon discovered users were pasting crap from Word.
and that adds all sorts of HTML vomit.

I solved that by adding a simple markdown editor but your users may not be so ... *challenging!*

Finally, it's possible you'll want to remove some pages for some users.

To do that, I've added a pseudo element to each slide.
When it's clicked, JavaScript toggles a class named "removed".
That shows or dims the slide.

A slide with that class is then removed from the HTML using the regular expressions when the document is downloaded.

[VIEW - add/remove pages , download ]


## PREVIEW 3
This document doesn't print well yet, so lets add some printer CSS.

[CODE]

We'll:

1. set a comfortable font size
1. ensure the text is black on a white background
1. adjust some margins and padding
1. and remove unnecessary content such as backgrounds and footers.

It pains me to say this, but browsers can't handle printing CSS Grid or Flexbox.
It's not important here so we'll make all pages into standard blocks.

Now you can add printer page breaks with CSS.
We don't need that but we do want the browser to avoid splitting slides, tables and images.

  `break-inside: avoid` is the latest CSS standard
  you also need the older `page-break-inside` property for Firefox and IE

And do you remember that chart with the dark background?

It's not ideal for printing
but we can fix that with a filter which inverts the colours, and adjusts the hue and brightness.

[VIEW - show dark chart]

Now I've not done much here but the document prints quite nicely.

And the dark chart is inverted on white paper.

We're even doing our bit for the environment
because more than one slide will fit on each page when there's room.

But fewer people will need to print it anyway
because the HTML view far better than a PDF on screen
