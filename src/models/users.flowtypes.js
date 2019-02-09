// @flow

export type UserRoleType = 'admin' | 'merchant' | 'manager' | 'contentManager';

export type UserRolesType = {
  [string]: {
    name: string,
  }
};

export type UserType = {
  id: string,
  email: string,
  isBlocked: boolean,
  isDeleted: boolean,
  name: string,
  owner: string,
  role: string,
  phone: string,
  projects: Array<{
    id: string,
    name: string,
  }>,
}

export type CreateUserType = {
  email: string,
  name: string,
  phone: string,
  role: UserRoleType,
}

export type UpdateUserType = {
  id: string,
  email: string,
  name: string,
  phone: string,
}
