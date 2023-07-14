import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { teamLeadValidationSchema } from 'validationSchema/team-leads';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.team_lead
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTeamLeadById();
    case 'PUT':
      return updateTeamLeadById();
    case 'DELETE':
      return deleteTeamLeadById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeamLeadById() {
    const data = await prisma.team_lead.findFirst(convertQueryToPrismaUtil(req.query, 'team_lead'));
    return res.status(200).json(data);
  }

  async function updateTeamLeadById() {
    await teamLeadValidationSchema.validate(req.body);
    const data = await prisma.team_lead.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTeamLeadById() {
    const data = await prisma.team_lead.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
