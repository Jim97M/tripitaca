import { Request } from 'express';

interface RequestWithUser extends Request {
  user: any; // Change 'any' to the type of your user object if available
}

export default RequestWithUser;
