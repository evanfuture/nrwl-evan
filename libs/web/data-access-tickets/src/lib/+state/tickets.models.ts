/**
 * Interface for the 'Tickets' data
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
};

export type TicketExpanded = Ticket & {
  assignee: User;
  isActive: boolean;
};
