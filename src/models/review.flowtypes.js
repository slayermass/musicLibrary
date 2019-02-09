// @flow

export type ReviewType = {
  id: string,
  group: string,
  album: string,
  rating: number,
  comment: string,
  date: any,
}

export type ReviewsType = Array<ReviewType>
