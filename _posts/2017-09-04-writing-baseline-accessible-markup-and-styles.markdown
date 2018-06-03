---
layout: post
title: "Writing Baseline Accessible Markup and Styles"
description: An insight into doing the minimum amount of work to create an accessible product.
date: 2017-09-04 21:04:19 +0100
permalink: /articles/:title/
categories: accessibility a11y markup styles html css
---

Ah, accessibility. You'll find that most developers begin to fall asleep at the sheer mention of the term, like some sort of mysterious magic trick. 

But, what is accessibility? Accessibility (aka, _A11y_) is defined as a measure of a computer system's accessibility to all people, including those with disabilities or impairments.

In other words, **accessibility refers to how usable an application is** to all audiences. A truly accessible application will be fully usable by anyone, regardless of physical, visual or hearing impairments. 

We are going to discover how a little effort can have a massive impact, ultimately making a product more accessible and, in turn, more viable. 

More specifically, we're going to look at how we can write a baseline amount of markup, attributes, styles and labels to create much more usable interfaces.

But first, a bit of context.

## Context

During my experiences in development agencies, wherein the main goal is to churn good products out the door in the shortest feasible amount of time possible, I've heard the same thing time and time again when accessibility is mentioned. There is a single consensus.  

_"Who cares? Accessibility is boring."_

First off, I disagree with this statement. I find it very rewarding and fun to create robust interfaces that are truly universally usable.

But, more importantly, let's talk about who cares. [A study](http://www.dlf.org.uk/content/key-facts) conducted in 2008 by the [Disability Rights Commission](https://www.gov.uk/government/organisations/disability-rights-commission) found that over there are over **6.9 million disabled people** of working age in the UK, representing 19% of the working population.

**That's almost 1 in every 5 people.**

Although forms of disabilities vary massively, these statistics imply that you may have to cater for a disability with 1 in 5 of your potential users. In other words, if your product is not accessible, you are rejecting upto 1 in 5 of your potential users.

This isn’t just a problem from a business point of view; you could argue it is also a problem from an ethical point of view. In other words, if you don’t cater to those with disabilities, then you are flat out refusing this collection of users the option to use of your application.

So the answer to the question; who cares? The answer (should be): Every frontend developer. Whether you're developing for the web, mobile, tablet or a toaster. If your application has user interaction in any form, you must consider accessibility.

In this article, we are going to look at A11Y specifically in code. As a result, factors such as colours, UX design patterns, or anything of that nature are out of the scope of this article - although these aspects are equally as important to A11Y. 

This article should also not be viewed as a comprehensive list of 'dos' and 'donts', but rather a selection of considerations that I have believe important from my personal development experiences.

### Accessibility is difficult. 

Accessibility is difficult, but why?

In my opinion, I believe there are there two main factors that makes accessibility a difficult concept, and results in inaccessible applications.

The first is a lacking an understanding or awareness of the issues that make applications inaccessible and the steps to resolve those issues. This is what we are going to explore in this article.

The second is because it’s difficult to empathise. This is an expansive topic. The best way to gain empathy is real use cases. Attaining feedback from real users with real disabilities using your application. Of course, this option is seldom available in most situations. 

