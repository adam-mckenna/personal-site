---
layout: post
title: "Writing Baseline Accessible Markup and Styles"
description: An insight into doing the minimum amount of work to create an accessible website.
date: 2017-09-04 21:04:19 +0100
permalink: /articles/:title/
categories: accessibility a11y markup styles html css
featured-img: build/img/posts/writing-baseline-accessible-markup-and-styles/featured.jpg
---

Ah, _accessibility_... You'll find most developers you raise the subject to will begin drifting off, as though you've just performed a magic spell on them.

But, what is accessibility and why are so many developers uninterested?

**Accessibility (a11y) refers to how usable an application is to _all_ audiences**. An accessible application is usable by anyone, regardless of physical, visual or hearing impairments. The experience is not compromised for any users.

That sounds like a lot of work. And it can be. That's _one_ reason why so many developers are uninterested. 

Most of my experience has been in development agencies. Within these organisations, the goal is to maximise profit: churn good products out the door in the least time possible. In this environment, accessibility becomes a _nice to have_. At least, that's the perspective of a project manager or product owner. Ask a developer and they'll say: 

_"Accessibility is boring. Who cares?"_

That's _another_ reason why they are so uninterested. 

I disagree. I don't think it is boring. It can be rewarding and fun to create robust interfaces that can be used by a multitude of audiences.

But, whether it's boring or fun is irrelevant. Lets talk about who _does_ care. 

