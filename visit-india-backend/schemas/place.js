import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'place',
  title: 'Place',
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
      name: 'description',
        title: 'Description',
        type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: false,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
     defineField({
        name: 'popular',
        title: 'Popular',
        type: 'boolean',
     }),
     defineField({
        name: 'popularCount',
        title: 'Popular Count',
        type: 'number',
     })   
    ,
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
        name: 'blogLink',
        title: 'Blog Link',
        type: 'url',
    }),
    defineField({
        name: 'location',
        title: 'Location',
        type: 'geopoint',
    })
    ,
    defineField({
        name: 'stateName',
        title: 'State Name',
        type: 'reference',
        to: {type: 'states'},
    }),
  ],

    preview: {
    select: {
        title: 'title',
        media: 'mainImage',
    },
    prepare(selection) {
        const {title, media} = selection
        return {
        title,
        media,
        }
    }
    },
})
