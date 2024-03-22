import { Router, Request, Response } from 'express';

const router = Router();

// Define a route
router.get('/greet', (req: Request, res: Response) => {
  const currentHour = new Date().getHours();

  // Define the greeting based on the current hour
  let greeting = '';
  if (currentHour >= 0 && currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  // Send the response with the constructed greeting
  res.json({ message: `${greeting}, villageDev. Let's code!` });
});

export default router;
