---
layout: post
title: "Improve the performance of WebStorm (and other JetBrains IDEs)"
description: How to make WebStorm and other JetBrains IDEs load and perform faster than ever before.
date: 2018-01-08 21:04:19 +0100
permalink: /articles/:title/
categories: jetbrains performance webstorm
featured-img: build/img/posts/improve-the-performance-of-webstorm-and-other-jetbrains-ides/featured.png
featured-img-caption: JetBrain Logos designed by <a href="http://squirrelmuffins.com" class="link">Kat On</a> and <a href="https://pittankopta.net/" class="link">Amon Keishima</a>.
---

Have you ever used WebStorm? What about PHPStorm, or, in fact, any of the IDEs in the JetBrains suite? They are an impressive collection of IDEs packed with features -- an integrated terminal, local history and VCS integration, "intelligent" imports, and much more. 

But, does this feature-bloat come at a price? Absolutely.

The performance of WebStorm, and the other JetBrains IDEs, pales in comparison to the lighter text editors that are popular in the web community. _Visual Studio Code_ and _Atom_ come to mind.

Fear not! There are solutions. 

But first, let's take a step back for those who aren't familiar with the IDE.
## What is WebStorm?


<a href="https://www.jetbrains.com/webstorm/">WebStorm</a> is a popular, powerful web development IDE. It is one of a larger collective of IDEs developed by <a href="https://www.jetbrains.com/">JetBrains</a> - formerly known as <em>IntelliJ</em>. These IDEs aim to offer the ultimate development environment for popular coding languages. 

Other JetBrains IDEs include <em>PHPStorm</em> for PHP, <em>IntelliJ IDEA</em>  for Java, <em>PyCharm</em> for Python, and <em>ReSharper</em> for C# (as a _Visual Studio_ extension), among others. 

Even <em>Android Studio</em>, which is technically a <em>Google</em> IDE, runs on the IntelliJ platform. With that in mind, most of the optimisations explored in this article can be transferred to other JetBrains IDEs. 

But, as we mentioned, although WebStorm is one of the most powerful IDEs available, it’s certainly not the most performant. In fact, on older machines, it can be a machine killer. 

Let's explore how to increase the load-time and performance of WebStorm by tweaking the out-of-the-box settings. 

## Optimising WebStorm's performance

### Setup Config Files

We’re going to start by customising a few settings within the WebStorm directory. 

But first, in order to customise WebStorm settings, we need to create some configuration files. We'll create two config files: `idea.properties` and `webstorm.vmoptions`. 

To create these files, open WebStorm and go to <b>Help</b>. 

Select <b>Edit Custom Properties…</b>. A dialog will prompt stating that the `idea.properties` file does not exist. 

Click <b>Yes</b> to create it. The file will open. Now you can add the config settings. This file is used for customising WebStorm properties.

To create the other file, go again to <b>Help</b> and select <b>Edit Custom VM Options...</b>. 

A dialog will prompt stating that the `webstorm.vmoptions` file does not exist.

Click <b>Yes</b> to create one. The file will open. Now you can add the config settings. This file is used for customising WebStorm Virtual Machine options.

For future reference, these files can be found in the following directories:

Windows 7 / 8 / 10 - `<SYSTEM DRIVE>\Users\<USER ACCOUNT NAME>\.<PRODUCT><VERSION>`

OS X / macOS - `~/Library/Preferences/<PRODUCT><VERSION>`

### Improve the Performance

Now that our config files are setup, we can change WebStorm’s settings to optimise  performance.

First, let's change some options within the `webstorm.vmoptions` file. 

Open the newly created file, select all of the options and replace them with the following snippet: 

	-Xms1024m 
	-Xmx1536m 
	-XX:MaxPermSize=1024m 
	-XX:ReservedCodeCacheSize=512m 
	-XX:+UseCompressedOops 

Next, we are going to remove IDE latency using an experimental property called `zero-latency` that was introduced in 2015. 

To do so, add the following line to your `idea.properties` file: 

	editor.zero.latency.typing=true

We’re going to move on to generally optimising the usage of WebStorm by de-selecting unnecessary features. Doing so will reduce feature-bloat and increase system memory.

### Appearance and Behaviour

To start, let’s disable automatic update checking and statistic sending within the <b>Appearance and Behaviour</b> preferences.

To do so, go to <b>Preferences</b> and select <b>Appearance & Behaviour</b>. 

Then go to <b>System Settings</b> and select the <b>Updates</b> tab. From here, de-select <em>Automatically check updates for…</em>

Next, select the menu 'Data Sharing' from the System Settings and de-select <em>Send usage statistics</em>.

## Editor

Now, let’s change some settings in the <b>Editor</b> preferences.

Within <b>Preferences</b>, go to the <b>Editor</b> tab and select <b>Live Templates</b>. De-select any templates that you do not use. 

<a href="https://emmet.io/">Emmet</a> is a IDE plugin that helps improve HTML and CSS development workflow. 

It's a great plugin, but it comes with many options that go unused and waste valuable system memory. 

To remove these unnecessary options, go to the <b>Editor tab</b> and select <b>Emmet</b>. Browse through the options for CSS, JSX and HTML, and de-select any  options that you don't use.  

<b>Intentions</b> is a powerful feature of the JetBrains application family. It suggests solutions to problems that it detects on-the-fly as you code. 

However, by default WebStorm has every option selected within the _Intentions_ preferences window. It's unlikely that you will use every technology/language listed, so de-select the options that you do not use. 

To deselect the options, go to the <b>Editor</b> tab, select <b>Intentions</b>. Again, de-select any non-applicable languages and technologies. 

## Plugins

Almost there. Next, let’s fiddle with our plugins.

Within <b>Preferences</b>, go to the <b>Plugins</b> tab. 

By default, all of the native plugins will be enabled. 

It is unlikely that you will make use of them all. Scroll through and de-select any plugins that are not applicable to the languages and technologies that you use.

## Directories

During startup, WebStorm loads every directory (folder) within a project. However, some of these directions, particularly vendor directories like the `node_modules` directory, may never be touched within WebStorm. Loading these directories wastes valuable resource.

To disable un-used directories, within <b>Preferences</b>, go to <b>Directories</b> and set any directories that are not edited within WebStorm as `Excluded`.

## Languages & Frameworks 

Within <b>Preferences</b> go to <b>Languages & Frameworks > JavaScript > Libraries</b> and de-select any libraries that are unused. 

If you are not using <a href="http://compass-style.org/">Compass</a> to generate CSS files from your Sass, ensure <em>‘Enable Compass support’</em> is not enabled. To do so, go to <b>Languages & Frameworks > Compass</b>.

## Tools

The <b>Web Browsers</b> section is used to quickly launch your project into the enabled browsers. 

If you do not use this feature, disable it. To do so, within <b>Preferences</b> go to <b>Web Browsers</b> and de-select all browsers except your browser of choice.

## Conclusion

So, that's it.

Now we’ve managed to clean up WebStorm, you should find a notable increase in start-up time and general performance so you can focus on the stuff that matters: web development.

## Sources

* [Make WebStorm better with these customizations - Victor Savkin, FreeCodeCamp](https://medium.freecodecamp.com/make-webstorm-better-with-these-customizations-c038c9e5f84b#.ifjrzkk00)
* [How to speed up WebStorm - StackOverflow](https://stackoverflow.com/questions/29388626/how-to-speed-up-webstorm)
* [File 'idea.properties' - JetBrains documentation](https://www.jetbrains.com/help/idea/2016.3/file-idea-properties.html)