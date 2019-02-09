// @flow
import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import { Link } from 'react-router-dom';
import { getDateByFormat } from '../../helpers/date';
import { TablePaginationActions } from '../TablePaginationActions';
import { ROUTE_CREATE_REVIEW } from '../../constants/routes';
import type { ReviewsType } from '../../models/review.flowtypes';
import { ConfirmDialog } from '../ConfirmDialog';
import './styles.css';

const block = 'reviews';

type Props = {
  reviews: ReviewsType,
  deleteReview: (s: string) => void,
}

type State = {
  page: number,
  rowsPerPage: number,
  showConfirmDeleteReview: boolean,
  idDeleteReview: string,
  showDeleteButtons: boolean,
}

export class ReviewsComponent extends PureComponent<Props, State> {
  state = {
    page: 0,
    rowsPerPage: 10,
    showDeleteButtons: false,
  
    showConfirmDeleteReview: false,
    idDeleteReview: '',
  };
  
  constructor(props: Props) {
    super(props);
  
    window.showDeleteButton = this.showDeleteButton;
  }
  
  handleChangePage = (event: any, page: number) => {
    this.setState({ page });
  };
  
  handleChangeRowsPerPage = ({ target: { value } }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ rowsPerPage: +value });
  };
  
  deleteReviewConfirm = (reviewId: string) => () => {
    this.setState({
      showConfirmDeleteReview: true,
      idDeleteReview: reviewId,
    });
  };
  
  onCloseDeleteUserConfirm = () => {
    this.setState({
      showConfirmDeleteReview: false,
      idDeleteReview: '',
    });
  };
  
  showDeleteButton = () => {
    this.setState({
      showDeleteButtons: true,
    });
    
    return 'ОПАСНОСТЬ';
  };
  
  onDeleteReview = () => {
    const { idDeleteReview } = this.state;
    const { deleteReview } = this.props;
  
    deleteReview(idDeleteReview);
    
    this.onCloseDeleteUserConfirm();
  };
  
  render() {
    const { reviews } = this.props;
    const {
      rowsPerPage, page, showConfirmDeleteReview, showDeleteButtons
    } = this.state;
    
    return (
      <div>
        <Table className={`${block}_table`}>
          <TableHead>
            <TableRow>
              <TableCell>Группа</TableCell>
              <TableCell>Альбом</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(review => (
                <TableRow key={review.id}>
                  <TableCell>{review.group}</TableCell>
                  <TableCell>{review.album}</TableCell>
                  <TableCell width={200}>
                    {
                      new Array(review.rating).fill(review.rating).map((r, i) => (
                        <StarOutlinedIcon key={`${i}_${r}`} className={`${block}_rating ${block}_rating-${r}`} />
                      ))
                    }
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{getDateByFormat(review.date.toDate())}</TableCell>
                  <TableCell align="right">
                    <div className={`${block}_actions`}>
                      <Link to={`${ROUTE_CREATE_REVIEW}/${review.id}`}>
                        <EditOutlinedIcon className="edit-icon" />
                      </Link>
                      {
                        showDeleteButtons && (
                          <DeleteOutlineIcon
                            color="secondary"
                            onClick={this.deleteReviewConfirm(review.id)}
                            className={`${block}_icon-link`}
                          />
                        )
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={10}
                count={reviews.length}
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
          showConfirmDeleteReview && (
            <ConfirmDialog
              title="Удаление обзора"
              description="Вы уверены, что хотите удалить обзор?"
              onSuccess={this.onDeleteReview}
              onClose={this.onCloseDeleteUserConfirm}
            />
          )
        }
      </div>
    );
  }
}
