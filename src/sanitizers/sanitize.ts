export function sanitize(
    text: string
  ) {
  
    return text
  
      // Bearer token
      .replace(
        /Bearer\s+[A-Za-z0-9\-_\.]+/gi,
        'Bearer [REDACTED]'
      )
  
      // emails
      .replace(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
        '[EMAIL]'
      )
  
      // URLs
      .replace(
        /https?:\/\/[^\s]+/gi,
        '[URL]'
      )
  
      // UUID
      .replace(
        /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi,
        '[UUID]'
      );
  }