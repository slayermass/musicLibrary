import React, { PureComponent } from 'react';
import { DateRange } from 'react-date-range';
import TextField from '@material-ui/core/TextField';
import './styles.css';

const block = 'date-range-picker';

export class DateRangePicker extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  setRef = (node) => {
    this.wrapperRef = node;
  };
  
  onToggle = val => () => {
    this.setState({
      open: val,
    });
  };
  
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  };
  
  handleSelect = ({ startDate, endDate }) => {
    const { onChangeRange } = this.props;
    
    this.setState({
      startDate: startDate.clone(), // важно
      endDate: endDate.clone(),
    });
  
    onChangeRange(startDate, endDate);
  };
  
  render() {
    const {
      open, startDate, endDate
    } = this.state;
    
    return (
      <div className={block}>
        <TextField
          value={`${startDate.format('DD.MM.YYYY')} - ${endDate.format('DD.MM.YYYY')}`}
          onFocus={this.onToggle(true)}
        />
        {open && (
          <div className={`${block}_calendar`} ref={this.setRef}>
            <DateRange
              onChange={this.handleSelect}
              calendars={1}
              startDate={startDate}
              endDate={endDate}
              twoStepChange
            />
          </div>
        )}
      </div>
    );
  }
}
