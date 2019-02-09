import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { UsersComponent } from '../../components/Users';
import { CircularLoader } from '../../components/CircularLoader';
import { SearchBar } from '../../components/Users/searchBar';

export class UsersContainer extends Component {
  state = {
    filter: {},
  };
  
  onSearch = (data) => {
    this.setState({
      filter: data,
    });
  };
  
  render() {
    const {
      usersData,
      loading,
      userData,
      blockUser,
      deleteUser,
      updateUser,
      loadUserData,
    } = this.props;
    
    const { filter } = this.state;
    
    let filteredUsers = [...usersData.users];

    Object.entries(filter).forEach((d) => {
      if (d[1].length) {
        filteredUsers = filteredUsers.filter(u => u[d[0]].toLowerCase().includes(d[1].toLowerCase()));
      }
    });
  
    const mergedUsersData = { ...usersData, users: filteredUsers };
  
    return (
      <div className="content-wrapper">
        <Paper className="paper-main">
          <SearchBar onSearch={this.onSearch} roles={usersData.roles} />
          {
            loading
              ? <CircularLoader />
              : (
                <UsersComponent
                  usersData={mergedUsersData}
                  userData={userData}
                  blockUser={blockUser}
                  deleteUser={deleteUser}
                  updateUser={updateUser}
                  loadUserData={loadUserData}
                />
              )
          }
        </Paper>
      </div>
    );
  }
}
