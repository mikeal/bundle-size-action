# `bundle-size-action`

In order to add bundle size badges to your readme automatically, add the following GitHub Action.

```
- uses: mikeal/bundle-size-action@master
- uses: mikeal/publish-to-github-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The first action creates a new bundle, minifies it, and inserts/modifies the badges in the readme. The second action 
publishes changed files back to GitHub, which in this case is the `README.md` that was just modified.

You probably want to run this at the end of your regular build/test cycle on master.

Known projects using this are:

* [bent](https://github.com/mikeal/bent)
* [bytesish](https://github.com/mikeal/bytesish)
* [digestif](https://github.com/mikeal/digestif)
