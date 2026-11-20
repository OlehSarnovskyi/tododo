import { BadRequestException } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

function createService() {
  const repository = {
    findOpenAround: jest.fn().mockResolvedValue({
      skipped: [],
      upcoming: [],
      skippedTotal: 0,
      upcomingTotal: 0,
    }),
  };

  return {
    service: new TasksService(repository as unknown as TasksRepository),
    repository,
  };
}

describe('TasksService.findOpen', () => {
  it('splits around the client-supplied day at UTC midnight', async () => {
    const { service, repository } = createService();

    await service.findOpen(42, '25.11.2026');

    const [userId, today] = repository.findOpenAround.mock.calls[0];
    expect(userId).toBe(42);
    // Must equal what $dateFromString yields for "25.11.2026", or tasks on
    // the boundary day would land in the wrong section.
    expect(today.toISOString()).toBe('2026-11-25T00:00:00.000Z');
  });

  it('handles single-digit days and months written with a leading zero', async () => {
    const { service, repository } = createService();

    await service.findOpen(42, '01.02.2026');

    expect(repository.findOpenAround.mock.calls[0][1].toISOString()).toBe(
      '2026-02-01T00:00:00.000Z',
    );
  });

  it.each(['31.02.2026', '00.11.2026', '15.13.2026'])(
    'rejects an impossible date (%s) instead of rolling it over',
    async (value) => {
      const { service, repository } = createService();

      await expect(service.findOpen(42, value)).rejects.toThrow(BadRequestException);
      expect(repository.findOpenAround).not.toHaveBeenCalled();
    },
  );
});
