# Is PDF your best option

## Introduction

My name's Craig Buckler
I'm a freelance full-stack developer
But you won't see any self-promotion or subliminal advertising in this presentation

PDFs yeah - fresh tech!
They've only been around 25 years.
I'll keep you excited by dropping in references to Blockchain and serverless every couple of minutes.

## Talk background

How did this come about?
I've been working on web application for one of my clients
It's nothing revolutionary: usual stuff
They add data and their customers can interact with it
Those customers can then run reports and get all sorts of amazing business insights

I was smuggly satisfied with the system
But they contacted me last year to say they were spending several days each month producing PDF reports for their clients
Why? The information they were sending was available at all times via a click or two
I am crap at marketing

I am not a typical user. Nor are you. We're all curious about technology. If we want to find out something, we go looking.

Normal people aren't like that. They like to be told stuff. These customers wanted to be emailed a monthly summary because they were far too busy to log in and spend five minutes thinking for themselves.

It was also an opportunity to remind clients that they're getting a useful service for their money even if they didn't use the system daily.

So my next question was: how are you producing these reports?
Well, we access the web system reports and grab screenshots. OK...
Then we paste them into PowerPoint. PowerPoint? Not Excel or anything practical?
Then we export a PDF.
The quality could be awful and the file sizes were huge.

So the question was: could I replicate these reports, allow some rudimentary editing and save to a PDF?

## PDF production

There are two primary ways of creating a PDF.

1. The easy way is to use a print driver which effectively converts HTML to Postscript but sends it to a file rather than a printer.

That works, but control is more limited than office documents. You couldn't, for example, make some pages portrait and some landscape. Also, it relies on the user to tweak settings get things right. Which they won't.

2. Use a PDF library to draw directly on to a document.

This is flexible because you're positioning text and lines on paper. It's hard work do to anything complex. I tried several libraries to convert tables and SVGs; it was difficult and the results were variable.

Little choice between these two extremes.

## Eureka moment

Why am I converting one document format to another?

Am I producing a PDF because that's what I've been told to do rather than because it's the best solution?

Reports are being produced in HTML so couldn't I just send clients an HTML document instead?

HTML advantages:
* all OSes have a browser - even if there's no PDF reader
* documents can be responsive and work on any device. PDFs are fixed size and don't work well on mobile
* file sizes should be much smaller
* copy/paste is often better
* it's accessible and works with screen readers

PDF advantages:
* free, open software (of variable quality)
* preview before saving
* easy to distribute (no security implications)
* works offline
* prints well
* read-only (to a point)
* users expect it

If I could offer these in an HTML file which could be emailed, it would be easier to develop and considerably more useful to users.

This last point got the most push-back from the client. Surely users expect PDFs?

Let's face it: most users rarely know or care what type of file they're receiving. But I had to prove HTML documents would be no more effort to distribute and open.


## Solution

* create a web page preview which could download itself
* allow basic editing before the document is output
* make it look like a paged document
* do not use any online assets: all CSS and images must be inlined
* use OS fonts
* do not distribute JavaScript. JS can be used to create and download the HTML, but the final distributed document will not contain JS. That avoids security issues when sending via email or other means.
* make it printer-friendly. It didn't need to be as good as a native PDF, but it should print nicely.

Has this been attempted before?

Do any of you remember MHTML? Most of you will be far too young.

MIME Encapsulation of Aggregate HTML Documents. Content of an MHTML file is encoded the same as HTML email message. In the 1990s, web users often used it to download web pages over 56K modems for offline use rather tying up the phone line while they read it.

Unfortunately, not all browsers support MHTML and the format has largely fallen from favour.

## Step 1: preview and download

Over to VS code.
Anyone using VS code now?

Create a basic HTML file which an administrator can preview and make rudimentary edits.
Once done, they can download a resulting file which is effectively a document containing just HTML and CSS.

This preview has a `<main>` element as a container.
Within that, there are `<article>` elements for each page or slide.

The HTML `<head>` also contains the usual meta tags and all styles are inlined.

