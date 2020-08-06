# Frontend
1. **Develop mockups**: Drawings or something digital. If mimicking something specific, like a web page you found, then you can just link that. The most important thing is that you figure out what data you need on the page i.e. what you will need to fetch from the db/server and the overall design/look/idea.
2. **Plan Code**: Lets say you're making a new component `Foo` for `src/components`, remember the library analogy -- anything should be able to check out a book from the library, or in this case `/src/components`. Since we plan on other devs using our component `Foo` it is important that we plan out how they might use it -- you'd need to make a plan of what that component API might look like. Ex.

```html
<Foo prop1="{value1}" prop2="{value2}" prop3="{value3}">
  <Child1 />
  <Child2 />
</Foo>
```

If you're making something for `src/domains` or `src/pages` a list of components you'll think you might need is sufficient.

3. **Check in**: At this point, step 1 and step 2 are mainly so that we can talk and discuss any trade offs and the overall design. So make sure to message me and let me know you want to go over your plans.
4. **Implement**: all of your plans in storybook.
5. **Check in**: After your component is done, demo it to me and then we'll start to integrate it into the project. If there are changes to what you had originally planned, the original plans/documentation should also be changed accordingly.
6. **Test** Provide tests for your component
7. **PR** Open a PR for your work

# Backend
1. **Plan out API endpoints**: This includes things like possible success responses, error responses, body paramters, query paramters, routes, & HTTP methods.
2. **Check in**: This is so we can discuss tradeoffs and design overall.
3. **Implement**: using service-base
4. **Test**: make sure your code coverage is covering as much as possible
5. **Check in**: We might discuss possible extensions to cover in a later PR and we might write those down as TODO's
6. **Document Code**: using JSDoc to document all of your code
7. **Open PR**
