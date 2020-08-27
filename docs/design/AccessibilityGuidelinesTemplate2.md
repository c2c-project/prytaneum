# Accessability
## Overview
- some general ideas to keep in mind when developing a component or page to allow for accessible use

# Index
- [Hearing Impairment](#h)
- [Motor Impairment](#m)
- [Vision Impairment](#v)
- [How to Test](#t)
- [Links to Guidelines](#l)


# <a name="h"></a>Hearing Impairment
- <b>Video</b>
    * Text transcripts / live captions for video & audio
        * [SpeechToText](https://cloud.google.com/speech-to-text)

# <a name="m"></a>Motor Impairment
- <b>Page Title</b>
    * should have a descriptive title, identifies the subject of the page 
    * [WCAG Page Titles Techniques](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=333%2C242#page-titled)
- <b>Focus Order for Tabbing</b>
    * Code reflects the focus order
        * left -> right, up -> down
- <b>Shortcuts</b>
    * [Invisible Content](https://webaim.org/techniques/css/invisiblecontent/)
        * [Skip navigation](https://webaim.org/techniques/skipnav/#:~:text=The%20%22skip%20navigation%22%20idea%20was,mouse%20users%20take%20for%20granted.)
            * link at the top of the page (usually invisible) that links to the main content of the page, skipping all the menu options
            ```
            <body>
                <a href="#maincontent">Skip to main content</a>
                ...
            <main id="maincontent">
            <h1>Heading</h1>
            <p>This is the first paragraph</p>
            ```
# <a name="v"></a>Vision Impairment
- <b>Color</b>
    * Contrast Sensitivity
        * at least 4.5:1 
            * [Manual Color Contrast Checking](https://contrast-ratio.com)
        * Soft colors are harder to differentiate 
            * higher saturation is more readable
        * [_Exceptions_](https://webaim.org/articles/contrast/#:~:text=WCAG%20requires%20%22at%20least%204.5,a%204.48%3A1%20contrast%20ratio.) 
            * Logos do not have to have 4.5:1 contrast
            * Large text (18pt and larger or 14pt, larger, and bold)
            * Decorative text that is not meant to be read
            * Hidden text / Inactive elements (a disabled button may have lower contrast)
            * Unimportant text in an image (e.g. name tag on a shirt)
    * Color Blindness
        * color cannot be the only identifier (e.g.: green and red buttons with no text is not allowed)
- <b>Images</b>
    * [descriptive, specific alt text](https://moz.com/learn/seo/alt-text#:~:text=Alt%20text%20is%20a%20tenet,to%20visually%20identify%20an%20image.)
        * should be able to imagine something similar to the image by the words alone
        * keep it short: screen readers typically cut off alt text at 125 characters
            * `longdesc=""` for longer descriptions
        * "image of" is not necessary in alt text, it can be assumed that an image is being described
- <b>Video</b>
    * nothing flashes more than 3 times a second
- <b>Buttons</b>
    * add `aria-label=""` to tell screen readers what to say 
    * [Aria for Buttons](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
- <b>Links</b>
    * "click for more," "more," "click here," are not descriptive
        * "Products" is more suitable
    * [WebAIM for Hyperlinks](https://webaim.org/techniques/hypertext/)
- <b>Input Assistance</b>
    * Input errors are described to the user in text
    * Suggests correction (formatting)
    
# <a name="t"></a>How to Test
- <b>Software</b>
    * [Accessible Name & Description Inspector](https://www.ssa.gov/accessibility/andi/help/install.html)
        * can test:
            * focusable element
            * images
            * links / buttons
            * structure
            * color contrast 
            * hidden content

- <b>Color</b> 
    * WAVE 
        * [WAVE Google Chrome Extension](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US)
    * aXe
        * identifies low contrast text
        * [aXE Google Chrome Extension DevTools](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd?hl=en&utm_source=chromedev)
        * [aXe GitHub](https://github.com/dequelabs/axe-webdriverjs) 
            * [aXe How To](https://www.youtube.com/watch?v=jC_7NnRdYb0&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=15)
    * WCAG Color Analyzer
        * [WCAG Google Chrome Extension](https://chrome.google.com/webstore/detail/color-contrast-analyzer/dagdlcijhfbmgkjokkjicnnfimlebcll?hl=en?utm_campaign=chrome_series_contrastanalyzer_050417&utm_source=chromedev&utm_medium=yt-desc)

- <b>Images</b>
    * Screen Reader to check alt text / aria labels

- <b>Tab Testing</b>
    * No offscreen content that is focused on
        * if the window is shrunk, tab focus shouldn't find something off screen
    * Dynamic content (pop-ups, dialogs)
        * focus should be pulled to the new content
    * Landmark elements
        * like a table of contents if there are many components on a page



# <a name="l"></a>Links to Guidelines
- [WCAG Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [a11y Checklist](https://www.a11yproject.com/checklist/)
