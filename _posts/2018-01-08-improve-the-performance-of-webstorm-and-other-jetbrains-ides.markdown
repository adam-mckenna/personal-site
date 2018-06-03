---
layout: post
title: "Improve the performance of WebStorm (and other JetBrains IDEs)"
description: Exploring how to make WebStorm load and perform faster than ever before. 
date: 2018-01-08 21:04:19 +0100
permalink: /articles/:title/
categories: jetbrains performance webstorm
---

In this article, we are going to explore how to make WebStorm load and perform faster than ever before. 

<a href="https://www.jetbrains.com/webstorm/">WebStorm</a> is a very popular, very powerful web development IDE and forms part of a larger collective of IDEs developed by <a href="https://www.jetbrains.com/">JetBrains</a> - formerly known as <em>IntelliJ</em> - aimed at offering the ultimate development environment for the most popular coding languages. 

Other JetBrains IDEs include <em>PHPStorm</em> (PHP), <em>IntelliJ IDEA</em> (Java), <em>PyCharm</em> (Python) and <em>ReSharper</em> (C#, Visual Studio extension), among others. Even <em>Android Studio</em>, which is technically a <em>Google</em> IDE, runs on the IntelliJ platform. With that in mind, most of the customisation discussed in this video can be transferred to all of the modern JetBrains IDEs. 

Although WebStorm is easily one of the most powerful IDEs available, it’s certainly not the most performant. In fact, on older machines, it can be a machine killer. Its startup time and general speed is sluggish compared with the likes of <em>Atom</em>, <em>Visual Studio Code</em> or <em>Sublime</em>. 

So, in this tutorial we’re going to look at how we can vastly improve the performance of WebStorm by tweaking the out-of-the-box settings.

Without further ado, let’s crack on.

## Setup Config Files

We’re going to start by customising a couple of settings within the WebStorm directory. 

To customise WebStorm settings, we need to create some configuration files. We’re going to create a two config files called `idea.properties` and `webstorm.vmoptions`, to create these files:

Open WebStorm and go to <b>Help</b> and select <b>Edit Custom Properties…</b>, a dialog will prompt stating that the `idea.properties` file does not exist. Click <b>Yes</b> to create one. The file will open, and now you can begin to add config settings. This file is used for customising WebStorm properties.

Again, go to <b>Help</b> and select <b>Edit Custom VM Options...</b>, a dialog will prompt stating that the `webstorm.vmoptions` file does not exist. Click <b>Yes</b> to create one. The file will open, and now you can begin to add config settings. This file is used for customising WebStorm Virtual Machine options.

For future reference, this file can be found in the following directories:

Windows Vista / 7 / 8 / 10 - `<SYSTEM DRIVE>\Users\<USER ACCOUNT NAME>\.<PRODUCT><VERSION>`
OS X / macOS - `~/Library/Preferences/<PRODUCT><VERSION>`

## Improve the Performance

Now that our config files are setup and ready, we can begin changing WebStorm’s settings to optimise the application’s performance.

We’re going to start with changing some options within the `webstorm.vmoptions` file. Open the newly created file and select all of the options, replace them with: 

	-Xms1024m 
	-Xmx1536m 
	-XX:MaxPermSize=1024m 
	-XX:ReservedCodeCacheSize=512m 
	-XX:+UseCompressedOops 

Next, we are going to remove IDE latency using an experimental property called `zero-latency` that was introduced in 2015. Add the following line to your idea.properties file: 

	editor.zero.latency.typing=true

We’re going to move on to generally optimising the usage of WebStorm by deselecting features that are unnecessary which will in turn reduce software bloat and increase system memory.

## Appearance and Behaviour

To start, let’s disable automatic update checking and statistic sending with the <b>Appearance and Behaviour</b> preferences.

To do so, go to <b>Preferences</b> and select <b>Appearance & Behaviour</b>, then go to <b>System Settings</b> and select the <b>Updates</b> tab. From here, deselect <em>Automatically check updates for…</em>

Next, select the Usages Statistics tab from the System Settings and deselect <em>Allow sending usage statistics to JetBrains s.r.o.</em> 

## Editor

Now, let’s change some settings in the <b>Editor</b> preferences.

Within <b>Preferences</b>, go to the <b>Editor</b> tab and select <b>Live Templates</b>. Deselect any templates that you will not be using. 

<a href="https://emmet.io/">Emmet</a> is a IDE plugin that helps improve HTML and CSS development workflow, but it comes with many options that go unused and waste valuable system memory. To remove unnecessary options, within the <b>Editor tab</b> select <b>Emmet</b> and browse through the options for CSS, JSX and HTML, removing any unused options.  

<b>Intentions</b> is a powerful feature of the JetBrains application family, it suggests solutions to problems that it detects on the fly as you write your code. However, by default WebStorm has every option selected with the Intentions preferences window, and it is unlikely that you will use every technology/language listed, so deselect the options that you do not use. To deselect the options, within the <b>Editor</b> tab, select <b>Intentions</b>, and again deselect any non-applicable languages and technologies. 

## Plugins

Almost there. Let’s fiddle with our plugins next.

Within <b>Preferences</b>, go to the <b>Plugins</b> tab. By default, all of the native plugins will be enabled. It is very unlikely that you will made use of them all, so scroll through and deselect any plugins that are not applicable to the languages and technologies that you use.

## Directories

WebStorm spends time loading in all the project's directories (folders), though some directions, such as the `node_modules` directory or a docs folder, may not be touched within WebStorm. Loading these directories wastes valuable resource.

To disable directories, within <b>Preferences</b> go to <b>Directories</b> and set any directories that are not edited within WebStorm as `Excluded`.

## Languages & Frameworks 

Within <b>Preferences</b> go to <b>Languages & Frameworks > JavaScript > Libraries</b> and deselect any libraries that are unused. 

If you are not using <a href="http://compass-style.org/">Compass</a> to generate CSS files from your Sass, ensure <em>‘Enable Compass support’</em> is not enabled. To do so, go to <b>Languages & Frameworks > Compass</b>.

## Tools

The <b>Web Browsers</b> section is used to quickly launch your project into the enabled browsers. If you do not use this feature, disable it. To do so, within <b>Preferences</b> go to <b>Web Browsers</b> and deselect all browsers except your browser of choice.

## Conclusion

So, now we’ve managed to clean up WebStorm, you should find a notable increase in start-up time and general performance so you can focus on the stuff that matters; web development.

## Sources

* [https://medium.freecodecamp.com/make-webstorm-better-with-these-customizations-c038c9e5f84b#.ifjrzkk00](https://medium.freecodecamp.com/make-webstorm-better-with-these-customizations-c038c9e5f84b#.ifjrzkk00)
* [https://stackoverflow.com/questions/29388626/how-to-speed-up-webstorm](https://stackoverflow.com/questions/29388626/how-to-speed-up-webstorm)
* [https://www.jetbrains.com/help/idea/2016.3/file-idea-properties.html](https://www.jetbrains.com/help/idea/2016.3/file-idea-properties.html)