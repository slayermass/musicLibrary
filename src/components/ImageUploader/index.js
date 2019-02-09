import React, { Component } from 'react';
import './styles.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MAX_FILE_SIZE = 1024 * 1024;

export class ImageUploader extends Component {
  state = {
    image: null,
    preview: null
  };

  onChangeFileHandler = (event) => {
    const { target: { files } } = event;
    const { maxFileSize } = this.props;

    if (files.length && files[0].size < (maxFileSize || MAX_FILE_SIZE)) {
      const { onChangeFile } = this.props;

      this.setState({
        image: files[0],
        preview: URL.createObjectURL(files[0])
      });
      onChangeFile(files[0]);
    }
  };

  render() {
    const { header, caption, imageUrl } = this.props;
    const { image, preview } = this.state;
    const imgPreview = imageUrl instanceof File ? preview : imageUrl;

    return (
      <div className="image-upload">
        <Typography variant="subtitle2" color="textSecondary" className="header">
          {header}
        </Typography>

        {imgPreview ? (
          <div className="preview">
            <img src={imgPreview} alt="" />
          </div>
        ) : null}

        <Typography variant="caption" color="textPrimary" className="caption">
          {caption}
        </Typography>
        <label htmlFor="image-file">
          <input
            accept="image/*"
            id="image-file"
            type="file"
            onChange={this.onChangeFileHandler}
            className="input"
          />
          <Button variant="outlined" component="span" color="primary">
            Загрузить
          </Button>
          {
            image && (
              <Typography variant="caption" color="textPrimary">
                {image.name}
              </Typography>
            )
          }
        </label>
      </div>
    );
  }
}
