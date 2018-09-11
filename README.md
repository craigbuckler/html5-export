# HTML5 document export
An HTML5 alternative to PDF documents.

Presentation by [@craigbuckler](https://twitter.com/craigbuckler) for the [TechExeter conference, Exeter, 7 September 2018](https://techexeter.uk/).

The HTML files provided here show a document preview which permits rudimentary editing, page hiding, and adjustments. A disk icon link downloads a single self-contained HTML file which can be distributed to anyone - like you would do with a PDF file. It can be opened in any browser and viewed offline.

All the preview HTML pages can be directly opened in a browser. A server should not be required, but run `node server.js` if you would prefer to access via `http://localhost:8888/`.

Files:

* `preview0.html` - the basic document structure
* `preview1.html` - content, basic styles, download functionality
* `preview2.html` - page styles, add/remove pages, editing
* `preview3.html` - printer-friendly styles

Only `preview3.html` need be examined to see the whole system.


## HTML file benefits
This demonstration illustrates how a single static HTML file can be exported from a web system for distribution. It's a viable alternative to PDF and offers other benefits:

1. Nothing to install - all OSes have a browser even when there's no PDF reader.
1. The document is accessible, responsive and works well on any device including smartphones.
1. The file size is considerably smaller than PDF.
1. Text and image copying works well.

The resulting saved file contains all assets, does not include JavaScript, works offline, and prints well.


## Technical implementation
HTML page content is created on the server and/or client and all CSS and images assets are inlined using base64 encoding where necessary. In this demonstration, only content within the HTML `<head>` and `<main>` are exported. All other code is used for preview functionality.

When the download icon link is clicked, a JavaScript event handler:

1. extracts all code from the `<head>` and `<main>` elements using `.innerHTML`
1. removes unnecessary whitespace, comments, `<script>` tags, etc. and
1. adds the code to the `href` of the download icon as a data URI.

The link sets the `download` attribute to force a download.

Downloading functionality does not work in Edge or IE, but the downloaded document works in any browser.


## Usage
This demonstration is a proof of concept you can adapt for your own web systems. You could consider additional functionality such as:

1. extracting content from different elements
1. auto-inlining assets on demand, e.g. make an Ajax request for CSS files
1. modifying the exported HTML using other criteria, or
1. adding content hashes or checksums to the filename or content to check whether the file has been modified.

All code can be used as you like, but please don't expect me to take responsibility for it!
