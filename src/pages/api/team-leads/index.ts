import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { teamLeadValidationSchema } from 'validationSchema/team-leads';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTeamLeads();
    case 'POST':
      return createTeamLead();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeamLeads() {
    const data = await prisma.team_lead
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'team_lead'));
    return res.status(200).json(data);
  }

  async function createTeamLead() {
    await teamLeadValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.performance_evaluation?.length > 0) {
      const create_performance_evaluation = body.performance_evaluation;
      body.performance_evaluation = {
        create: create_performance_evaluation,
      };
    } else {
      delete body.performance_evaluation;
    }
    if (body?.time_tracking?.length > 0) {
      const create_time_tracking = body.time_tracking;
      body.time_tracking = {
        create: create_time_tracking,
      };
    } else {
      delete body.time_tracking;
    }
    const data = await prisma.team_lead.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
