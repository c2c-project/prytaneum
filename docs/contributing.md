# Frontend

## Phase 1

1. **Work with me on mockups**: Get the figma link from me and disucss the design.
2. **Plan Code**: Lets say you're making a new component `Foo` for `src/components` -- `Foo` is meant for other devs to use. Since we plan on other devs using our component `Foo` it is important that we plan out how they might use it -- you'd need to make a plan of what that component API might look like. Ex.
3. **Check in**: At this point, step 1 and step 2 are mainly so that we can talk and discuss any trade offs and the overall design. So make sure to message me and let me know you want to go over your plans.

## Example Design Proposal

**INSERT MOCKUP HERE**

I plan to develop the component `Foo`. It composes its children in _X_ way and the composition can be manipulated via the following props:

1. prop1: _possible values, types, and what they do here. is this prop required?_
2. prop2: _possible values, types, and what they do here. is this prop required?_
3. prop3: _possible values, types, and what they do here. is this prop required?_

```html
<Foo prop1="{value1}" prop2="{value2}" prop3="{value3}">
    <Child1 />
    <Child2 />
</Foo>
```

## Example Design Proposal 2

I plan to develop X component intended to satisfy feature Y.  It is a one time use component so that feature Y is finished on the front end. Here are the components I plan to use:

1. TextField (MUI)
2. Grid (MUI)
3. etc.

Here is the mockup: **INSERT MOCKUP HERE**

## Phase 2

1. **Implement**: all of your plans in storybook.
2. **Check in**: After your component is done, demo it to me and then we'll start to integrate it into the project. If there are changes to what you had originally planned, the original plans/documentation should also be changed accordingly.
3. **Test** Provide tests for your component
4. **PR** Open a PR for your work

# Backend

1. **Plan out API endpoints**: This includes things like possible success responses, error responses, body paramters, query paramters, routes, & HTTP methods.
2. **Check in**: This is so we can discuss tradeoffs and design overall.
3. **Implement**: using service-base
4. **Test**: make sure your code coverage is covering as much as possible
5. **Check in**: We might discuss possible extensions to cover in a later PR and we might write those down as TODO's
6. **Document Code**: using JSDoc to document all of your code
7. **Open PR**
