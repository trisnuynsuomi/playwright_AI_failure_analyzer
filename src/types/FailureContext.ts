export interface FailureContext {
    
    url: string;

    testTitle: string;
  
    errorMessage: string;
  
    consoleLogs: string[];
  
    failedRequests: string[];

    codeSnippet: string;

    htmlSnapshot: string;

}