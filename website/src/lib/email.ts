/**
 * Email functionality for the waiting list
 * 
 * This is a simple implementation that simulates sending emails
 * In a production environment, you would use a proper email service
 */

interface WaitingListEntry {
  email: string;
  name?: string;
  position: number;
  joinedAt: Date;
}

// In-memory storage for waiting list entries
// In a real application, this would be a database
const waitingList: WaitingListEntry[] = [];

/**
 * Add a new entry to the waiting list
 * @param email User's email address
 * @param name User's name (optional)
 * @returns The position in the waiting list
 */
export async function addToWaitingList(email: string, name?: string): Promise<number> {
  // Check if email already exists
  const existingEntry = waitingList.find(entry => entry.email === email);
  if (existingEntry) {
    return existingEntry.position;
  }

  // Generate a position number
  // In a real application, this would be sequential
  // For demo purposes, we'll generate a random number between 100-500
  const position = Math.floor(Math.random() * 400) + 100;

  // Create a new entry
  const newEntry: WaitingListEntry = {
    email,
    name,
    position,
    joinedAt: new Date()
  };

  // Add to the waiting list
  waitingList.push(newEntry);

  // Simulate sending an email
  await sendWaitingListEmail(newEntry);

  return position;
}

/**
 * Send a waiting list confirmation email
 * @param entry The waiting list entry
 */
async function sendWaitingListEmail(entry: WaitingListEntry): Promise<void> {
  // In a real application, this would send an actual email
  // For demo purposes, we'll just log to the console
  console.log(`Sending email to: ${entry.email}`);
  console.log(`Subject: Welcome to the Artintel Waiting List!`);
  console.log(`Body: 
    Hi ${entry.name || 'there'},
    
    Thank you for joining the Artintel waiting list! You are currently position #${entry.position} in line.
    
    We'll notify you as soon as you're granted access to our platform.
    
    Best regards,
    The Artintel Team
    
    P.S. This email would be sent to dev@aigroup.app in a real implementation.
  `);

  // In a real implementation, this would use an email service like SendGrid, Mailgun, etc.
  // Example with a hypothetical email service:
  /*
  await emailService.send({
    to: 'dev@aigroup.app', // In production, this would be the actual recipient
    from: 'noreply@artintel.ai',
    subject: 'New Waiting List Signup',
    text: `New signup: ${entry.email} (${entry.name || 'No name provided'}) - Position #${entry.position}`,
    html: `<p>New signup: <strong>${entry.email}</strong> (${entry.name || 'No name provided'}) - Position #${entry.position}</p>`
  });
  */

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
}

/**
 * Get all waiting list entries
 * @returns Array of waiting list entries
 */
export function getWaitingList(): WaitingListEntry[] {
  return [...waitingList];
}
