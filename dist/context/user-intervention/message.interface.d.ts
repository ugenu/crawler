/**
 * the interface of the notification to send to the user when intervention is required
 * @see Context.requireUserIntervention
 */
export interface Message {
    /**
     * the title of the message to send to the user
     */
    title?: string;
    /**
     * the message content to show to the user
     */
    message: string;
}
