import createImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const config = {
  dataset:  'production',
  projectId:  'itt58wsk',
  apiVersion: '2022-12-30',
  useCdn:  'production',
};

// Set up a client for fetching data in the getProps page functions

export const sanityClient = createClient(config);

export const urlFor = (source) =>
  createImageUrlBuilder(config).image(source);