Anything outside the `<head>` and `<main>` elements will not be output in the final document so we can use scripts or styling elsewhere as necessary.

It really doesn't matter how the content is created as long as it results in HTML and CSS.

So, I'm going to add a link with a disk icon. This allows someone to save the document because it has a standard `download` attribute with the file name.

It won't download anything at the moment, so let's write some JavaScript to fix that.

So we have an event handler which intercepts the click, extracts all the content using innerHTML and pops it into the downloads href as a data URI.

I'm also passing the data to an encode function to strip comments, unnecessary whitespace and any JavaScript code. Unfortunately, this doesn't work in Edge or IE but the downloaded document can be viewed in those browsers.

Let's now preview and save.
We have a document we can open in any browser.
Prove it works offline in Devtools.


## Step 2: pimp the document
So the document doesn't look particularly impressive so let's pimp it up.

I don't have time to go through this in excruciating detail, but all the code is on GitHub.

I've added some more styling including background images as inline data URIs in the CSS. These are heavily compressed 300x200 JPEGs shown full-screen but they're blurred using a CSS filter to ensure they look reasonable.

Next, we'll use CSS grid and size each slide. Each uses a minimum of the whole screen but will expand in height if more content is added.

You'll also notice a slide counter which is used for page numbering in the footer and scroll-snap properties which makes each slide snap to the viewport when it moves closer to the edge. This has fairly poor browser support but it's coming.

Next, we can make any tag editable by simply adding a `contenteditable` attribute. That's often good enough, but I soon discovered users pasting crap from Word which adds all sorts of HTML vomit. I eventually solved that by adding a markdown editor but your users may not be so ... challenging!

[Show editing]

Finally, it's possible you'll want to remove some pages for some users. To do that, I've added an after pseudo element to each slide which is styled outside the main content. There's then a click event handler which toggles a class named "removed". All we need to do then is remove any slide with that class using the regular expressions when the document is downloaded.

## Step 3: printing and fallbacks
OK, so let's make the document print nicely by setting print styles.

We'll set a comfortable font size, ensure the text is black on a white background and adjust some margins. We'll also remove unnecessary content such as backgrounds and footers.

Next, it pains me to say this, but browsers can't handle printing CSS Grid or Flexbox. It's not really necessary here so all the pages are set to standard blocks.

CSS does allow you to set page breaks at certain points but we don't really need that. However, we will ask the printer to avoid splitting slides, tables and images where possible.

Do you remember that chart with the dark background? That's not ideal for printing, but we can fix that with a filter which inverts the colours, and adjusts the hue and brightness.

We can now use the print preview. I've not done much here but the document will print nicely.

## Gmail evil
OK, so how do you think Gmail will preview this document when it's attached and sent in an email? I'll give you a clue: it opens it in a new tab.

So, for some reason, Gmail treats it like an HTML email and strips styles. The only way to see it is download and view the file but some users may not realise that.

To sort it, I've added a message at the top with inline styling. That message is removed with `display:none` when the styles work.


## Fin
That's it. We have a system which can output an HTML document which can be sent to anyone.

We have all the benefits of HTML plus those of PDFs. It works in all browsers. I've used some CSS properties which aren't great in IE but it remains readable and prints perfectly.

* easy to distribute (no security implications)
* works offline
* prints well

It's not really read-only but neither are PDFs when it comes to that. The code is minified so it's damn difficult to edit. If you're concerned, consider adding a hash to the content somewhere so you can prove a document has been tampered with.

Finally, user expectations. This was the biggest unknown for me but, so far, they love it. Similar documents have been sent to several hundred people and none of them have experienced problems despite a wide variety of email systems and browsers.

In fact, some have even being demanding monthly reports before the month has finished so the data isn't complete. Which is obviously bonkers, but there you go.

This example code is all on GitHub. You can adapt it for your own purposes and are very welcome to hire me should you need something more sophisticated!

So, the next time someone asks for a PDF, tell them you have a better option.

Any questions?
