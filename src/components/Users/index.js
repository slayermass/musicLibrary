import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { TablePaginationActions } from '../TablePaginationActions';
import {
  ROUTE_CREATE_USER, ROUTE_DASHBOARD, ROUTE_USERS
} from '../../constants/routes';
import { ConfirmDialog } from '../ConfirmDialog';
import './styles.css';

const block = 'users';

export class UsersComponent extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 10,
  
    showConfirmDeleteUser: false,
    idDeleteUser: null,
  };
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value });
  };
  
  blockUser = (id, isBlock = false) => () => {
    const { blockUser } = this.props;
  
    blockUser(id, isBlock);
  };
  
  
  deleteUserConfirm = id => () => {
    this.setState({
      showConfirmDeleteUser: true,
      idDeleteUser: id,
    });
  };
  
  onModalCloseDeleteUserConfirm = () => {
    this.setState({
      showConfirmDeleteUser: false,
      idDeleteUser: null,
    });
  };
  
  deleteUser = () => {
    const { deleteUser } = this.props;
    const { idDeleteUser } = this.state;
    
    this.onModalCloseDeleteUserConfirm();
    
    deleteUser(idDeleteUser);
  };
  
  render() {
    const {
      rowsPerPage, page, showConfirmDeleteUser
    } = this.state;
    const { usersData: { users, roles } } = this.props;
    
    return (
      <div className={block}>
        <Table className={`${block}_table`}>
          <TableHead>
            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Почта</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Проекты</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              const role = get(roles, [user.role], { name: '' });
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell className={`${block}_projects-list`}>
                    {
                      user.projects && user.projects.map(project => (
                        <Link
                          key={project.id}
                          to={`${ROUTE_DASHBOARD}/${project.id}`}
                          target="_blank"
                        >
                          {project.name}
                        </Link>
                      ))
                    }
                  </TableCell>
                  <TableCell>{user.isBlocked ? 'Заблокирован' : 'Активен'}</TableCell>
                  <TableCell align="right">
                    <div className={`${block}_actions`}>
                      <Link to={`${ROUTE_CREATE_USER}/${user.id}?backUrl=${ROUTE_USERS}`}>
                        <EditOutlinedIcon className="edit-icon" />
                      </Link>
                      {
                        user.isBlocked
                          ? <LockOpenOutlinedIcon onClick={this.blockUser(user.id)} className={`unlock-icon ${block}_icon-link`} />
                          : <LockOutlinedIcon onClick={this.blockUser(user.id, true)} className={`lock-icon ${block}_icon-link`} />
                      }
                      <DeleteOutlineIcon onClick={this.deleteUserConfirm(user.id)} className={`delete-icon ${block}_icon-link`} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={10}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelRowsPerPage="На странице"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
              />
            </TableRow>
          </TableFooter>
        </Table>
        {
          showConfirmDeleteUser && (
            <ConfirmDialog
              title="Удаление пользователя"
              description="Вы уверены, что хотите удалить пользователя?"
              onSuccess={this.deleteUser}
              onClose={this.onModalCloseDeleteUserConfirm}
            />
          )
        }
      </div>
    );
  }
}
