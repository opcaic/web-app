import { ROLE_ORGANIZER, ROLE_ADMIN } from '../../../../shared/helpers/roles';

export const menuItems = [
  {
    key: 'dashboard',
    link: '/admin',
    labelName: 'dashboard',
    requiredRole: ROLE_ORGANIZER,
  },
  {
    key: 'tournaments_list',
    link: '/admin/tournaments',
    labelName: 'tournaments',
    requiredRole: ROLE_ORGANIZER,
  },
  {
    key: 'games_list',
    link: '/admin/games',
    labelName: 'games',
    requiredRole: ROLE_ORGANIZER,
  },
  {
    key: 'users_list',
    link: '/admin/users',
    labelName: 'users',
    requiredRole: ROLE_ADMIN,
  },
  {
    key: 'system',
    link: '/admin/system',
    labelName: 'system',
    requiredRole: ROLE_ADMIN,
  },
];
