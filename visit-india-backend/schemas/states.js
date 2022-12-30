import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'states',
  title: 'States',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
                         .toLowerCase()
                         .replace(/\s+/g, '-')
                         .slice(0, 200)
      },
    }),
    defineField({
      name: 'place',
      title: 'Place',
      type: 'array',
      of: [{type: 'reference', to: {type: 'place'}}],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        // hotspot: true,
      },
    }),
    defineField({
      name: 'visitedRank',
      title: 'Visited Rank',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    })
    ,
    defineField({
      name: 'stateCategory',
      title: 'State Category',
      type: 'text',
    }),
    defineField({
      name: 'blogLink',
      title: 'Blog Link',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'place.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {place} = selection
      return {...selection, subtitle: place && `by ${place}`}
    },
  },
})
