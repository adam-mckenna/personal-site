---
layout: post
title: "Three Things I Learnt at .concat() 2018 (and other reasons to visit Salzburg)"
description: I was fortunate enough to attend the user experience and web development conference .concat() 2018. Let's discuss three useful things I learnt.
date: 2018-03-05 21:04:19 +0100
permalink: /articles/:title/
categories: concat conference ux web development
featured-img: build/img/posts/three-things-i-learnt-at-concat-2018-and-other-reasons-to-visit-salzburg/featured.jpg
---

This year, I was fortunate enough to attend [.concat() 2018][concat-2018], a user experience and web development conference hosted in Salzburg, Austria - the home of Mozart and setting of _The Sound of Music_ - at FH Salzburg, the University of Applied Science. The [University of Sunderland](https://www.sunderland.ac.uk/) sponsored my attendence as part of my studies.

The conference ran two tracks which, unfortunately, meant that all of the talks clashed, and I was unable to attend a handful of presentations that had caught my attention, including those by [Ursula Sarracini][ursula], [Rasmus Lerdorf][rasmus], and [Estelle Weyl][estelle], among others exploring concepts such as accessibility, PHP, and maintaining legacy codebases.

The day began with a delicious, vegan-friendly breakfast, followed by an endless stream of 30-minute presentations, all kicked off with a keynote presentation by Google engineer [Danno Clifford][danno]: _When Fast is Faster Than Fastest_, wherein he discussed optimising the Chrome V8 JavaScript engine.

Interweaved between the talks was evermore food (authentic Austrian food, this time), an endless supply of freebies, barista coffee, and beers. The day was rounded off nicely with a keynote presentation by the renowned [Sara Soueidan][sara], discussing a host of applications for SVGs in her talk:  _the `<svg>` of .svg_.

I had a great time at the conference, and I learned a great deal, too. I'd like to share some of what I learnt with you in this article. So, here are three things I learnt at _concat() 2018_.

## No. 1: Practical tips for designing Progressive Web Apps.

Before attending the conference, I had some experience of the technical aspects of  Progressive Web App (PWA) development. I'd implemented service workers for caching and offline support, theming, etc. But, I was not as well versed in the user experience and interface design aspects of PWA development.

Thankfully, [Nicole Saidy][nicole] stepped in to fill in the gaps in my knowledge. In her fast-paced talk: _Designing Great Progressive Web Apps_, Nicole talked through a checklist of tricks to ensure your progressive web app offers a great user experience.

Nicole rattled through some of the basic steps: app icons generated via [Real Favicon Generator][real-fav-generator], and theming via `manifest.json` and `meta` tags. 

She then moved onto the more complex aspects.

One of the main attractions of a PWA, she explained, is the ability to operate offline. To leverage this, Nicole proposed an "offline-first" strategy. This can be achieved with a number of steps:

* Inform the user about the change in internet connectivity.
* When the connection is restored, provide a means to retrieve new content.
* If the PWA is data-heavy, provide a 'data-saver' mode.
* If the PWA offers content, provide the ability to download the content. Inform the user of file sizes if a download option is provided.
* Simple but effective: add an 'offline-mode' colour to the app. (To accommodate  users with visual impairment, ensure other means to determine the offline state have been provided to the user - a label, for example).

Another interesting topic that Nicole touched on was _Progressive Loading_ with an [Application Shell Architecture](https://developers.google.com/web/fundamentals/architecture/app-shell) - the concept of loading particular elements before the entire page loads.

With a 'traditional' website, everything is rendered immediately when the stylesheets, and other resources, have been loaded. Whereas, when leverging the Application Shell Architecture, specific elements can be loaded earlier in the rendering process to create an impression of a faster loading website, even though the website hasn't _actually_ loaded faster.

The best part of this effect, in my opinion, is the simplicity of its implementation. All you need to do is serve the applicable CSS via a `<style>` tag at the top of the page. The rest of the website styles can continue to be served via a stylesheet. The browser will automatically prioritise the styles served at the top of the page, rendering them while the stylesheet loads.

You can see this effect used across multiple Google products, including YouTube and the Google search engine.

Nicole covered plenty more in her talk, including 'PWA audits', iOS-specific considerations, 'micro-interactions', and a detailed PWA checklist that you can use.

You can watch Nicole's full talk on YouTube via the link below.

[![Nicole Saidy - Designing Great Progressive Web Apps](https://img.youtube.com/vi/2NZc4C7uNcU/0.jpg)](https://www.youtube.com/watch?v=2NZc4C7uNcU)

## No. 2: You can use CSS Custom Properties today.

Though I had heard of CSS Custom Properties before the conference, I had **no experience at all** with them. At the pace that the HTML, CSS, and JavaScript specs grow - not even mentioning third-party technologies - I find it difficult to keep up-to-date with every feature.

That being said, the CSS Custom Properties spec looks a promising addition to the CSS language. Even better, it is fully supported in all modern browsers - you can start using it _today_.

If, like I was, you're wondering how on earth you can, then [Mike Riethmuller][mike] has you covered. In his talk _The Strategy Guide to CSS Custom Properties_, Mike explored a host of ways in which you can use custom properties in your projects to improve the maintainability of your CSS.

At first, I feared that the new feature was an attempt to replace the variable functionality of pre-processors, such as _SASS_ and _LESS_, but this is not the case. In fact, Mike explores how, and why, we can, and should, use both.

Concisely put, Mike argues that you should use pre-processor variables for theming, and CSS Custom Properties for values that will change within your media queries. 

To learn the nitty-gritty of Mike's strategy, check out his full talk on YouTube below.

[![Mike Riethmuller - The strategy guide to CSS Custom Properties](https://img.youtube.com/vi/Zg8f0fNekp4/0.jpg)](https://www.youtube.com/watch?v=Zg8f0fNekp4)

## No. 3: Address your bias

It's a fact: we all have biases. As software developers, UX designers, and the like, this inevitably effects the applications that we build. However, this fact is not ample justification to let our applications reflect our biases: we need to address them.

Nobody understands that more, it would seem, than [Ivana McConnell][ivana]. In her much-warranted, antagonistic talk, _Your Algorithm is Not Neutral_, Ivana explored the concept of exclusion in our applications. Ivana called out a host of companies who failed to address their biases, and who had in turn released applications into the wild that negatively affected the lives of their users.

From a [Pure Gym application that assumed all users with the title 'Dr' were male, subsequently disallowing a female into the changing rooms][puregym], to apps like [AirBnb][airbnb] and [Nextdoor][nextdoor] that allowed racial discrimination, and [Snapchat providing users with racist filters][snapchat]: users are being excluded and actively discriminated against.

Products should empower users, not exclude them. So, how do we approach inclusive UX?

You can discover a series of steps to do so in Ivana's powerful talk on YouTube, embeded below.

[![Ivana McConnell - Your Algorithm isn't neutral...](https://img.youtube.com/vi/As5fhzBY5xk/0.jpg)](https://www.youtube.com/watch?v=As5fhzBY5xk)

In a similar vein, [Jenny Shen][jenny] explored how we can design across cultures in her humorous, yet undoubtably thought-provoking talk, _Build Bridges, Not Walls. Design for Users Across Cultures_. 

Exploring what culture is, and why we should care, Jenny provided a series of unintuitive examples that illustrated how users in difficult cultures react to design decisions made by someone unfamiliar with their culture.

Though I could attempt to reference her examples, I would not do them justice and I implore you to watch Jenny's talk at your earliest convenience. You can do so below.

[![Jenny Shen - Build bridges, not walls – Design for users across cultures](https://img.youtube.com/vi/ER3534JJucc/0.jpg)](https://www.youtube.com/watch?v=ER3534JJucc)

A consistent theme runs through both talks: **you have a bias and you need to consciously take action to ensure your user does experience the implications of your unintended, natural bias, which impacts race, culture, gender and social conditions.**

## Conclusion

The _Concat() 2018_ conference was a memorable day: thought-provoking talks from a host of great speakers; high-quality local cuisine, and some of the best coffee I have ever had provided by an on-site barista; lovely attendees and, of course, a fantastic team.

I have so many takeaways to think about from all the talks I watched, and a backlog of talks that I missed to catch-up on. The points I have discussed in this post only scrape the surface of the ideas circulated throughout the day, and I recommend that you watch the talks yourself and, of course, sign-up for next year's ticket... (fingers-crossed).

And, in that vein…

## Bonus: Here's Some *Other* Reasons to Visit Salzburg

The conference was a fantastic opportunity for me to explore Austria, having never visited the country before. Though historically known for salt mining - *Salzburg* translates directly to 'Salt Fortress' - and more recently known as the birthplace of the world-famous composer Wolfgang Amadeus Mozart and the setting of The Sound of Music, Salzburg has a lot more to offer.

### Scenery

Unlike many cities of the 19th century, Salzburg's buildings were spared knocking-down, thanks to a one-hundred-year period of economic neglect from the ruling Habsburg dynasty after the city joined Austria in 1816, ensuring the city was able to retain its distinctive appearance.

![A photograph that doesn't remotely do Salzburg's beauty justice](https://thepracticaldev.s3.amazonaws.com/i/4xtgawmtisynyw40ngu4.jpg)

As a result, modern day visitors are able to experience picturesque architecture that is difficult to find in many other places in Europe. And, with Salzburg being surrounded by mountains and various other vantage points, there is ample opportunity to be awed. 

![Another photograph that doesn't remotely do Salzburg's beauty justice](https://i.imgur.com/YGJ2tOr.jpg)

### Cuisine and Drinks

Salzburg has quite the offering of delicious cuisine, and is also the home place of a number of delicacies, including Paul Furst's [Original Salzburger Mozartkugel](http://www.original-mozartkugel.com/index_e.php) and the _Original Sacher Torte_, the latter of which is available at the [Café Confiserie Sacher](https://www.sacher.com/hotel-wien-2/kulinarik/cafe-sacher-wien/) (who never pass on an opportunity to remind you that they are offering not just any Sacher Torte, but the _Original Sacher Torte_).

![The "Old Austrian" dish](https://i.imgur.com/izTRdHR.jpg)

In addition to treats, there is no shortage of authentic food, including beef goulash, spinach dumplings, and frankfurter sausages. Even the coffee stood out. A common option in Salzburg is the _Melange_: a filter coffee served with milk, whipped cream and, in most cases, a chocolate treat. All the coffee I tried in Salzburg was even served with a small glass of cold water.

![Melange coffee from Cafe Mozart](https://i.imgur.com/bHDqHql.jpg)

### Untersberg Mountain

A short bus journey away from the city centre, in Grödig, there is a cable car that you can take to the snowy speaks of _Untersberg_ mountain. Though the cable car usually costs €25 for an ascent and descent, you can ride it for free with a [Salzburg Card](https://www.salzburg.info/en/hotels-offers/salzburg-card). 

We were able to climb the mountain on a particularly clear day, after a full day of snow, and were able to enjoy the scorching sun, endless snow, and unforgettable views of Salzburg, _Watzmann_ mountain and, the German _Bundesland_ of Bavaria. 

!['Deep' photo of me enjoying the view](https://thepracticaldev.s3.amazonaws.com/i/hmf24mf3qafse6k9w3ho.jpg)

Caption: Unintentionally 'deep' photo of me enjoying the view.

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