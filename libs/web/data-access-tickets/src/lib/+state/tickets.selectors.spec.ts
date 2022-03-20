import { Ticket, TicketExpanded, User } from './tickets.models';
import { getAllTicketsExpanded } from './tickets.selectors';

it('merges all tickets with users and active route id', () => {
  const users = [newUser()];
  const tickets = [newTicket(), newTicket()];
  const expandedTickets = [newExpandedTicket(), newExpandedTicket()];

  const result = getAllTicketsExpanded.projector(tickets, { 1: users[0] }, 2);

  expect(result).toEqual(expandedTickets);
});

function newUser(id = 1): User {
  return { id, name: 'Evan' };
}

function newTicket(): Ticket {
  return { id: 1, assigneeId: 1, description: '', completed: false };
}
function newExpandedTicket(): TicketExpanded {
  return { id: 1, assigneeId: 1, description: '', completed: false, isActive: false, assignee: newUser(1) };
}