Thankfully, [Eric Bailey](https://ericwbailey.design/), a Boston-based designer, has created a [very useful website](https://empathyprompts.net) to emulate accessibility issues and gain empathy. I highly recommend checking it out.

Without further ado, let's crack on.

## Testing Tools

As a developer, one of the main disabilities we need to accommodate is visual impairment. You need to ensure that people who can barely see, or cannot see at all, can still easily navigate your application, find all the information they need, and interact with it with the same ease as any other user. 

Generally speaking, visually impaired users navigate the web a technology known as a screen reader. A screen reader scans an HTML document, interprets the markup, and reads the information to the end user. Screen readers are operated using a keyboard, so users can interact with links and other interactive elements.

There are a plethora of screen readers available, but the most popular screen readers, by platform, are: 

Windows - [NVDA](https://www.nvaccess.org/)
Mac - VoiceOver for Mac (built-in)
iOS - VoiceOver on iOS (built-in)
Android - [Google TalkBack](https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback&hl=en_GB)

The key to making screen readers useful is rich, descriptive markup and views. This is achieved by using semantic elements (e.g. `<nav>`, `<header>`, `<main>`, etc.) appropriately, correct headings, accessible imagery, hidden elements, usable elements, the WAI-ARIA suite and factoring in a variety of other considerations. Android and iOS also have their own tools for making elements accessible.

Let’s look at some of the basic aspects of accessibility you should consider.

## Labels

You can, and should, always label interactive elements including links, buttons (if the element’s text does not provide adequate description) and inputs. 

You should also provide labels for icons with links and tabs containing icons that have no visible text.

For example, a screen reader will read the the content within an element’s opening and closing tags. Typically, though, this content is very non-descriptive. For instance:

    <a href="about-us.html">Read More</a>

With this example, a screen reader will literally read _"Read More"_ to the user. It’s not very descriptive. If the user was skimming through the page, the user would simply hear _"Read More, Read More, Read More…"_, with no understanding of what they would discover if they clicked the link.

Thankfully, you can use WAI-ARIA to provide links with more descriptive labels. 

WAI-ARIA is an acronym for [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria), and it’s an excellent tool for giving markup a more rich, semantic meaning. ARIA providers a library of attributes that you can use alongside HTML elements.

One such example is `aria-label`. You can use the `aria-label` attribute to assign a specific value that will be read by a screen reader instead of the element's value.

    <a href="about-us.html" aria-label="Read More About The Team">Read More</a>

Alternatively, you can use `aria-labelledby` to give the element another element’s value.

    <h1 id="title">Read More About The Team"</h1>

    <a href="about-us.html" aria-labelledby="title">Read More</a>

### Android

On Android, the approach is similar. You can use `android:contentDescription` on an element in the same way as `aria-label`.

    <Button
        android:id="@+id/some_id"
        android:src="@drawable/search"
        android:contentDescription="@string/search"/>

### Swift
 
When writing Swift for iOS, you can use the `accessibilityLabel` from the UIAccessibility API.

    self.navigationController.navigationBar.backItem.setAccessibilityLabel("back")


## Forms and Input Placeholders

If you have form elements or inputs, don’t rely on the placeholder attribute as a label. This is against the HTML5 spec and it does work properly for screen readers:

__DON’T__

    <input type="text" name="message" placeholder="Message…">

Instead, you should provide an associated text label for every form input. You should also provide the label first, and set the label’s for attribute to the name of the form element it belongs to: 

__DO__

    <label for="message">Message</label>
    <input type="text" name="message">

### Android 

Similar to HTML5, Android XML uses the `android:hint` instead of the `placeholder` attribute. It works in the same way, and should not replace a label for the same reasons.

__DON’T__

    <EditText 
        android:id="@+id/edit_text" 
        android:hint="@string/aac_edit_text_about_label" />

Instead, add a TextView label for inputs and add the labelFor attribute with the id value of the input it belongs to:

__DO__

    <TextView
        android:labelFor="@+id/edit_text"
        android:text="@string/aac_edit_text_about_label" />

    <EditText android:id="@+id/edit_text" />

### Swift

Swift for iOS is slightly different. You should still not rely on the placeholder attribute for UITextFields:

__DON’T__

    let messageField = UITextField = UITextField (...);
    messageField.placeholder = "Message…"

However, unlike HTML5 and Android, there isn’t a way to connect a label to an input. Instead, you should use the accessibilityLabel attribute directly on the text input:

__DO__
 
    let messageField = UITextField = UITextField (...);
    messageField.accessibilityLabel = "Message…"

The placeholder attribute itself is fine across all three platforms, and should be used where necessary, but it should not be used as a replacement for label, and should not serve as a label in any form.

## Writing Good Labels and Descriptions

Providing labels and descriptions is important so your user understands an elements purpose, and the result of interacting with an element. 

It's also important to ensure that those labels and descriptions are well written, as a poorly written label can do as much damage as having no label. 

The [Google Material UI usability guidelines](https://material.io/guidelines/usability/accessibility.html#accessibility-writing) define a set of rules to write good labels. These are, in my opinion, ideal for most applications.

### Be succinct

Keep your labels short and ‘to the point’, ensuring your label is brief, but descriptive. 

__DON’T__

> ‘Logout Button. Logout of account adam@gospelware.co.uk and return to homepage’

__DO__

> ‘Logout of adam@gospelware.co.uk’

### Avoid describing control type in text

Your labels should not describe the control type, whether it’s a button, link, field, etc.

__DON’T__

> 'Message Field.'

> 'Settings Button.'

Screen readers will announce the control type, and specifying the type will result in the type being read aloud to the user twice, in our example, a user would hear “Message Field. Field” and “Settings Button. Button.” 

__DO__

> 'Message.'

> 'Settings.'

The user will now hear “Settings Button” and “Message Field”.

### Avoid describing control state in text

Similarly, and for the same reasons, you should not describe an element’s state.

__DON’T__

> `Accept Terms and Conditions is selected`

__DO__

> `Accept Terms and Conditions`


### Indicate what an element does

Describe what an element does when interacted with, do not describe the element itself, or properties of the element.

__DON’T__

> `Burger menu icon`

> `Pencil icon`

__DO__

> `Show/hide navigation menu`

> `Edit`

### Don’t mention the exact gesture or interaction

Do not discuss a gesture or interaction, instead you should describe the task.

__DON’T__

> `Tap to speak`

> `Click to start`

__DO__

> `Voice search`

> `Start game`

## Dialogs

Dialogs are a useful UI design pattern to convey information. Dialogs are typically used to prompt a user for information, or to provide information that requires the user's immediate attention.

Presently, there is no native HTML5 tag that describes a dialog, although common 3rd party JavaScript libraries and frameworks, including [jQuery](https://jqueryui.com/dialog/) and [Angular Material](https://material.angularjs.org/latest/demo/dialog), offer prebuilt accessible dialogs.

If you are not using a library or framework with out-of-the-box dialogs, you would need to use a good old `<div>` tag with a few lines of JavaScript to prompt the dialog. A typical dialog might look like this:

    <div class="dialog">
        Whoa, mate. You've made a mistake.
    </div>

If the user encounters an error, ensure a label is provided and the `<div>` uses the `role=”alert”` attribute and value.

    <div role="alert">
        <span class="close-icon" tabindex="0">x</span>
        The form has an error: you forgot to provide a message.
    </div>

An element using `role=”alert”` will be displayed to a screen reader user when the element appears in the UI. The element would typically be displayed via JavaScript or CSS as necessary.

Both Android and iOS natively offer accessible dialogs.

## Images - 'alt' Attribute

Another thing to consider for screen readers is imagery. Imagery used in an application typically falls under one of two categories; decorative and informative. 

The former of the two, decorative, serves no purpose other than to aesthetically improve the UI of an application, and as a result serves no purpose to screen readers. These images should be ignored by screen readers.

On the other hand, images that offer information to the end user will need to be delivered to the screen reader in text form, otherwise the image’s information will be lost. 

How do we solve this issue? This is where the alt attribute comes in. 

If the image provides relevant information, for example a graph or info-graphic, you should use the img tag with an alt attribute, which should provide a description of the images details.

    <img src="political-graph.jpg" alt="Nationwide results at a glance: ...">

Of course, you should generally try and input data of any major complexity into a table or similar layout. 

Decorative images, such as icons, logos, etc., should be served using the `background-image` CSS property where possible. 

If the image cannot be served using the `background-image` CSS property, the image should be served using the img tag with an empty alt attribute. This will ensure the decorative image is ignored by screen readers.

    <img src="decorative-icon.jpg" alt="">


## Headers

Headers are used across websites to indicate page and section titles. There are delivered using the `<h1>` through `<h6>` tags. Here’s an example of a website header hierarchy taken from a random website:

<img src="https://thepracticaldev.s3.amazonaws.com/i/0wxfvhybee46txxdpj2r.png">

Source: [gospelware.co.uk](http://gospelware.co.uk) tested via [seowebpageanalyzer.com](http://www.seowebpageanalyzer.com/)

You should only use header tags for titles, not for changing aesthetics. Header tags should only be used in descending hierarchy and should not be skipped. For example, if you use the `<h1>` tag, it should only be followed by an `<h2>` tag, and no other heading tags. The document should always begin with an `<h1>` tag, and no other heading tags.

## Hidden Descriptions

Often, a UI can provide a lot of context to information on a webpage and, sometimes, this context is lost when the information is delivered as text via a screen reader. 

You can combat this by using hidden elements that are only displayed to screen readers, and hidden to all other users with a small chunk of clever CSS.

    .hide {
       position: absolute !important;
       top: -9999px !important;
       left: -9999px !important;
    }

## Empty states

An empty state refers to a small piece of text that indicates to a user that no data is present. Here’s an example from Outlook: 

<img src="https://thepracticaldev.s3.amazonaws.com/i/e59fzu2inf09fdztuj5e.png" style="margin: 0 auto;">

Empty states should always be provided in situations where data may be present, but none is. This means that screen reader users instantly know that there is no data, rather than waiting under the pretence that the data may load, or presuming an issue has occurred that has prevented the data from displaying.

## Styles

Finally, I feel like I should mention styles briefly.

Any elements that are clickable should have a hover state that visually indicates to the user that the element is current clickable. This can be achieved using the CSS pseudo hover class:

    .button:hover {
        background-color: red;
    }

The hover pseudo class, however, does not work for elements that have been selected via a keyboard. That means that users who do not, or cannot, use a mouse or touch device will not receive any visual indication that the current selected element is selected, if only hover is used.

To combat this, you should use the focus pseudo element alongside any instances of the hover element.

    .button:hover,
    .button:focus {
        background-color: red;
    }

Finally, there is also a new CSS pseudo selector that has been proposed, but is not yet fully implemented, called :focus-within. It lets you set styles on a parent element when any of the parent element’s child elements have been selected. 

    div:focus-within {
        background: yellow;
    }

Although this is in an experimental phase, I am quite sure this will become widely supported soon enough, and serves as a great reminder that the web is constantly becoming more and more accessible. 

## Conclusion

It’s true, at least for a lot of people: accessibility is boring, accessibility is dull and accessibility does, generally speaking, require more work.

But it is important. I truly believe anyone, regardless of any disability or ailment, should be able to enjoy the web - and mobile applications - just as much as a fully-abled person. I’m sure you do too.

If you do agree with this sentiment, then perhaps it’s time you start to reassess how you feel about accessibility.

Thank you for reading.

### Sources:
* [https://material.io/guidelines/usability/accessibility.html#accessibility-writing](https://material.io/guidelines/usability/accessibility.html#accessibility-writing)
* [https://developer.android.com/training/accessibility/accessible-app.html](https://developer.android.com/training/accessibility/accessible-app.html)
* [https://www.deque.com/blog/accessible-text-input-android/](https://www.deque.com/blog/accessible-text-input-android/)
* [https://www.paciellogroup.com/blog/2011/02/html5-accessibility-chops-the-placeholder-attribute/](https://www.paciellogroup.com/blog/2011/02/html5-accessibility-chops-the-placeholder-attribute/)
* [https://developer.apple.com/documentation/uikit/accessibility/uiaccessibility](https://developer.apple.com/documentation/uikit/accessibility/uiaccessibility)
* [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role)
* [http://webaim.org/techniques/semanticstructure/](http://webaim.org/techniques/semanticstructure/)
* [https://css-tricks.com/places-its-tempting-to-use-display-none-but-dont/](https://css-tricks.com/places-its-tempting-to-use-display-none-but-dont/)
* [http://www.seowebpageanalyzer.com/](http://www.seowebpageanalyzer.com/)
* [https://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel](https://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel)
* [https://stackoverflow.com/questions/33077902/is-there-a-way-to-customise-accessibility-label-on-the-navigation-bar-back-butto](https://stackoverflow.com/questions/33077902/is-there-a-way-to-customise-accessibility-label-on-the-navigation-bar-back-butto)
* [https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
* [https://www.techopedia.com/definition/10165/accessibility-a11y](https://www.techopedia.com/definition/10165/accessibility-a11y)
