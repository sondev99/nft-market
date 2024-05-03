'use client';

import userApi from '@/apis/userApi';
import Heading from '@/components/Heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rating } from '@mui/material';

import moment from 'moment';

type ListRatingProps = {
  reviews: ReviewReponse[];
};

interface reviewsProps {
  id: string;
  user: UserInfo;
}

const ListRating = ({ reviews }: ListRatingProps) => {
  const reviewsDatas: Review[] = reviews.map(async (review) => {
    return {
      id: review.id,
      content: review.content,
      createDate: review.createDate,
      rate: review.rate,
      user: (await userApi.getUserById(review.userId)).data,
    };
  });
  console.log('reviews', reviewsDatas);
  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {reviewsDatas &&
          reviewsDatas.map((review: Review) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={review?.user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold">
                    {review?.user?.firstName + review?.user?.lastName}
                  </div>
                  <div className="font-light">
                    {moment(review.createDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rate} readOnly />
                  <div className="ml-2">{review.content}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
