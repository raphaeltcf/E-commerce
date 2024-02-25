import { STATUS } from '@prisma/client';
import { orderDelivered, orderShipped, preparedOrder } from './templates';

export function getMessageByStatus(
  status: STATUS,
  userName: string,
  orderId: string,
) {
  switch (status) {
    case 'RECEBIDO':
      return 'Pedido recebido com sucesso.';
    case 'PREPARO':
      return preparedOrder(userName, orderId);
    case 'DESPACHADO':
      return orderShipped(userName);
    case 'ENTREGUE':
      return orderDelivered(userName);
    default:
      return 'Status desconhecido.';
  }
}
