#Toasts

Post popups over the page

See the [demo](http://makopool.com/toasts/demo.html)

In situations where a query has failed, timed out, where the user has disconnected, or where the user has received a minor notification, a certain approach is called for.

These situations don't necessarily require any action on the part of the user. Sometimes it's okay for the user to miss the notification altogether if they're not paying attention. But you want the information to be available for those who are paying attention. In these situations, you post a toast.


##Differentiating Features

* _Extensively_ configurable

* No dependencies

* As far as the author is aware, Toasts is the only one that animates toast element position changes properly as their siblings start to expire, rather than just snapping them up to fill recently vacated positions instantly.


##Example

(did you see the [demo](http://makopool.com/toasts/demo.html) yet?)

```typescript
var Toasts = require('toasts').Toasts
//or
import {Toasts} from 'toasts'

var toaster = new Toasts({
	gravity:[1,1] /*meaning [positive, positive], meaning positioned at the bottom right corner of the screen*/,
	defaults:{
		lifespan:Infinity /*= they don't expire. The user has to click on them*/,
		withClass:'blue' /*the generated htmlelement will have the class 'blue' attached to it. It might make the background blue. It might just show a blue dot. That's down to the generation function.*/
	}
})
//we haven't specified a generation function though, so the notifications will have the default look. You probably don't want that. You're probably not so lazy or tasteless as to just use whatever is there instead of specifying your own look and structure. In this case you should probably take a look at the generation API below.

toaster.post("watch out")

toaster.post("there's a man behind you")

toaster.post("admittedly quite far away", {withClass:'black', lifespan:400}) //this post will have 'black' class appended instead of 'blue', and will only be visible for a brief moment
```

##API


###Initializing and configuring the toaster:

```typescript
var toaster = new Toasts({
```

*	`gravity:[number, number] = [1,-1]` (defaulting to 'upper right'). a pair of numbers which specify which corner of the screen the toasts will appear in. [-1,1] is left, bottom. [1,1] is right, bottom. You get the idea.
*	`fadeDuration:number = 200` the number of milliseconds after a toast's destruction trigger is called, until it is cut from the page. In practical terms: this must be set to the length of your disappearance animations. It's needed to make sure disappearance animations have enough time to complete before removal. 200ms is a good amount, but you can do what you want.
*	`generationFunction: (msg:string, cfg, invokeDestruction:()=>void)=> {element:HTMLElement, ...}` the function that generates new toast HTMLElements when Toast.post(msg) is called. Defaults to generating a sort of fadey grey rectangle with rounded corners. Not ideal, for many styles. You'll want another one. Keep reading for simple ways of specifying custom generation functions. Further down is a full explanation of generationFunctions and how to make them
*	`cssWay: {elementClass, fadeInClass, fadeOutClass}` using the css way instates a generationFunction that creates a <div class="$elementClass"><span>message</span></div> and uses $fadeInClass and $fadeOutClass to apply fade animations. If you leave out any of the three classes, they'll default to toastbox, toastboxFadingIn, toastboxFadingOut.
*	`horizontalSeparation: number = 20` pixels between the toasts from the edge of the screen
*	`verticalSeparation: number = 20` pixels in the separations between the toasts
*	`separation: number = 15` sets both horizontalSeparation and verticalSeparation
*	`defaults: {lifespan, withClass} = {lifespan:'suggested', withClass:'black'}` allows you to set default toast cfgs. lifespan can be either 'suggested' or the number of milliseconds. 'suggested' determines the lifespan of each post from the length of the message.

```
})
```



###Toasting:
```typescript
toaster.post(msg:string, cfg = Toasts.defaults):()=>void
```
Returns a lambda that can be be called to delete the toast.

cfg can specify:

* `lifespan`, milliseconds, how long the toast element will stay on screen

* `withClass`, a css class to add to the toast element



###Specifying a custom generation function

In many cases, you will want to customize not only the appearance of your toast elements (which can be done with the `cssWay` config option), but also the structure and behavior. Specifying a custom generation function in your toast config object gives you complete control over how they'pre created and how they're treated

```typescript
generationFunction: (
```

*	`msg:string` the message the generated toast has been ordered to display
*	`cfg` data from the caller. cfg options supported by the standard API don't require a custom generationFunction to pay attention to them, but you might like to add extra members.
*	`invokeDestruction:()=>void` a callback you can bind to events to dismiss the toast. The default generationFunction implementations bind their invokeDestructions to the element's click event.

```
)=> {
	//... your code here ...
	//...
	//... then
	return {
```

*	`element:HTMLElement` The toast html element that will be positioned and displayed. You should make sure it is styled with `position:fixed`. I'll leave the rest to you.

*	`fadeIn:()=>void` optional. A function that will be called immediately after element is added to the page. You can use it to launch fade in animations.

*	`fadeOut:()=>void` optional. A function that will be called shortly before the element is removed from the page. You can use it to launch fade out animations.

*	`fadeDuration:number` optional, defaulting to the fadeDuration config of the toaster. The number of milliseconds after fadeOut is called in response to the destructino event, before the element is removed from the page (allows time for a fade out animation to complete.)

*	`lifespan:number` optional, defaulting to toast's global setting.

```
	}
}
```