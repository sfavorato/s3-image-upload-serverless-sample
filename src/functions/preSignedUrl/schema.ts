export default {
  type: "object",
  properties: {
    fileName: { type: 'string' }
  },
  required: ['fileName']
} as const;
