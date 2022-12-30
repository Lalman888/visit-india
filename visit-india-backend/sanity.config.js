import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { googleMapsInput } from "@sanity/google-maps-input";

export default defineConfig({
  name: 'default',
  title: 'visit-india-backend',

  projectId: 'itt58wsk',
  dataset: 'production',

  plugins: [deskTool(), visionTool(),
    googleMapsInput({
      apiKey: "AIzaSyCfdDTOsfd-NsoH1VeX0bfBMcM5f3C2JPY"
 })
  ],

  schema: {
    types: schemaTypes,
  },
})
