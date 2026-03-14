import {
  ClientDashboardPageData,
  ClientResponse,
} from '../interfaces/client-interfaces';

export class ClientMapper {
  static mapClientsResponseToDashboard(
    items: ClientResponse[],
  ): ClientDashboardPageData[] {
    return items.map((item) => ({
      name: item.name,
      email: item.email,
      phone: item.phone,
      id: item.id,
      creationDate: ClientMapper.getRandomDateLastYear(),
    }));
  }

  private static getRandomDateLastYear(): string {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const randomTime =
      oneYearAgo.getTime() +
      Math.random() * (now.getTime() - oneYearAgo.getTime());

    return new Date(randomTime).toISOString();
  }
}
