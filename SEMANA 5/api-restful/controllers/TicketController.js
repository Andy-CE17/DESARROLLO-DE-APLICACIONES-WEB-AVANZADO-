const TicketService = require("../services/TicketService");

const service = new TicketService();

exports.create = (req, res) => {
  const ticket = service.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.list = (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(Number.parseInt(req.query.limit, 10) || 5, 1);
  const tickets = service.list();
  const startIndex = (page - 1) * limit;
  const paginatedTickets = tickets.slice(startIndex, startIndex + limit);

  res.status(200).json({
    page,
    limit,
    total: tickets.length,
    totalPages: Math.ceil(tickets.length / limit),
    tickets: paginatedTickets,
  });
};

exports.assign = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);

  if (!ticket) {
    return res.status(404).json({ error: "Ticket no encontrado" });
  }

  return res.status(200).json(ticket);
};

exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);

  if (!ticket) {
    return res.status(404).json({ error: "Ticket no encontrado" });
  }

  return res.status(200).json(ticket);
};

exports.notifications = (req, res) => {
  const notifications = service.listNotifications(req.params.id);
  res.status(200).json(notifications);
};

exports.delete = (req, res) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
