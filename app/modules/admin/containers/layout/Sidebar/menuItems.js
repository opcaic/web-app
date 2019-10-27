import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';

export const menuItems = [
  {
    key: 'dashboard',
    link: '/admin',
    labelName: 'dashboard',
    requiredRole: userRoleEnum.ORGANIZER,
  },
  {
    key: 'tournaments_list',
    link: '/admin/tournaments',
    labelName: 'tournaments',
    requiredRole: userRoleEnum.ORGANIZER,
  },
  {
    key: 'games_list',
    link: '/admin/games',
    labelName: 'games',
    requiredRole: userRoleEnum.ORGANIZER,
  },
  {
    key: 'users_list',
    link: '/admin/users',
    labelName: 'users',
    requiredRole: userRoleEnum.ADMIN,
  },
  {
    key: 'system',
    link: '/admin/system',
    labelName: 'system',
    requiredRole: userRoleEnum.ADMIN,
  },
];