[A study](http://www.dlf.org.uk/content/key-facts) conducted in 2008 by the [Disability Rights Commission](https://www.gov.uk/government/organisations/disability-rights-commission) found that over there are over **6.9 million disabled people** of working age in the UK, representing 19% of the working population.

That's almost **1 in every 5 people.**

The types of disabilities captured in this static vary dramatically. But, it does mean that 1 in every 5 website visitors may have a disability that your website should cater for. If they are blind, for instance, and your website has no support for screen readers, what can they do? They have been rejected from your product.

An accessible product is a more viable product. The more accessible, the more users the website can accommodate. 

Not to mention the ethical implications, of course. If you are conscious of the implications of a non-accessible website, and you continue to avoid the implementation of accessible features, could it be argued that you are flat out rejecting users with accessibility requirements?

So, the answer to the question: _who cares?_ The answer (should be): everyone involved in the project. Whether you're developing for the web, mobile, tablet, or a toaster. If your application has user interaction in any form, you must consider accessibility.

Thankfully, there is a lot of "low-hanging fruit" that can be snatched. With relatively little effort, you _can_ make a massive impact to an application's accessibility. We're going to explore how. 

We'll look at accessibility in your code. As such, factors including colours, UX design patterns, and so on are out of the scope of this article. That being said, those factors are as relevant to accessibility as anything covered in this article.

This article should also not be viewed as a comprehensive list of 'dos' and 'do nots', but rather a selection of considerations that I believe are important and easy to achieve.

Without further ado, lets crack on.

## Testing Tools

As a developer, one of the main disabilities we need to cater for is visual impairment. We need to ensure that people who can barely see, or cannot see at all, can still navigate your application, find all the information they need, and interact with it with the same ease as any other user. 

Most visually impaired users navigate the web with a technology known as a _screen reader_. A screen reader scans an HTML document, interprets the markup, and reads the information to the user. Screen readers are operated using a keyboard so that users can interact with links and other interactive elements.

There are a plethora of screen readers available, but the most popular screen readers, by platform, are: 

- Windows - [NVDA](https://www.nvaccess.org/)
- Mac - VoiceOver for Mac (built-in)
- iOS - VoiceOver on iOS (built-in)
- Android - [Google TalkBack](https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback&hl=en_GB)

The key to making screen readers useful is rich, descriptive markup and views. This is achieved by using semantic elements (e.g. `<nav>`, `<header>`, `<main>`, etc.) as intended, correct headings, descriptive imagery, hidden elements, usable elements, the WAI-ARIA suite and factoring in a variety of other considerations. Android and iOS also have their own tools for making elements accessible. 

We'll explore each of these in turn.

## Labels

You should always label interactive elements, including links, buttons (if the elements children do not provide an adequate description) and inputs. 

You should also provide labels for links and tabs that have icons, but have no visible text.

Lets look at a real example. With the `a` tag, a screen reader will read the content within the elements opening and closing tags. However, this is typically non-descriptive. For instance:

    <a href="about-us.html">Read More</a>

With this example, a screen reader will literally read _"read more"_ to the user. How often have you seen this on the web?

It’s not very indicative of where the link leads. If the user was skimming through the page, the user would simply hear _"read more, read more, read more…,"_ with no understanding of what they would discover if they clicked the link.

How can we fix this?

### On the web

Thankfully, on the web you can use WAI-ARIA to provide descriptive labels to links. 

WAI-ARIA is an acronym for [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria). It’s a tool for providing markup with rich, semantic meaning. ARIA provides a library of attributes that you can use to enhance HTML elements.

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

If you have form elements or inputs, don’t rely on the `placeholder` attribute as a label. The HTML5 specification warns against this as it does not work as a label for screen reader users. 

It also disappears for regular users once the input has been populated. This makes forms difficult to revise once complete. 

### On the web

__DON’T__

    <input type="text" name="message" placeholder="Message…">

Instead, you should provide an associated text label for every input. You should also provide the label first, and set the label’s `for` attribute to the name of the form element it refers to: 

__DO__

    <label for="message">Message</label>
    <input type="text" name="message" placeholder="Message…">

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

Swift for iOS is slightly different. You should also not rely on the placeholder attribute for UITextFields:

__DON’T__

    let messageField = UITextField = UITextField (...);
    messageField.placeholder = "Message…"

However, unlike HTML5 and Android, there isn’t a way to connect a label to an input. Instead, you should use the accessibilityLabel attribute directly on the text input:

__DO__
 
    let messageField = UITextField = UITextField (...);
    messageField.accessibilityLabel = "Message…"

The placeholder attribute itself is fine across all three platforms, and should be used where necessary. 

The problem is that developers use it as a replacement for a label. This is not its purpose. It should always be used alongside a label, not as a replacement. 

## Writing Good Labels and Descriptions

Providing labels and descriptions is important so that users understand an elements purpose, and the result of interacting with the element. 

It's also important to ensure that those labels and descriptions are well written. A poorly written label can do as much damage as having no label at all. 

The [Google Material UI usability guidelines](https://material.io/guidelines/usability/accessibility.html#accessibility-writing) defines a set of rules by which to write good labels. These are ideal for most applications.

Lets explore these rules:

### Be succinct

Keep labels short and ‘to the point’, ensuring the label is brief but descriptive. 

__DON’T__

> ‘Logout Button. Logout of account adam@gospelware.co.uk and return to homepage’

__DO__

> ‘Logout of adam@gospelware.co.uk’

### Avoid describing control type in text

Labels should not describe the control type, whether it’s a button, link, field, etc.

__DON’T__

> 'Message Field.'

> 'Settings Button.'

Screen readers will announce the control type. Therefore, specifying the type will result in the type being announced to the user twice. 

In our example, a user would hear “Message Field. Field” and “Settings Button. Button.” 

__DO__

> 'Message.'

> 'Settings.'

Instead, omit the control type. In our second example, the user will hear “Settings Button” and “Message Field”.

### Avoid describing control state in text

For the same reasons, do not describe an element’s state.

__DON’T__

> `Accept Terms and Conditions is selected`

__DO__

> `Accept Terms and Conditions`


### Indicate what an element does

Describe what an element does when interacted with. Do not describe the element itself nor the properties of the element.

__DON’T__

> `Burger menu icon`

> `Pencil icon`

__DO__

> `Show/hide navigation menu`

> `Edit`

### Don’t mention the exact gesture or interaction

Do not discuss a gesture or interaction, describe the task instead.

__DON’T__

> `Tap to speak`

> `Click to start`

__DO__

> `Voice search`

> `Start game`

## Dialogs

Dialogs, or modals, are useful elements for conveying information. They are typically used to prompt a user for information, or to provide information that requires the user's immediate attention.

At the time of writing, there is no native HTML5 tag that describes a dialog, although common 3rd party JavaScript libraries and frameworks, including [jQuery](https://jqueryui.com/dialog/) and [Angular Material](https://material.angularjs.org/latest/demo/dialog), offer pre-built accessible dialogs.

If you are not using a library or framework with out-of-the-box dialogs, you will need to use a regular old `<div>` tag with a few lines of JavaScript to prompt the dialog (this is out of the scope of this article). 

A typical dialog might look like this:

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

Another thing to consider for screen readers is imagery. Imagery used in an application falls under one of two categories: _decorative_ or _informative_. 

Decorative images, on the other hand, serve no purpose other than aesthetics. These images should be ignored by screen readers.

Informative images present information to the user. They need to be delivered to the screen reader in text form, otherwise the images information will be lost. 

How do we solve this issue? This is where the `alt` attribute comes in. 

If the image provides relevant information, for example a graph or info-graphic, you need to use the `img` tag with an `alt` attribute. The `alt` attribute will describe the image's content. For example:

    <img src="political-graph.jpg" alt="Nationwide results at a glance: ...">

Of course, you should input data of any notable complexity into a table or similar layout, and rely on images for basic data.

Decorative images include icons, logos, and backgrounds. Serve decorative images using the `background-image` CSS property where possible. 

If the image cannot be served using the `background-image` CSS property, the image should be served using the `img` tag with an empty `alt` attribute. When the `alt` attribute is empty, the image is ignored by screen readers.

    <img src="decorative-icon.jpg" alt="">

## Headers

Headers are used across websites to indicate page and section titles. They are delivered using the `<h1>` to `<h6>` tags. Here’s an example of a website header hierarchy taken from a random website:

<img src="https://thepracticaldev.s3.amazonaws.com/i/0wxfvhybee46txxdpj2r.png" alt="Gospelware.co.uk website headers">

Source: [gospelware.co.uk](http://gospelware.co.uk) tested via [seowebpageanalyzer.com](http://www.seowebpageanalyzer.com/)

Only use header tags for titles. Do not use them for changing aesthetics. 

Header tags should only be used in descending hierarchy and should not be skipped. 

For example, if you use the `<h1>` tag, and need to use another heading below it, the next heading must be an `<h2>` tag, or another `<h1>` tag. This applies at every heading level. 

The document should always begin with an `<h1>` tag, and no other heading tags.

## Hidden Descriptions

A user interface can provide a lot of context to information on a webpage. This information can be lost when the page is delivered as text via a screen reader. 

You can combat this by using hidden elements that are displayed to screen readers, but hidden from all other users. This can be achieved with a small chunk of clever CSS:

    .hide {
       position: absolute !important;
       top: -9999px !important;
       left: -9999px !important;
    }

## Empty states

An empty state refers to a short piece of text that informs a user that no data is present. <span aria-hidden="true">Here’s an example from Outlook:</span>

<img src="https://thepracticaldev.s3.amazonaws.com/i/e59fzu2inf09fdztuj5e.png" alt="" style="margin: 0 auto;">

Empty states should always be provided in situations where data may be present, but none is. For example, a 'to-do' list or an email inbox.

This means that screen reader users know right away that there is no data. Otherwise, they may wait a while under the assumption that the data is loading or that an issue has occurred that has prevented the data from displaying.

## Styles

Finally, lets briefly discuss CSS.

Any elements that are clickable should have a hover state that visually indicates to the user that the element is clickable. This can be achieved using the CSS pseudo `hover` selector:

    .button:hover {
        background-color: red;
    }

The `hover` pseudo selector only works for mouse and touch-based devices. It does not work for elements that have been selected via a keyboard. 

As a result, if only `hover` is used, users who do not, or cannot, use a mouse or touch device will not receive any visual indication that the current selected element is selected.

To combat this, you should use the `focus` pseudo selector alongside any instances of the `hover` selector:

    .button:hover,
    .button:focus {
        background-color: red;
    }

As a last mention, there is also a new CSS pseudo selector that has been proposed, but is not yet fully implemented, called :focus-within. 

It lets you set styles on a parent element when any of the parent element’s child elements have been selected. 

    div:focus-within {
        background: yellow;
    }

Although this is in an experimental phase, I am sure this will become widely supported soon. It serves as a reminder that the web is constantly becoming more and more accessible. 

## Conclusion

Perhaps it's true that accessibility is boring, and maybe accessibility is dull, and certainly accessibility does require more work.

But, it is important. 

I truly believe anyone, regardless of any disability or ailment, should be able to enjoy the web - and mobile applications - just as much as any so-called "fully-abled" person. I’m sure you do too.

If you do agree with this sentiment, then perhaps it’s time you start to reassess how you feel about accessibility. 

Thank you for reading.


### An aside: accessibility is difficult. 

Accessibility _is_ difficult, even with these quick wins, but why?

I believe there are there two main factors that make accessibility difficult.

The first is a lack of understanding or awareness of the issues that make applications inaccessible, and the steps to resolve those issues. There is a plethora of resources online to identify commons issues. The best way, of course, is to do real user testing with your website.

The second is because it is difficult to empathise. This is an expansive topic. The best way to empathise is real use cases. Attaining feedback from real users with real disabilities using your application. Of course, this option is seldom available in most situations. 

Thankfully, [Eric Bailey](https://ericwbailey.design/), a Boston-based designer, has created a [very useful website](https://empathyprompts.net) to emulate accessibility issues and help developers gain a bit of empathy. I highly recommend checking it out.

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
