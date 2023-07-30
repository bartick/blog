---
layout: '../layouts/MarkdownLayout.astro'
title: Autoplay YouTube embed with sound
description: Have you wondered how can you autoplay youtube embed with sound in your website? I have found a simple way to achieve the same.
tags: [youtube,autoplay,embed,website,html,css,javascript]
image: /images/Blog.png
date: 2023-07-21T16:23:40.842Z
author: bartick
robots: index, follow
meta:
    - name: og:type
      content: website
    - name: og:site_name
      content: Bartick's Blog
    - name: og:locale
      content: en_US
    - name: og:locale:alternate
      content: es_ES
    - name: twitter:card
      content: summary_large_image
    - name: twitter:site
      content: '@@BartickM'
    - name: twitter:creator
      content: '@@BartickM'
    - name: twitter:title
      content: Autoplay YouTube embed with sound
    - name: twitter:description
      content: Have you wondered How can you autoplay youtube embed with sound in your website? I have found a simple way to achieve the same.
---

I have always wondered how can I autoplay youtube embed with sound in my website from the start of my software development career. And I am wondering if you have stumbled upon this article, you might be wondering the same. 

So I was fiddling around with HTML and Youtube video embeds to make a CTF challenge for my peers. I was using VSCode's Live Server extension to test my code. 

For some reason, it has become my habit for a long time to add `?autoplay=1` whenever I work with YouTube embeds. So I did the same and as usual it didn't work. I was like "What the hell?". I tried to find the solution on the Internet but I couldn't find any. Gave up and went to make the initial challenge. 

While working on the challenge after all that hard work the video suddenly autoplayed with sound. Now my curiosity was at its peak. Now I was determined to find the solution no matter what.

On further investigation, I found that the video autoplayed with sound when I changed something on the website using Live Server but it didn't autoplayed with sound when I refreshed the page.

So now lets's google.

Now did I find the solution on the internet? The simple answer is no. But I stumbled upon this StackOverflow [question](https://stackoverflow.com/questions/73651599/embed-youtube-video-doesnt-autoplay-with-audio). Is it a solid start? Maybe. Let's see what the accepted answer says.

![Browser Dosen't Support Autoplay with Sound](/images/posts/video-autoplay-stackoverflow.png)

So the answer says that the browser doesn’t support autoplay with sound. But I have seen it working on my browser, I have also seen Marvel use autoplay for their [Secret Invasion](https://www.theinvasionhasbegun.com/) and according to the answer the browser should block any autoplay with sound. So I did some more googling and found this [article](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) on Google.

Bingo! Found the solution. So I have the solution and now I just need the user to do any action on the website to play the video with sound.

Now let's implement the solution.

## Implementation: (Let's mimic the secret invasion website)

### Step 1: Create a simple html page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Try It</title>
</head>
<body>
    
</body>
</html>
```

### Step 2: Let us add the text area to add the password
  
```html
<div class="autoplay">
  <a class="overPassword">
    <input id="password" placeholder="Enter the password">
  </a>
</div>
```

### Step 3: Let's now listen to the keypress event on the input

```js
const passwordForm = document.querySelector(".overPassword");
const passwordInput = document.querySelector("#password");

password_input.addEventListener("keypress", (e) => {
  //TODO: code here
});
```

Up until now we made sure that the user has somehow interacted with the website. Now let's add the youtube embed with autoplay and see if it works.

### Step 4: Add the youtube embed

```js
passwordInput.addEventListener("keypress", (e) => {
  passwordForm.remove();

  let iframe = document.createElement('iframe');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&controls=0&showinfo=0`);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('width', '1280');
  iframe.setAttribute('height', '620');

  document.querySelector('.autoplay').appendChild(iframe);
});
```

Boom! It works. Now you can use this trick to make your website more fun to interact with. 

Let's see a live demo of the same here: [https://tryit.bartick.me/](https://tryit.bartick.me/)

## Conclusion

So we have learned how to autoplay youtube embed with sound in our website. I hope you have enjoyed this article. If you have any questions or suggestions feel free to reach out to me on [Twitter](https://twitter.com/BartickM).

### Extra
All mobile browsers don't support `keypress` event so you can use the `keydown` event instead. `Keydown` will work on both mobile and desktop browsers.
