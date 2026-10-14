/*///////////////////////////////////////
For sharing values across the application 
///////////////////////////////////////*/

// Environment Variables
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV;
export const connectionString = process.env.DATABASE_URL;

// HTTP status codes
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_FOUND = 404;
