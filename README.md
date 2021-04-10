# Welcome to imagedisplay!<br />
<br />
Here is a link to the live site: https://peaceful-allen-b96c9c.netlify.app/ <br />
<br />
**Steps to run image display:**<br />
1. Clone/Download this repo and save the dictionary text files (dictionaryOne.txt dictionaryTwo.txt). These are your dictionaries! You will not be able to find an image without one.<br />
2. Click Choose File, and select one of the dictionary text files.<br />
3. Type an image to search and click Submit.<br />
4. Once images are displayed, click an image and the image will pop up. Click Close to close the image.<br />
5. Search more images and try another dictionary text file and search more images.<br />
6. To clear the dictionary, refresh the page.<br />
7. Make your own text file dictionaries! Remember to refresh the page to clear the old dictionaries.<br />
I set this up so my algorithm will break up text either by new line or space.<br />
So a text file with: apple pear grape orange cherry<br />
Will be the same as:<br />
apple<br />
pear<br />
grape <br />
orange <br />
cherry<br />
<br />
**Search word spelling**<br />
1. This removes unwanted, non-letter characters.<br />
ex: You can type: Aardvark or A%#rd*var893k and they will both return aardvark images.<br />
These letters do have to be in order though<br />
2. Vowels don't necessarily have to be right, but they have to be in the right location.<br />
ex: cake can be ceku or cika (it can also be c*7e6k9u when it removes unwanted characters).<br />
However, this algoritm finds the first match in the dictionary with vowels in the right place<br />
ex: if you type buer it can return bear or beer :)<br />
3. This also ignores cases so AaRdVaRk and aardvark return the same thing<br />
<br /> 
<br />
hope this makes sense, Email me if it doesn't (brent.rucker@gmail.com)<br />