import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { history } from '../../history';
import './styles.css';
import { required } from '../../constants/validators';
import { ROUTE_HOME } from '../../constants/routes';

const block = 'create-review';

export class CreateReviewComponent extends PureComponent {
  constructor(props) {
    super(props);
  
    const { review, reviewId } = this.props;
    
    if (reviewId) {
      this.state = {
        errors: [],
        review,
      };
    } else {
      this.state = {
        errors: [],
        review: {
          group: '',
          album: '',
          rating: 3,
          comment: '',
        }
      };
    }
  }

  validateForm = () => {
    const { review } = this.state;
    const { saveReview } = this.props;
    const errors = [];

    ['group', 'album'].forEach((field) => {
      if (!review[field].trim().length) {
        errors.push(field);
      }
    });
  
    if (review.rating < 1 || review.rating > 5) {
      errors.push('rating');
    }

    this.setState({
      errors
    });

    if (!errors.length) {
      const reviewToSave = { ...review };
      // firebase поиск невосприимчив к регистру
      ['group', 'album', 'comment'].forEach((field) => {
        reviewToSave[field] = review[field].toLocaleLowerCase();
      });
  
      reviewToSave.rating = +review.rating;

      saveReview(reviewToSave);
    }
  };

  onChangeAttrValues = attr => ({ target: { value } }) => {
    this.setState({
      review: {
        ...this.state.review,
        [attr]: value
      }
    });
  };

  goBack = () => {
    history.push(ROUTE_HOME);
  };

  render() {
    const {
      errors,
      review: {
        group, album, rating, comment
      },
    } = this.state;

    return (
      <div>
        <Paper className={block}>
          <TextField
            required
            error={errors.includes('group')}
            label="Группа"
            value={group}
            fullWidth
            onChange={this.onChangeAttrValues('group')}
            margin="dense"
            inputProps={{
              maxLength: 150,
            }}
          />
          {required(group, errors.includes('group'))}

          <TextField
            required
            error={errors.includes('album')}
            label="Альбом"
            value={album}
            fullWidth
            onChange={this.onChangeAttrValues('album')}
            margin="dense"
            inputProps={{
              maxLength: 150,
            }}
          />
          {required(album, errors.includes('album'))}
  
          <TextField
            required
            error={errors.includes('rating')}
            label="Рейтинг"
            type="number"
            value={rating}
            fullWidth
            onChange={this.onChangeAttrValues('rating')}
            margin="dense"
            inputProps={{
              maxLength: 150,
            }}
          />
          {required(rating, errors.includes('rating'))}
  
          <TextField
            required
            error={errors.includes('comment')}
            label="Комментарий"
            value={comment}
            fullWidth
            onChange={this.onChangeAttrValues('comment')}
            margin="dense"
            inputProps={{
              maxLength: 600,
            }}
          />
          {required(comment, errors.includes('comment'))}
  
          {/**
            !reviewId && (
              <FormControlLabel
                className="panel-label"
                control={(
                  <Checkbox
                    checked={isOld}
                    onChange={this.onChangeIsOldValues}
                    color="primary"
                  />
                )}
                label="Старое?"
              />
            )
          */}
          
        </Paper>
        <div className={`${block}_buttons`}>
          <Button onClick={this.goBack} color="primary" variant="outlined">
            Отмена
          </Button>
          <Button onClick={this.validateForm} color="primary" variant="contained">
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
}
