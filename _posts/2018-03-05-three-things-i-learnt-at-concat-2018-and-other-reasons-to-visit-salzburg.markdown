---
layout: post
title: "Three Things I Learnt at .concat() 2018 (and other reasons to visit Salzburg)"
description: I was fortunate enough to attend the user experience and web development conference .concat() 2018. Let's discuss three useful things I learnt.
date: 2018-03-05 21:04:19 +0100
permalink: /articles/:title/
categories: concat conference ux web development
featured-img: build/img/posts/three-things-i-learnt-at-concat-2018-and-other-reasons-to-visit-salzburg/featured.jpg
---

This year, I was fortunate enough to attend the user experience and web development conference [.concat() 2018][concat-2018] thanks to the University of Sunderland. The event was hosted in Salzburg, Austria - the home of Mozart and The Sound of Music - at FH Salzburg, the University of Applied Science.

The conference ran two tracks which, unfortunately, meant that talks clashed and I was unable to attend a handful of intriguing talks by [Ursula Sarracini][ursula], [Rasmus Lerdorf][rasmus] and [Estelle Weyl][estelle], among others exploring concepts such as accessibility, PHP and legacy codebases.

The day began with a delicious, vegan-friendly breakfast and kicked off an endless stream of 30-minute talks with a keynote presentation by Google engineer [Danno Clifford][danno]: _When Fast is Faster Than Fastest_ wherein he discusses optimising the Chrome V8 JavaScript engine.

Interweaved between the talks was more delicious, authentic Austrian food, endless freebies, barista coffee, beers and - to round it all off - a keynote presentation by the renowned [Sara Soueidan][sara] discussing a host of applications for SVGs in her talk:  _the `<svg>` of .svg_.

After having such a great time, I thought it prudent to share my experience. So, here are three things I learnt at _concat() 2018_.

## Practical tips for designing Progressive Web Apps

Despite having experience of the technical aspects of Progressive Web Apps (PWA), having experience in implementing service workers for caching and offline support, theming, etc., I am not as well versed in the user experience and interface design aspects of PWAs.

In her fast-paced talk, Designing Progressive Web Apps, [Nicole Saidy][nicole] talked us through a checklist of tricks to offer your progressive web app users a maximised user experience.

Nicole rattled through some of the basic steps: app icons generated via [Real Favicon Generator][real-fav-generator] and theming via `manifest.json` and `meta` tags. Find out more about these concepts here.

One of the main attractions of a PWA is the ability to operate offline; in light of this, Nicole proposes an offline-first strategy with a checklist of steps:

* Inform the user about the change in internet connectivity.
* When the connection is restored, provide a means to get new content.
* If the PWA is data-heavy, provide a 'data-saver' mode.
* If the PWA offers content, provide a means to download the content. Also include the file sizes if the download option is provided.
* Simple, but effective: add an 'offline-mode' colour to the app. (To accommodate for users with visual impairments, ensure other notices have been provided to the user)

Another great aspect of Nicole's talk was _Progressive Loading_ with an Application Shell Architecture - essentially the concept of certain elements loading before the entire page loads.

In a traditional site, everything loads at once when the stylesheets, etc. have been loaded, whereas on a progressive loading site, specific elements can be loaded in early to create an impression of a faster loading website, despite the fact that the website will not actually load any faster than a standard app.

The great thing about this effect is the simplicity of its implementation. To implement this feature, you simply need to serve the CSS applicable to the important elements (e.g. `<header>`, `<nav>`, loading spinner, etc.) in the `<style>` tag at the top of the page, and serve the rest of the apps styles via a stylesheet. The browser automatically provides priority to the head styles.

Read more on loading apps with an Application Shell Architecture [here][shell-architecture "Application Shell Architecture documentation"].

Nicole covered plenty more in her talk; including PWA audits, iOS-specific considerations, micro-interactions and a detailed PWA checklist.

Watch the full talk via YouTube: 

