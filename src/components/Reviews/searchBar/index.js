// @flow
import React from 'react';
import './styles.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
import MenuItem from '@material-ui/core/MenuItem';
import { ROUTE_CREATE_REVIEW } from '../../../constants/routes';
import Select from '@material-ui/core/Select';

const block = 'search-bar';

type State = {
  group: string,
  album: string,
  rating: number,
}

type Props = {
  history: RouterHistory,
  location: Location,
  onSearch: (o: State) => any,
};

export class SearchBarComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    const { location: { search }, onSearch } = this.props;
  
    const state = {
      group: '',
      album: '',
      rating: 0,
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
        if (!(stateParamName === 'rating' && stateParamValue === '0')) {
          query.set(stateParamName, stateParamValue);
        }
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
      group, album, rating
    } = this.state;
    
    return (
      <Toolbar>
        <Grid container spacing={24}>
          <Grid item lg={9} md={7} sm={12}>
            <Grid container spacing={24} className="grid-control">
              <Grid item lg={6} md={6}>
                <FormControl className="field-control">
                  <InputLabel htmlFor="adornment-password">Группа</InputLabel>
                  <Input
                    onChange={this.handleChange('group')}
                    value={group}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Стереть"
                          onClick={this.handleClear('group')}
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
                  <InputLabel htmlFor="adornment-password">Альбом</InputLabel>
                  <Input
                    onChange={this.handleChange('album')}
                    value={album}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Стереть"
                          onClick={this.handleClear('album')}
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
                  <InputLabel>Рейтинг</InputLabel>
                  <Select
                    value={rating}
                    onChange={this.handleChange('rating')}
                  >
                    <MenuItem value="0">Любой</MenuItem>
                    {
                      [1, 2, 3, 4, 5].map((r: any) => (
                        <MenuItem key={r} value={r}>{r}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
          </Grid>
          <Grid item lg={3} md={5} sm={12}>
            <Grid item md={12}>
              <Link to={ROUTE_CREATE_REVIEW} className={`${block}_create-user-btn`}>
                <Button variant="contained" color="primary">
                  <AddIcon /> Создать обзор
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
