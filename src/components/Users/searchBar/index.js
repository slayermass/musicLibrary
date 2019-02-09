// @flow
import React from 'react';
import './styles.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, withRouter } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import trim from 'lodash/trim';
import type { RouterHistory, Location } from 'react-router';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { ROUTE_CREATE_USER, ROUTE_USERS } from '../../../constants/routes';

const block = 'search-bar';

type State = {
  id: string,
  name: string,
  email: string,
  phone: string,
  role: string,
}

type Props = {
  history: RouterHistory,
  location: Location,
  onSearch: (o: State) => any,
  roles: {
    string: { name: string }
  },
};

export class SearchBarComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    const { location: { search }, onSearch } = this.props;
  
    const state = {
      id: '',
      name: '',
      email: '',
      phone: '',
      role: '',
    };
    
    const stateFromUrl = {};
  
    Object.entries(queryString.parse(search))
      .filter((urlParam: any) => urlParam[1].length)
      .forEach(([urlParamName, urlParamValue]) => {
        stateFromUrl[urlParamName] = urlParamValue;
      });
    
    this.state = {
      ...state,
      ...stateFromUrl,
    };
  
    onSearch(this.state);
  }
  
  onChangeFilter = () => {
    const { history, onSearch } = this.props;
    
    const query = new URLSearchParams({});
  
    Object.entries(this.state)
      .filter((stateParam: any) => stateParam[1].length)
      .forEach(([stateParamName, stateParamValue]: any) => {
        query.set(stateParamName, stateParamValue);
      });
  
    history.replace({ ...history.location, search: query.toString() });
  
    onSearch(this.state);
  };
  
  handleClear = (name: string) => () => {
    this.setState({
      [name]: '',
    }, () => {
      this.onChangeFilter();
    });
  };
  
  handleChange = (name: string) => (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      [name]: trim(event.target.value),
    }, () => {
      this.onChangeFilter();
    });
  };
  
  render() {
    const {
      id, name, email, phone, role
    } = this.state;
    const { roles } = this.props;
    
    return (
      <Toolbar>
        <Grid container spacing={24}>
          <Grid item lg={9} md={7} sm={12}>
            <Grid container spacing={24} className="grid-control">
              <Grid item lg={6} md={6}>
                <FormControl className="field-control">
                  <InputLabel htmlFor="adornment-password">UID</InputLabel>
                  <Input
                    onChange={this.handleChange('id')}
                    id="idInput"
                    value={id}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Стереть"
                          onClick={this.handleClear('id')}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6}>
                <FormControl className="field-control">
                  <InputLabel htmlFor="adornment-password">Имя</InputLabel>
                  <Input
                    onChange={this.handleChange('name')}
                    id="nameInput"
                    value={name}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Стереть"
                          onClick={this.handleClear('name')}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={6}>
                <FormControl className="field-control">
                  <InputLabel htmlFor="adornment-password">Email</InputLabel>
                  <Input
                    onChange={this.handleChange('email')}
                    id="emailInput"
                    value={email}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Стереть"
                          onClick={this.handleClear('email')}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="phone">Телефон</InputLabel>
                  <Input
                    onChange={this.handleChange('phone')}
                    id="phoneInput"
                    value={phone}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Стереть"
                          onClick={this.handleClear('phone')}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Роль</InputLabel>
                  <Select
                    value={role}
                    id="roleInput"
                    onChange={this.handleChange('role')}
                  >
                    <MenuItem value="">---</MenuItem>
                    {
                      Object.entries(roles).map((r: any) => (
                        <MenuItem key={r[0]} value={r[0]}>{r[1].name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={5} sm={12}>
            <Grid item md={12}>
              <Link to={`${ROUTE_CREATE_USER}?backUrl=${ROUTE_USERS}`} className={`${block}_create-user-btn`}>
                <Button variant="contained" color="primary">
                  <AddIcon /> Создать пользователя
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
}

export const SearchBar = withRouter(SearchBarComponent);