[![Nicole Saidy - Designing Great Progressive Web Apps](https://img.youtube.com/vi/2NZc4C7uNcU/0.jpg)](https://www.youtube.com/watch?v=2NZc4C7uNcU)

## You can use CSS Custom Properties today

Though I had heard of CSS Custom Properties, I had no experience with them. At the pace that the HTML, CSS and JavaScript specs grow - not mentioning third-party tools - it is difficult to keep up-to-date with every feature.

That being said, CSS Custom Properties looks to be a very promising addition to the CSS spec and it is fully supported in all modern browsers - you can start using it today.

[Mike Riethmuller][mike] explored a host of ways in which you can use the feature in your projects to improve the maintainability and quality of your CSS in his talk _The Strategy Guide to CSS Custom Properties_.

At first, I feared that the new feature was simply an attempt to replace the variable functionality of pre-processors, such as SASS or LESS, but this is not the case. In fact, Mike explores how - and why - we can - and should - use both.

Concisely put: you should use pre-processor variables for theming, and CSS Custom Properties for values that will change in media queries. To discover the nitty-gritty of this strategy, watch Mike's full talk.

Watch the full talk via YouTube: 

[![Mike Riethmuller - The strategy guide to CSS Custom Properties](https://img.youtube.com/vi/Zg8f0fNekp4/0.jpg)](https://www.youtube.com/watch?v=Zg8f0fNekp4)

## Address your bias

We all have bias, and, as software developers, UX designers, etc. this ultimately affects the applications we build. This fact, however, is not ample reason to let our applications reflect our biases: we need to address them.

[Ivana McConnell][ivana]'s talk, _Your Algorithm is Not Neutral_, explored the concept of exclusion in the context of systems. With a warranted, offensive edge, Ivana called out a host of companies who failed to address their biases and released applications into the wild that negatively affected the lives of those using it.

From a [Pure Gym application that assumes all users with the title 'Dr' were male, subsequently disallowing a female into the changing rooms][puregym] to apps like [AirBnb][airbnb] and [Nextdoor][nextdoor] allowing racial discrimination and [Snapchat providing users with racist filters][snapchat]: users are being excluded and actively discriminated against.

Products should empower users, not exclude them. So, how do we approach inclusive UX? Discover a series of steps to do so in Ivana's powerful talk.

Watch the full talk via YouTube: 

[![Ivana McConnell - Your Algorithm isn't neutral...](https://img.youtube.com/vi/As5fhzBY5xk/0.jpg)](https://www.youtube.com/watch?v=As5fhzBY5xk)

In a similar vein, [Jenny Shen][jenny] explored how to design across cultures in her humorous, yet thought-provoking talk _Build Bridges, Not Walls. Design for Users Across Cultures_. Exploring what culture is, and why we should care, Jenny provided a series of unintuitive examples of how users in difficult cultures react to design decisions made by someone unfamiliar with the culture.

Though I could attempt to reference her examples, I would not do them justice and I implore you to watch Jenny's talk at your earliest convenience.

Watch the full talk via YouTube: 

[![Jenny Shen - Build bridges, not walls – Design for users across cultures](https://img.youtube.com/vi/ER3534JJucc/0.jpg)](https://www.youtube.com/watch?v=ER3534JJucc)

A consistent theme runs through both talks: you have a bias and you need to consciously take action to ensure your user does experience implications for your unintended, natural bias across race, culture, gender and social conditions.

## Conclusion

The Concat() 2018 Conference was a memorable day: thought-provoking talks from a host of great speakers; high-quality local cuisine and some of the best coffee I have ever had provided by an on-site barista; lovely attendees and, of course, a fantastic team.

I have so many takeaways to think about from all the talks I watched, and a backlog of talks that I missed to catch-up on. The points I have discussed in this post only scrape the surface of the ideas spread throughout the day and I recommend to watch the talks yourself and, of course, sign-up for next year's ticket (fingers-crossed).

And, in that vein…

## Bonus: Here's Some Other Reasons to Visit Salzburg

The conference was a fantastic opportunity to explore Austria, having never visited the nation before. Though historically known for salt mining - Salzburg translates directly into "Salt City" - and more recently known as the birthplace of the world-famous composer Wolfgang Amadeus Mozart and the setting of The Sound of Music, Salzburg has a lot more to offer.

### Scenery

Unlike many cities of the time, Salzburg was spared the knocking-down and rebuilding of buildings, ensuring the city was able to retain its distinctive appearance thanks to a one-hundred-year period of resource and financial neglect from the ruling Habsburg dynasty after the city joined Austria in 1816. 

![A photograph that doesn't remotely do Salzburg's beauty justice](https://thepracticaldev.s3.amazonaws.com/i/4xtgawmtisynyw40ngu4.jpg)

As a result, modern day visitors are able to experience picturesque architecture that is difficult to find in many other places in Europe. And, with Salzburg being surrounded by mountains and various other vantage points, there is ample opportunity to be awed. 

![Another photograph that doesn't remotely do Salzburg's beauty justice](https://i.imgur.com/YGJ2tOr.jpg)

### Cuisine and Drinks

Salzburg has quite the offering of delicious cuisine and is also the home place of a number of delicacies, including Paul Furst's [Original Salzburger Mozartkugel](http://www.original-mozartkugel.com/index_e.php) and the _Original Sacher Torte_; the latter of which is available at the [Café Confiserie Sacher](https://www.sacher.com/hotel-wien-2/kulinarik/cafe-sacher-wien/), who never pass on an opportunity to remind you that they are offering not just any Sacher Torte, but the Original Sacher Torte.

![The "Old Austrian" dish](https://i.imgur.com/izTRdHR.jpg)

In addition to treats, there is no shortage of authentic food, including beef goulash, spinach dumplings and frankfurter sausages. Even the coffee stood out; one common option in Salzburg is the _Melange_: a filter coffee served with milk, whipped cream and, in most cases, a chocolate treat. All the coffee I tried in Salzburg was even served with a small glass of cold water.

![Melange coffee from Cafe Mozart](https://i.imgur.com/bHDqHql.jpg)

### Untersberg Mountain

A short bus journey away from the city centre - in Grödig - is a cable car that you can take to the snowy speaks of _Unterberg_ mountain. Though the cable car usually costs €25 for ascent and descent, you can ride it for free with a [Salzburg Card](https://www.salzburg.info/en/hotels-offers/salzburg-card). 

We were able to climb the mountain on a particularly clear day, after a full day of snow, and were able to enjoy the scorching sun, endless snow and unforgettable views of Salzburg, _Watzmann_ mountain and the German province of Bavaria. 

!['Deep' photo of me enjoying the view](https://thepracticaldev.s3.amazonaws.com/i/hmf24mf3qafse6k9w3ho.jpg)

Caption: Unintentionally 'deep' photo of me enjoying the view

No description or photographs can do the experience justice. If you find yourself in Salzburg, Grödig or anywhere nearby, this is an unmissable experience.

[concat-2018]: https://2018.conc.at/
[ursula]: https://twitter.com/ursulasarracini
[rasmus]: https://twitter.com/rasmus
[estelle]: https://twitter.com/estellevw
[danno]: https://twitter.com/expatdanno
[sara]: https://www.sarasoueidan.com/

[nicole]: https://twitter.com/nicolesaidy
[real-fav-generator]: https://realfavicongenerator.net/
[shell-architecture]: https://developers.google.com/web/updates/2015/11/app-shell

[mike]: https://twitter.com/mikeriethmuller

[ivana]: https://twitter.com/ivanamcconnell
[puregym]: https://www.mirror.co.uk/news/uk-news/doctor-locked-out-womens-changing-5358594
[airbnb]: https://www.npr.org/2017/03/02/518087610/new-research-looks-at-ways-to-help-stop-airbnb-racial-discrimination
[nextdoor]: https://www.wired.com/2017/02/for-nextdoor-eliminating-racism-is-no-quick-fix/
[snapchat]: http://www.bbc.co.uk/news/world-asia-37042475
[jenny]: https://twitter.com/jennyshen