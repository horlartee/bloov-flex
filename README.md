# Ibloov Flexit

This project uses Nuxt 3 + Tailwind + Pinia

## Setting Up

```bash
# Clone the repository (ssh preferred)
$ git clone git@github.com:hoshistech/ibloov-flex.git

# Go to the project's directory and then install the npm packages
$ npm install

# To run the project locally
$ npm run dev
```
## Icons
This project uses the [Nuxt-Icons module](https://nuxt.com/modules/icons) to dynamically load and import SVG icons from the `/assets/icons` folder.

To add a new icon, simply add an svg icon in the `/assets/icons` directory and you can easily use it in the template as such 
```
<template>
<nuxt-icon name="svg-name" />
</template>
```
