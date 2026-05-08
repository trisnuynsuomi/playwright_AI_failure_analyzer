import {
    defineConfig
  }
  from 'vitest/config';
  
  export default defineConfig({
  
    test: {
  
      include: [
        'src/unit-test/*.test.ts'
      ],
  
      exclude: [
        'e2e/**',
        'node_modules/**'
      ]
    }
  });