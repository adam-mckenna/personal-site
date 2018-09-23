---
layout: post
title: "Fast as a Veyron: Achieving 100/100 on Google PageSpeed Insights and beyond"
description: Exploring my experiences in the pursuit and attainment of high website performance; exploring abstract concepts and design decisions, as well as walking through practical examples.
date: 2018-09-23 16:00:00 +0100
permalink: /articles/:title/
categories: google pagespeed insights web perf optimisation minification
featured-img: build/img/posts/fast-as-a-veyron-achieving-100-100-on-google-pagespeed-insights-and-beyond/featured.jpg
---

During the years in my role as a web developer, I have built a variety of different websites and web applications, taking performance into consideration more and more with each project. I have built a number of supposedly super-fast applications, only to discover that Google didn&#39;t share my perceived optimism.

Upon typing the website domain address into the [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) (GPI) search bar, I would begin to bite my nails as Google began the heart wrenching analysis of said web application. Fear would turn to disappointment as I read the &#39;Needs Work&#39; amber performance ratings of the desktop platform. Often, the disappointment worsened upon the discovery of the unspeakable &#39;Poor&#39;red performance ratings that the mobile platform was receiving. Why were these seemingly fast websites performing so poorly in Google&#39;s eyes?

<figure>
    <img src="https://i.imgur.com/cLYAE4h.png" alt="">
    <figcaption>Example of Google PageSpeed Insights rating (at least this site has no &#39;red&#39; ratings!)</figcaption>
</figure>

The reasons why I was unable to achieve &#39;Good&#39; green ratings varied from project-to-project. Common examples include a lack of control over server-side performance; lack of time or budget to make the (seemingly) sizable performance improvements required or, in the early days of my career, simply a lack of understanding or inability to digest the sometimes-confusing GPI documentation advising how to configure and build a website to align with the tool&#39;s metrics.

Over time, I simply accepted that my websites would never be good enough for Google. "Anyway, the tool isn&#39;t a valid measurement of a website&#39;s performance," I concluded.

While my latter conclusion may hold some truth – there are certainly other web performance considerations outside the scope of PageSpeed Insights; for example, the tool fails measure website loading time ([as demonstrated by Lucy Beer](https://wp-rocket.me/blog/the-truth-about-google-pagespeed-insights/)) and is even less accurate if you begin to consider user experience as a performance metric (but, this is a discussion for another time!) – I was wrong on the former conclusion.

Having delved deeper and deeper into web performance, attempting to ensure that every website I build is faster than the last, and embracing a variety of web performance techniques – both new and old – it was time to show Google PageSpeed Insights that my websites _could_ be good enough. The opportunity arose in the form of a long-overdue redesign and rebuild of [personal website](https://adammckenna.co.uk/).

With no constraints – i.e. in terms of budget, time or technology – I was able to embrace everything I have learnt and put performance at the heart of the rebuild. And, as the story goes, I was finally able to attain the dream: 100/100 score on PageSpeed Insights (and &#39;A&#39; scores via [WebPagetest](http://www.webpagetest.org/), an arguably more comprehensive tool for measuring website performance and optimisation – which also measures loading time).

In this article, I will discuss my experiences in the pursuit and attainment of high website performance, discussing the abstract concepts and design decisions that helped improve the performance of my website, as well as walking through the various metrics that the Google PageSpeed Insights test is comprised of with practical examples.

## Concepts and Design

### Simple UI design

Though I have dabbled, I am certainly not a user interface designer. Yet, it seems almost common sense: the more content that is displayed on a website, the more content the browser is required to render and load. More content = higher load times.

In my experience, I have found a lot of web pages – particularly website home pages – to be cluttered with any amounts of seemingly arbitrary content, trying to cram in as much as the display dimensions will allow in an effort to promote every nuance of their service.

I have no doubt that some websites and web applications simply _need_ to be complex, but does not mean that my laptop screen needs to be overflowing with a sea of hero banners, videos, animations and so on? I&#39;m not so sure. As the saying goes, less is more.

So, I asked myself "what is the purpose of my website?" I had one objective: I wanted a website to post and display my articles. It was decided, then, that the website will serve to that end and no other.

I adopted a [mobile-first design approach](https://www.uxpin.com/studio/blog/a-hands-on-guide-to-mobile-first-design/) to design (and build) the website; starting with a simple navigation (a text-based logo and a handful of links); a very simple footer that promotes my social media accounts and, between the header and footer elements, a grid layout of articles. Nothing more. (Though I was feeling a tad rebellious and added images to the articles within the grid layout).

I knew – and intended that – my design would not require any videos, heavy-duty hero banner images or complex JavaScript or CSS animations. Just good old HTML, a few thumbnail images and a sprinkle of CSS and JavaScript. It&#39;s amazing what you can achieve with very little code these days.

### Progressive Web App

I knew from the offset that I wanted to build the website as [Progressive Web App](https://developers.google.com/web/fundamentals/primers/service-workers/) (PWA). If you&#39;re unfamiliar with the concept of a PWA, I implore you to watch [Nicole Saidy&#39;s talk: Designing Great Progressive Web Apps](https://www.youtube.com/watch?v=2NZc4C7uNcU) from _.concat() 2018_.

Long story short, though, a PWA is a regular website that has the added benefit of native mobile app-like interactions, including push notifications and offline support. Among the ever-growing list of reasons to build my website as a PWA was the significant web performance increases, achieved through the implementation of caching via a [JavaScript Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/).

The nitty-gritty implementation details are out-of-the-scope of this article, but if you intend on building your website as a Progressive Web App, Google offer great documentation on the implementation of [offline support and caching via a Service Worker](https://developers.google.com/web/fundamentals/codelabs/offline/).

### The Application Shell Model

There are a number of ways in which a Progressive Web App can be implemented and its functionality leveraged to provide a great user experience and high web performance. The architectural approach that I found most appealing was the [Application Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell).

<figure>
    <img src="https://developers.google.com/web/fundamentals/architecture/images/appshell.png" alt="">
    <figcaption>
        Sourced from 
        <a href="https://developers.google.com/web/fundamentals/architecture/app-shell" aria-label="Google app shell model architecture tutorial">https://developers.google.com/web/fundamentals/architecture/app-shell</a>
    </figcaption>
</figure>

The approach entails delivering a cacheable "shell" of the website user interface to the user – i.e. the website layout without content – and subsequently loading the content as it becomes available (we&#39;ll touch on some of the implementation details soon).

## The PageSpeed Insight Metrics

### Avoid landing page redirects

The first metric on the list is one of the easiest to avoid: landing page redirects. A landing page redirect is the process of a webpage redirecting the user to an alternative URL when they attempt to navigate to a given webpage URL. For example, if the user attempts to navigate to `example.com`, but is then redirected to `m.example.com`.

There is a reason this metric is still evaluated as part of the GPI. The implementation of landing page redirects has a handful of common and practical use cases.

The most common use of landing page redirects is the redirection of users who navigate to a URL prefaced with &#39;www.&#39; to the &#39;non-www&#39; version of the website, or vice versa. For example:

> `adammckenna.co.uk` redirected to `www.adammckenna.co.uk`
> `www.adammckenna.co.uk` redirected to `adammckenna.co.uk`

While this is a nice touch – and supposedly has [positive connotations for SEO](https://moz.com/blog/301-redirection-rules-for-seo) – it will slightly impede the website performance for those unfortunate enough to browse to the version of the website that is being redirected from. But, while I personally avoided this redirect in my website, there is certainly a valid use case for it – especially if SEO is a major concern.

Another common use of redirects is the (now-medieval) practise of redirecting mobile users to an entirely separate website built for mobile users, which is typically hosted on an &#39;m&#39; subdomain. For example:

> `adammckenna.co.uk` redirected to `m.adammckenna.co.uk`

Before the mainstream adoption of [responsive web design](https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/), the practise of redirecting mobile users to a separate website was commonplace. Nowadays, though, it is frowned upon by the entire web community and everyone unfortunate enough to have experienced a redirect.

Not only does this practise cause performance issues in terms of redirects, it has a [plethora of negative implications](https://alistapart.com/article/responsive-web-design) ([see also](https://www.smashingmagazine.com/2012/04/why-we-shouldnt-make-separate-mobile-websites/)). The verdict is clear: the &#39;m&#39; subdomain is a relic of the past.

As such, I built my personal website as a responsive website, following the principles – well, the ones that are still relevant – established in Ethan Marcotte&#39;s ground-breaking book, [Responsive Web Design](https://abookapart.com/products/responsive-web-design). No &#39;m&#39; subdomain redirect.

There are a number of other use-cases for redirects – for example, you simply cannot avoid a redirect if the website has several domain addresses for the same website or if the website is available in multiple languages – but, unless absolutely unavoidable, I would suggest leaving the redirects on the top-level shelf.

### Eliminate render-blocking JavaScript and CSS in above-the-fold content

When a browser requests a webpage, it begins to build up a DOM tree. Before the page can be rendered, the DOM tree must be fully built. Seems simple enough.

However, as part of the DOM building process, when the browser parser encounters an external `<script>` or stylesheet resource, it halts parsing the page until the relevant resource has been executed.

Further still, many websites rely on external resources hosted elsewhere – e.g. 3rd party JavaScript packages, Google Fonts or content delivery network (CDN) resources – and when the parser encounters these external resources, it must also wait for the file to download before it can be executed.

Often, scripts and stylesheets grow to become _huge_ documents, leading to notable bottlenecks during the page rendering process. Combined with a lax use of Google Fonts and other external resources, render-blocking can start to take a large toll on website performance.

In my case, I was requesting a large stylesheet and moderately-sized scripts file – albeit both were minified (a process we will touch on soon) – alongside an external Google Font with four weights and an external Google Analytics script. Though my website&#39;s use of resources was light in contrast to many popular websites, even these resources caused substantial loading latency.

I needed a solution. I needed to load my resources asynchronously with the page rendering – but how?

Back yonder, this may have been a monumental task. Thankfully, though, we live in a decade wherein the HTML spec is being developer faster than ever. With each new release comes easier, more efficient ways to achieve complex functionality.

One such addition to the HTML spec is the new ability to preload content via the [&#39;preload&#39; value for the `<link>` element&#39;s `rel` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content).

The new preload value has a [number of benefits over its precursors](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/), but ultimately it lets the browser load resources – those pesky stylesheets, scripts and external files – without blocking the rendering the web page&#39;s DOM tree. We can now _natively_ load our resources asynchronously. What a time to be alive!

The syntax is amazingly simple, too (the following is an [example from MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)):

```
<head>
  <meta charset="utf-8">
  <title>JS and CSS preload example</title>

  <link rel="preload" href="style.css" as="style">
  <link rel="preload" href="main.js" as="script">

  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1>bouncing balls</h1>
  <canvas></canvas>

  <script src="main.js"></script>
</body>
```

The `<link rel="stylesheet">` and `<script>` tags are included as standard. But, before that, some `<link rel="preload' as="x" href="y">` tags are also included for each resource that is being included. In the above example, we&#39;re loading in a `style.css` stylesheet and a `main.js` script, so we need a separate `<link rel="preload">` for each resource.

If you&#39;re thinking this seems too good to be true then, well… you&#39;d be _a little bit_ right. There is one teeny, tiny problem: browser support.

As the time of writing, the new preload value is only fully supported in Chrome, Safari and a handful of mobile browsers. That means no Firefox or Internet Explorer (surprise, surprise) support, and even MS Edge only offers partial support.

Of course, since we have the regular references to the style and script resources, as well as the new `rel="preload"` meta tags, the resources will load regardless. We just won&#39;t see the benefit of preload – and this just isn&#39;t great news.

This is where [loadCSS](https://github.com/filamentgroup/loadCSS) comes in.

loadCSS is a polyfill for browsers that do not yet support `rel=preload`, and can be implemented with relative ease.

Firstly, to use loadCSS, we need to include the [loadCSS preload polyfill script](https://github.com/filamentgroup/loadCSS/blob/master/src/cssrelpreload.js) somewhere in website:

```
<script>
/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
(function(){ ... }());
</script>
```

Next, we need to include a slightly amended `<link rel=”…”>` tag. When leveraging loadCSS, it is recommended that a single `<link rel=”preload”>` tag is used, instead of using both `rel=”preload”` and `rel=”style”` tags as per our previous example, because otherwise the browser will  only **fetch** the stylesheet and will not **apply** it to the page.

We can convert the `rel=preload` value to `rel=stylesheet` once the resource has loaded by leveraging the `<link>` element&#39;s native `onload` event. This also has the added benefit of reducing the amount of markup we actually need to write.

```
<!-— our local stylesheet. -->
<link rel="preload" href="path/to/style.css" as="style" onload=" this.rel='stylesheet'">
```

It is also recommended that the value of the `onload` attribute is changed to `null` within the `onload` handler (onload-ception) because some browsers will re-call the handler when the `rel` attribute&#39;s value is switched from `preload` to `style`.

```
<!—- our local stylesheet. -->
<link rel="preload" href="path/to/style.css" as="style" onload="this.onload=null; this.rel='stylesheet'">

<!—- we can also apply the same logic to external stylesheets, such as Google Fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css?family=Muli:300,300i,400,400i,600" as="style" onload="this.onload=null; this.rel='stylesheet'">
```

Of course, we also need to think about those users who do not have JavaScript enabled and, since the `onload` handler requires JavaScript, we need a fallback. We can easily provide such a fallback via the `<noscript>` tag.

```
<!—- for users with JavaScript disabled -->
<noscript>
    <link rel="stylesheet" href="path/to/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Muli:300,400,400i,600">
</noscript> 
```

With that, loadCSS is ready to do what it does best: load our CSS. Here&#39;s our complete code:

```
<link rel="preload" href="path/to/style.css" as="style" onload="this.onload=null; this.rel='stylesheet'">
<link rel="preload" href="https://fonts.googleapis.com/css?family=Muli:300,300i,400,400i,600" as="style" onload="this.onload=null; this.rel='stylesheet'">

<noscript>
    <link rel="stylesheet" href="path/to/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Muli:300,400,400i,600">
</noscript> 

<script>
/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
(function(){ ... }());
</script>
```

With our small snippet of code, we are able to asynchronously load our CSS across a plethora of browsers, regardless of whether the browser supports `rel="preload"`, and we can still deliver our resources to users who do not have JavaScript enabled.

Though confident that the stylesheets and scripts were no longer causing any trouble blocking the page rendering, I was not quite done with the above-the-fold issue.

My stylesheet was still a behemoth of a file, and there was no priority given to the styles that pertained to the above-the-fold elements of my webpage. For that, another solution was necessary. It&#39;s time to explore the Application Shell Model Architecture.

### Prioritise visible content (via the Application Shell Model Architecture)

Instead of loading all of the website styles in a single request – potentially wasting valuable loading time rendering CSS that isn&#39;t even visible to the user initially, e.g. the footer, content from other pages, etc. – we can prioritise the styles for [above-the-fold](http://www.webvanta.com/post/2014-07-06/responsive-design-above-the-fold) elements – i.e. any elements that will be visible as the website initially loads. In my case, my above-the-fold elements consisted of the website header, navigation and the &#39;article grid&#39;.

This is where the Application Shell Model comes in. The Application Shell Model is one of several solutions to ensure that the delivery of visible content is prioritised to the user. As outlined earlier in the Application Shell Model section, the approach focuses on the serving the layout styles to the user first, then loading in the content styles secondarily.

We can take this a step further by ensuring that not only the layout styles are included in the prioritised styles, but we can focus on only delivering the styles for the layout that is above-the-fold. Doing so will ensure our prioritised styles are as minimal as possible, delivering the shell of the website to the user as fast as possible.

Enough theory. How do we actually implement our Application Shell Model?

The implementation was easier than you might expect. I simply needed to separate the styles that pertained to the above-the-fold elements, by removing them from the website&#39;s main stylesheet and embedding them into the `<head>` of the website. Those prioritised styles will be rendered straight away, while any styles retained in the main stylesheet, relating to content and elements below-the-fold, can afford to be rendered later.

It all seemed simple enough in theory. Then I remembered that I was using [Sass](https://sass-lang.com/); [Liquid](https://github.com/Shopify/liquid) (a templating engine); build tools and task runners. Things got messy rather quickly.

I needed to embed specific styles from my Sass which, at this point, was being compiled into a single stylesheet. Thankfully, though, I had structured the website Sass in alignment with the [Atomic Design methodology](https://blog.alexdevero.com/atomic-design-scalable-modular-css-sass/), which ensured that my styles were finely de-coupled.

To implement the separation of prioritised and non-prioritised styles, I needed to compile two stylesheets – one that would provide the CSS that would be embed in the `<head>` of the website, and another with the content and below-the-fold styles that would be loaded in afterwards via `<link rel="stylesheet">`.

So, simply enough, a second Sass file was created – creatively called &#39;inline.scss&#39;, alongside the pre-existing &#39;style.scss&#39; master stylesheet. The file imports from the `style.scss` that pertained to the above-the-fold elements were moved to the &#39;inline&#39; stylesheet to be embedded in the `<head>`.

A small problem: I had a handful of Sass &#39;settings&#39; files that consisted of variables (for colours, breakpoints, etc.) and mixins. I quickly realised that both of the stylesheets would still require access to all of these &#39;settings&#39; files, or else I would have to start hardcoding values.

Therefore, a third file was required – which I named &#39;master.scss&#39; – which imports the Sass resources that were mutually required between the &#39;inline&#39; and &#39;style&#39; Sass files – i.e. the settings files – and subsequently imported the &#39;master&#39; Sass resource into both stylesheets.

Great. Now that the styles were separated, I needed to figure out how I could serve from the `<head>` of the website.

The first obvious klaxon-horn-inducing solution I thought of was to just manually copy the styles into the head of the website. _How elegant_. While yes, it would functionally achieve the desired outcome, it would come with a myriad of implications.

This approach would be a nightmare to maintain since any changes in the relevant Sass files would have to be manually coped into the head. Hypothetically, even if it wasn&#39;t a maintainability nightmare, duplicate code would have to be commit to the Git repo, since the styles that would be embedded in the `<head>` would already exist in the respective Sass files. This solution would never be feasible.

The second solution devised was to leverage the project&#39;s task runner – which, in this case, was [Gulp](https://gulpjs.com/) (though [Grunt](https://gruntjs.com/) would have been ample for the task too) – to inject the content of the complied inline CSS file into the `<head>` during the build process. This seemed more realistic, and the implementation was pretty straight forward.

First, in the `<head>` of the website I included an arbitrary `<link>` tag that is replaced with the embedded styles during the Gulp build process:

`<link href="inline.css">`

I then created a Gulp task to replace the arbitrary `<link>` tag with the styles. The Gulp task leverages the [file-system](https://www.npmjs.com/package/file-system) and [gulp-replace](https://www.npmjs.com/package/gulp-replace) npm packages. Gulp, and the relevant packages, can be installed via the CLI with the following command:

`npm i gulp gulp-replace fs --save-dev`

Let&#39;s have a look at the task:

```
// instantiate the relevant packages
const gulp = require('gulp')
const fs = require('fs')
const replace = require('gulp-replace')

// The Gulp task “generates” the header of the website; in my case it finds the 
// “src” header file (located in "_includes/header.html”), subsequently finds the
// “<link href="inline.css">” tag and replaces it with the contents of the 
// inline.css stylesheet. The generated header is then stored 
// in the "_includes/build" directory
gulp.task('generate-header', () => {
    return gulp.src("_includes/header.html")
        .pipe(replace(/<link href="inline.css"[^>]*>/, (s) => {
            let style = fs.readFileSync("build/css/inline.css", 'utf8')
            return '<style>\n' + style + '\n</style>'
        }))
        .pipe(gulp.dest("_includes/build"))
})
```

The CSS file to which the `<link>` tag `href` attribute refers to does not exist; the decision to use this tag was arbitrary. Any tag could have been used. For example, I could have instead included:

`<meta id="embedded-styles">`

Then in the Gulp task, the syntax `replace(/<meta id="embedded-styles"[^>]\*>/ …` could have been used instead of `replace(/<link href="inline.css"[^>]\*>/ …`. The outcome would have been the same: the tag being replaced with the content of my `inline` stylesheet.

And that&#39;s it! With that, the website&#39;s above-the-fold styles were embedded in the head, I included the generated `header.html` file in my `.gitignore` so there was no duplication in the Git repo and the entire process was automated. The remainder of my styles were retained in a separate style sheet that was being served asynchronously and no longer blocked the page from rendering.

In my experience, addressing the issues of render-blocking and above-the-fold prioritisation were certainly the most time-consuming and difficult aspects of the website performance optimisation process, but were certainly the most fruitful. If there is only one thing you take away from this article, make it these sections.

### Enable compression

Okay! Now we have got the big guns out of the way, let&#39;s focus on some quick and easy wins, starting with compression.

In the context of PageSpeed Insights, compression refers to a nifty package called [gzip](https://www.gzip.org/) which, despite the fact its website and logo look straight out of the 90s, is a very popular and commonly used package to increase website performance.

Gzip works on the server side, compressing website resources into a zipped format and serving them to the browser. In turn, the browser unzips the resources and presents them to the end user. These zipped resources typically have dramatically smaller file sizes, vastly reducing server download time.

For more information on gzip&#39;s technical details, and the interaction between the server and client browser, check out both [this article](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/) and [this article](http://blog.servergrove.com/2014/04/14/gzip-compression-works/).

So, surely there are no doubts about the incredible benefit of gzip. All that remains is the lingering question: how the hell do I get it working with my website?

Since gzip is a server-side technology, the implementation actually depends on what software your web server is running. Chances are, you&#39;re working with Apache, ngnix or IIS, so here&#39;s some guidance for each platform:

- [Apache – How to enable gzip compression in Apache](https://knackforge.com/blog/karalmax/how-enable-gzip-compression-apache)
- [Ngnix – Enable gzip compression on ngnix](https://easyengine.io/tutorials/nginx/enable-gzip/)
- [IIS – Enabling Gzip Compression in IIS on Windows](http://help.accusoft.com/PCC/v10.4/HTML/How%20to%20Enable%20Gzip%20Compression%20in%20IIS%20on%20Windows.html)

### Leverage browser caching

Let&#39;s move onto browser caching.

Every resource – whether a stylesheet, script, image or something other resource – that is requested from a web server by the browser when loading a web page delays the processing and rendering of the webpage, as well as consuming more and more of the user&#39;s data allowance. The latter can be particularly devastating to mobile users with limited data or expensive data usage rates – remember: data costs are often much higher outside of Europe, the United States and other &#39;western&#39; nations.

When you consider that many of the resources used throughout a website are shared across multiple web pages throughout the website, the idea of re-requesting each resource every time a new page is loaded is a waste of time (in terms of processing and rendering) and data (let&#39;s help our users save some money!).

Instead, wouldn&#39;t it be easier if the resources that have already been loaded, whether in the user&#39;s current session, or in a previous interaction with the website, could be simply just _re-used_? That&#39;s exactly what browser caching allows.

To enable browser caching, a caching policy needs to be defined to identify how long a given resource should be cached for. You can tell the browser, for example: "I want .jpg, .png and .svg images to be cached for one year; HTML and CSS resources to be cached for one month…" and so on. You could even set a caching policy for an individual resource, if necessary.

Just like compression, the browser caching policy is operated server-side, meaning the implementation is dependent upon the software your web server is running. Here&#39;s some guidance for the big three platforms:

- [Apache – Leverage Browser Caching](https://varvy.com/pagespeed/leverage-browser-caching.html)
- [Nginx – How To Quickly Leverage Browser Caching on Nginx](https://scotch.io/@leaderinternet/how-to-quickly-leverage-browser-caching-on-nginx)
- [IIS - Enable Client Side Browser Caching for static Content in Web.config](http://blog.janjonas.net/2011-08-21/microsoft-iis-7-enable-client-side-browser-caching-static-content-web-config)

Unfortunately, we&#39;re not done there. Though the above steps will accommodate for 99.9% of your website&#39;s resources, there is one caveat: third-party resources. The browser caching policy for resources loaded from external servers is handled by the server that provides the resource. Often, this isn&#39;t a problem, as most CDN providers recognise the benefit of caching policy.

There is one organisation that, in the most ironic of fashions, seems to not recognise the benefit of a good caching policy. One organisation that offer a package that is enormously popular on the web. That organisation is Google.

[Google Analytics](https://analytics.google.com/analytics/web/#/report-home/a108634322w162315639p163326671), the widely popular web analytics platform, is served by an external JavaScript resource that, when validated via the Google PageSpeed Insights, will prompt an error for a rubbish caching policy. Google are invalidating the use of their own resource.

While this may seem counterintuitive, there is method in the madness. The caching policy for this particular resource is so lax because Google want to ensure that users are always using the latest version of their script, even if the script has just been updated. They do not want an outdated version of analytics to be cached in a user&#39;s browser for, say, three months, especially if the outdated script no longer tracks the user due to breaking changes.

Even with that in mind, there is a solution: a package called [ga-lite](https://github.com/jehna/ga-lite). The package serves the Google Analytics script via the [jsdelivr.net CDN](https://www.jsdelivr.com/) with a more "performance-friendly" caching policy. So, instead of including the Google Analytics script in the `<head>` of your website, you include the ga-lite script:

```
<script>
(function(e,t,n,i,s,a,c){e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)}
;a=t.createElement(i);c=t.getElementsByTagName(i)[0];a.async=true;a.src=s
;c.parentNode.insertBefore(a,c)
})(window,document,"galite","script","https://cdn.jsdelivr.net/npm/ga-lite@2/dist/ga-lite.min.js");

// Replace UA-XXXXXXXX-X' with your own Analytics tracking code
galite('create', 'UA-XXXXXXXX-X', 'auto');
galite('send', 'pageview');
</script>
```

Easy! Now, in complete honesty, you won&#39;t find any notable performance increases from the use of this package, but if you _really_ want to achieve a 100/100 score via PageSpeed Insights and you also want to use Google Analytics, then this may be your best bet.

### Reduce server response time

In the past, server response time was a consideration that was completely out of my control: the stakeholder for whom the website was being developed often dictated the server wherein the website would be hosted. More often than not, the clients would opt for cost-effective shared hosting solutions provided by the likes of [123 Reg](https://www.123-reg.co.uk/), [GoDaddy](https://godaddy.com/) and [1&amp;1](https://www.1and1.com/).

These solutions are great for many people and certainly have a wide target audience: they offer cost-effective hosting solutions and require absolutely no server configuration. But, for people looking to get the absolute maximum out of their web server, they are limited: these organisations typically provide very few server customisation or configuration options and offer average-at-best performance.

I recently went down an alternative route: cloud hosting via [Linode](https://www.linode.com/). Linode, much like the service&#39;s main competitor [DigitalOcean](https://www.digitalocean.com/), offer a vastly different experience to the aforementioned services. They strip away the customer-friendly pre-configured web servers and provide users with access to a web server (there are varying specifications available depending on requirements) wherein the user is required to install and configure everything: the OS, the web hosting stack (in my case, [Debian 8](https://www.debian.org/releases/jessie/) with a classic [LAMP stack](https://www.liquidweb.com/kb/what-is-a-lamp-stack/)).

Though this alternative route is certainly more work than the former options, there is one crucial contextual benefit: a significantly increased server response time. Even the most basic package that Linode offers has a significantly reduced response time when compared to the average GoDaddy or 1&amp;1 hosting packages; a reduced server response time means that the browser can receive resources from the web server faster and will spend less time waiting for an opportunity to begin rendering the web page.

Opting for Linode over the likes of GoDaddy or 1&amp;1 was a major contributor towards achieving the 100/100 source via PageSpeed Insights. (And no, unfortunately I am not being paid by Linode to promote their service – it&#39;s just a great service).

### Minify HTML, CSS and JavaScript

Right – no more server stuff, I promise. Let&#39;s get back to some trusty HTML, CSS and JavaScript. In the eliminating render-blocking and prioritising visible content sections of this article, we already explored how we can write and structure our client-side code to optimise performance, but there is a much quicker way we can take that optimisation even further – [minification](https://developers.google.com/speed/docs/insights/MinifyResources).

Minification is the process of reducing and compressing the contents of a resource (typically HTML, CSS and JavaScript) as much as possible, while still ensuring the resource still functions as originally intended.

The process parses the resource and removes code comments, spaces, formatting, unused code and reduces the length of variable names, among other things. The result is a resource left in an almost unreadable state. But, while a human cannot (easily) read a minified resource, the browser has absolutely no trouble reading the resource – in fact, it reads it much faster.

After all, those comments, spaces, formatting and descriptive variable names are only there for the sake of code readability. Once removed, the file size is dramatically reduced, meaning the time required to request the resource from the server is reduced, reducing the time necessary to render the relevant webpage.

How can we actually minify our HTML, CSS and JavaScript, though? I remember, when I first discovered minification, I had stored two separate files: the source file and the minified version of the source file. Every time I made a change to a resource, I would need to manually copy and paste my styles and scripts from the source file into an online minification tool, such as [CSS Compressor](https://csscompressor.com/) or JSCompress then copy the minified results into the minified file… and what a chore it was.

In more recent years, I have been using Gulp to automatically generate a minified version of my stylesheets and scripts every time a change is made. Sure, I still have two files, but instead of having to do anything manually, I simply run Gulp, edit my styles and scripts, and let Gulp do the hard work. My HTML pages are, of course, always requesting the generated minified versions of the files, while I continue to work on the source versions.

Let&#39;s have a look at my Gulp task for minifying my CSS. Alongside Gulp, I am leveraging [gulp-shorthand](https://www.npmjs.com/package/gulp-shorthand), which merges and reduces the length of certain CSS declarations, and [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano), which minifies the file. Gulp, and the relevant packages, can be installed via the CLI with the following command:

`npm i gulp gulp-shorthand gulp-cssnano --save-dev`

Let&#39;s have a look at the task:

```
const gulp = require('gulp')
const shorthand = require('gulp-shorthand')
const cssnano = require('gulp-cssnano')

gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(shorthand())
        .pipe(cssnano())
        .pipe(gulp.dest('build/css'))
})
```

Gulp works great for minification (along with a million other things) but there is an even simpler way to achieve site-wide minification of your HTML, CSS and JavaScript – and it doesn&#39;t even require a single line of code.

Answer: [Cloudflare](https://www.cloudflare.com/).

Cloudflare is a free service (with premium options) that offers so much that I won&#39;t get into the details of their entire service. But, among their many functions, Cloudflare serves as a powerful [content delivery network (CDN)](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) that serves as a middleman between the web server and the browser.

A CDN is a collection of geographically distributed servers working in conjunction to deliver content to users faster. Unlike a typical web server, the CDN can deliver resources from a server in their vast network that is most geographically close to the end user, significantly reducing request times for users that may be far away from the website&#39;s web server.

In addition to serving as a CDN, Cloudflare also offers several general options to increase the &#39;speed&#39; of the website it is serving. Though most of these options are only available to premium users, free users get access to &#39;Auto Minify&#39; features – Cloudflare will automatically minify your HTML, CSS and JavaScript with the click of a checkbox. No manual work; no code and no build tools. It doesn&#39;t get better than that.

<figure>
    <img src="https://i.imgur.com/NUcvsCO.png" alt="">
</figure>

As mentioned, Cloudflare is free and lets users serve as many websites as desired. It also offers a plethora of other useful features, including SSL, security and caching. In other words, it is a no-brainer. (And again, no, unfortunately I am not being paid by Cloudflare to promote their services – it&#39;s just a great service).

### Optimize images

Phew. Almost there. While I may not have saved best till last – I&#39;ve certainly saved easiest till last: image optimisation. Broadly, this recommendation is simple: ensure that the images used throughout a website have the smallest file sizes possible.

There are a number of ways wherein this can be achieved, and the steps different depending on whether the image is a [bitmap (.jpg, .png or .gif) or a vector (.svg)](https://vector-conversions.com/vectorizing/raster_vs_vector.html) image.

I have already discussed [the optimisation of .svg images](https://dev.to/adammcquiff/how-and-why-to-clean-svg-markup-49i) in a separate article, so I will not go into too much detail here.

Let&#39;s explore some recommendations for bitmap image optimisation.

The first step to ensure a reduced file size is ensuring appropriate image dimensions. For example, if an image is going to be used as the background for a `<div>` element that has a width of 800px, there is absolutely no reason for that image to have a width of 1920px. Surely an image width of 800px would suffice?

There are caveats to this logic, of course. The responsive web is known for being, well… _responsive_. It is often the case that the container that the image is a background of has no pre-defined width, and can range from a width of 0px to a width of 4000px (okay, that might be a tad extreme, but you get the idea). With that in mind, I advocate the approach generally and advise that it is applied as appropriate.

Once the bitmap has appropriate dimensions (or doesn&#39;t, whatever), there are a number of routes we can take to optimise it even further.

The first approach is manual optimisation via compression tools. There are a number of desktop applications available for both Windows ([FileOptimizer](https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer), for example) and MacOS (such as the very popular [ImageOptim](https://imageoptim.com/mac)), as well as a plethora of online compression tools (popular examples include [ImageCompressor](https://imagecompressor.com/) for .jpg and .png images; [SVGGOM](https://jakearchibald.github.io/svgomg/) for .svg images).

Assuming that your project has only a handful of images, the manual approach should be manageable. But, what happens when you&#39;re working with a project that contains thousands of images, or maybe even tens of thousands? Unless you&#39;re planning on losing a few weeks of your life, you&#39;re probably going to be looking for an automated solution.

Once again, our trusty task-running friend Gulp comes to save the day.

In my project, I was able to create two Gulp tasks – one for bitmaps, one for vectors – that would routinely inspect the project directory and, when an image of the respective format was added to the project, would automatically run the relevant task, compress the image and save it to a &#39;build&#39; directory.

One last time, let&#39;s explore the Gulp task. The task uses two packages: [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) for bitmap minification and [gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin) for vector minification. Gulp, and the relevant packages, can be installed via the CLI with the following command:

`npm i gulp gulp-imagemin gulp-svgmin --save-dev`

Let&#39;s look at the code:

```
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const svgmin = require('gulp-svgmin')

gulp.task('bitmap', () => {
    return gulp.src('src/img/**/*.{png,jpg,gif}')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('build/img'))
}) 

gulp.task('vector', () => {
    return gulp.src('src/img/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/img'))
})
```

Beautify. Now, instead of having to manually minify all of those tens of thousands of images, you can sit back, grab a coffee and let Gulp do the legwork. What a great friend Gulp is.

## Conclusion

So – there you have it. I have explored a ton of stuff that Google&#39;s PageSpeed Insights evaluates when rating a website&#39;s performance, providing examples from my own experience in achieving the precious 100/100 score.

If you have made it this far, you can breathe a sigh of relief – I hope you managed to learn something valuable and practical about web performance. If you have any questions regarding my experience or approaches, feel free to leave a comment, [Tweet me](https://twitter.com/AdamMcQuiff) or throw a brick through my window – whichever approach feels right.

If you want to explore my personal website (the basis for these examples) in more detail, check out the complete [source code on GitHub](https://github.com/AdamMcquiff/personal-site) and, most importantly, thank you for reading!